import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const Block2FourRequired: React.FC = () => {
  return (
    <section className="py-12 border-b border-slate-800">
      <div className="container max-w-4xl mx-auto">
        {/* Section Tag */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold mb-3 tracking-wide uppercase border border-slate-700">
            블록 ② · 1회의 핵심 "한 방"
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-3 tracking-tight">
            진짜 중요한 칸은 <span className="text-amber-400 font-black underline decoration-amber-500/50 underline-offset-8">4개</span>뿐입니다.
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            세금계산서의 수많은 칸 중, 법적으로 무효가 되거나 가산세가 부과되는 기준은 오직 
            <span className="text-amber-300 font-semibold"> '필요적 기재사항(4가지)'</span>에만 적용됩니다.
          </p>
        </div>

        {/* 4 Required Items Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Item 1 */}
          <div className="glass-panel p-5 border-l-4 border-l-amber-500 bg-slate-900/80">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base mb-1 flex items-center gap-2">
                  공급자의 등록번호 & 성명/상호
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  돈을 버는 사람(나)의 사업자등록번호와 상호명. 법인이나 개인사업자 본인을 식별하는 핵심 기본값입니다.
                </p>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="glass-panel p-5 border-l-4 border-l-amber-500 bg-slate-900/80">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base mb-1 flex items-center gap-2">
                  공급받는자의 등록번호
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  돈을 주는 고객사(상대방)의 사업자등록번호. (놀랍게도 공급받는자의 상호나 대표자명은 틀려도 상관없습니다!)
                </p>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="glass-panel p-5 border-l-4 border-l-amber-500 bg-slate-900/80">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base mb-1 flex items-center gap-2">
                  공급가액과 부가가치세액
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  순수 단가 합계(공급가액)와 10% 부가가치세(세액). 세금계산서의 가장 본질인 숫자가 계산되는 영역입니다.
                </p>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="glass-panel p-5 border-l-4 border-l-amber-500 bg-slate-900/80">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base mb-1 flex items-center gap-2">
                  작성연월일 (발행일이 아님!)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  실제 거래나 용역이 완료된 날짜. 이 날짜에 따라 어떤 부가가치세 확정 신고 기간(1기/2기)에 들어가는지가 정해집니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Comparison Box: Required vs Arbitrary */}
        <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>나머지 임의적 기재사항(품목, 단가, 수량, 비고 등)의 비밀</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 font-bold text-red-400 text-sm mb-2">
                <XCircle className="w-4 h-4" />
                필요적 기재사항 (위 4가지) 오류 시
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>전자세금계산서 법적 효력 상실/무효</li>
                <li>공급자: <span className="text-red-400 font-semibold">1%~2% 지연발급/미발급 가산세</span></li>
                <li>공급받는자: <span className="text-red-400 font-semibold">매입세액 불공제 (VAT 10% 환급 불가)</span></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm mb-2">
                <CheckCircle2 className="w-4 h-4" />
                임의적 기재사항 (품목·수량·단가) 오류 시
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>세금계산서의 법적 효력 <span className="text-emerald-400 font-semibold">100% 정상 유지</span></li>
                <li>세무서 가산세: <span className="text-emerald-400 font-bold">0원 (전혀 없음!)</span></li>
                <li>품목 칸이 완전히 비어있어도 법적으로 아무런 문제 없음</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>1회의 안심 포인트:</strong> "품목명을 '웹사이트 개발'로 적든 'IT 컨설팅'으로 적든, 심지어 오타가 나도 국세청은 가산세를 때리지 않습니다. 오직 4개 칸만 맞추면 됩니다!"
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
