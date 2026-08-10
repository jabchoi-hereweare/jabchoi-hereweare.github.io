/**
 * 5대 날짜(5-Date Schema) 기반 이상탐지(Anomaly Detection) 룰 엔진
 * 장부로 / ERP 세무 엔진의 핵심 비즈니스 로직
 */

import { TaxInvoiceData, AnomalyDetectionResult, TaxInvoiceValidation } from '../types';
import { validateBizRegNoMod10 } from './bizRegNoValidator';
import { getStatutoryIssueDeadline } from './issueDateValidator';

/**
 * 5대 날짜 간의 시차(Delta) 분석 및 이상탐지
 */
export const detectDateAnomalies = (data: TaxInvoiceData): AnomalyDetectionResult[] => {
  const anomalies: AnomalyDetectionResult[] = [];
  const { writeDate, issuedAt, transmittedAt, statutorySupplyDate, revenueRecognizedAt, paymentDate } = data.dates;

  // 1. 작성연월일 ≠ 법정 공급시기 (과세기간 경계 이월 위험)
  if (statutorySupplyDate && writeDate !== statutorySupplyDate) {
    const writeMonth = parseInt(writeDate.slice(5, 7), 10);
    const supplyMonth = parseInt(statutorySupplyDate.slice(5, 7), 10);
    const isPeriodCrossed = (writeMonth <= 6 && supplyMonth >= 7) || (writeMonth >= 7 && supplyMonth <= 6);

    anomalies.push({
      ruleId: 'RULE_DATE_MISMATCH',
      severity: isPeriodCrossed ? 'CRITICAL' : 'WARNING',
      title: '과세기간 귀속 오류 위험 (작성연월일 ≠ 실제 공급시기)',
      description: `작성연월일(${writeDate})과 실제 용역 완료일/공급시기(${statutorySupplyDate})가 일치하지 않습니다.${isPeriodCrossed ? ' [과세기간(1기/2기) 이월 발생! 지연발급 가산세 1% 리스크]' : ''}`,
      suggestedAction: '용역 완료일이 속한 달의 말일 또는 실제 공급시기로 작성연월일을 수정하세요.',
    });
  }

  // 2. 발급일시 > 공급시기 익월 10일 (지연발급 가산세 1%)
  const deadline = getStatutoryIssueDeadline(writeDate);
  if (issuedAt && deadline) {
    const issueDateOnly = issuedAt.slice(0, 10);
    if (issueDateOnly > deadline) {
      anomalies.push({
        ruleId: 'RULE_DELAYED_ISSUE',
        severity: 'CRITICAL',
        title: '지연발급 가산세 부과 대상 (발급일시 > 익월 10일)',
        description: `법정 발급기한(${deadline})을 지나 ${issueDateOnly}에 발급되었습니다. 공급자 1% 가산세가 부과됩니다.`,
        suggestedAction: '지연발급 사유를 확인하고 부가가치세 신고 시 가산세를 반영하세요.',
      });
    }
  }

  // 3. 전송일시 > 발급일시 + 1일 (지연전송 가산세 0.3%)
  if (issuedAt && transmittedAt) {
    const issueTime = new Date(issuedAt).getTime();
    const transmitTime = new Date(transmittedAt).getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (transmitTime - issueTime > oneDayMs) {
      anomalies.push({
        ruleId: 'RULE_DELAYED_TRANSMIT',
        severity: 'WARNING',
        title: '지연전송 가산세 경고 (발급일 다음 날까지 미전송)',
        description: '전자세금계산서 발급 후 다음 날까지 국세청에 전송되지 않아 지연전송 가산세(0.3%) 대상입니다.',
        suggestedAction: '볼타/ASP 연동 시스템의 자동 전송 상태를 재점검하세요.',
      });
    }
  }

  // 4. 수익인식일 ≠ 작성연월일 (선수금 / 미수금 회계-세무 불일치 현상 - 두 눈의 갈라짐)
  if (revenueRecognizedAt && revenueRecognizedAt !== writeDate) {
    anomalies.push({
      ruleId: 'RULE_REVENUE_TIME_SPLIT',
      severity: 'INFO',
      title: '🔵🔴 회계-세무 시점 불일치 (선수금/미수금 발생)',
      description: `세금계산서 작성일자(${writeDate})와 회계상 매출 발생 시점(${revenueRecognizedAt})이 다릅니다. (예: 대가 사전 수령 후 세금계산서 선발행)`,
      suggestedAction: '회계 장부 전표 입력 시 (대변) 용역매출이 아닌 (대변) 선수금 계정으로 처리해야 손익 오류가 방지됩니다.',
    });
  }

  // 5. 결제일 없음 + 90일 경과 (대손 검토)
  if (!paymentDate && writeDate) {
    const writeTime = new Date(writeDate).getTime();
    const nowTime = new Date().getTime();
    const daysPassed = Math.floor((nowTime - writeTime) / (1000 * 60 * 60 * 24));

    if (daysPassed > 90) {
      anomalies.push({
        ruleId: 'RULE_UNPAID_LONG_TERM',
        severity: 'WARNING',
        title: '장기 미수금 채권 모니터링 (결제 미완료 90일 경과)',
        description: `작성일로부터 ${daysPassed}일이 경과했으나 대금 결제가 완료되지 않았습니다.`,
        suggestedAction: '거래처 채권 회수 현황을 확인하고 대손세액공제 요건 해당 여부를 검토하세요.',
      });
    }
  }

  return anomalies;
};

