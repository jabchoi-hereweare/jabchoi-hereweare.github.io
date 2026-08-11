import React, { useState } from 'react';
import { RefreshCw, Save, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AmendedTaxInvoiceFormView: React.FC = () => {
  const [approvalNo, setApprovalNo] = useState('20260810-41000000-00123456');
  const [amendReason, setAmendReason] = useState('01'); // 기재사항 착오정정
  const [isSubmitted, setIsSubmitted] = useState(false);

  const amendReasons = [
    { code: '01', title: '기재사항 착오정정', desc: '사업자등록번호, 공급가액, 작성일자 등을 잘못 작성하여 정정할 때' },
    { code: '02', title: '환입 (반품)', desc: '발급 후 공급받은 재화가 반품되거나 거절되었을 때' },
    { code: '03', title: '계약의 해제', desc: '거래 계약이 해제되어 세금계산서 취소 소급 발행이 필요할 때' },
    { code: '04', title: '공급가액 변동', desc: '단가 변동 또는 할인이 적용되어 금액이 감액/증액될 때' },
    { code: '05', title: '이중발급 정정', desc: '동일한 건에 대하여 세금계산서가 중복 발급되었을 때' },
  ];

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 font-sans text-slate-800 bg-[#F4F5F8] min-h-full">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-amber-600" />
          <span>수정 세금계산서 작성</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          이미 당초 발급된 세금계산서의 착오/변동/취소 사유가 발생한 경우 수정 세금계산서를 발행합니다.
        </p>
      </div>

      {isSubmitted && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-md flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <span>수정 세금계산서(음수 취소 -1,100,000원 + 정정 양수 +1,100,000원)가 세트로 저장 및 발급되었습니다.</span>
        </div>
      )}

      {/* Form Grid Container */}
      <form onSubmit={handleIssue} className="bg-white rounded-md border border-slate-200 shadow-sm p-6 space-y-6 text-xs">
        {/* Step 1: 당초 세금계산서 승인번호 입력 */}
        <div className="space-y-2">
          <h2 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
            당초 발급 세금계산서 승인번호 (24자리)
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={approvalNo}
              onChange={(e) => setApprovalNo(e.target.value)}
              className="w-80 border border-slate-300 rounded px-3 py-1.5 font-mono text-sm text-slate-900 focus:outline-none focus:border-amber-500"
              required
            />
            <button
              type="button"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded border border-slate-300"
            >
              당초 문서 조회
            </button>
          </div>
        </div>

        {/* Step 2: 수정 사유 선택 */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
            수정 사유 선택 (국세청 표준 수정 사유 5가지)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {amendReasons.map((r) => (
              <label
                key={r.code}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  amendReason === r.code
                    ? 'bg-amber-50/80 border-amber-500 text-amber-950 shadow-sm font-semibold'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="amendReason"
                    checked={amendReason === r.code}
                    onChange={() => setAmendReason(r.code)}
                    className="text-amber-600"
                  />
                  <span className="font-bold">{r.code}. {r.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 ml-5">{r.desc}</p>
              </label>
            ))}
          </div>
        </div>

        {/* Step 3: 수정 발행 금액 확인 테이블 (자동 생성 세트) */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
            수정 세금계산서 발행 내역 (자동 음수/양수 세트)
          </h2>

          <div className="border border-slate-200 rounded overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">구분</th>
                  <th className="p-2.5">작성연월일</th>
                  <th className="p-2.5">공급가액</th>
                  <th className="p-2.5">부가가치세액</th>
                  <th className="p-2.5">합계 금액</th>
                  <th className="p-2.5">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr className="bg-red-50/60 text-red-700">
                  <td className="p-2.5 font-bold">당초 취소 (음수)</td>
                  <td className="p-2.5">2026-08-10</td>
                  <td className="p-2.5 font-bold text-right">- 1,000,000 원</td>
                  <td className="p-2.5 font-bold text-right">- 100,000 원</td>
                  <td className="p-2.5 font-bold text-right text-red-800">- 1,100,000 원</td>
                  <td className="p-2.5 font-sans text-xs">당초 건 자동 취소</td>
                </tr>
                <tr className="bg-emerald-50/60 text-emerald-800">
                  <td className="p-2.5 font-bold">정정 발행 (양수)</td>
                  <td className="p-2.5">2026-08-11</td>
                  <td className="p-2.5 font-bold text-right">+ 1,000,000 원</td>
                  <td className="p-2.5 font-bold text-right">+ 100,000 원</td>
                  <td className="p-2.5 font-bold text-right text-emerald-900">+ 1,100,000 원</td>
                  <td className="p-2.5 font-sans text-xs">수정사항 반영 정정건</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded shadow transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>수정 세금계산서 발행</span>
          </button>
        </div>
      </form>
    </div>
  );
};
