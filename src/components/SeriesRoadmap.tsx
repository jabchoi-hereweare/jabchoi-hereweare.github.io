import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle, FileEdit } from 'lucide-react';

export const SeriesRoadmap: React.FC = () => {
  return (
    <section className="py-12 border-b border-slate-800">
      <div className="container max-w-5xl mx-auto">
        {/* Series Roadmap Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-3 tracking-wide uppercase border border-blue-500/20">
            시리즈 지도 · 겹침 섹터 Roadmap (수정세금계산서 반영)
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            1회를 축으로 뻗어나가는 <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-red-400 bg-clip-text text-transparent">회무사 커리큘럼</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            "직접 채워보는 위젯 + 두 개의 눈 + 볼타 API 스키마" 포맷을 통해 실무와 ERP 엔진 개발을 동시 완성합니다.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-3 mb-10">
          {/* Ep 1 */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-emerald-500 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs shrink-0">
                1회
              </span>
              <div>
                <h3 className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
                  일단 한 장 채워보는 세금계산서 <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">현재 회차 (완성)</span>
                </h3>
                <p className="text-xs text-slate-300">핵심: 4가지 필요적 기재사항 + 5대 날짜 스키마 & 선수금 두 눈 불일치 체험</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono shrink-0">
              [검증 레이어 & 5-Date 엔진]
            </div>
          </div>

          {/* Ep 2 */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-red-500 bg-slate-900/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-300 font-bold flex items-center justify-center text-xs shrink-0">
                2회
              </span>
              <div>
                <h3 className="font-bold text-slate-200 text-sm">세무 트랙 ①: 공급시기와 과세기간의 미학</h3>
                <p className="text-xs text-slate-300">6월 30일 용역 완료건을 7월 1일 작성일자로 끊을 때 일어나는 비극</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono shrink-0">
              [기간귀속 이상탐지]
            </div>
          </div>

          {/* Ep 3 */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-red-500 bg-slate-900/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-300 font-bold flex items-center justify-center text-xs shrink-0">
                3회
              </span>
              <div>
                <h3 className="font-bold text-slate-200 text-sm">세무 트랙 ②: 매입세액 불공제 7가지 잔혹사</h3>
                <p className="text-xs text-slate-300">승용차, 접대비, 사업불관련 등 돈은 썼는데 10% VAT 환급 못 받는 이유</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono shrink-0">
              [계정분류 + 세무조정 룰]
            </div>
          </div>

          {/* Ep 3.5 - Added Chapter: 수정세금계산서 */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-amber-500 bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs shrink-0">
                3.5회
              </span>
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-amber-400" /> 수정세금계산서 6가지 사유코드와 소급 작성의 미학 ★신규
                </h3>
                <p className="text-xs text-slate-300">실무 발생 빈도 1위: 착오정정(소급) vs 공급가액 변동(사유발생일) 처리 기준</p>
              </div>
            </div>
            <div className="text-xs text-amber-300 font-mono shrink-0">
              [볼타 amendment_code 연동]
            </div>
          </div>

          {/* Ep 4 */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-blue-500 bg-slate-900/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center text-xs shrink-0">
                4회
              </span>
              <div>
                <h3 className="font-bold text-slate-200 text-sm">회계 트랙 ①: 분개 한 줄에서 시작하는 선수금과 미수금</h3>
                <p className="text-xs text-slate-300">세금계산서 발행과 실제 은행 통장 잔고의 차이 극복하기</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono shrink-0">
              [발생주의 전환 엔진]
            </div>
          </div>

          {/* Ep 5 */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-blue-500 bg-slate-900/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center text-xs shrink-0">
                5회
              </span>
              <div>
                <h3 className="font-bold text-slate-200 text-sm">회계 트랙 ②: 부가가치세 신고서 한 장과 마감 분개</h3>
                <p className="text-xs text-slate-300">한 분기 동안 모은 세금계산서들이 부가세 신고서 한 장으로 합쳐지는 과정</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono shrink-0">
              [리포팅 & 마감 자동화]
            </div>
          </div>
        </div>

        {/* Pre-publishing Verification Box */}
        <div className="glass-panel p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>2026 개정 세법 & 의무발급 3대 주의사항 (Pre-publish Check)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="font-bold text-amber-300 mb-1">1. 면세 공급가액 포함 산정</div>
              <p className="text-slate-300 text-[11px]">
                직전연도 8천만원 판정 시 면세 매출액을 포함하여 판정합니다. (누락 시 의무자 오답 유발)
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="font-bold text-amber-300 mb-1">2. 적용 시점: 다음 해 7월 1일</div>
              <p className="text-slate-300 text-[11px]">
                1월 1일이 아닌, 직전연도 확정 후 다음 해 7월 1일부터 의무발급이 개시됩니다.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="font-bold text-amber-300 mb-1">3. 영구 계속 적용</div>
              <p className="text-slate-300 text-[11px]">
                한 번 의무발급 대상이 되면 이후 연도 매출이 줄어들더라도 계속 적용됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
