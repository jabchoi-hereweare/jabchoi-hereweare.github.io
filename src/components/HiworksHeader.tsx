import React from 'react';
import { AlertTriangle, HelpCircle, Bell, Users, Grid, User, Github } from 'lucide-react';

export type HiworksModuleType = 'hr' | 'accounting' | 'tax' | 'contract';

interface HiworksHeaderProps {
  activeModule: HiworksModuleType;
  setActiveModule: (module: HiworksModuleType) => void;
  onOpenGithubModal: () => void;
}

export const HiworksHeader: React.FC<HiworksHeaderProps> = ({
  activeModule,
  setActiveModule,
  onOpenGithubModal,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 h-14 px-4 flex items-center justify-between text-sm select-none shadow-sm z-30 relative">
      {/* Left: Brand Logo & Top Module Navigation */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-blue-600 font-sans">
            hiworks
          </span>
          <span className="text-xs font-semibold text-slate-600 px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
            회무사 ERP
          </span>
        </div>

        {/* Global Top Navigation Tabs */}
        <nav className="flex items-center gap-1 font-medium">
          <button
            onClick={() => setActiveModule('hr')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeModule === 'hr'
                ? 'text-purple-700 font-bold bg-purple-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            인사근무
          </button>
          <button
            onClick={() => setActiveModule('accounting')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeModule === 'accounting'
                ? 'text-purple-700 font-bold bg-purple-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            경리회계
          </button>
          <button
            onClick={() => setActiveModule('tax')}
            className={`px-3 py-1.5 rounded transition-colors relative ${
              activeModule === 'tax'
                ? 'text-purple-700 font-bold bg-purple-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            세금계산서
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-600 rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-600 rounded-full" />
          </button>
          <button
            onClick={() => setActiveModule('contract')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeModule === 'contract'
                ? 'text-purple-700 font-bold bg-purple-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            전자계약
          </button>
        </nav>
      </div>

      {/* Right: Global Utilities & User Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenGithubModal}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded transition-colors"
          title="GitHub Pages 배포 가이드"
        >
          <Github className="w-3.5 h-3.5 text-purple-700" />
          <span>GitHub 배포</span>
        </button>

        <div className="h-4 w-px bg-slate-200 my-auto" />

        <button className="text-slate-400 hover:text-amber-500 transition-colors p-1" title="알림 상태">
          <AlertTriangle className="w-4 h-4" />
        </button>
        <button className="text-slate-400 hover:text-blue-500 transition-colors p-1" title="도움말">
          <HelpCircle className="w-4 h-4" />
        </button>
        <button className="text-slate-400 hover:text-purple-600 transition-colors p-1 relative" title="공지사항 알림">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <button className="text-slate-400 hover:text-slate-700 transition-colors p-1" title="조직도">
          <Users className="w-4 h-4" />
        </button>
        <button className="text-slate-400 hover:text-slate-700 transition-colors p-1" title="앱 목록">
          <Grid className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-200 my-auto" />

        {/* User Info Avatar */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer hover:text-purple-700">
          <div className="w-7 h-7 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 font-bold">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">최승용 (총관리자)</span>
        </div>
      </div>
    </header>
  );
};
