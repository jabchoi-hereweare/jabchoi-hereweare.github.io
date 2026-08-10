import React, { useState, useRef } from 'react';
import { FileText, Eye, BookOpen, Map, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { TaxInvoiceForm, TwoEyesSplitViewer } from '../modules/tax-invoice';
import { Block1BlankForm } from '../components/Block1BlankForm';
import { Block2FourRequired } from '../components/Block2FourRequired';
import { Block5IssueDatePitfall } from '../components/Block5IssueDatePitfall';
import { DistributionStrategy } from '../components/DistributionStrategy';
import { SeriesRoadmap } from '../components/SeriesRoadmap';

export type SubTabType = 'module' | 'simulator' | 'guide' | 'roadmap';

export const PreviousComprehensiveModulePage: React.FC = () => {
  const [subTab, setSubTab] = useState<SubTabType>('module');
  const widgetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="py-6 container max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Sub Header Navigation inside Page 4 */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold font-mono">
              기존 구현 모듈 (EP01)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
              4페이지: 종합 ERP 모듈 & 회무사 시뮬레이터
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            회무사 ERP <span className="text-purple-400 font-extrabold">종합 관제 & 시뮬레이터</span>
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            기존에 개발한 ERP 메인 관제 모듈, 회계사/세무사의 두 개의 눈, 세무 가이드 및 로드맵입니다.
          </p>
        </div>

        {/* Sub-tabs Navigation */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSubTab('module')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              subTab === 'module'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            세금계산서 모듈
          </button>

          <button
            onClick={() => setSubTab('simulator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              subTab === 'simulator'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-indigo-300" />
            두 개의 눈 시뮬레이터
          </button>

          <button
            onClick={() => setSubTab('guide')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              subTab === 'guide'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            세무 가이드
          </button>

          <button
            onClick={() => setSubTab('roadmap')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              subTab === 'roadmap'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            로드맵
          </button>
        </div>
      </div>

      {/* Sub-tab 1: 세금계산서 발행 모듈 (ERP 메인 관제 화면) */}
      {subTab === 'module' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="text-center mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/20 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> ERP 연동용 전자세금계산서 관제 모듈 (볼타 API v1.0 규격)
            </span>
            <h2 className="text-2xl font-black text-white">
              전자세금계산서 <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">발행 관제 센터</span>
            </h2>
          </div>
          <TaxInvoiceForm widgetRef={widgetRef} />
        </div>
      )}

      {/* Sub-tab 2: 두 개의 눈 시뮬레이터 */}
      {subTab === 'simulator' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="text-center mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold mb-2 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" /> 회무사 프레임 시뮬레이터
            </span>
            <h2 className="text-2xl font-black text-white">
              회계사의 눈 🔵 vs 세무사의 눈 🔴
            </h2>
          </div>
          <TwoEyesSplitViewer />
        </div>
      )}

      {/* Sub-tab 3: 세무 가이드 & 5대 날짜 */}
      {subTab === 'guide' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-black text-white">세무 가이드 & 핵심 세법 규칙</h2>
            <p className="text-slate-400 text-xs">작성은 종이 칸 채우기. 필수 4가지와 작성일자 실수를 예방하는 가이드</p>
          </div>
          <Block1BlankForm />
          <Block2FourRequired />
          <Block5IssueDatePitfall />
        </div>
      )}

      {/* Sub-tab 4: 로드맵 & 유통 전략 */}
      {subTab === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          <DistributionStrategy />
          <SeriesRoadmap />
        </div>
      )}
    </div>
  );
};
