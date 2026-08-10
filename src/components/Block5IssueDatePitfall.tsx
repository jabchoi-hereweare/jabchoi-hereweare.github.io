import React, { useState } from 'react';
import { Calendar, AlertTriangle, ArrowRight, ShieldX, Sparkles } from 'lucide-react';

export const Block5IssueDatePitfall: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'correct' | 'wrong'>('wrong');

  return (
    <section className="py-12 border-b border-slate-800">
      <div className="container max-w-4xl mx-auto">
        {/* Section Tag */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold mb-3 tracking-wide uppercase border border-red-500/20">
            블록 ⑤ · 현장에서 제일 많이 틀리는 칸
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-3 tracking-tight">
            가장 위험한 함정: <span className="text-red-400 font-black underline decoration-red-500/50 underline-offset-8">작성연월일</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            "실제 용역은 6월 말에 끝났는데, 7월 초에 세금계산서 작성할 때 작성일자를 7월로 적으면 어떻게 될까요?"
          </p>
        </div>

        {/* Interactive Period Crossover Simulator */}
        <div className="glass-panel p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-slate-100 text-sm">과세기간 이월 오류 시뮬레이터</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedScenario('correct')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedScenario === 'correct'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                올바른 작성 (6월 30일)
              </button>
              <button
                onClick={() => setSelectedScenario('wrong')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedScenario === 'wrong'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                흔한 실수 (7월 1일 작성)
              </button>
            </div>
          </div>

          {/* Timeline Visual Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* 1st Half Period Box */}
            <div className={`p-4 rounded-xl border ${selectedScenario === 'correct' ? 'bg-blue-500/10 border-blue-500/40' : 'bg-slate-800/50 border-slate-700'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-blue-400">1기 과세기간 (1월 1일 ~ 6월 30일)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">7월 25일 확정신고</span>
              </div>
              <div className="text-xs space-y-1 text-slate-300">
                <p>용역 완료일: <strong>6월 28일</strong></p>
                {selectedScenario === 'correct' ? (
                  <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold mt-2">
                    ✅ 작성일자: 6월 30일로 작성 → 1기 확정신고에 정상 포함!
                  </div>
                ) : (
                  <div className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-400 mt-2 italic">
                    ❌ 1기 과세기간에서 세금계산서 누락됨
                  </div>
                )}
              </div>
            </div>

            {/* 2nd Half Period Box */}
            <div className={`p-4 rounded-xl border ${selectedScenario === 'wrong' ? 'bg-red-500/10 border-red-500/40' : 'bg-slate-800/50 border-slate-700'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold text-red-400">2기 과세기간 (7월 1일 ~ 12월 31일)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono">10월 25일 예정신고</span>
              </div>
              <div className="text-xs space-y-1 text-slate-300">
                <p>실제 발급 시점: 7월 5일</p>
                {selectedScenario === 'wrong' ? (
                  <div className="p-2 rounded bg-red-500/20 border border-red-500/40 text-red-300 font-bold mt-2">
                    ⚠️ 작성일자: 7월 1일로 오기 → 과세기간 넘어감! (1% 지연발급 가산세 발생)
                  </div>
                ) : (
                  <div className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-400 mt-2 italic">
                    2기 과세기간과 관계 없음
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Explanation Box */}
          {selectedScenario === 'wrong' ? (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/30 text-xs text-red-200 space-y-2">
              <div className="font-bold text-red-300 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                과세기간 경계선(6월말/12월말)의 비극
              </div>
              <p className="leading-relaxed text-slate-300">
                실제 용역은 6월에 완료되었는데 작성일자를 7월로 적으면, <strong>1기 부가가치세 신고 대상이 2기로 넘어가는 심각한 부세법상 문제</strong>가 일어납니다. 
                공급자는 매출 누락 또는 지연발급 가산세(1%) 대상이 되고, 상대방은 매입세액이 불공제될 수 있습니다.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                황금 규칙: 작성일자는 항상 용역/재화 완료일 기준!
              </div>
              <p className="leading-relaxed text-slate-300">
                실제 발급을 7월 5일에 하더라도, 작성일자 칸에는 <strong>6월 30일</strong>을 입력하여 발행하면 
                다음 달 10일(7월 10일) 이내 정상 발급이 되며 가산세가 0원입니다!
              </p>
            </div>
          )}
        </div>

        {/* Episode 2 Teaser Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-center shadow-xl">
          <span className="text-xs font-mono text-indigo-400 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-3 inline-block">
            NEXT EPISODE TEASER
          </span>
          <h3 className="text-xl font-bold text-slate-100 mb-2">
            다음 회차 예고: "6월 30일에 끝낸 일, 7월 1일 날짜 적으면 일어나는 비극"
          </h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto mb-4">
            세무사의 시선에서 가장 꼼꼼하게 따지는 <strong className="text-indigo-300 font-semibold">'공급시기'</strong>와 과세기간의 미학을 다룹니다.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-indigo-400 font-semibold">
            회무사 2회차에서 이어집니다 <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
