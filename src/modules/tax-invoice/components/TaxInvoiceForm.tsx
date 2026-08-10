/**
 * 볼타(Bolta) API 규격 및 장부로 세무 엔진 통합 세금계산서 표준 폼 컴포넌트
 * 다중 품목 지원, MOD-10 검증, 5대 날짜 인스펙터, "유효성 ≠ 무사고" 안전 배지 제공
 */

import React, { useState } from 'react';
import { useTaxInvoiceForm } from '../hooks/useTaxInvoiceForm';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, Plus, Trash2, Calendar, 
  Send, RefreshCw, Printer, Info, Sparkles, FileCode, Check
} from 'lucide-react';

interface TaxInvoiceFormProps {
  formHook?: ReturnType<typeof useTaxInvoiceForm>;
  widgetRef?: React.RefObject<HTMLDivElement>;
}

export const TaxInvoiceForm: React.FC<TaxInvoiceFormProps> = ({ formHook: externalHook, widgetRef }) => {
  const internalHook = useTaxInvoiceForm();
  const hook = externalHook || internalHook;

  const {
    formData,
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
  } = hook;

  const [showDatesInspector, setShowDatesInspector] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section ref={widgetRef} className="py-8 text-slate-100" id="tax-invoice-form-module">
      <div className="container max-w-5xl mx-auto space-y-6">
        
        {/* Top Control Bar & Presets */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg no-print">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 볼타 API 빠른 예시:
            </span>
            <button
              onClick={() => loadPreset('dev')}
              className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 font-medium transition-all"
            >
              개발 외주 (500만원)
            </button>
            <button
              onClick={() => loadPreset('design')}
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 font-medium transition-all"
            >
              디자인 (150만원)
            </button>
            <button
              onClick={() => loadPreset('advance_payment')}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold transition-all"
            >
              선수금 특례 (두 눈 불일치!)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDatesInspector(!showDatesInspector)}
              className="px-3 py-1.5 rounded-lg bg-indigo-900/40 hover:bg-indigo-900/60 text-indigo-300 text-xs flex items-center gap-1 border border-indigo-500/30 font-mono"
            >
              <Calendar className="w-3.5 h-3.5" /> 5대 날짜 인스펙터
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" /> 인쇄/PDF
            </button>
          </div>
        </div>

        {/* 5-Date Inspector Panel (Expandable) */}
        {showDatesInspector && (
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-xs space-y-3 no-print animate-fadeIn">
            <div className="flex items-center justify-between border-b border-indigo-800/60 pb-2">
              <span className="font-extrabold text-indigo-200 text-sm flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" /> 장부로/볼타 엔진: 5대 날짜(5-Date Schema) 관리자
              </span>
              <span className="text-[11px] text-indigo-300 font-mono">이상탐지 룰 엔진 연동 중</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">1. 작성연월일 (writeDate)</label>
                <input
                  type="date"
                  value={formData.dates.writeDate}
                  onChange={(e) => setWriteDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 rounded border border-indigo-500/30 text-white font-bold text-xs"
                />
                <span className="text-[10px] text-slate-400">세무 부가세 과세기간 귀속 결정</span>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">4. 법정 공급시기 (statutorySupplyDate)</label>
                <input
                  type="date"
                  value={formData.dates.statutorySupplyDate || ''}
                  onChange={(e) => setDateProperty('statutorySupplyDate', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 rounded border border-indigo-500/30 text-white text-xs"
                />
                <span className="text-[10px] text-slate-400">작성연월일 적법성 검증 기준</span>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">5. 회계 수익인식일 (revenueRecognizedAt)</label>
                <input
                  type="date"
                  value={formData.dates.revenueRecognizedAt || ''}
                  onChange={(e) => setDateProperty('revenueRecognizedAt', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 rounded border border-indigo-500/30 text-white text-xs"
                />
                <span className="text-[10px] text-slate-400">발생주의 손익계산서 매출 시점</span>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Checklist & "Valid ≠ Safe" Status Bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-lg space-y-3 no-print">
          <div className="flex flex-wrap items-center justify-between text-xs font-bold gap-2">
            <div className="flex items-center gap-2">
              <span>법적 필수 4가지 요건:</span>
              {validation.isFullyValid ? (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4/4 완전 유효
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  입력 필요
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span>국세청 MOD-10 검증:</span>
              {validation.isSupplierMod10Valid && validation.isBuyerMod10Valid ? (
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 통과 (정상 사업자번호)
                </span>
              ) : (
                <span className="text-slate-400 font-mono text-[11px]">체크중</span>
              )}
            </div>
          </div>

          {/* Safety Warning (유효성 ≠ 무사고) */}
          {validation.safetyWarnings.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs space-y-1">
              <div className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> [유효성 ≠ 무사고] 실무 리스크 경고 (Checklist)
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-100">
                {validation.safetyWarnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Anomaly Detection Alerts */}
          {validation.anomalies.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-slate-800">
              {validation.anomalies.map((anom, i) => (
                <div key={i} className={`p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                  anom.severity === 'CRITICAL' ? 'bg-red-950/50 border border-red-500/40 text-red-200' :
                  anom.severity === 'WARNING' ? 'bg-amber-950/50 border border-amber-500/40 text-amber-200' :
                  'bg-indigo-950/50 border border-indigo-500/40 text-indigo-200'
                }`}>
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">{anom.title}</div>
                    <div className="text-[11px] opacity-90">{anom.description}</div>
                    <div className="text-[10px] underline font-medium mt-0.5">조치 가이드: {anom.suggestedAction}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Standard Red Tax Invoice Form Canvas */}
        <div className="tax-invoice-paper p-5 md:p-6 shadow-2xl bg-white text-slate-900 font-sans">
          
          {/* Header Banner */}
          <div className="flex justify-between items-center border-b-2 border-red-600 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-red-600 tracking-wider">세 금 계 산 서</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-300">
                [공급자 보관용]
              </span>
              {formData.status === 'ISSUED' && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 볼타 API 발행완료
                </span>
              )}
            </div>
            <div className="text-right text-[11px] text-slate-500 font-mono">
              전자세금계산서 표준 서식 (부가가치세법 시행규칙 별지 제11호)
            </div>
          </div>

          {/* Supplier & Buyer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-red-600 mb-4 bg-white text-xs">
            {/* Supplier (Left) */}
            <div className="p-3 border-b md:border-b-0 md:border-r-2 border-red-600 bg-red-50/20 space-y-2">
              <div className="flex justify-between items-center border-b border-red-300 pb-1.5 font-bold text-red-700">
                <span className="text-sm">공 급 자 (나 / 매도인)</span>
                <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded border border-red-200">
                  등록번호·상호 필수!
                </span>
              </div>
              
              <div>
                <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">
                  1. 사업자등록번호 <span className="text-red-500">*필수</span>
                </label>
                <input
                  type="text"
                  placeholder="123-45-67890"
                  value={formData.supplier.regNo}
                  onChange={(e) => setSupplierRegNo(e.target.value)}
                  className={`invoice-input invoice-input-required font-mono font-bold ${validation.isSupplierValid ? 'valid' : ''}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">
                    상호(법인명) <span className="text-red-500">*필수</span>
                  </label>
                  <input
                    type="text"
                    placeholder="(주)홍길동테크"
                    value={formData.supplier.name}
                    onChange={(e) => setHookSupplierName(hook, e.target.value)}
                    className="invoice-input invoice-input-required valid font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 block mb-0.5">성명(대표자)</label>
                  <input
                    type="text"
                    value={formData.supplier.ceoName}
                    onChange={(e) => setHookSupplierCeo(hook, e.target.value)}
                    className="invoice-input invoice-input-optional"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">사업장 주소</label>
                <input
                  type="text"
                  value={formData.supplier.address}
                  onChange={(e) => setHookSupplierAddr(hook, e.target.value)}
                  className="invoice-input invoice-input-optional"
                />
              </div>
            </div>

            {/* Buyer (Right) */}
            <div className="p-3 bg-blue-50/20 space-y-2">
              <div className="flex justify-between items-center border-b border-blue-300 pb-1.5 font-bold text-blue-800">
                <span className="text-sm">공 급 받 는 자 (고객사 / 매수인)</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                  등록번호만 필수!
                </span>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">
                  2. 사업자등록번호 <span className="text-red-500">*필수</span>
                </label>
                <input
                  type="text"
                  placeholder="987-65-43210"
                  value={formData.buyer.regNo}
                  onChange={(e) => setBuyerRegNo(e.target.value)}
                  className={`invoice-input invoice-input-required font-mono font-bold ${validation.isBuyerValid ? 'valid' : ''}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-0.5">상호(선택 - 오기시 가산세 0원)</label>
                  <input
                    type="text"
                    value={formData.buyer.name}
                    onChange={(e) => setHookBuyerName(hook, e.target.value)}
                    className="invoice-input invoice-input-optional"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">성명(선택)</label>
                  <input
                    type="text"
                    value={formData.buyer.ceoName}
                    onChange={(e) => setHookBuyerCeo(hook, e.target.value)}
                    className="invoice-input invoice-input-optional"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">사업장 주소</label>
                <input
                  type="text"
                  value={formData.buyer.address}
                  onChange={(e) => setHookBuyerAddr(hook, e.target.value)}
                  className="invoice-input invoice-input-optional"
                />
              </div>
            </div>
          </div>

          {/* Write Date & Amounts Bar */}
          <div className="border-2 border-red-600 bg-amber-50/60 p-3 rounded-lg mb-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  3. 작성연월일 <span className="text-red-600">*필수</span>
                </label>
                <input
                  type="date"
                  value={formData.dates.writeDate}
                  onChange={(e) => setWriteDate(e.target.value)}
                  className={`invoice-input invoice-input-required font-mono text-center font-bold ${validation.isDateValid ? 'valid' : ''}`}
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">과세 구분</label>
                <select
                  value={formData.taxType}
                  onChange={(e) => setTaxType(e.target.value as any)}
                  className="w-full p-1.5 rounded border border-slate-300 font-bold bg-white text-xs"
                >
                  <option value="TAXABLE">과세 (10%)</option>
                  <option value="ZERO_RATE">영세율 (0%)</option>
                  <option value="EXEMPT">면세 (0%)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  4-A. 공급가액 합계 <span className="text-red-600">*필수</span>
                </label>
                <div className="px-3 py-1.5 rounded bg-white border border-slate-300 font-mono font-black text-right text-emerald-700 text-sm">
                  ₩ {formData.totalSupplyAmount.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  4-B. 세액 합계 <span className="text-red-600">*필수</span>
                </label>
                <div className="px-3 py-1.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-right text-slate-800 text-sm">
                  ₩ {formData.totalTaxAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Item Grid Table */}
          <div className="border border-slate-300 rounded mb-4 overflow-x-auto">
            <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 flex justify-between items-center border-b border-slate-300">
              <span className="flex items-center gap-1.5">
                <span>품목 명세서 (다중 품목 입력 지원)</span>
                <span className="text-[10px] text-slate-500 font-normal">비필수 영역 - 오기시 가산세 0원</span>
              </span>
              <button
                type="button"
                onClick={addItemRow}
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1 no-print shadow"
              >
                <Plus className="w-3.5 h-3.5" /> 품목 행 추가
              </button>
            </div>

            <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-1.5 w-16">월/일</th>
                  <th className="py-1.5">품 목 (선택)</th>
                  <th className="py-1.5 w-20">규격</th>
                  <th className="py-1.5 w-16">수량</th>
                  <th className="py-1.5 w-24">단가</th>
                  <th className="py-1.5 w-28">공급가액</th>
                  <th className="py-1.5 w-24">세액</th>
                  <th className="py-1.5 w-10 no-print">삭제</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-700">
                {formData.items.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="py-1 px-1">
                      <input
                        type="text"
                        placeholder="MM/DD"
                        value={item.monthDay}
                        onChange={(e) => updateItem(idx, 'monthDay', e.target.value)}
                        className="invoice-input invoice-input-optional text-center text-xs"
                      />
                    </td>
                    <td className="py-1 px-1">
                      <input
                        type="text"
                        placeholder="품목명 입력"
                        value={item.itemName}
                        onChange={(e) => updateItem(idx, 'itemName', e.target.value)}
                        className="invoice-input invoice-input-optional text-xs font-sans font-medium"
                      />
                    </td>
                    <td className="py-1 px-1">
                      <input
                        type="text"
                        placeholder="규격"
                        value={item.spec}
                        onChange={(e) => updateItem(idx, 'spec', e.target.value)}
                        className="invoice-input invoice-input-optional text-center text-xs"
                      />
                    </td>
                    <td className="py-1 px-1">
                      <input
                        type="number"
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(idx, 'quantity', e.target.value ? Number(e.target.value) : '')}
                        className="invoice-input invoice-input-optional text-center text-xs"
                      />
                    </td>
                    <td className="py-1 px-1">
                      <input
                        type="number"
                        placeholder="단가"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(idx, 'unitPrice', e.target.value ? Number(e.target.value) : '')}
                        className="invoice-input invoice-input-optional text-right text-xs"
                      />
                    </td>
                    <td className="py-1 px-1 font-bold text-right text-slate-800">
                      {item.supplyAmount.toLocaleString()}
                    </td>
                    <td className="py-1 px-1 font-bold text-right text-slate-600">
                      {item.taxAmount.toLocaleString()}
                    </td>
                    <td className="py-1 px-1 no-print">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItemRow(idx)}
                          className="p-1 rounded text-red-500 hover:bg-red-50"
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

          {/* Bottom Total & Submit Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-slate-50 p-3 rounded border border-slate-300 text-xs">
            <div className="w-full md:w-1/2 font-mono">
              <span className="text-slate-500 font-sans font-semibold mr-2">총 합계금액:</span>
              <span className="text-lg font-black text-red-600">
                ₩ {formData.totalAmount.toLocaleString()}원
              </span>
            </div>

            <div className="w-full md:w-1/2 flex justify-end gap-2 no-print">
              <button
                type="button"
                onClick={submitIssueToBolta}
                disabled={!validation.isFullyValid || isSubmitting}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                  validation.isFullyValid
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? '볼타 API 전송 중...' : '볼타(Bolta) API 전자세금계산서 정식 발행'}
              </button>
            </div>
          </div>

          {/* Bolta Issue Result Modal Banner */}
          {issueResponse && issueResponse.success && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-1 animate-fadeIn no-print">
              <div className="font-extrabold text-sm flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {issueResponse.message}
              </div>
              <div className="font-mono text-[11px] text-emerald-700">
                국세청 승인번호: <strong>{issueResponse.approvalNo}</strong> | 발급일시: {issueResponse.issuedAt}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

// Helper setters for party fields
function setHookSupplierName(hook: any, name: string) {
  hook.setFormData((prev: any) => ({ ...prev, supplier: { ...prev.supplier, name } }));
}
function setHookSupplierCeo(hook: any, ceoName: string) {
  hook.setFormData((prev: any) => ({ ...prev, supplier: { ...prev.supplier, ceoName } }));
}
function setHookSupplierAddr(hook: any, address: string) {
  hook.setFormData((prev: any) => ({ ...prev, supplier: { ...prev.supplier, address } }));
}
function setHookBuyerName(hook: any, name: string) {
  hook.setFormData((prev: any) => ({ ...prev, buyer: { ...prev.buyer, name } }));
}
function setHookBuyerCeo(hook: any, ceoName: string) {
  hook.setFormData((prev: any) => ({ ...prev, buyer: { ...prev.buyer, ceoName } }));
}
function setHookBuyerAddr(hook: any, address: string) {
  hook.setFormData((prev: any) => ({ ...prev, buyer: { ...prev.buyer, address } }));
}
