import React, { useState } from 'react';
import {
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  ShieldCheck,
  FileText,
  Printer,
  X,
  Plus,
  Trash2,
  Zap,
  ArrowRight
} from 'lucide-react';
import { sanitizeBizRegNo, formatBizRegNo, validateBizRegNoMod10 } from '../modules/tax-invoice/utils/bizRegNoValidator';

interface ItemRow {
  id: string;
  monthDay: string;
  itemName: string;
  spec: string;
  quantity: number | '';
  unitPrice: number | '';
  supplyAmount: number;
  taxAmount: number;
  remark: string;
}

export const NtsBlankFormPage: React.FC = () => {
  // Hint Mode state
  const [showHints, setShowHints] = useState<boolean>(true);
  const [activeHintKey, setActiveHintKey] = useState<string | null>(null);
  const [receiptType, setReceiptType] = useState<'RECEIPT' | 'CLAIM'>('CLAIM');

  // Supplier state (빈 칸 기본값)
  const [supplierBizNo, setSupplierBizNo] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierCeo, setSupplierCeo] = useState('');
  const [supplierAddr, setSupplierAddr] = useState('');
  const [supplierBizType, setSupplierBizType] = useState('');
  const [supplierBizClass, setSupplierBizClass] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');

  // Buyer state (빈 칸 기본값)
  const [buyerBizNo, setBuyerBizNo] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerCeo, setBuyerCeo] = useState('');
  const [buyerAddr, setBuyerAddr] = useState('');
  const [buyerBizType, setBuyerBizType] = useState('');
  const [buyerBizClass, setBuyerBizClass] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  // Date & Remark
  const [writeDate, setWriteDate] = useState('');
  const [mainRemark, setMainRemark] = useState('');

  // Items List
  const [items, setItems] = useState<ItemRow[]>([
    { id: '1', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    { id: '2', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    { id: '3', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    { id: '4', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
  ]);

  // Calculations
  const totalSupplyAmount = items.reduce((acc, cur) => acc + (cur.supplyAmount || 0), 0);
  const totalTaxAmount = items.reduce((acc, cur) => acc + (cur.taxAmount || 0), 0);
  const grandTotal = totalSupplyAmount + totalTaxAmount;

  // MOD-10 Validations
  const isSupplierMod10 = validateBizRegNoMod10(supplierBizNo);
  const isBuyerMod10 = validateBizRegNoMod10(buyerBizNo);

  // Mandatory 4 checks
  const isReq1Supplier = sanitizeBizRegNo(supplierBizNo).length === 10 && supplierName.trim() !== '';
  const isReq2Buyer = sanitizeBizRegNo(buyerBizNo).length === 10;
  const isReq3Date = writeDate.trim().length >= 8;
  const isReq4Amount = totalSupplyAmount > 0;
  const isAllFourValid = isReq1Supplier && isReq2Buyer && isReq3Date && isReq4Amount;

  // Fill Sample Data
  const handleFillSample = () => {
    setSupplierBizNo('220-88-12345');
    setSupplierName('(주)테크솔루션');
    setSupplierCeo('김회계');
    setSupplierAddr('서울특별시 강남구 테헤란로 123 7층');
    setSupplierBizType('소프트웨어');
    setSupplierBizClass('개발 및 자문');
    setSupplierEmail('tax@techsolution.co.kr');

    setBuyerBizNo('110-81-98765');
    setBuyerName('(주)한국유통');
    setBuyerCeo('이세무');
    setBuyerAddr('경기도 성남시 분당구 판교로 456');
    setBuyerBizType('도소매');
    setBuyerBizClass('전자상거래');
    setBuyerEmail('accounting@koreadist.com');

    const todayStr = new Date().toISOString().slice(0, 10);
    setWriteDate(todayStr);
    setMainRemark('계약서 제2026-08호 준공 대금 청구건 (기업은행 123-45678-90)');

    setItems([
      { id: '1', monthDay: '08/10', itemName: 'ERP 세무 알고리즘 연동 모듈 개발', spec: 'v1.0', quantity: 1, unitPrice: 3000000, supplyAmount: 3000000, taxAmount: 300000, remark: '공정율 100%' },
      { id: '2', monthDay: '08/10', itemName: '볼타 API 클라우드 연동 라이선스', spec: '1년', quantity: 2, unitPrice: 500000, supplyAmount: 1000000, taxAmount: 100000, remark: '정체 연간구독' },
      { id: '3', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
      { id: '4', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    ]);
  };

  // Reset to Clean Blank
  const handleReset = () => {
    setSupplierBizNo('');
    setSupplierName('');
    setSupplierCeo('');
    setSupplierAddr('');
    setSupplierBizType('');
    setSupplierBizClass('');
    setSupplierEmail('');

    setBuyerBizNo('');
    setBuyerName('');
    setBuyerCeo('');
    setBuyerAddr('');
    setBuyerBizType('');
    setBuyerBizClass('');
    setBuyerEmail('');

    setWriteDate('');
    setMainRemark('');

    setItems([
      { id: '1', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
      { id: '2', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
      { id: '3', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
      { id: '4', monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' },
    ]);
  };

  // Item Change Handlers
  const handleItemChange = (index: number, field: keyof ItemRow, value: any) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };

    // Auto compute supplyAmount & taxAmount if quantity & unitPrice updated
    if (field === 'quantity' || field === 'unitPrice') {
      const q = typeof item.quantity === 'number' ? item.quantity : Number(item.quantity) || 0;
      const p = typeof item.unitPrice === 'number' ? item.unitPrice : Number(item.unitPrice) || 0;
      if (q > 0 && p > 0) {
        item.supplyAmount = q * p;
        item.taxAmount = Math.floor(item.supplyAmount * 0.1);
      }
    } else if (field === 'supplyAmount') {
      const s = Number(value) || 0;
      item.supplyAmount = s;
      item.taxAmount = Math.floor(s * 0.1);
    }

    newItems[index] = item;
    setItems(newItems);
  };

  const addItemRow = () => {
    setItems([
      ...items,
      { id: String(Date.now()), monthDay: '', itemName: '', spec: '', quantity: '', unitPrice: '', supplyAmount: 0, taxAmount: 0, remark: '' }
    ]);
  };

  const removeItemRow = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Tax Hints Data Map
  const HINTS_MAP: Record<string, { title: string; category: string; content: string; keyPoint: string }> = {
    supplierBizNo: {
      title: '공급자 사업자등록번호 (필수 1-1)',
      category: '부가가치세법 제32조 ①항',
      content: '공급자(매출자)의 10자리 사업자등록번호는 필수 기재사항입니다. 국세청 Modulo-10 검증 공식을 통해 10번째 체크섬 숫자가 일치해야 정상 사업자로 판정됩니다.',
      keyPoint: '💡 번호 오류 시 국세청 전송 거부 (400 Bad Request) 및 세금계산서 무효 처리'
    },
    supplierName: {
      title: '공급자 상호 및 성명 (필수 1-2)',
      category: '필수 기재사항 4가지 중 1번',
      content: '사업자등록증상의 정확한 법인명(상호)과 대표자 성명을 작성합니다. 개인사업자의 경우 대표자 성명이 누락되면 미등록/사실과 다른 세금계산서로 오인될 수 있습니다.',
      keyPoint: '💡 사업자등록증 상의 정식 법인명 표기 권장'
    },
    buyerBizNo: {
      title: '공급받는자 사업자등록번호 (필수 2)',
      category: '필수 기재사항 4가지 중 2번',
      content: '공급받는자(매입자)의 사업자등록번호입니다. 매입자가 매입세액 공제를 받기 위한 절대적 필수 기재사항입니다. (상호나 대표자 성명은 필수 기재사항이 아닌 임의 기재사항임)',
      keyPoint: '💡 매입자의 상호/대표자명 오류는 매입세액 공제 가능하나, 사업자번호 오류는 매입세액 불공제!'
    },
    writeDate: {
      title: '작성연월일 (필수 3)',
      category: '부가가치세 과세기간 귀속 결정',
      content: '재화나 용역의 공급시기(실무적으로 매월 말일 또는 실제 거래일)를 기록합니다. 작성연월일에 따라 부가가치세 과세기간(1기, 2기) 및 지연발급 가산세(1%) 적용 여부가 결정됩니다.',
      keyPoint: '💡 실무 팁: 발급일자(실제 발행한 날)나 전송일자와 달라도, 작성연월일이 공급시기여야 합니다.'
    },
    supplyAmount: {
      title: '공급가액 및 부가가치세 (필수 4)',
      category: '세액 및 결제 대금 확정',
      content: '순수 상품/서비스 단가의 합계액(공급가액)과 해당 금액의 10%인 부가가치세액입니다. 원단위 절사 규칙(Math.floor)이 적용됩니다.',
      keyPoint: '💡 영세율 적용 건은 세액 0원, 면세 거래는 계산서(부가가치세 없음)로 별도 발행'
    },
    remark: {
      title: '비고란 활용법 (임의 기재사항)',
      category: '실무 증빙 및 대금 입금 안내',
      content: '세무조사 또는 입금 확인 시 유용한 계약서 번호, 입금 은행 계좌번호, 공사/용역 관련 특이사항을 적는 영역입니다.',
      keyPoint: '💡 세무상 필수사항은 아니지만 대금 정산 및 소명자료로 매우 중요합니다.'
    },
    receiptType: {
      title: '영수 vs 청구 구분',
      category: '결제 대금 수령 여부',
      content: '대금을 이미 수령했으면 [영수], 향후 대금을 지급받을 예정이면 [청구]에 체크합니다.',
      keyPoint: '💡 세무상 과세표준이나 효력에는 영향이 없으나 대금 관리 채권 증빙으로 사용됩니다.'
    }
  };

  return (
    <div className="py-8 container max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold font-mono">
              국세청 표준 적색 양식
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
              1페이지: 빈 칸 + 세무 힌트
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            국세청 세금계산서 작성 <span className="text-red-400 font-extrabold">(빈 칸 & 힌트 학습 모드)</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            직접 빈 칸을 입력하며 세금계산서의 필수 4가지 요건 및 세무 작성 가이드를 실습하세요.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setShowHints(!showHints)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              showHints
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Lightbulb className={`w-4 h-4 ${showHints ? 'text-amber-400 animate-pulse' : ''}`} />
            세무 힌트 툴팁 {showHints ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={handleFillSample}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            예시 데이터 채우기
          </button>

          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            전체 비우기
          </button>
        </div>
      </div>

      {/* Real-time Mandatory 4 Validation Status Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="font-extrabold text-white text-sm">필수 4가지 기재사항 실시간 진단</h3>
          </div>
          {isAllFourValid ? (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              필수 4가지 완전 충족 (국세청 발행 가능)
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              필수 요건 입력 진행 중
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className={`p-2.5 rounded-xl border transition-all ${isReq1Supplier ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
            <div className="font-bold flex items-center justify-between mb-1">
              <span>1. 공급자 등록번호 & 상호</span>
              {isReq1Supplier ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4 text-slate-500" />}
            </div>
            <p className="text-[11px] opacity-80">
              {isReq1Supplier ? `입력완료 (${isSupplierMod10 ? 'MOD-10 검증 통과' : '번호 형식 오류'})` : '공급자 번호(10자리) 및 상호 필요'}
            </p>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${isReq2Buyer ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
            <div className="font-bold flex items-center justify-between mb-1">
              <span>2. 공급받는자 등록번호</span>
              {isReq2Buyer ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4 text-slate-500" />}
            </div>
            <p className="text-[11px] opacity-80">
              {isReq2Buyer ? `입력완료 (${isBuyerMod10 ? 'MOD-10 검증 통과' : '번호 형식 오류'})` : '공급받는자 번호(10자리) 필요'}
            </p>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${isReq3Date ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
            <div className="font-bold flex items-center justify-between mb-1">
              <span>3. 작성연월일</span>
              {isReq3Date ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4 text-slate-500" />}
            </div>
            <p className="text-[11px] opacity-80">
              {isReq3Date ? writeDate : '재화/용역의 공급시기 입력'}
            </p>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${isReq4Amount ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
            <div className="font-bold flex items-center justify-between mb-1">
              <span>4. 공급가액 & 부가가치세</span>
              {isReq4Amount ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4 text-slate-500" />}
            </div>
            <p className="text-[11px] opacity-80">
              {isReq4Amount ? `공급가액: ₩${totalSupplyAmount.toLocaleString()}` : '품목 및 공급가액 입력'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Red Tax Invoice Form Container */}
      <div className="bg-slate-900 border-2 border-red-500/40 rounded-3xl shadow-2xl overflow-hidden">
        {/* Paper Form Red Header */}
        <div className="bg-gradient-to-r from-red-900 via-rose-950 to-slate-900 p-6 border-b border-red-500/40 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-black text-white tracking-widest uppercase">
                세 금 계 산 서
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                공급받는자 보관용 / 국세청 제출용
              </span>
            </div>
            <p className="text-xs text-red-200/70 mt-0.5">
              전자세금계산서 국세청 표준 규격 (부가가치세법 시행령 제67조)
            </p>
          </div>

          {/* Preset Fill Button inside form */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
              필수 4가지 요건 + 빈 칸 힌트 실습
            </span>
          </div>
        </div>

        {/* Form Body Grid: Supplier (Red Left) vs Buyer (Blue Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          
          {/* LEFT: 공급자 (Supplier) */}
          <div className="p-6 space-y-4 bg-slate-950/40">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="px-3 py-1 rounded-md bg-red-500/20 text-red-400 font-extrabold text-xs border border-red-500/30">
                공 급 자 (매출자)
              </span>
              {showHints && (
                <button
                  onClick={() => setActiveHintKey('supplierBizNo')}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <Lightbulb className="w-3.5 h-3.5" /> 공급자 힌트 보기
                </button>
              )}
            </div>

            {/* Biz Reg No */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>등록번호 <span className="text-red-400">*필수</span></span>
                {supplierBizNo && (
                  <span className={`text-[11px] font-mono font-bold ${isSupplierMod10 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isSupplierMod10 ? '✓ MOD-10 국세청 합격' : '⚠️ MOD-10 검증 오류'}
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="예: 220-88-12345 (10자리)"
                  value={supplierBizNo}
                  onChange={(e) => setSupplierBizNo(formatBizRegNo(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
                />
                {showHints && (
                  <button
                    onClick={() => setActiveHintKey('supplierBizNo')}
                    className="absolute right-2.5 top-2.5 text-amber-400 hover:text-amber-300"
                    title="힌트"
                  >
                    <Lightbulb className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Name & CEO */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>상호(법인명) <span className="text-red-400">*필수</span></span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="예: (주)테크솔루션"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">성명(대표자)</label>
                <input
                  type="text"
                  placeholder="예: 김회계"
                  value={supplierCeo}
                  onChange={(e) => setSupplierCeo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">사업장 주소</label>
              <input
                type="text"
                placeholder="예: 서울특별시 강남구 테헤란로 123"
                value={supplierAddr}
                onChange={(e) => setSupplierAddr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Biz Type & Class */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">업태</label>
                <input
                  type="text"
                  placeholder="예: 서비스 / 정보통신"
                  value={supplierBizType}
                  onChange={(e) => setSupplierBizType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">종목</label>
                <input
                  type="text"
                  placeholder="예: 소프트웨어 개발"
                  value={supplierBizClass}
                  onChange={(e) => setSupplierBizClass(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">이메일 (전자세금계산서 발송용)</label>
              <input
                type="email"
                placeholder="tax@supplier.com"
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* RIGHT: 공급받는자 (Buyer) */}
          <div className="p-6 space-y-4 bg-slate-950/40">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 font-extrabold text-xs border border-blue-500/30">
                공 급 받 는 자 (매입자)
              </span>
              {showHints && (
                <button
                  onClick={() => setActiveHintKey('buyerBizNo')}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <Lightbulb className="w-3.5 h-3.5" /> 공급받는자 힌트 보기
                </button>
              )}
            </div>

            {/* Biz Reg No */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>등록번호 <span className="text-red-400">*필수</span></span>
                {buyerBizNo && (
                  <span className={`text-[11px] font-mono font-bold ${isBuyerMod10 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isBuyerMod10 ? '✓ MOD-10 국세청 합격' : '⚠️ MOD-10 검증 오류'}
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="예: 110-81-98765 (10자리)"
                  value={buyerBizNo}
                  onChange={(e) => setBuyerBizNo(formatBizRegNo(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-blue-500 focus:outline-none transition-colors"
                />
                {showHints && (
                  <button
                    onClick={() => setActiveHintKey('buyerBizNo')}
                    className="absolute right-2.5 top-2.5 text-amber-400 hover:text-amber-300"
                    title="힌트"
                  >
                    <Lightbulb className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Name & CEO */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">상호(법인명)</label>
                <input
                  type="text"
                  placeholder="예: (주)한국유통"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">성명(대표자)</label>
                <input
                  type="text"
                  placeholder="예: 이세무"
                  value={buyerCeo}
                  onChange={(e) => setBuyerCeo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">사업장 주소</label>
              <input
                type="text"
                placeholder="예: 경기도 성남시 분당구 판교로 456"
                value={buyerAddr}
                onChange={(e) => setBuyerAddr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Biz Type & Class */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">업태</label>
                <input
                  type="text"
                  placeholder="예: 도소매"
                  value={buyerBizType}
                  onChange={(e) => setBuyerBizType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">종목</label>
                <input
                  type="text"
                  placeholder="예: 전자상거래"
                  value={buyerBizClass}
                  onChange={(e) => setBuyerBizClass(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">수신 이메일 (세금계산서 수신)</label>
              <input
                type="email"
                placeholder="accounting@buyer.com"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Date & Amounts Header Section */}
        <div className="p-6 bg-slate-900 border-t border-b border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Write Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1">
                작성연월일 <span className="text-red-400">*필수</span>
              </span>
              {showHints && (
                <button
                  onClick={() => setActiveHintKey('writeDate')}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-0.5 font-bold"
                >
                  <Lightbulb className="w-3 h-3" /> 작성일자 힌트
                </button>
              )}
            </label>
            <input
              type="date"
              value={writeDate}
              onChange={(e) => setWriteDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Supply Amount Total */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>공급가액 합계 <span className="text-red-400">*필수</span></span>
              {showHints && (
                <button
                  onClick={() => setActiveHintKey('supplyAmount')}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-0.5 font-bold"
                >
                  <Lightbulb className="w-3 h-3" /> 금액 계산 힌트
                </button>
              )}
            </label>
            <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 font-mono text-base font-extrabold text-right">
              ₩ {totalSupplyAmount.toLocaleString()}
            </div>
          </div>

          {/* Tax Amount Total */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">부가가치세액 합계 (10%)</label>
            <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-cyan-400 font-mono text-base font-extrabold text-right">
              ₩ {totalTaxAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Items Table (품목 명세) */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
              품목 명세서
              <span className="text-xs font-normal text-slate-400">
                (수량과 단가를 입력하면 공급가액 및 세액 10%가 자동 계산됩니다)
              </span>
            </h3>
            <button
              onClick={addItemRow}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-300 flex items-center gap-1 border border-slate-700"
            >
              <Plus className="w-4 h-4" /> 품목 줄 추가
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                  <th className="p-2.5 w-16 text-center">월/일</th>
                  <th className="p-2.5">품목명</th>
                  <th className="p-2.5 w-24">규격</th>
                  <th className="p-2.5 w-20 text-right">수량</th>
                  <th className="p-2.5 w-28 text-right">단가</th>
                  <th className="p-2.5 w-32 text-right">공급가액</th>
                  <th className="p-2.5 w-28 text-right">세액(10%)</th>
                  <th className="p-2.5">비고</th>
                  <th className="p-2.5 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-1.5">
                      <input
                        type="text"
                        placeholder="08/10"
                        value={item.monthDay}
                        onChange={(e) => handleItemChange(idx, 'monthDay', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-center text-slate-200 text-xs focus:border-red-500 focus:outline-none font-mono"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        placeholder="품목명 입력"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(idx, 'itemName', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white text-xs focus:border-red-500 focus:outline-none"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        placeholder="규격"
                        value={item.spec}
                        onChange={(e) => handleItemChange(idx, 'spec', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:border-red-500 focus:outline-none"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="number"
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-right text-slate-200 text-xs focus:border-red-500 focus:outline-none font-mono"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="number"
                        placeholder="0"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-right text-slate-200 text-xs focus:border-red-500 focus:outline-none font-mono"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="number"
                        placeholder="0"
                        value={item.supplyAmount || ''}
                        onChange={(e) => handleItemChange(idx, 'supplyAmount', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-right text-emerald-400 font-bold text-xs focus:border-red-500 focus:outline-none font-mono"
                      />
                    </td>
                    <td className="p-1.5 text-right font-mono text-cyan-400 font-bold">
                      ₩{(item.taxAmount || 0).toLocaleString()}
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        placeholder="비고"
                        value={item.remark}
                        onChange={(e) => handleItemChange(idx, 'remark', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400 text-xs focus:border-red-500 focus:outline-none"
                      />
                    </td>
                    <td className="p-1.5 text-center">
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItemRow(idx)}
                          className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Main Remark & Receipt/Claim Radio */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>비고 (특이사항 및 입금 계좌)</span>
              {showHints && (
                <button
                  onClick={() => setActiveHintKey('remark')}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-0.5 font-bold"
                >
                  <Lightbulb className="w-3 h-3" /> 비고 힌트
                </button>
              )}
            </label>
            <input
              type="text"
              placeholder="예: 입금계좌 신한은행 110-123-456789 / 계약서 참조"
              value={mainRemark}
              onChange={(e) => setMainRemark(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>영수 / 청구 선택</span>
              {showHints && (
                <button
                  onClick={() => setActiveHintKey('receiptType')}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-0.5 font-bold"
                >
                  <Lightbulb className="w-3 h-3" /> 구분 힌트
                </button>
              )}
            </label>
            <div className="flex items-center gap-3 pt-1">
              <label className={`flex-1 p-2 rounded-xl border cursor-pointer text-center font-bold text-xs transition-all ${
                receiptType === 'CLAIM'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}>
                <input
                  type="radio"
                  name="receipt"
                  value="CLAIM"
                  checked={receiptType === 'CLAIM'}
                  onChange={() => setReceiptType('CLAIM')}
                  className="sr-only"
                />
                청구 (대금 받기 전)
              </label>

              <label className={`flex-1 p-2 rounded-xl border cursor-pointer text-center font-bold text-xs transition-all ${
                receiptType === 'RECEIPT'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}>
                <input
                  type="radio"
                  name="receipt"
                  value="RECEIPT"
                  checked={receiptType === 'RECEIPT'}
                  onChange={() => setReceiptType('RECEIPT')}
                  className="sr-only"
                />
                영수 (수령 완료)
              </label>
            </div>
          </div>
        </div>

        {/* Total Grand Amount Summary Footer */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400">총 청구 / 영수 금액</span>
            <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
              <span>₩ {grandTotal.toLocaleString()}</span>
              <span className="text-xs font-normal text-slate-400">(공급가액 + VAT 포함)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert(`[국세청 전자세금계산서 작성 완료]\n\n작성일자: ${writeDate || '미입력'}\n공급자: ${supplierName || '미입력'}\n공급받는자: ${buyerName || '미입력'}\n총 합계금액: ₩${grandTotal.toLocaleString()}\n\n※ 다음 2페이지(볼타 API) 또는 3페이지(DB연동)에서 실제 API 발급을 진행해보세요!`)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              세금계산서 작성 완성 진단
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Hint Modal Drawer */}
      {activeHintKey && HINTS_MAP[activeHintKey] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold uppercase">
                    {HINTS_MAP[activeHintKey].category}
                  </span>
                  <h3 className="font-extrabold text-white text-base">
                    {HINTS_MAP[activeHintKey].title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveHintKey(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {HINTS_MAP[activeHintKey].content}
            </p>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              {HINTS_MAP[activeHintKey].keyPoint}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveHintKey(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                이해했습니다
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
