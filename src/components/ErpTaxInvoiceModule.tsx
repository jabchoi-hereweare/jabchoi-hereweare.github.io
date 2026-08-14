import React, { useState, useMemo } from 'react';
import {
  FileText,
  Building2,
  Database,
  Search,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Printer,
  X,
  Plus,
  Trash2,
  Zap,
  ArrowRight,
  Download,
  Mail,
  Send,
  HelpCircle,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
  Link2,
  CreditCard,
  Sliders,
  ExternalLink,
  Activity,
  CheckSquare,
  Square,
  DollarSign,
  Briefcase,
  Cpu
} from 'lucide-react';
import { sanitizeBizRegNo, formatBizRegNo, validateBizRegNoMod10 } from '../modules/tax-invoice/utils/bizRegNoValidator';

// ERP Mock Sales Voucher / Customer DB
export interface ErpSalesRecord {
  id: string;
  voucherNo: string; // ERP 전표 번호
  orderDate: string;
  customerCode: string;
  customerName: string;
  bizRegNo: string;
  ceoName: string;
  address: string;
  bizType: string;
  bizClass: string;
  email: string;
  creditLimit: number; // 여신한도
  outstandingBalance: number; // 미수금 잔액
  taxStatus: '계속사업자' | '휴업' | '폐업';
  items: {
    skuCode: string;
    monthDay: string;
    itemName: string;
    spec: string;
    quantity: number;
    unitPrice: number;
    supplyAmount: number;
    taxAmount: number;
    remark: string;
  }[];
  remark: string;
}

const ERP_SAMPLE_RECORDS: ErpSalesRecord[] = [
  {
    id: 'erp-001',
    voucherNo: 'SL-202608-0102',
    orderDate: '2026-08-14',
    customerCode: 'CUST-KR-1002',
    customerName: '(주)네이버클라우드',
    bizRegNo: '220-81-62517',
    ceoName: '김유원',
    address: '경기도 성남시 분당구 분당내곡로 117 크래프톤타워',
    bizType: '정보통신업',
    bizClass: '클라우드 플랫폼 및 호스팅',
    email: 'tax-billing@navercloud.com',
    creditLimit: 100000000,
    outstandingBalance: 18700000,
    taxStatus: '계속사업자',
    items: [
      {
        skuCode: 'SKU-SRV-08',
        monthDay: '08/14',
        itemName: 'ERP 시스템 고도화 및 DB 최적화 용역',
        spec: '8월 정기',
        quantity: 1,
        unitPrice: 15000000,
        supplyAmount: 15000000,
        taxAmount: 1500000,
        remark: '검수 완료건'
      },
      {
        skuCode: 'SKU-LIC-ENT',
        monthDay: '08/14',
        itemName: '클라우드 연동 전용 API 라이선스',
        spec: 'Enterprise',
        quantity: 2,
        unitPrice: 1000000,
        supplyAmount: 2000000,
        taxAmount: 200000,
        remark: '1년 라이선스'
      }
    ],
    remark: 'ERP 수주전표 SL-202608-0102 연결건 (입금계좌: 신한은행 110-333-88899)'
  },
  {
    id: 'erp-002',
    voucherNo: 'SL-202608-0103',
    orderDate: '2026-08-12',
    customerCode: 'CUST-KR-1003',
    customerName: '(주)카카오엔터프라이즈',
    bizRegNo: '114-87-03482',
    ceoName: '이경진',
    address: '경기도 성남시 분당구 판교역로 235',
    bizType: '서비스',
    bizClass: '소프트웨어 자문 및 개발',
    email: 'finance@kakaoenterprise.com',
    creditLimit: 80000000,
    outstandingBalance: 9350000,
    taxStatus: '계속사업자',
    items: [
      {
        skuCode: 'SKU-DEV-CUSTOM',
        monthDay: '08/12',
        itemName: '스마트 물류 알고리즘 커스터마이징',
        spec: 'v2.4',
        quantity: 1,
        unitPrice: 8500000,
        supplyAmount: 8500000,
        taxAmount: 850000,
        remark: '2차 중도금'
      }
    ],
    remark: '계약서 제2026-CA-088호에 따른 2차 정산'
  },
  {
    id: 'erp-003',
    voucherNo: 'SL-202608-0104',
    orderDate: '2026-08-10',
    customerCode: 'CUST-KR-1004',
    customerName: '(주)엘지씨엔에스',
    bizRegNo: '107-81-40459',
    ceoName: '현신균',
    address: '서울특별시 강서구 마곡중앙10로 30 LG사이언스파크',
    bizType: '정보통신업',
    bizClass: '컴퓨터 프로그래밍',
    email: 'tax_invoice@lgcns.com',
    creditLimit: 150000000,
    outstandingBalance: 32000000,
    taxStatus: '계속사업자',
    items: [
      {
        skuCode: 'SKU-HW-TG100',
        monthDay: '08/10',
        itemName: 'IoT 센서 게이트웨이 모듈 납품',
        spec: 'TG-100',
        quantity: 50,
        unitPrice: 120000,
        supplyAmount: 6000000,
        taxAmount: 600000,
        remark: '공장 납품 1차'
      },
      {
        skuCode: 'SKU-SVC-SETP',
        monthDay: '08/10',
        itemName: '현장 펌웨어 세팅 및 감리',
        spec: 'Day/Man',
        quantity: 3,
        unitPrice: 400000,
        supplyAmount: 1200000,
        taxAmount: 120000,
        remark: '공수 산정'
      }
    ],
    remark: '납품확인서 No. LG-20260810 승인 완료'
  },
  {
    id: 'erp-004',
    voucherNo: 'SL-202608-0105',
    orderDate: '2026-08-08',
    customerCode: 'CUST-KR-1005',
    customerName: '(주)우아한형제들',
    bizRegNo: '120-87-65763',
    ceoName: '이국환',
    address: '서울특별시 송파구 위례성대로 2 장은빌딩',
    bizType: '전자상거래업',
    bizClass: '플랫폼 개발 및 운영',
    email: 'tax_bill@woowahan.com',
    creditLimit: 50000000,
    outstandingBalance: 4400000,
    taxStatus: '계속사업자',
    items: [
      {
        skuCode: 'SKU-MNT-AUG',
        monthDay: '08/08',
        itemName: '정산 자동화 배치 시스템 유지보수',
        spec: '8월분',
        quantity: 1,
        unitPrice: 4000000,
        supplyAmount: 4000000,
        taxAmount: 400000,
        remark: '월정액'
      }
    ],
    remark: '8월 정기 유지보수비 청구건'
  }
];

