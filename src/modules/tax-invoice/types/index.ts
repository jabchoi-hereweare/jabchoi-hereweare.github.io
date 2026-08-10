/**
 * 볼타(Bolta) API 및 국세청 표준 전자세금계산서 호환 데이터 스키마
 * 5대 날짜(5-Date Schema), 3층 지식(Rule-Judgment-Practice), 수정세금계산서 6가지 코드 지원
 */

// 부가가치세 과세 구분 (볼타 API: tax_type)
export type TaxType = 'TAXABLE' | 'ZERO_RATE' | 'EXEMPT'; // 과세 (10%), 영세율 (0%), 면세

// 전자세금계산서 발행 상태 (볼타 API 라이프사이클)
export type InvoiceStatus = 'DRAFT' | 'READY' | 'ISSUED' | 'NTS_SENT' | 'FAILED' | 'CANCELED';

// 수정세금계산서 사유 코드 (볼타 API: amendment_code)
export type AmendmentReasonCode = 
  | '1' // 기재사항 착오정정 (당초 작성일자로 소급)
  | '2' // 공급가액 변동 (변동 사유 발생일)
  | '3' // 환입 (해당 재화 반품일)
  | '4' // 계약 해제 (해제일자)
  | '5' // 내국신용장 사후개설 (당초 작성일자로 소급)
  | '6'; // 착오에 의한 이중발급 (당초 작성일자로 소급 음표)

// 품목 명세서 (볼타 API: invoice_items)
export interface TaxInvoiceItem {
  id: string;
  monthDay: string;       // 월/일 (MM/DD)
  itemName: string;       // 품목명
  spec: string;           // 규격
  quantity: number | '';  // 수량
  unitPrice: number | ''; // 단가
  supplyAmount: number;   // 공급가액
  taxAmount: number;      // 세액
  remark: string;         // 비고
}

// 사업자/거래처 정보 (볼타 API: party_info)
export interface PartyInfo {
  regNo: string;          // 사업자등록번호 (10자리, Modulo-10 검증)
  name: string;           // 상호 (법인명)
  ceoName: string;        // 대표자 성명
  address: string;        // 사업장 주소
  subRegNo?: string;      // 종사업장번호 (4자리)
  bizType?: string;       // 업태
  bizClass?: string;      // 종목
  email?: string;         // 전자세금계산서 수신 이메일
}

/**
 * 장부로/ERP 세무 엔진 핵심: 5대 날짜 스키마 (5-Date Schema)
 */
export interface TaxInvoiceDates {
  writeDate: string;             // 1. 작성연월일 (YYYY-MM-DD) → 세무: 부가세 과세기간 귀속 결정
  issuedAt?: string;             // 2. 발급일시 (ISO String) → 세무: 지연발급 가산세(1%) 판정
  transmittedAt?: string;        // 3. 전송일시 (ISO String) → 세무: 지연전송 가산세(0.3%) 판정
  statutorySupplyDate?: string;  // 4. 공급시기 (법정 실질) → 세무: 작성일자 적법성 판정 기준
  revenueRecognizedAt?: string;  // 5. 수익인식일 (발생주의) → 회계: 손익계산서 매출 계상 시점
  paymentDate?: string;          // (보조) 결제일 → 회계: 채권 소멸 / 현금흐름
}

// 이상탐지(Anomaly Detection) 룰 엔진 결과
export interface AnomalyDetectionResult {
  ruleId: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  suggestedAction: string;
}

// 세금계산서 전체 스키마 (볼타 API 요청/응답 호환)
export interface TaxInvoiceData {
  id?: string;
  ntsApprovalNo?: string;        // 국세청 승인번호 (24자리)
  invoiceType: 'NORMAL' | 'AMENDMENT';
  amendmentReason?: AmendmentReasonCode;
  taxType: TaxType;
  supplier: PartyInfo;
  buyer: PartyInfo;
  dates: TaxInvoiceDates;        // 5대 날짜 스키마
  items: TaxInvoiceItem[];
  totalSupplyAmount: number;     // 총 공급가액
  totalTaxAmount: number;        // 총 세액
  totalAmount: number;           // 총 합계금액
  remark: string;
  status: InvoiceStatus;
}

// 필요적 기재사항 4가지 유효성 및 안전성 검사 결과
export interface TaxInvoiceValidation {
  isSupplierValid: boolean;        // 1. 공급자 등록번호 & 상호
  isBuyerValid: boolean;           // 2. 공급받는자 등록번호
  isDateValid: boolean;            // 3. 작성연월일
  isAmountValid: boolean;          // 4. 공급가액 & 세액
  isFullyValid: boolean;           // 필요적 4가지 형식 충족 여부 (유효성)
  
  // MOD-10 알고리즘 검증
  isSupplierMod10Valid: boolean;
  isBuyerMod10Valid: boolean;

  // "유효성 ≠ 안전성" 검증
  isSafe: boolean;                 // 실질과 다른 거짓 작성 / 불공제 리스크 여부
  safetyWarnings: string[];        // 안전성 경고 메시지
  
  // 5대 날짜 기반 이상탐지 결과
  anomalies: AnomalyDetectionResult[];
}
