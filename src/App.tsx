import React, { useState } from 'react';
import { HiworksHeader, HiworksModuleType } from './components/HiworksHeader';
import { HiworksSidebar, TabId } from './components/HiworksSidebar';
import { HiworksWorkspaceTabs, TabItem } from './components/HiworksWorkspaceTabs';
import { NtsBlankFormPage } from './pages/NtsBlankFormPage';
import { UnissuedDocumentsView } from './pages/UnissuedDocumentsView';
import { BoltaApiImplementationPage } from './pages/BoltaApiImplementationPage';
import { DatabaseBoltaIssuePage } from './pages/DatabaseBoltaIssuePage';
import { CustomerManagementView } from './pages/CustomerManagementView';
import { BusinessInfoView } from './pages/BusinessInfoView';
import { UserPermissionsView } from './pages/UserPermissionsView';
import { GithubHostingModal } from './components/GithubHostingModal';
import { ArrowUp, Github } from 'lucide-react';

export const App: React.FC = () => {
  // Global module state (인사근무 / 경리회계 / 세금계산서 / 전자계약)
  const [activeModule, setActiveModule] = useState<HiworksModuleType>('tax');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);

  // Workspace Tabs State
  const [openTabs, setOpenTabs] = useState<TabItem[]>([
    { id: 'nts_form', title: '세금계산서 작성' },
    { id: 'unissued_docs', title: '발급 전 문서' },
    { id: 'customer_mgt', title: '거래처 관리' },
    { id: 'business_info', title: '사업자 정보' },
    { id: 'user_permissions', title: '사용 권한 관리' },
  ]);
  const [activeTabId, setActiveTabId] = useState<TabId>('nts_form');

  // Tab Title Dictionary
  const tabTitles: Record<TabId, string> = {
    nts_form: '세금계산서 작성',
    unissued_docs: '발급 전 문서',
    bolta_api: '볼타 API 연동',
    db_issue: 'DB 연동 발행',
    customer_mgt: '거래처 관리',
    business_info: '사업자 정보',
    user_permissions: '사용 권한 관리',
    expense_mgt: '경비지출 관리',
  };

  // Open a new tab or focus existing
  const handleOpenTab = (tabId: TabId) => {
    if (!openTabs.some((t) => t.id === tabId)) {
      setOpenTabs((prev) => [...prev, { id: tabId, title: tabTitles[tabId] || '작업 영역' }]);
    }
    setActiveTabId(tabId);
  };

  // Close a tab
  const handleCloseTab = (tabId: TabId) => {
    if (openTabs.length <= 1) return; // Keep at least 1 tab open
    const filtered = openTabs.filter((t) => t.id !== tabId);
    setOpenTabs(filtered);

    if (activeTabId === tabId) {
      setActiveTabId(filtered[filtered.length - 1].id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F8] text-slate-800 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Header Bar (Hiworks Corporate Header) */}
      <HiworksHeader
        activeModule={activeModule}
        setActiveModule={(mod) => {
          setActiveModule(mod);
          if (mod === 'accounting') {
            handleOpenTab('business_info');
          } else if (mod === 'tax') {
            handleOpenTab('nts_form');
          }
        }}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
      />

      {/* Main Workspace Body: Left Sidebar + Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Bar (Hiworks LNB) */}
        <HiworksSidebar
          activeModule={activeModule}
          activeTabId={activeTabId}
          openTab={handleOpenTab}
          collapsed={isSidebarCollapsed}
          setCollapsed={setIsSidebarCollapsed}
        />

        {/* Main Content Area Container */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F4F5F8]">
          {/* Top Sub-Tabs Workspace Bar */}
          <HiworksWorkspaceTabs
            openTabs={openTabs}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
            closeTab={handleCloseTab}
          />

          {/* Active View Render Workspace */}
          <main className="flex-1 overflow-y-auto">
            {activeTabId === 'nts_form' && <NtsBlankFormPage />}
            {activeTabId === 'unissued_docs' && (
              <UnissuedDocumentsView onOpenTab={handleOpenTab} />
            )}
            {activeTabId === 'bolta_api' && <BoltaApiImplementationPage />}
            {activeTabId === 'db_issue' && <DatabaseBoltaIssuePage />}
            {activeTabId === 'customer_mgt' && <CustomerManagementView />}
            {activeTabId === 'business_info' && <BusinessInfoView />}
            {activeTabId === 'user_permissions' && <UserPermissionsView />}
          </main>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 no-print">
        <button
          onClick={() => setIsGithubModalOpen(true)}
          className="p-3 rounded-full bg-[#5E48B4] hover:bg-[#4E39A2] text-white shadow-lg transition-all group border border-purple-300/30"
          title="GitHub Pages 배포 안내"
        >
          <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-md transition-all group"
          title="맨 위로"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* GitHub Pages Hosting Guide Modal */}
      <GithubHostingModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </div>
  );
};