export interface ItemRow {
  id: string;
  skuCode?: string;
  monthDay: string;
  itemName: string;
  spec: string;
  quantity: number | '';
  unitPrice: number | '';
  supplyAmount: number;
  taxAmount: number;
  remark: string;
}

// Convert number to Korean word for total amount
const numberToKorean = (num: number): string => {
  if (!num || isNaN(num) || num <= 0) return '영';
  const units = ['', '만', '억', '조'];
  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const subUnits = ['', '십', '백', '천'];
  
  let result = '';
  let unitIndex = 0;
  let n = Math.floor(num);

  while (n > 0) {
    const chunk = n % 10000;
    if (chunk > 0) {
      let chunkStr = '';
      let c = chunk;
      for (let i = 0; i < 4; i++) {
        const digit = c % 10;
        if (digit > 0) {
          chunkStr = digits[digit] + subUnits[i] + chunkStr;
        }
        c = Math.floor(c / 10);
      }
      result = chunkStr + units[unitIndex] + ' ' + result;
    }
    unitIndex++;
    n = Math.floor(n / 10000);
  }

  return result.trim();
};

interface ErpTaxInvoiceModuleProps {
  onNavigateTab?: (tabId: string) => void;
}

export const ErpTaxInvoiceModule: React.FC<ErpTaxInvoiceModuleProps> = ({ onNavigateTab }) => {
  // ERP System Settings / Supplier (당사 고정 정보)
  const [supplierBizNo, setSupplierBizNo] = useState('220-88-12345');
  const [supplierName, setSupplierName] = useState('(주)엔터프라이즈테크');
  const [supplierCeo, setSupplierCeo] = useState('김대표');
  const [supplierAddr, setSupplierAddr] = useState('서울특별시 강남구 테헤란로 501 14층 (삼성동)');
  const [supplierBizType, setSupplierBizType] = useState('정보통신업');
  const [supplierBizClass, setSupplierBizClass] = useState('소프트웨어 개발 및 ERP 공급');
  const [supplierEmail, setSupplierEmail] = useState('tax@enterprisetech.co.kr');

  // Buyer (공급받는자)
  const [buyerBizNo, setBuyerBizNo] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerCeo, setBuyerCeo] = useState('');
  const [buyerAddr, setBuyerAddr] = useState('');
  const [buyerBizType, setBuyerBizType] = useState('');
  const [buyerBizClass, setBuyerBizClass] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  // Selected ERP metadata
  const [selectedErpRecord, setSelectedErpRecord] = useState<ErpSalesRecord | null>(null);

  // Invoice Meta
  const [writeDate, setWriteDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [mainRemark, setMainRemark] = useState('');
  const [receiptType, setReceiptType] = useState<'CLAIM' | 'RECEIPT'>('CLAIM'); // 청구 / 영수
  const [linkedVoucherNo, setLinkedVoucherNo] = useState<string | null>(null);

  // ERP Side Panel & Connection Options
  const [isErpPanelOpen, setIsErpPanelOpen] = useState(true);
  const [autoCreateJournal, setAutoCreateJournal] = useState(true); // ERP 회계분개 자동생성
  const [createTransactionStatement, setCreateTransactionStatement] = useState(true); // 거래명세서 동시생성
  const [updateCustomerLedger, setUpdateCustomerLedger] = useState(true); // 거래처 원장 동기화

  // Items (4 rows by default like standard tax invoice)
  const [items, setItems] = useState<ItemRow[]>([
    { id: '1', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    { id: '2', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    { id: '3', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    { id: '4', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
  ]);

  // Modals & UI States
  const [isErpPickerOpen, setIsErpPickerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isIssueSuccess, setIsIssueSuccess] = useState(false);
  const [issuedApprovalNo, setIssuedApprovalNo] = useState<string | null>(null);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [searchErpKeyword, setSearchErpKeyword] = useState('');

  // Calculations
  const totalSupplyAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.supplyAmount) || 0), 0);
  }, [items]);

  const totalTaxAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.taxAmount) || 0), 0);
  }, [items]);

  const grandTotal = totalSupplyAmount + totalTaxAmount;
  const koreanGrandTotal = numberToKorean(grandTotal);

  // Validation
  const isSupplierBizValid = validateBizRegNoMod10(supplierBizNo);
  const isBuyerBizValid = validateBizRegNoMod10(buyerBizNo);
  const isReqSupplier = sanitizeBizRegNo(supplierBizNo).length === 10 && supplierName.trim() !== '';
  const isReqBuyer = sanitizeBizRegNo(buyerBizNo).length === 10 && buyerName.trim() !== '';
  const isReqDate = writeDate.length >= 8;
  const isReqAmount = totalSupplyAmount > 0;
  const isAllFourValid = isReqSupplier && isReqBuyer && isReqDate && isReqAmount;

  // Handle Item Row Changes
  const handleItemChange = (
    index: number,
    field: keyof ItemRow,
    value: string | number
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      const row = { ...updated[index], [field]: value };

      if (field === 'quantity' || field === 'unitPrice') {
        const q = field === 'quantity' ? (value === '' ? 0 : Number(value)) : (row.quantity === '' ? 0 : Number(row.quantity));
        const p = field === 'unitPrice' ? (value === '' ? 0 : Number(value)) : (row.unitPrice === '' ? 0 : Number(row.unitPrice));
        if (q > 0 && p > 0) {
          const supply = Math.round(q * p);
          row.supplyAmount = supply;
          row.taxAmount = Math.round(supply * 0.1);
        } else if (field === 'quantity' && value === '' && row.unitPrice === '') {
          row.supplyAmount = 0;
          row.taxAmount = 0;
        }
      } else if (field === 'supplyAmount') {
        const supply = Number(value) || 0;
        row.supplyAmount = supply;
        row.taxAmount = Math.round(supply * 0.1);
      }

      updated[index] = row;
      return updated;
    });
  };

  // Add Item Row
  const handleAddItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        skuCode: '',
        monthDay: '',
        itemName: '',
        spec: '',
        quantity: '',
        unitPrice: '',
        supplyAmount: 0,
        taxAmount: 0,
        remark: ''
      }
    ]);
  };

  // Remove Item Row
  const handleRemoveItemRow = (index: number) => {
    if (items.length <= 1) {
      setItems([{ id: '1', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' }]);
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Fill up to Standard 4 Rows
  const handleFillStandardFourRows = () => {
    setItems((prev) => {
      const updated = [...prev];
      while (updated.length < 4) {
        updated.push({
          id: String(Date.now() + updated.length),
          skuCode: '',
          monthDay: '',
          itemName: '',
          spec: '',
          quantity: '',
          unitPrice: '',
          supplyAmount: 0,
          taxAmount: 0,
          remark: ''
        });
      }
      return updated;
    });
  };

  // Clean Empty Rows
  const handleCleanEmptyRows = () => {
    const filled = items.filter((it) => it.itemName.trim() !== '' || (it.supplyAmount && it.supplyAmount > 0));
    if (filled.length === 0) {
      setItems([{ id: '1', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' }]);
    } else {
      setItems(filled);
    }
  };

  // Pull ERP Record
  const handleSelectErpRecord = (record: ErpSalesRecord) => {
    setSelectedErpRecord(record);
    setBuyerBizNo(record.bizRegNo);
    setBuyerName(record.customerName);
    setBuyerCeo(record.ceoName);
    setBuyerAddr(record.address);
    setBuyerBizType(record.bizType);
    setBuyerBizClass(record.bizClass);
    setBuyerEmail(record.email);
    setWriteDate(record.orderDate || new Date().toISOString().slice(0, 10));
    setMainRemark(record.remark);
    setLinkedVoucherNo(record.voucherNo);

    // Build rows from ERP items
    const newItems: ItemRow[] = record.items.map((it, idx) => ({
      id: String(idx + 1),
      skuCode: it.skuCode,
      monthDay: it.monthDay,
      itemName: it.itemName,
      spec: it.spec,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      supplyAmount: it.supplyAmount,
      taxAmount: it.taxAmount,
      remark: it.remark
    }));

    // Pad up to 4 if less than 4 for standard aesthetics
    while (newItems.length < 4) {
      newItems.push({
        id: String(newItems.length + 1),
        skuCode: '',
        monthDay: '',
        itemName: '',
        spec: '',
        quantity: '',
        unitPrice: '',
        supplyAmount: 0,
        taxAmount: 0,
        remark: ''
      });
    }

    setItems(newItems);
    setIsErpPickerOpen(false);
    setIsIssueSuccess(false);
    setIssuedApprovalNo(null);
  };

  // Reset Form
  const handleResetForm = () => {
    setSelectedErpRecord(null);
    setBuyerBizNo('');
    setBuyerName('');
    setBuyerCeo('');
    setBuyerAddr('');
    setBuyerBizType('');
    setBuyerBizClass('');
    setBuyerEmail('');
    setMainRemark('');
    setLinkedVoucherNo(null);
    setIsIssueSuccess(false);
    setIssuedApprovalNo(null);
    setItems([
      { id: '1', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
      { id: '2', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
      { id: '3', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
      { id: '4', skuCode: '', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    ]);
  };

  // Open Pre-issuance Confirmation Modal
  const handleOpenConfirmModal = () => {
    if (!isAllFourValid) {
      alert('세금계산서 필수 기재사항(공급자/공급받는자 사업자번호 및 상호, 작성일자, 금액)을 모두 입력해 주세요.');
      return;
    }
    setConfirmChecked(false);
    setIsConfirmModalOpen(true);
  };

  // Execute Issue
  const handleFinalIssue = () => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand1 = Math.floor(10000000 + Math.random() * 90000000);
    const rand2 = Math.floor(10000000 + Math.random() * 90000000);
    const approval = `${today}-${rand1}-${rand2}`;

    setIssuedApprovalNo(approval);
    setIsIssueSuccess(true);
    setIsConfirmModalOpen(false);
  };

  // Filtered ERP Records for Modal Search
  const filteredErpRecords = ERP_SAMPLE_RECORDS.filter(
    (r) =>
      r.customerName.includes(searchErpKeyword) ||
      r.voucherNo.includes(searchErpKeyword) ||
      r.bizRegNo.includes(searchErpKeyword) ||
      r.items.some((i) => i.itemName.includes(searchErpKeyword))
  );

  return (
    <div className="min-h-full bg-[#F0F2F5] text-slate-800 flex flex-col font-sans pb-16">
      {/* Top ERP Integration Module Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-sm font-bold text-sm">
            會
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                ERP 영업/세무 모듈
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-semibold text-slate-700">
                전자세금계산서 실시간 발행 허브
              </span>
              {linkedVoucherNo && (
                <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  🔗 전표 {linkedVoucherNo} 연동중
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              ERP 수주·매출 데이터 자동 바인딩 & 국세청(NTS)/볼타 API 직접 전송 파이프라인
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
          <button
            onClick={() => setIsErpPanelOpen(!isErpPanelOpen)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              isErpPanelOpen
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>ERP 모듈 연결 정보 {isErpPanelOpen ? '접기' : '보기'}</span>
          </button>

          <button
            onClick={() => setIsErpPickerOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Database className="w-3.5 h-3.5" />
            <span>ERP 전표/매출 불러오기</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          <button
            onClick={handleResetForm}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-colors"
            title="양식 초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 w-full flex-1 space-y-5">
        {/* ========================================================================= */}
        {/* ERP INTERCONNECTED MODULES INFORMATION PANEL (모듈 연결 정보 & 데이터 흐름) */}
        {/* ========================================================================= */}
        {isErpPanelOpen && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-5 shadow-lg border border-slate-700/50 animate-fadeIn space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wide uppercase text-indigo-300">
                    ERP Interconnected System Hub (사내 전산 연동 파이프라인)
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    세금계산서 발행 시 아래 4대 ERP 내부 모듈과 실시간으로 정합성을 검증하고 동기화합니다.
                  </p>
                </div>
              </div>

              {/* Navigation Shortcuts to other ERP Views */}
              {onNavigateTab && (
                <div className="flex items-center gap-1.5 text-[11px] flex-wrap">
                  <span className="text-slate-400 mr-1">모듈 바로가기:</span>
                  <button
                    onClick={() => onNavigateTab('unissued_docs')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                  >
                    미발행 전표함
                  </button>
                  <button
                    onClick={() => onNavigateTab('customer_mgt')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                  >
                    거래처 마스터
                  </button>
                  <button
                    onClick={() => onNavigateTab('bolta_api')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                  >
                    볼타 API 설정
                  </button>
                  <button
                    onClick={() => onNavigateTab('statement_form')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                  >
                    거래명세서
                  </button>
                </div>
              )}
            </div>

            {/* 4 Connection Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              {/* 1. Accounting Journal Entry Preview */}
              <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-indigo-300 font-bold mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      1. ERP 회계 분개 연동
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      자동생성
                    </span>
                  </div>
                  <div className="text-[11px] space-y-1 font-mono text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-emerald-400">
                      (차) 외상매출금 ₩{grandTotal.toLocaleString()}
                    </div>
                    <div className="text-blue-300 pl-3">
                      (대) 상품매출 ₩{totalSupplyAmount.toLocaleString()}
                    </div>
                    <div className="text-rose-300 pl-3">
                      (대) 부가세예수금 ₩{totalTaxAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
                <label className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoCreateJournal}
                    onChange={(e) => setAutoCreateJournal(e.target.checked)}
                    className="accent-indigo-500 rounded"
                  />
                  <span>발행 시 ERP 전표 자동 기표</span>
                </label>
              </div>

              {/* 2. Customer Master & Credit Status */}
              <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-indigo-300 font-bold mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      2. 거래처 원장 & 여신
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">
                      {selectedErpRecord ? selectedErpRecord.customerCode : 'CUST-AUTO'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1 bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">국세청 상태:</span>
                      <span className="text-emerald-400 font-bold">
                        {selectedErpRecord ? selectedErpRecord.taxStatus : '계속사업자'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">여신 한도:</span>
                      <span>
                        ₩{selectedErpRecord ? (selectedErpRecord.creditLimit / 10000).toLocaleString() : '5,000'}만원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">현재 미수금:</span>
                      <span className="text-amber-300 font-bold">
                        ₩{selectedErpRecord ? (selectedErpRecord.outstandingBalance / 10000).toLocaleString() : '0'}만원
                      </span>
                    </div>
                  </div>
                </div>
                <label className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={updateCustomerLedger}
                    onChange={(e) => setUpdateCustomerLedger(e.target.checked)}
                    className="accent-indigo-500 rounded"
                  />
                  <span>거래처 원장 잔액 동기화</span>
                </label>
              </div>

              {/* 3. API Gateway & NTS Transmission Pipeline */}
              <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-indigo-300 font-bold mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      3. NTS / 볼타 API 엔진
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      정상 연결
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1 bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">게이트웨이:</span>
                      <span className="font-mono text-[10px] text-indigo-300">Bolta v1 API</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">인증서 만료:</span>
                      <span className="text-slate-300">2027-12-31</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">전송 지연율:</span>
                      <span className="text-emerald-400 font-mono">0.02s (즉시)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>공인인증 전자서명 자동 적용</span>
                </div>
              </div>

              {/* 4. Sub-documents & Linked Records */}
              <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-indigo-300 font-bold mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      4. 부속 문서 동시 발행
                    </span>
                    <span className="text-[10px] text-slate-300">Option</span>
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1 bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">연동 전표:</span>
                      <span className="font-mono text-indigo-300 font-bold">
                        {linkedVoucherNo || '직접입력'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">거래명세서:</span>
                      <span className={createTransactionStatement ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {createTransactionStatement ? '동시 발행됨' : '미발행'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">수정계산서:</span>
                      <span className="text-slate-400">사유발생시 연동</span>
                    </div>
                  </div>
                </div>
                <label className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createTransactionStatement}
                    onChange={(e) => setCreateTransactionStatement(e.target.checked)}
                    className="accent-indigo-500 rounded"
                  />
                  <span>거래명세서(청색) 함께 생성</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Mandatory 4 checks badge bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">국세청 법정 4대 필수기재 점검:</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${isReqSupplier ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}`}>
              {isReqSupplier ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-rose-500" />} 1. 공급자
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${isReqBuyer ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}`}>
              {isReqBuyer ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-rose-500" />} 2. 공급받는자
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${isReqDate ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}`}>
              {isReqDate ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-rose-500" />} 3. 작성일자
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${isReqAmount ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}`}>
              {isReqAmount ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-rose-500" />} 4. 공급가액·세액
            </span>
          </div>

          <div className="text-slate-500 text-[11px]">
            작성기준일: <strong>{writeDate}</strong> | 과세구분: <strong>일반과세 (10%)</strong>
          </div>
        </div>

        {/* Success Banner if Issued */}
        {isIssueSuccess && issuedApprovalNo && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/30 text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    국세청 NTS 정식 발행 및 전송 완료
                  </span>
                  <span className="text-xs text-white/90">전표: {linkedVoucherNo || '수기발행'}</span>
                </div>
                <h2 className="text-base font-bold mt-1">
                  전자세금계산서가 성공적으로 발행되어 ERP 원장 및 국세청 전산망에 등록되었습니다.
                </h2>
                <p className="text-xs text-white/90 mt-0.5 font-mono">
                  국세청 승인번호: <strong>{issuedApprovalNo}</strong> | 거래처 수신처: {buyerEmail || '미기재'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-white text-emerald-800 hover:bg-emerald-50 rounded-lg text-xs font-bold shadow transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                인쇄 / PDF 출력
              </button>
              <button
                onClick={handleResetForm}
                className="px-3.5 py-2 bg-emerald-700/60 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                새 계산서 작성
              </button>
            </div>
          </div>
        )}

        {/* RED TAX INVOICE FORM (STANDARD NTS RED TEMPLATE) */}
        <div className="bg-white rounded-xl shadow-md border-2 border-[#C82333] overflow-hidden">
          {/* Invoice Header */}
          <div className="bg-[#C82333] text-white px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b-2 border-[#A71D2A]">
            <div className="flex items-center gap-3">
              <div className="bg-white text-[#C82333] font-black text-xs px-2.5 py-1 rounded shadow-sm tracking-wider">
                공급자 보관용 (적색)
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-widest">
                전 자 세 금 계 산 서
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 bg-red-800/60 px-3 py-1.5 rounded-lg border border-red-400/30">
                <span className="text-red-200">ERP 전표:</span>
                <span className="font-mono font-semibold">{linkedVoucherNo || 'ERP-SL-미지정'}</span>
              </div>
              <div className="flex items-center gap-2 bg-red-800/60 px-3 py-1.5 rounded-lg border border-red-400/30">
                <span className="text-red-200">일련번호:</span>
                <span className="font-mono font-semibold">ERP-TX-20260814</span>
              </div>
            </div>
          </div>

          {/* Supplier & Buyer Two-Column Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-[#C82333] border-b-2 border-[#C82333]">
            {/* LEFT: SUPPLIER (공급자) */}
            <div className="bg-[#FFF5F5] flex flex-col">
              <div className="bg-[#FFEAEA] px-4 py-2 border-b border-[#F0A8AF] flex items-center justify-between">
                <span className="text-xs font-bold text-[#C82333] tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  공 급 자 (당사 정보)
                </span>
                <span className="text-[11px] text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-red-200">
                  ERP 기본 설정 정보
                </span>
              </div>

              <div className="p-4 space-y-3 text-xs flex-1">
                {/* Biz Reg No */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">
                    등록번호 <span className="text-red-600">*</span>
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={supplierBizNo}
                      onChange={(e) => setSupplierBizNo(e.target.value)}
                      placeholder="123-45-67890"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    {isSupplierBizValid && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded shrink-0">
                        MOD-10 통과
                      </span>
                    )}
                  </div>
                </div>

                {/* Name & CEO */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">
                    상호(법인명) <span className="text-red-600">*</span>
                  </label>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <label className="col-span-2 text-[#C82333] font-bold text-right">성명</label>
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={supplierCeo}
                      onChange={(e) => setSupplierCeo(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">사업장주소</label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={supplierAddr}
                      onChange={(e) => setSupplierAddr(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>

                {/* Biz Type & Class */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">업태 / 종목</label>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={supplierBizType}
                      onChange={(e) => setSupplierBizType(e.target.value)}
                      placeholder="업태"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={supplierBizClass}
                      onChange={(e) => setSupplierBizClass(e.target.value)}
                      placeholder="종목"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">이메일</label>
                  <div className="col-span-9">
                    <input
                      type="email"
                      value={supplierEmail}
                      onChange={(e) => setSupplierEmail(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: BUYER (공급받는자) */}
            <div className="bg-[#FFF9F9] flex flex-col">
              <div className="bg-[#FFEAEA] px-4 py-2 border-b border-[#F0A8AF] flex items-center justify-between">
                <span className="text-xs font-bold text-[#C82333] tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  공 급 받 는 자 (거래처)
                </span>
                <button
                  type="button"
                  onClick={() => setIsErpPickerOpen(true)}
                  className="text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200 flex items-center gap-1 transition-colors"
                >
                  <Search className="w-3 h-3" />
                  ERP 거래처/전표 검색
                </button>
              </div>

              <div className="p-4 space-y-3 text-xs flex-1">
                {/* Biz Reg No */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">
                    등록번호 <span className="text-red-600">*</span>
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={buyerBizNo}
                      onChange={(e) => setBuyerBizNo(e.target.value)}
                      placeholder="ERP에서 끌어오거나 직접 입력"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    {isBuyerBizValid ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded shrink-0">
                        유효
                      </span>
                    ) : buyerBizNo.length > 0 ? (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded shrink-0">
                        확인필요
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Name & CEO */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">
                    상호(법인명) <span className="text-red-600">*</span>
                  </label>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="(주)거래처명"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <label className="col-span-2 text-[#C82333] font-bold text-right">성명</label>
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={buyerCeo}
                      onChange={(e) => setBuyerCeo(e.target.value)}
                      placeholder="대표자명"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">사업장주소</label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={buyerAddr}
                      onChange={(e) => setBuyerAddr(e.target.value)}
                      placeholder="사업장 도로명/지번 주소"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>

                {/* Biz Type & Class */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">업태 / 종목</label>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={buyerBizType}
                      onChange={(e) => setBuyerBizType(e.target.value)}
                      placeholder="업태"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={buyerBizClass}
                      onChange={(e) => setBuyerBizClass(e.target.value)}
                      placeholder="종목"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-[#C82333] font-bold">
                    수신 이메일 <span className="text-red-600">*</span>
                  </label>
                  <div className="col-span-9">
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="tax@partner.com (계산서 수신처)"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Write Date & Amounts Summary Bar */}
          <div className="bg-[#FFF5F5] p-4 border-b-2 border-[#C82333] grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
            <div className="md:col-span-3 flex items-center gap-2">
              <label className="font-bold text-[#C82333] shrink-0">
                작성일자 <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={writeDate}
                onChange={(e) => setWriteDate(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="md:col-span-5 flex items-center gap-2">
              <label className="font-bold text-[#C82333] shrink-0">공급가액 총액</label>
              <div className="w-full bg-white px-3 py-1.5 border border-slate-300 rounded font-mono font-bold text-slate-900 text-right">
                ₩ {totalSupplyAmount.toLocaleString()} 원
              </div>
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <label className="font-bold text-[#C82333] shrink-0">세액 (10%)</label>
              <div className="w-full bg-white px-3 py-1.5 border border-slate-300 rounded font-mono font-bold text-red-700 text-right">
                ₩ {totalTaxAmount.toLocaleString()} 원
              </div>
            </div>
          </div>

          {/* ITEM DETAIL ROWS TABLE TOOLBAR */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">품목 명세 ({items.length}개 행)</span>
              <span className="text-[11px] text-slate-400">| 필요한 만큼 행을 추가하거나 삭제할 수 있습니다.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddItemRow}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-bold shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                품목 행 추가
              </button>
              <button
                type="button"
                onClick={handleCleanEmptyRows}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-[11px] font-medium transition-colors cursor-pointer"
                title="입력되지 않은 빈 행 일괄 제거"
              >
                빈 행 정리
              </button>
              <button
                type="button"
                onClick={handleFillStandardFourRows}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-[11px] font-medium transition-colors cursor-pointer"
                title="국세청 표준 4행으로 맞춤"
              >
                4행 표준 맞춤
              </button>
            </div>
          </div>

          {/* ITEM DETAIL ROWS TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#FFEAEA] text-[#C82333] font-bold border-b border-[#F0A8AF] divide-x divide-[#F0A8AF]">
                  <th className="py-2.5 px-2 w-14 text-center">월/일</th>
                  <th className="py-2.5 px-3 min-w-[200px] text-left">품목 (ERP 항목)</th>
                  <th className="py-2.5 px-2 w-24 text-left">규격</th>
                  <th className="py-2.5 px-2 w-20 text-right">수량</th>
                  <th className="py-2.5 px-2 w-28 text-right">단가</th>
                  <th className="py-2.5 px-2 w-32 text-right">공급가액</th>
                  <th className="py-2.5 px-2 w-28 text-right">세액</th>
                  <th className="py-2.5 px-3 min-w-[120px] text-left">비고 (SKU코드)</th>
                  <th className="py-2.5 px-1.5 w-10 text-center">삭제</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50 divide-x divide-slate-200 transition-colors">
                    {/* Month/Day */}
                    <td className="p-1 text-center">
                      <input
                        type="text"
                        value={row.monthDay}
                        onChange={(e) => handleItemChange(idx, 'monthDay', e.target.value)}
                        placeholder="MM/DD"
                        className="w-full text-center px-1 py-1 bg-transparent border-0 focus:ring-1 focus:ring-red-400 font-mono text-slate-800"
                      />
                    </td>
                    {/* Item Name */}
                    <td className="p-1">
                      <input
                        type="text"
                        value={row.itemName}
                        onChange={(e) => handleItemChange(idx, 'itemName', e.target.value)}
                        placeholder={idx === 0 ? '품목명 입력 또는 ERP 불러오기' : `품목 ${idx + 1}`}
                        className="w-full px-2 py-1 bg-transparent border-0 focus:ring-1 focus:ring-red-400 font-medium text-slate-800"
                      />
                    </td>
                    {/* Spec */}
                    <td className="p-1">
                      <input
                        type="text"
                        value={row.spec}
                        onChange={(e) => handleItemChange(idx, 'spec', e.target.value)}
                        placeholder="규격"
                        className="w-full px-1.5 py-1 bg-transparent border-0 focus:ring-1 focus:ring-red-400 text-slate-700"
                      />
                    </td>
                    {/* Quantity */}
                    <td className="p-1">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                        placeholder="0"
                        className="w-full text-right px-1.5 py-1 bg-transparent border-0 focus:ring-1 focus:ring-red-400 font-mono text-slate-800"
                      />
                    </td>
                    {/* Unit Price */}
                    <td className="p-1">
                      <input
                        type="number"
                        value={row.unitPrice}
                        onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                        placeholder="0"
                        className="w-full text-right px-1.5 py-1 bg-transparent border-0 focus:ring-1 focus:ring-red-400 font-mono text-slate-800"
                      />
                    </td>
                    {/* Supply Amount */}
                    <td className="p-1 text-right font-mono font-semibold text-slate-900 bg-slate-50/50">
                      <input
                        type="number"
                        value={row.supplyAmount || ''}
                        onChange={(e) => handleItemChange(idx, 'supplyAmount', e.target.value)}
                        placeholder="0"
                        className="w-full text-right px-1.5 py-1 bg-transparent border-0 focus:ring-1 focus:ring-red-400 font-mono font-semibold text-slate-900"
                      />
                    </td>
                    {/* Tax Amount */}
                    <td className="p-1 text-right font-mono font-semibold text-red-700 bg-red-50/20">
                      <input
                        type="number"
                        value={row.taxAmount || ''}
                        onChange={(e) => handleItemChange(idx, 'taxAmount', e.target.value)}
                        placeholder="0"
                        className="w-full text-right px-1.5 py-1 bg-transparent border-0 focus:ring-1 focus:ring-red-400 font-mono font-semibold text-red-700"
                      />
                    </td>
                    {/* Remark */}
                    <td className="p-1">
                      <input
                        type="text"
                        value={row.remark}
                        onChange={(e) => handleItemChange(idx, 'remark', e.target.value)}
                        placeholder="비고"
                        className="w-full px-2 py-1 bg-transparent border-0 focus:ring-1 focus:ring-red-400 text-slate-600"
                      />
                    </td>
                    {/* Remove Row Button */}
                    <td className="p-1 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItemRow(idx)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        title="이 행 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grand Total & Receipt Claim Bar */}
          <div className="bg-[#FFF5F5] border-t-2 border-[#C82333] p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-xs">
            <div className="md:col-span-7 flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-[#C82333] shrink-0">합계금액 (한글):</span>
              <div className="flex-1 bg-white px-3 py-2 border border-slate-300 rounded font-bold text-slate-900">
                일금 {koreanGrandTotal ? `${koreanGrandTotal} ` : ''}원정
                <span className="text-slate-500 font-mono text-[11px] font-normal ml-2">
                  (₩ {grandTotal.toLocaleString()} 원)
                </span>
              </div>
            </div>

            <div className="md:col-span-5 flex items-center justify-end gap-4">
              <span className="text-slate-600 font-medium">이 금액을</span>
              <div className="flex items-center gap-2 bg-white px-2 py-1 border border-slate-300 rounded-lg">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-indigo-700">
                  <input
                    type="radio"
                    name="receiptType"
                    value="CLAIM"
                    checked={receiptType === 'CLAIM'}
                    onChange={() => setReceiptType('CLAIM')}
                    className="accent-indigo-600"
                  />
                  청구함
                </label>
                <span className="text-slate-300">|</span>
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700">
                  <input
                    type="radio"
                    name="receiptType"
                    value="RECEIPT"
                    checked={receiptType === 'RECEIPT'}
                    onChange={() => setReceiptType('RECEIPT')}
                    className="accent-indigo-600"
                  />
                  영수함
                </label>
              </div>
            </div>
          </div>

          {/* Invoice Main Remark Input */}
          <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
            <label className="font-bold text-slate-700 shrink-0">전체 비고 (계약번호/입금계좌 등):</label>
            <input
              type="text"
              value={mainRemark}
              onChange={(e) => setMainRemark(e.target.value)}
              placeholder="예: 계약서 제2026-08호 준공금 청구건 (기업은행 123-45678-90 (주)엔터프라이즈테크)"
              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>국세청(NTS) 전산망 및 공인 전자세금계산서 API 연동 규격 준수</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsErpPickerOpen(true)}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4 text-slate-600" />
              ERP 데이터 다시 선택
            </button>

            <button
              onClick={handleOpenConfirmModal}
              disabled={!isAllFourValid}
              className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isAllFourValid
                  ? 'bg-[#C82333] hover:bg-[#B01E2D] active:scale-[0.98] text-white shadow-red-200'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>전자세금계산서 즉시 발행 (재확인)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ERP DATA SELECTOR MODAL                                                */}
      {/* ========================================================================= */}
      {isErpPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-700 to-blue-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-base">ERP 수주 및 매출 데이터 불러오기</h3>
                  <p className="text-xs text-indigo-100">
                    선택한 ERP 전표의 사업자 정보, 품목명, 수량, 공급가액이 세금계산서로 자동 반영됩니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsErpPickerOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchErpKeyword}
                  onChange={(e) => setSearchErpKeyword(e.target.value)}
                  placeholder="거래처명, 전표번호(SL-...), 사업자번호, 품목명 검색"
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Modal ERP Records List */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1 divide-y divide-slate-100">
              {filteredErpRecords.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  검색 조건과 일치하는 ERP 매출 전표가 없습니다.
                </div>
              ) : (
                filteredErpRecords.map((rec) => {
                  const totalSup = rec.items.reduce((acc, cur) => acc + cur.supplyAmount, 0);
                  const totalTax = rec.items.reduce((acc, cur) => acc + cur.taxAmount, 0);
                  const total = totalSup + totalTax;

                  return (
                    <div
                      key={rec.id}
                      onClick={() => handleSelectErpRecord(rec)}
                      className="pt-3 first:pt-0 group p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 cursor-pointer transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-[11px] font-bold font-mono">
                            {rec.voucherNo}
                          </span>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                            {rec.customerName}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            ({rec.bizRegNo})
                          </span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold">
                            {rec.taxStatus}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600">
                          <strong>대표 품목:</strong> {rec.items[0]?.itemName}{' '}
                          {rec.items.length > 1 && (
                            <span className="text-slate-400">외 {rec.items.length - 1}건</span>
                          )}
                          <span className="text-slate-400 ml-2">| 수량: {rec.items[0]?.quantity}개</span>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center gap-3">
                          <span>수신처: {rec.email}</span>
                          <span>작성일자: {rec.orderDate}</span>
                          <span className="font-mono text-indigo-600 font-medium">코드: {rec.customerCode}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-semibold text-slate-500">공급가액 + 세액</div>
                        <div className="text-sm font-extrabold text-indigo-700 font-mono">
                          ₩ {total.toLocaleString()} 원
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                            이 전표로 세금계산서 작성 <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>ERP 사내 데이터베이스 연동 상태: 정상 (4건 조회됨)</span>
              <button
                onClick={() => setIsErpPickerOpen(false)}
                className="px-4 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 font-medium"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PRE-ISSUANCE RE-VERIFICATION CONFIRMATION MODAL                        */}
      {/* ========================================================================= */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col">
            {/* Confirmation Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-rose-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="font-bold text-base">전자세금계산서 발행 전 최종 재확인</h3>
                  <p className="text-xs text-red-100">
                    국세청 전송 전 기재사항 및 ERP 원장 정보의 정확성을 점검해 주세요.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Confirmation Body & Warning Notes */}
            <div className="p-6 space-y-4 text-xs">
              {/* Important Legal Notice Box */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-amber-900 leading-relaxed">
                  <strong className="font-bold">발행 및 국세청 전송 주의 안내</strong>
                  <p className="mt-1 text-[11px] text-amber-800">
                    전자세금계산서는 발행 즉시 국세청(NTS) 전산망으로 전송되며 거래처 이메일로 교부됩니다.
                    발행 후 기재사항 착오나 금액 변경이 필요할 경우, <strong>'수정세금계산서'</strong>를 추가 발행해야 하므로 아래 항목을 반드시 재확인해 주시기 바랍니다.
                  </p>
                </div>
              </div>

              {/* Data Summary Grid */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                <div className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>발행 대상 정보 대조 요약</span>
                  {linkedVoucherNo && (
                    <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      ERP 전표: {linkedVoucherNo}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-400">공급받는자 (거래처):</span>
                    <p className="font-bold text-slate-800 text-xs mt-0.5">{buyerName} ({buyerCeo} 대표)</p>
                  </div>
                  <div>
                    <span className="text-slate-400">사업자등록번호:</span>
                    <p className="font-mono font-bold text-slate-800 text-xs mt-0.5">{buyerBizNo}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">계산서 수신 이메일:</span>
                    <p className="font-mono font-semibold text-slate-800 mt-0.5">{buyerEmail || '(미입력 - 세금계산서 수신 불가)'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">작성일자 (세무 귀속):</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{writeDate}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between bg-white p-2.5 rounded-lg border">
                  <div>
                    <span className="text-slate-400 text-[11px]">총 공급가액 (VAT 별도):</span>
                    <div className="font-bold text-slate-800 text-xs font-mono">
                      ₩ {totalSupplyAmount.toLocaleString()} 원
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-red-500 text-[11px] font-bold">최종 청구/영수 합계금액 (VAT 포함):</span>
                    <div className="font-extrabold text-[#C82333] text-sm font-mono">
                      ₩ {grandTotal.toLocaleString()} 원
                    </div>
                  </div>
                </div>
              </div>

              {/* ERP Linked Execution Summary */}
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1.5">
                <div className="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  연동 실행 옵션 (ERP 파이프라인 동기화)
                </div>
                <div className="text-[11px] text-indigo-800 grid grid-cols-2 gap-2 pl-5">
                  <div>• 회계 분개 자동 생성: <strong>{autoCreateJournal ? '적용' : '미적용'}</strong></div>
                  <div>• 거래명세서 동시 발행: <strong>{createTransactionStatement ? '적용' : '미적용'}</strong></div>
                  <div>• 거래처 원장 잔액 반영: <strong>{updateCustomerLedger ? '적용' : '미적용'}</strong></div>
                  <div>• 국세청 즉시전송 큐: <strong>Bolta API (24자 채번)</strong></div>
                </div>
              </div>

              {/* 4 Checks Status */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  국세청 부가가치세법 4대 필수 기재사항 검증 완료
                </div>
                <div className="text-[11px] text-emerald-700 pl-5">
                  공급자·공급받는자 사업자등록번호 / 작성일자 / 공급가액 및 세액 계산이 모두 정상입니다.
                </div>
              </div>

              {/* Final Confirmation Checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 accent-red-600"
                />
                <span className="text-xs text-slate-700 leading-snug">
                  위 거래처 정보 및 발행 품목/금액(₩{grandTotal.toLocaleString()}원)을 정확히 확인하였으며, <strong>국세청 전자세금계산서 정식 발행</strong>에 동의합니다.
                </span>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
              >
                취소 (다시 확인)
              </button>
              <button
                onClick={handleFinalIssue}
                disabled={!confirmChecked}
                className={`px-6 py-2 rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-2 ${
                  confirmChecked
                    ? 'bg-[#C82333] hover:bg-[#B01E2D] text-white shadow-red-200 cursor-pointer active:scale-95'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>최종 승인 및 발행 실행</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
