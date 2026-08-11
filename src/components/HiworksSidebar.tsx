import React, { useState } from 'react';
import {
  FileEdit,
  Inbox,
  Building2,
  Package,
  PieChart,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Database,
  Cpu,
  ShieldCheck,
  CreditCard,
  TrendingUp,
  ArrowUpDown,
  FileSpreadsheet,
} from 'lucide-react';
import { HiworksModuleType } from './HiworksHeader';

export type TabId =
  | 'nts_form' // 세금계산서 작성
  | 'unissued_docs' // 발급 전 문서 (문서함)
  | 'bolta_api' // 볼타 API 연동
  | 'db_issue' // DB 연동 발행
  | 'customer_mgt' // 거래처 관리
  | 'business_info' // 사업자 정보
  | 'user_permissions' // 사용 권한 관리
  | 'expense_mgt'; // 경비지출 관리

interface HiworksSidebarProps {
  activeModule: HiworksModuleType;
  activeTabId: TabId;
  openTab: (tabId: TabId) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const HiworksSidebar: React.FC<HiworksSidebarProps> = ({
  activeModule,
  activeTabId,
  openTab,
  collapsed,
  setCollapsed,
}) => {
  // Accordion state
  const [openSection, setOpenSection] = useState<{ [key: string]: boolean }>({
    drafting: true,
    inbox: true,
    integration: true,
    master: true,
    settings: true,
    accounting_expense: true,
    accounting_sales: true,
  });

  const toggleSection = (section: string) => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (collapsed) {
    return (
      <aside className="w-12 bg-[#463785] text-white flex flex-col items-center py-3 select-none z-20 shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          className="p-1.5 hover:bg-white/10 rounded text-slate-300 hover:text-white mb-4"
          title="사이드바 펼치기"
        >
          <ChevronsRight className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-4 text-slate-300">
          <button
            onClick={() => openTab('nts_form')}
            className={`p-2 rounded hover:bg-white/10 ${activeTabId === 'nts_form' ? 'bg-purple-900 text-white font-bold' : ''}`}
            title="세금계산서 작성"
          >
            <FileEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => openTab('unissued_docs')}
            className={`p-2 rounded hover:bg-white/10 ${activeTabId === 'unissued_docs' ? 'bg-purple-900 text-white font-bold' : ''}`}
            title="문서함 (발급 전 문서)"
          >
            <Inbox className="w-5 h-5" />
          </button>
          <button
            onClick={() => openTab('bolta_api')}
            className={`p-2 rounded hover:bg-white/10 ${activeTabId === 'bolta_api' ? 'bg-purple-900 text-white font-bold' : ''}`}
            title="볼타 API 연동"
          >
            <Cpu className="w-5 h-5" />
          </button>
          <button
            onClick={() => openTab('customer_mgt')}
            className={`p-2 rounded hover:bg-white/10 ${activeTabId === 'customer_mgt' ? 'bg-purple-900 text-white font-bold' : ''}`}
            title="거래처 관리"
          >
            <Building2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => openTab('business_info')}
            className={`p-2 rounded hover:bg-white/10 ${activeTabId === 'business_info' ? 'bg-purple-900 text-white font-bold' : ''}`}
            title="사업자 정보"
          >
            <FileSpreadsheet className="w-5 h-5" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-56 bg-[#463785] text-white flex flex-col select-none shrink-0 z-20 shadow-md font-sans">
      {/* Module Title Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-purple-700/50">
        <h2 className="font-bold text-base tracking-wide text-white flex items-center gap-2">
          {activeModule === 'tax' && '세금계산서'}
          {activeModule === 'accounting' && '경리회계'}
          {activeModule === 'hr' && '인사근무'}
          {activeModule === 'contract' && '전자계약'}
        </h2>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 hover:bg-white/10 rounded text-purple-200 hover:text-white transition-colors"
          title="사이드바 접기"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 text-xs">
        {/* Quick Issue Badge Box */}
        {activeModule === 'tax' && (
          <div className="bg-white/10 rounded-lg p-3 mx-1 border border-white/10 text-white">
            <div className="text-[11px] text-purple-200 mb-1">발급 가능 문서</div>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white">100건</span>
              <button
                onClick={() => openTab('nts_form')}
                className="bg-[#6049B6] hover:bg-[#6E55C7] text-white px-3 py-1 rounded font-medium shadow-sm transition-colors text-xs"
              >
                작성
              </button>
            </div>
          </div>
        )}

        {/* TAX INVOICE MODULE SIDEBAR NAVIGATION */}
        {activeModule === 'tax' && (
          <>
            {/* GROUP 1: 문서작성 */}
            <div>
              <button
                onClick={() => toggleSection('drafting')}
                className="w-full flex items-center justify-between px-2 py-1.5 font-semibold text-purple-100 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>문서작성</span>
                </div>
                {openSection['drafting'] ? (
                  <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
                )}
              </button>

              {openSection['drafting'] && (
                <div className="ml-4 pl-2 border-l border-purple-500/40 space-y-1 mt-1">
                  <button
                    onClick={() => openTab('nts_form')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      activeTabId === 'nts_form'
                        ? 'bg-[#6049B6] text-white font-bold shadow-sm'
                        : 'text-purple-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    세금계산서 작성
                  </button>
                  <button
                    onClick={() => openTab('nts_form')}
                    className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    거래명세서 작성
                  </button>
                  <button
                    onClick={() => openTab('db_issue')}
                    className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    대량등록 (DB)
                  </button>
                  <button
                    onClick={() => openTab('nts_form')}
                    className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    수정 작성
                  </button>
                </div>
              )}
            </div>

            {/* GROUP 2: 문서함 */}
            <div>
              <button
                onClick={() => toggleSection('inbox')}
                className="w-full flex items-center justify-between px-2 py-1.5 font-semibold text-purple-100 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Inbox className="w-3.5 h-3.5" />
                  <span>문서함</span>
                </div>
                {openSection['inbox'] ? (
                  <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
                )}
              </button>

              {openSection['inbox'] && (
                <div className="ml-4 pl-2 border-l border-purple-500/40 space-y-1 mt-1">
                  <button
                    onClick={() => openTab('unissued_docs')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      activeTabId === 'unissued_docs'
                        ? 'bg-[#6049B6] text-white font-bold shadow-sm'
                        : 'text-purple-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    발급 전 문서
                  </button>
                  <button
                    onClick={() => openTab('unissued_docs')}
                    className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    국세청 전송문서
                  </button>
                  <button
                    onClick={() => openTab('unissued_docs')}
                    className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    거래명세서
                  </button>
                </div>
              )}
            </div>

            {/* GROUP 3: 볼타 & DB 연동 관제 */}
            <div>
              <button
                onClick={() => toggleSection('integration')}
                className="w-full flex items-center justify-between px-2 py-1.5 font-semibold text-purple-100 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>API 연동 정보</span>
                </div>
                {openSection['integration'] ? (
                  <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
                )}
              </button>

              {openSection['integration'] && (
                <div className="ml-4 pl-2 border-l border-purple-500/40 space-y-1 mt-1">
                  <button
                    onClick={() => openTab('bolta_api')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      activeTabId === 'bolta_api'
                        ? 'bg-[#6049B6] text-white font-bold shadow-sm'
                        : 'text-purple-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    볼타(Bolta) API 연동
                  </button>
                  <button
                    onClick={() => openTab('db_issue')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      activeTabId === 'db_issue'
                        ? 'bg-[#6049B6] text-white font-bold shadow-sm'
                        : 'text-purple-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    DB 자동발행 관제
                  </button>
                </div>
              )}
            </div>

            {/* GROUP 4: 기초 / 거래처 관리 */}
            <div>
              <button
                onClick={() => toggleSection('master')}
                className="w-full flex items-center justify-between px-2 py-1.5 font-semibold text-purple-100 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>거래처 / 기준정보</span>
                </div>
                {openSection['master'] ? (
                  <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
                )}
              </button>

              {openSection['master'] && (
                <div className="ml-4 pl-2 border-l border-purple-500/40 space-y-1 mt-1">
                  <button
                    onClick={() => openTab('customer_mgt')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      activeTabId === 'customer_mgt'
                        ? 'bg-[#6049B6] text-white font-bold shadow-sm'
                        : 'text-purple-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    거래처 관리
                  </button>
                  <button
                    onClick={() => openTab('customer_mgt')}
                    className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    품목 관리
                  </button>
                  <button
                    onClick={() => openTab('unissued_docs')}
                    className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    합계표
                  </button>
                </div>
              )}
            </div>

            {/* GROUP 5: 세금계산서 설정 */}
            <div>
              <button
                onClick={() => toggleSection('settings')}
                className="w-full flex items-center justify-between px-2 py-1.5 font-semibold text-purple-100 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5" />
                  <span>세금계산서 설정</span>
                </div>
                {openSection['settings'] ? (
                  <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
                )}
              </button>

              {openSection['settings'] && (
                <div className="ml-4 pl-2 border-l border-purple-500/40 space-y-1 mt-1">
                  <button
                    onClick={() => openTab('business_info')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      activeTabId === 'business_info'
                        ? 'bg-[#6049B6] text-white font-bold shadow-sm'
                        : 'text-purple-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    사업자 정보
                  </button>
                  <button
                    onClick={() => openTab('user_permissions')}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors ${
                      activeTabId === 'user_permissions'
                        ? 'bg-[#6049B6] text-white font-bold shadow-sm'
                        : 'text-purple-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    사용 권한 관리
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* GENERAL ACCOUNTING MODULE (경리회계) SIDEBAR */}
        {activeModule === 'accounting' && (
          <>
            <div>
              <button
                onClick={() => toggleSection('accounting_expense')}
                className="w-full flex items-center justify-between px-2 py-1.5 font-semibold text-purple-100 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>경비지출관리</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
              </button>
              <div className="ml-4 pl-2 border-l border-purple-500/40 space-y-1 mt-1">
                <button
                  onClick={() => openTab('business_info')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5"
                >
                  법인카드
                </button>
                <button
                  onClick={() => openTab('business_info')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5"
                >
                  개인경비
                </button>
                <button
                  onClick={() => openTab('business_info')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5"
                >
                  예산편성 / 사용
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={() => toggleSection('accounting_sales')}
                className="w-full flex items-center justify-between px-2 py-1.5 font-semibold text-purple-100 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>매출입 / 입출금</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
              </button>
              <div className="ml-4 pl-2 border-l border-purple-500/40 space-y-1 mt-1">
                <button
                  onClick={() => openTab('unissued_docs')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5"
                >
                  매출 / 매입
                </button>
                <button
                  onClick={() => openTab('customer_mgt')}
                  className="w-full text-left px-2.5 py-1.5 rounded text-purple-200 hover:text-white hover:bg-white/5"
                >
                  거래처 관리
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
