/**
 * 세금계산서 Headless React Custom Hook (useTaxInvoiceForm)
 * 볼타 API 규격, 다중 품목 처리, 5대 날짜 이상탐지, 실시간 MOD-10 검증 포함
 */

import { useState, useMemo } from 'react';
import { TaxInvoiceData, TaxInvoiceItem, TaxInvoiceValidation, TaxType } from '../types';
import { formatBizRegNo } from '../utils/bizRegNoValidator';
import { aggregateInvoiceTotals, calculateItemAmounts } from '../utils/taxCalculators';
import { validateTaxInvoiceFully } from '../utils/anomalyDetector';
import { defaultBoltaClient, BoltaIssueResponse } from '../api/boltaApiClient';

const createEmptyItem = (idSuffix: string = '1'): TaxInvoiceItem => ({
  id: `item_${Date.now()}_${idSuffix}`,
  monthDay: '',
  itemName: '',
  spec: '',
  quantity: '',
  unitPrice: '',
  supplyAmount: 0,
  taxAmount: 0,
  remark: '',
});

export const initialTaxInvoiceState: TaxInvoiceData = {
  invoiceType: 'NORMAL',
  taxType: 'TAXABLE',
  supplier: {
    regNo: '123-45-67890',
    name: '(주)홍길동테크',
    ceoName: '홍길동',
    address: '서울특별시 강남구 테헤란로 123',
  },
  buyer: {
    regNo: '987-65-43210',
    name: '(주)고객사코리아',
    ceoName: '이대표',
    address: '서울특별시 마포구 상암산로 48',
  },
  dates: {
    writeDate: '2026-07-31',
    statutorySupplyDate: '2026-07-31',
    revenueRecognizedAt: '2026-07-31',
  },
  items: [
    {
      id: 'item_init_1',
      monthDay: '07/31',
      itemName: '웹 서비스 개발 외주 용역',
      spec: '건',
      quantity: 1,
      unitPrice: 3000000,
      supplyAmount: 3000000,
      taxAmount: 300000,
      remark: '7월 용역 대금',
    },
  ],
  totalSupplyAmount: 3000000,
  totalTaxAmount: 300000,
  totalAmount: 3300000,
  remark: '7월 용역 대금',
  status: 'DRAFT',
};

