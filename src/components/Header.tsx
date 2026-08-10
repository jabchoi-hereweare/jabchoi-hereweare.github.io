import React from 'react';
import { FileText, Server, Database, Layers, Github, Sparkles, HelpCircle } from 'lucide-react';

export type MainPageType = 'nts' | 'bolta_api' | 'db_issue' | 'previous';

interface HeaderProps {
  activePage: MainPageType;
  setActivePage: (page: MainPageType) => void;
  onOpenGithubModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, onOpenGithubModal }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl shadow-xl">
      {/* Sample/Simulation Notice Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-amber-950 px-4 py-1.5 text-xs font-bold flex items-center justify-center gap-2 shadow-inner">
        <span className="bg-amber-950 text-amber-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
          샘플 / 시뮬레이션
        </span>
        <span className="text-amber-950 font-extrabold">
          ⚠️ 본 화면은 ERP 세무 실습 및 테스트용 샘플 시스템입니다. 실제 국세청 신고 및 법적 세금계산서가 발행되지 않습니다.
        </span>
      </div>

      <div className="container py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 font-black text-xl text-white">
            회무
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-100 tracking-tight">회무사 ERP</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                볼타 API v1.0
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                4개 통합 실습
              </span>
            </div>
            <p className="text-xs text-slate-400">
              국세청 서식 · 볼타 API · DB 연동 실시간 전자세금계산서 시스템
            </p>
          </div>
        </div>

        {/* Top 4 Pages Main Navigation Menu */}
        <nav className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActivePage('nts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activePage === 'nts'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4 text-red-300" />
            1. 국세청 세금계산서 (빈 칸+힌트)
          </button>

          <button
            onClick={() => setActivePage('bolta_api')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activePage === 'bolta_api'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Server className="w-4 h-4 text-cyan-300" />
            2. 볼타 API 발행 연동
          </button>

          <button
            onClick={() => setActivePage('db_issue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activePage === 'db_issue'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-300" />
            3. DB 연동 세금계산서 발행
          </button>

          <button
            onClick={() => setActivePage('previous')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activePage === 'previous'
                ? 'bg-slate-800 text-purple-300 border border-purple-500/40 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            4. 기존 종합 ERP 모듈
          </button>
        </nav>

        {/* GitHub Pages Deploy Guide Trigger Button */}
        <button
          onClick={onOpenGithubModal}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 border border-indigo-400/30 transition-all shrink-0"
        >
          <Github className="w-4 h-4" />
          <span>GitHub 호스팅 가이드</span>
        </button>
      </div>
    </header>
  );
};
