import React from 'react';
import { X, FileEdit, Inbox, Cpu, Database, Building2, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { TabId } from './HiworksSidebar';

export interface TabItem {
  id: TabId;
  title: string;
  icon?: React.ReactNode;
}

interface HiworksWorkspaceTabsProps {
  openTabs: TabItem[];
  activeTabId: TabId;
  setActiveTabId: (id: TabId) => void;
  closeTab: (id: TabId) => void;
}

export const HiworksWorkspaceTabs: React.FC<HiworksWorkspaceTabsProps> = ({
  openTabs,
  activeTabId,
  setActiveTabId,
  closeTab,
}) => {
  return (
    <div className="bg-[#463785] px-3 pt-2 flex items-center gap-1 overflow-x-auto select-none shrink-0 border-b border-purple-900/40">
      {openTabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`group flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs font-medium cursor-pointer transition-all ${
              isActive
                ? 'bg-[#F4F5F8] text-purple-950 font-bold shadow'
                : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
            }`}
          >
            {/* Tab Icon */}
            <span className={isActive ? 'text-purple-700' : 'text-purple-300'}>
              {tab.id === 'nts_form' && <FileEdit className="w-3.5 h-3.5" />}
              {tab.id === 'unissued_docs' && <Inbox className="w-3.5 h-3.5" />}
              {tab.id === 'bolta_api' && <Cpu className="w-3.5 h-3.5 text-emerald-500" />}
              {tab.id === 'db_issue' && <Database className="w-3.5 h-3.5" />}
              {tab.id === 'customer_mgt' && <Building2 className="w-3.5 h-3.5" />}
              {tab.id === 'business_info' && <FileSpreadsheet className="w-3.5 h-3.5" />}
              {tab.id === 'user_permissions' && <ShieldCheck className="w-3.5 h-3.5" />}
            </span>

            <span>{tab.title}</span>

            {/* Close Button */}
            {openTabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className={`p-0.5 rounded-full hover:bg-slate-300/40 transition-colors ${
                  isActive ? 'text-slate-500 hover:text-slate-800' : 'text-purple-300 hover:text-white'
                }`}
                title="탭 닫기"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
