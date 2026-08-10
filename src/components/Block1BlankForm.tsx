import React from 'react';
import { ArrowDown, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Block1Props {
  onScrollToWidget: () => void;
}

export const Block1BlankForm: React.FC<Block1Props> = ({ onScrollToWidget }) => {
  return (
    <section className="py-12 border-b border-slate-800">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-blue-400 text-xs font-bold mb-3 tracking-wide uppercase border border-slate-700">
          블록 ① · 시작하며
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-4 tracking-tight leading-tight">
          빈 양식부터 던집니다.<br />
          <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
            "발행"이 아니라 "작성"부터 해봅시다.
          </span>
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          홈택스나 팝빌 버튼을 누르는 <span className="text-red-400 font-semibold">'발행'</span>은 잘못 누르면 가산세가 나오는 겁나는 일이지만, 
          그 전 단계인 <span className="text-emerald-400 font-semibold">'작성'</span>은 그냥 종이 칸 채우기입니다. 
          1회의 목표는 지식 전달이 아니라 <span className="underline underline-offset-4 decoration-amber-400/60 font-medium">겁 빼기</span>입니다.
        </p>
      </div>

      {/* Blank Form Visual Mockup */}
      <div className="max-w-4xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-red-600/30 rounded-2xl blur-lg group-hover:opacity-100 opacity-60 transition duration-500"></div>
        
        <div className="relative glass-panel p-6 md:p-8 rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">전자세금계산서 표준 양식 프리뷰</span>
            </div>
            <span className="text-xs text-red-400 font-semibold px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20">
              공급자 보관용 (적색)
            </span>
          </div>

          {/* Realistic Blank Tax Invoice Preview Frame */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
            <div className="min-w-[650px] bg-white text-slate-900 p-6 rounded border-2 border-red-600 font-sans shadow-inner">
              <div className="flex justify-between items-center border-b-2 border-red-600 pb-3 mb-4">
                <h2 className="text-2xl font-black tracking-widest text-red-600">세 금 계 산 서</h2>
                <div className="text-right text-xs text-slate-500 font-mono">
                  [공급자 보관용] · 2026 전자세금계산서 표준
                </div>
              </div>

              {/* Grid 2 Column for Supplier and Buyer */}
              <div className="grid grid-cols-2 gap-0 border border-red-600 mb-4 text-xs">
                {/* Supplier Box */}
                <div className="border-r border-red-600 p-2 bg-red-50/40">
                  <div className="font-bold text-red-700 mb-2 border-b border-red-200 pb-1 flex justify-between">
                    <span>공 급 자</span>
                    <span className="text-[10px] text-red-500 bg-red-100 px-1 rounded">필수 포함</span>
                  </div>
                  <div className="space-y-1.5 font-mono">
                    <div className="flex"><span className="w-20 text-slate-500">등록번호:</span> <span className="bg-amber-100 border border-amber-300 rounded px-1.5 font-bold text-amber-900">000-00-00000</span></div>
                    <div className="flex"><span className="w-20 text-slate-500">상호(성명):</span> <span className="bg-amber-100 border border-amber-300 rounded px-1.5 font-bold text-amber-900">(주)○○테크 (대표: 홍길동)</span></div>
                    <div className="flex text-slate-400"><span className="w-20">주소:</span> 서울특별시 강남구 테헤란로 123</div>
                    <div className="flex text-slate-400"><span className="w-20">업태/종목:</span> 서비스 / 소프트웨어 개발</div>
                  </div>
                </div>

                {/* Buyer Box */}
                <div className="p-2 bg-blue-50/40">
                  <div className="font-bold text-blue-700 mb-2 border-b border-blue-200 pb-1 flex justify-between">
                    <span>공 급 받 는 자</span>
                    <span className="text-[10px] text-blue-500 bg-blue-100 px-1 rounded">필수 포함</span>
                  </div>
                  <div className="space-y-1.5 font-mono">
                    <div className="flex"><span className="w-20 text-slate-500">등록번호:</span> <span className="bg-amber-100 border border-amber-300 rounded px-1.5 font-bold text-amber-900">000-00-00000</span></div>
                    <div className="flex"><span className="w-20 text-slate-500">상호(성명):</span> <span className="bg-slate-100 rounded px-1 text-slate-500">(선택) 글로벌코리아</span></div>
                    <div className="flex text-slate-400"><span className="w-20">주소:</span> 서울특별시 마포구 월드컵북로 402</div>
                    <div className="flex text-slate-400"><span className="w-20">업태/종목:</span> 도소매 / 전자상거래</div>
                  </div>
                </div>
              </div>

              {/* Amount and Tax Bar */}
              <div className="border border-red-600 mb-4 bg-amber-50/60 p-2.5 rounded">
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  <div>
                    <span className="text-slate-500 block mb-1">작성연월일 [필수]</span>
                    <span className="font-bold text-slate-900 bg-amber-200 px-2 py-0.5 rounded">2026 - 07 - 31</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">공급가액 [필수]</span>
                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">₩ 10,000,000</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">세액(10%) [필수]</span>
                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">₩ 1,000,000</span>
                  </div>
                </div>
              </div>

              {/* Items Detail Table (Empty / Non-essential indicator) */}
              <div className="border border-slate-300 rounded overflow-hidden opacity-75">
                <table className="w-full text-[11px] text-center">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="py-1">월/일</th>
                      <th className="py-1">품목 (선택사항)</th>
                      <th className="py-1">규격</th>
                      <th className="py-1">수량</th>
                      <th className="py-1">단가</th>
                      <th className="py-1">공급가액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-slate-400">
                    <tr>
                      <td className="py-1">07/31</td>
                      <td className="py-1 italic text-slate-500">비워두거나 틀려도 가산세 0원</td>
                      <td className="py-1">-</td>
                      <td className="py-1">1</td>
                      <td className="py-1">10,000,000</td>
                      <td className="py-1">10,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="mt-6 text-center">
            <button
              onClick={onScrollToWidget}
              className="btn-primary text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30"
            >
              지금 바로 직접 4개 칸 채워보기
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