/**
 * 필요적 기재사항 유효성 및 "유효성 ≠ 안전성" 종합 검증
 */
export const validateTaxInvoiceFully = (data: TaxInvoiceData): TaxInvoiceValidation => {
  const isSupplierRegNoLength = data.supplier.regNo.replace(/[^0-9]/g, '').length === 10;
  const isSupplierName = Boolean(data.supplier.name.trim());
  const isSupplierValid = isSupplierRegNoLength && isSupplierName;

  const isBuyerRegNoLength = data.buyer.regNo.replace(/[^0-9]/g, '').length === 10;
  const isBuyerValid = isBuyerRegNoLength;

  const isDateValid = Boolean(data.dates.writeDate && data.dates.writeDate.trim());
  const isAmountValid = typeof data.totalSupplyAmount === 'number' && data.totalSupplyAmount > 0;

  const isFullyValid = isSupplierValid && isBuyerValid && isDateValid && isAmountValid;

  // MOD-10 검증
  const isSupplierMod10Valid = validateBizRegNoMod10(data.supplier.regNo);
  const isBuyerMod10Valid = validateBizRegNoMod10(data.buyer.regNo);

  // "유효성 ≠ 안전성" 경고 모음
  const safetyWarnings: string[] = [];

  // 품목 공란 또는 미흡
  const hasBlankItems = !data.items || data.items.length === 0 || data.items.every(i => !i.itemName.trim());
  if (hasBlankItems) {
    safetyWarnings.push(
      '⚠️ [품목란 공란 리스크]: 법적으로 세금계산서 자체는 유효하지만, 향후 세무조사 시 공급자에게 거래 실질 입증 부담이 발생합니다.'
    );
  }

  // 접대비 / 차량유지비 등 불공제 추정 품목
  const containsNonDeductibleKeywords = data.items?.some(i => 
    i.itemName.includes('접대') || i.itemName.includes('선물') || i.itemName.includes('골프') || i.itemName.includes('주유')
  );
  if (containsNonDeductibleKeywords) {
    safetyWarnings.push(
      '⚠️ [매입세액 불공제 리스크]: 품목명에 접대/선물/주유 관련 지출이 포함되어 있습니다. 공급받는자(고객사)의 10% 매입세액 공제가 거절될 수 있습니다 (부가법 §39).'
    );
  }

  if (!isSupplierMod10Valid && isSupplierRegNoLength) {
    safetyWarnings.push('⚠️ [공급자 사업자번호 체크섬 오류]: 국세청에 등록되지 않은 부적격 사업자번호일 수 있습니다.');
  }

  if (!isBuyerMod10Valid && isBuyerRegNoLength) {
    safetyWarnings.push('⚠️ [공급받는자 사업자번호 체크섬 오류]: 번호 오기로 인한 매입세액 불공제 리스크가 발생할 수 있습니다.');
  }

  const isSafe = isFullyValid && safetyWarnings.length === 0 && isSupplierMod10Valid && isBuyerMod10Valid;

  // 5대 날짜 이상탐지 룰 실행
  const anomalies = detectDateAnomalies(data);

  return {
    isSupplierValid,
    isBuyerValid,
    isDateValid,
    isAmountValid,
    isFullyValid,
    isSupplierMod10Valid,
    isBuyerMod10Valid,
    isSafe,
    safetyWarnings,
    anomalies,
  };
};
