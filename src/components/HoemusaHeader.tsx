import React from 'react';
import { AlertTriangle, HelpCircle, Bell, Users, Grid, User, Github, FileText, CheckCircle2 } from 'lucide-react';
import { TabId } from './HoemusaSidebar';

interface HoemusaHeaderProps {
  activeTabId: TabId;
  onOpenTab: (tabId: TabId) => void;
  onOpenGithubModal: () => void;
}

export const HoemusaHeader: React.FC<HoemusaHeaderProps> = ({
  activeTabId,
  onOpenTab,
  onOpenGithubModal,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 h-14 px-4 flex items-center justify-between text-sm select-none shadow-sm z-30 relative font-sans">
      {/* Left: HOEMUSA Brand Logo & Tax Invoice Process Quick Bar */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#5E48B4] flex items-center justify-center text-white font-black text-sm shadow-sm">
            會
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-slate-900 font-sans">
                회무사 ERP
              </span>
              <span className="text-[10px] font-bold text-purple-700 px-1.5 py-0.2 bg-purple-50 rounded border border-purple-200">
                세금계산서 전용
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-none">
              TAX INVOICE MANAGEMENT SYSTEM
            </p>
          </div>
        </div>

        {/* Top Process Shortcut Navigation (Tax Invoice Process Only) */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-xs">
          <button
            onClick={() => onOpenTab('nts_form')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTabId === 'nts_form'
                ? 'text-purple-800 font-bold bg-purple-50 border border-purple-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            ✏️ 세금계산서 작성
          </button>
          <button
            onClick={() => onOpenTab('unissued_docs')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTabId === 'unissued_docs'
                ? 'text-purple-800 font-bold bg-purple-50 border border-purple-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            📥 발급 전 문서
          </button>
          <button
            onClick={() => onOpenTab('bolta_api')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTabId === 'bolta_api'
                ? 'text-purple-800 font-bold bg-purple-50 border border-purple-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            🔌 볼타 API 연동
          </button>
          <button
            onClick={() => onOpenTab('customer_mgt')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTabId === 'customer_mgt'
                ? 'text-purple-800 font-bold bg-purple-50 border border-purple-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            🏢 거래처 관리
          </button>
          <button
            onClick={() => onOpenTab('business_info')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTabId === 'business_info'
                ? 'text-purple-800 font-bold bg-purple-50 border border-purple-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            📄 사업자 정보
          </button>
        </nav>
      </div>

      {/* Right: Global Utilities & User Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenGithubModal}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded transition-colors shadow-sm"
          title="GitHub Pages 배포 가이드"
        >
          <Github className="w-3.5 h-3.5 text-purple-700" />
          <span>GitHub 배포</span>
        </button>

        <div className="h-4 w-px bg-slate-200 my-auto" />

        <button className="text-slate-400 hover:text-amber-500 transition-colors p-1" title="알림 상태">
          <AlertTriangle className="w-4 h-4" />
        </button>
        <button className="text-slate-400 hover:text-purple-600 transition-colors p-1 relative" title="공지사항 알림">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <button className="text-slate-400 hover:text-slate-700 transition-colors p-1" title="조직도">
          <Users className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-200 my-auto" />

        {/* User Info Avatar */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
          <div className="w-7 h-7 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 font-bold">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline font-bold">최승용 (회계 총관리자)</span>
        </div>
      </div>
    </header>
  );
};
