/**
 * 회무사 시그니처 프레임: 같은 한 장, 두 개의 눈 (Two Eyes Split Viewer)
 * 표준 과세 매출 vs 선수금(Advance Payment) 대가 수령 특례 불일치 케이스 시뮬레이터
 */

import React, { useState } from 'react';
import { TaxInvoiceData } from '../types';
import { Calculator, ShieldAlert, ArrowRightLeft, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface TwoEyesProps {
  formData?: TaxInvoiceData;
}

export const TwoEyesSplitViewer: React.FC<TwoEyesProps> = ({ formData }) => {
  const [scenario, setScenario] = useState<'standard' | 'advance'>('advance');
  const [activePerspective, setActivePerspective] = useState<'both' | 'accountant' | 'tax'>('both');

  const supplyVal = scenario === 'advance' ? 10000000 : (formData?.totalSupplyAmount || 3000000);
  const taxVal = scenario === 'advance' ? 1000000 : (formData?.totalTaxAmount || 300000);
  const totalVal = supplyVal + taxVal;

  const writeDateStr = scenario === 'advance' ? '2026-07-15' : (formData?.dates.writeDate || '2026-07-31');

  return (
    <div className="glass-panel p-6 rounded-2xl bg-slate-900 border border-slate-700/80 text-slate-100 shadow-2xl">
      {/* Header Tag */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold mb-2 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" /> 회무사 시그니처 프레임
        </span>
        <h3 className="text-2xl font-black text-white mb-2">
          같은 한 장, <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-red-400 bg-clip-text text-transparent">두 개의 눈</span>
        </h3>
        <p className="text-slate-400 text-xs max-w-lg mx-auto">
          세금계산서 작성 한 장으로 <span className="text-blue-400 font-bold">회계사의 눈 (발생주의 손익)</span>과 <span className="text-red-400 font-bold">세무사의 눈 (부세법 공급시기)</span>이 어떻게 갈라지는지 체험해보세요.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 p-2 rounded-xl bg-slate-950 border border-slate-800">
        <button
          onClick={() => setScenario('advance')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            scenario === 'advance'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          [시나리오 A] 선수금 수령 세금계산서 (두 눈 불일치 발생! ★추천)
        </button>

        <button
          onClick={() => setScenario('standard')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            scenario === 'standard'
              ? 'bg-slate-700 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          [시나리오 B] 일반 용역완료 과세매출 (두 눈 동일 시점)
        </button>
      </div>

      {/* Sub-Header Context Banner for Scenario A */}
      {scenario === 'advance' && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed space-y-1">
          <div className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
            ⚡ 선수금 거래 상황 설명 (계약금 1,100만원 수령 건)
          </div>
          <p>
            7월 15일에 <strong>계약금 1,100만원(VAT 포함)</strong>을 계좌로 입금받고 세금계산서를 끊었습니다. 단, 실제 시스템 구축 용역은 <strong>다음 달인 8월 말에 완성</strong>됩니다.
          </p>
          <div className="text-amber-400 font-mono text-[11px] pt-1">
            ➔ 결과: 세금계산서는 7월 15일에 발행되었으나, 7월 손익계산서 상 매출은 <strong className="underline">0원</strong>입니다!
          </div>
        </div>
      )}

      {/* Perspective Filter Switcher */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setActivePerspective('both')}
          className={`px-3 py-1 rounded text-xs ${activePerspective === 'both' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >
          <ArrowRightLeft className="w-3 h-3 inline mr-1" /> 양쪽 비교
        </button>
        <button
          onClick={() => setActivePerspective('accountant')}
          className={`px-3 py-1 rounded text-xs ${activePerspective === 'accountant' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >
          🔵 회계사의 눈만
        </button>
        <button
          onClick={() => setActivePerspective('tax')}
          className={`px-3 py-1 rounded text-xs ${activePerspective === 'tax' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >
          🔴 세무사의 눈만
        </button>
      </div>

      {/* Dual Grid View */}
      <div className={`grid grid-cols-1 ${activePerspective === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {/* Blue: Accountant Perspective */}
        {(activePerspective === 'both' || activePerspective === 'accountant') && (
          <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/40 relative">
            <div className="flex justify-between items-center pb-3 border-b border-blue-800/60 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔵</span>
                <div>
                  <h4 className="font-extrabold text-blue-200 text-base">회계사의 눈</h4>
                  <span className="text-[11px] text-blue-400 font-mono">발생주의 손익계산서 & 전표 분개</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-400/30">
                P&L / B/S
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block mb-1">1. 수익 인식 판정 (발생주의):</span>
                {scenario === 'advance' ? (
                  <div className="p-3 rounded-lg bg-slate-900 border border-blue-500/30 text-blue-300">
                    <p className="font-bold text-amber-400 mb-1">❌ 7월 손익계산서 매출 = 0원 (수익 인식 불가)</p>
                    <p className="text-slate-300">
                      용역이 아직 완성되지 않았으므로 대금을 먼저 받았더라도 7월 매출로 잡을 수 없습니다. 용역이 완료되는 8월 말에 매출로 처리됩니다.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-slate-900 border border-blue-500/30 text-blue-300">
                    <p className="font-bold text-emerald-400 mb-1">✅ 7월 용역매출 = {supplyVal.toLocaleString()}원 인식</p>
                    <p className="text-slate-300">용역 제공이 완료되었으므로 발생주의 원칙에 따라 매출 수익을 반영합니다.</p>
                  </div>
                )}
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">2. 자동 복식부기 전표 분개:</span>
                <div className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] space-y-1.5 border border-slate-800">
                  <div className="text-slate-400 border-b border-slate-800 pb-1">
                    [일자: {writeDateStr}] 회계전표 자동 생성
                  </div>
                  <div className="flex justify-between text-blue-300">
                    <span>(차변) 보통예금 (또는 현금)</span>
                    <span>{totalVal.toLocaleString()}원</span>
                  </div>
                  {scenario === 'advance' ? (
                    <div className="flex justify-between text-amber-300 pl-3">
                      <span>(대변) 선수금 (부채 계정)★</span>
                      <span className="font-bold">{supplyVal.toLocaleString()}원</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-emerald-300 pl-3">
                      <span>(대변) 용역매출 (수익 계정)</span>
                      <span>{supplyVal.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex justify-between text-indigo-300 pl-3">
                    <span>(대변) 부가가치세예수금</span>
                    <span>{taxVal.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-900/20 text-blue-200 text-[11px]">
                💡 <strong>핵심 회계 영향</strong>: {scenario === 'advance' ? '통장에 1,100만원이 들어왔지만 당월 손익(매출/이익)에는 0원 반영되며, 부채(선수금) 1,000만원이 증가합니다.' : '손익계산서 매출 증가 및 채권/자산 반영'}
              </div>
            </div>
          </div>
        )}

        {/* Red: Tax Accountant Perspective */}
        {(activePerspective === 'both' || activePerspective === 'tax') && (
          <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/40 relative">
            <div className="flex justify-between items-center pb-3 border-b border-red-800/60 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔴</span>
                <div>
                  <h4 className="font-extrabold text-red-200 text-base">세무사의 눈</h4>
                  <span className="text-[11px] text-red-400 font-mono">부가가치세법 공급시기 & 과세표준</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-mono border border-red-400/30">
                부세법 §17
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block mb-1">1. 부가가치세법상 공급시기 판정:</span>
                {scenario === 'advance' ? (
                  <div className="p-3 rounded-lg bg-slate-900 border border-red-500/30 text-red-300">
                    <p className="font-bold text-emerald-400 mb-1">✅ 부세법 §17 대가 수령 시 특례 적용 (적법)</p>
                    <p className="text-slate-300">
                      원칙상 공급시기는 8월 완료일이지만, 대금을 미리 받고 7일 이내 세금계산서를 교부했으므로 <strong>7월 15일 자 발급이 법적으로 100% 적법</strong>합니다.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-slate-900 border border-red-500/30 text-red-300">
                    <p className="font-bold text-emerald-400 mb-1">✅ 부세법 §16 용역 제공 완료일 (적법)</p>
                    <p className="text-slate-300">용역 완료일에 맞게 정상 발행되어 과세기간 귀속 오류가 없습니다.</p>
                  </div>
                )}
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">2. 부가가치세 신고서 과세표준 반영:</span>
                <div className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] space-y-1.5 border border-slate-800">
                  <div className="text-slate-400 border-b border-slate-800 pb-1">
                    [7월 2기 예정/확정 부가세 신고]
                  </div>
                  <div className="flex justify-between text-red-300">
                    <span>(1) 과세표준 (세금계산서 발급분)</span>
                    <span className="font-bold">{supplyVal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-amber-300">
                    <span>(2) 매출 세액 (납부 부가가치세)</span>
                    <span className="font-bold">{taxVal.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-red-900/20 text-red-200 text-[11px]">
                ⚠️ <strong>장부로 ERP의 자동화 가치</strong>: 7월 부가세 신고서에는 1,000만원의 매출과세표준이 들어가지만, 7월 회계 결산서에는 매출이 0원이 되는 시점 차이를 시스템이 자동으로 추적·조정합니다.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