export const useTaxInvoiceForm = (initialData: TaxInvoiceData = initialTaxInvoiceState) => {
  const [formData, setFormData] = useState<TaxInvoiceData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueResponse, setIssueResponse] = useState<BoltaIssueResponse | null>(null);

  // 실시간 종합 검증 (필수 4가지, MOD-10, 유효성 vs 안전성, 5대 날짜 이상탐지)
  const validation: TaxInvoiceValidation = useMemo(() => {
    return validateTaxInvoiceFully(formData);
  }, [formData]);

  // 공급자 사업자번호 변경
  const setSupplierRegNo = (regNoRaw: string) => {
    setFormData(prev => ({
      ...prev,
      supplier: {
        ...prev.supplier,
        regNo: formatBizRegNo(regNoRaw),
      },
    }));
  };

  // 공급받는자 사업자번호 변경
  const setBuyerRegNo = (regNoRaw: string) => {
    setFormData(prev => ({
      ...prev,
      buyer: {
        ...prev.buyer,
        regNo: formatBizRegNo(regNoRaw),
      },
    }));
  };

  // 5대 날짜 변경
  const setWriteDate = (writeDate: string) => {
    setFormData(prev => ({
      ...prev,
      dates: {
        ...prev.dates,
        writeDate,
        // 기본값으로 공급시기 및 수익인식일 자동 연동 (사용자가 별도 수정 가능)
        statutorySupplyDate: prev.dates.statutorySupplyDate || writeDate,
        revenueRecognizedAt: prev.dates.revenueRecognizedAt || writeDate,
      },
    }));
  };

  const setDateProperty = (key: keyof typeof formData.dates, value: string) => {
    setFormData(prev => ({
      ...prev,
      dates: {
        ...prev.dates,
        [key]: value,
      },
    }));
  };

  // 과세 유형 변경 (과세 10%, 영세율 0%, 면세)
  const setTaxType = (taxType: TaxType) => {
    setFormData(prev => {
      const updatedItems = prev.items.map(item => {
        const { supplyAmount, taxAmount } = calculateItemAmounts(item.quantity, item.unitPrice, taxType);
        return { ...item, supplyAmount, taxAmount };
      });
      const totals = aggregateInvoiceTotals(updatedItems, taxType);
      return {
        ...prev,
        taxType,
        items: updatedItems,

        ...totals,
      };
    });
  };

  // 품목 항목 수정 (다중 품목 대응)
  const updateItem = (index: number, field: keyof TaxInvoiceItem, value: any) => {
    setFormData(prev => {
      const updatedItems = [...prev.items];
      const targetItem = { ...updatedItems[index], [field]: value };

      // 수량/단가 변경 시 공급가액 & 세액 자동 계산
      if (field === 'quantity' || field === 'unitPrice') {
        const qty = field === 'quantity' ? value : targetItem.quantity;
        const price = field === 'unitPrice' ? value : targetItem.unitPrice;
        const { supplyAmount, taxAmount } = calculateItemAmounts(qty, price, prev.taxType);
        targetItem.supplyAmount = supplyAmount;
        targetItem.taxAmount = taxAmount;
      }

      updatedItems[index] = targetItem;
      const totals = aggregateInvoiceTotals(updatedItems, prev.taxType);

      return {
        ...prev,
        items: updatedItems,
        ...totals,
      };
    });
  };

  // 품목 행 추가
  const addItemRow = () => {
    setFormData(prev => {
      const newItem = createEmptyItem(`${prev.items.length + 1}`);
      const updatedItems = [...prev.items, newItem];
      const totals = aggregateInvoiceTotals(updatedItems, prev.taxType);
      return {
        ...prev,
        items: updatedItems,
        ...totals,
      };
    });
  };

  // 품목 행 삭제
  const removeItemRow = (index: number) => {
    setFormData(prev => {
      if (prev.items.length <= 1) return prev; // 최소 1개 유지
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const totals = aggregateInvoiceTotals(updatedItems, prev.taxType);
      return {
        ...prev,
        items: updatedItems,
        ...totals,
      };
    });
  };

  // 프리셋 로드
  const loadPreset = (presetType: 'dev' | 'design' | 'advance_payment') => {
    if (presetType === 'dev') {
      setFormData({
        ...initialTaxInvoiceState,
        supplier: { regNo: '123-45-67890', name: '(주)코드애자일', ceoName: '김개발', address: '서울 강남구 테헤란로 1' },
        buyer: { regNo: '987-65-43210', name: '(주)테크파트너스', ceoName: '이동건', address: '서울 서초구 반포대로 2' },
        dates: { writeDate: '2026-07-31', statutorySupplyDate: '2026-07-31', revenueRecognizedAt: '2026-07-31' },
        items: [
          { id: '1', monthDay: '07/31', itemName: '웹 프론트엔드 컴포넌트 개발 외주', spec: 'Vite+React', quantity: 1, unitPrice: 5000000, supplyAmount: 5000000, taxAmount: 500000, remark: '7월 용역비' }
        ],
        totalSupplyAmount: 5000000,
        totalTaxAmount: 500000,
        totalAmount: 5500000,
        remark: '7월 용역비',
        status: 'DRAFT',
      });
    } else if (presetType === 'design') {
      setFormData({
        ...initialTaxInvoiceState,
        supplier: { regNo: '234-56-78901', name: '스튜디오 크리에이티브', ceoName: '박디자인', address: '서울 마포구 어울마당로' },
        buyer: { regNo: '876-54-32109', name: '글로벌 마케팅', ceoName: '최대표', address: '서울 용산구 이태원로' },
        dates: { writeDate: '2026-07-28', statutorySupplyDate: '2026-07-28', revenueRecognizedAt: '2026-07-28' },
        items: [
          { id: '1', monthDay: '07/28', itemName: '브랜드 UI/UX 디자인 리뉴얼', spec: 'Figma', quantity: 1, unitPrice: 1500000, supplyAmount: 1500000, taxAmount: 150000, remark: '최종 시안 전달' }
        ],
        totalSupplyAmount: 1500000,
        totalTaxAmount: 150000,
        totalAmount: 1650000,
        remark: '디자인 수수료',
        status: 'DRAFT',
      });
    } else if (presetType === 'advance_payment') {
      // 선수금 특례 (대가 사전 수령 시 세금계산서 발급 - 두 눈 불일치 발생 케이스)
      setFormData({
        ...initialTaxInvoiceState,
        supplier: { regNo: '123-45-67890', name: '(주)홍길동테크', ceoName: '홍길동', address: '서울 강남구' },
        buyer: { regNo: '987-65-43210', name: '(주)고객사코리아', ceoName: '이대표', address: '서울 마포구' },
        dates: { 
          writeDate: '2026-07-15',             // 계약금 입금일 작성자
          statutorySupplyDate: '2026-07-15',   // 부세법 §17 대가 수령 시 공급시기 인정
          revenueRecognizedAt: '2026-08-31',   // 회계상 용역 완성일 (다음달!) → 매출 0원, (대) 선수금 계상!
          paymentDate: '2026-07-15',
        },
        items: [
          { id: '1', monthDay: '07/15', itemName: '시스템 구축 선급 계약금 (10% 부가세 포함)', spec: '계약금', quantity: 1, unitPrice: 10000000, supplyAmount: 10000000, taxAmount: 1000000, remark: '대가 수령 세금계산서 발급' }
        ],
        totalSupplyAmount: 10000000,
        totalTaxAmount: 1000000,
        totalAmount: 11000000,
        remark: '선수금 발급 건 (회계 매출 0원)',
        status: 'DRAFT',
      });
    }
  };

  // 볼타 API 세금계산서 전송 / 정식 발행 실행
  const submitIssueToBolta = async () => {
    setIsSubmitting(true);
    try {
      const res = await defaultBoltaClient.issueInvoice(formData);
      setIssueResponse(res);
      if (res.success) {
        setFormData(prev => ({
          ...prev,
          status: 'ISSUED',
          ntsApprovalNo: res.approvalNo,
          dates: {
            ...prev.dates,
            issuedAt: res.issuedAt,
          },
        }));
      }
      return res;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    validation,
    isSubmitting,
    issueResponse,
    setSupplierRegNo,
    setBuyerRegNo,
    setWriteDate,
    setDateProperty,
    setTaxType,
    updateItem,
    addItemRow,
    removeItemRow,
    loadPreset,
    submitIssueToBolta,
  };
};
