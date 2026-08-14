import React, { useState } from 'react';
import { HoemusaHeader } from './components/HoemusaHeader';
import { HoemusaSidebar, TabId } from './components/HoemusaSidebar';
import { HoemusaWorkspaceTabs, TabItem } from './components/HoemusaWorkspaceTabs';
import { ErpTaxInvoiceModule } from './components/ErpTaxInvoiceModule';
import { TransactionStatementFormView } from './pages/TransactionStatementFormView';
import { AmendedTaxInvoiceFormView } from './pages/AmendedTaxInvoiceFormView';
import { UnissuedDocumentsView } from './pages/UnissuedDocumentsView';
import { NtsTransmittedView } from './pages/NtsTransmittedView';
import { StatementInboxView } from './pages/StatementInboxView';
import { BoltaApiImplementationPage } from './pages/BoltaApiImplementationPage';
import { DatabaseBoltaIssuePage } from './pages/DatabaseBoltaIssuePage';
import { CustomerManagementView } from './pages/CustomerManagementView';
import { BusinessInfoView } from './pages/BusinessInfoView';
import { UserPermissionsView } from './pages/UserPermissionsView';
import { GithubHostingModal } from './components/GithubHostingModal';
import { ArrowUp, Github } from 'lucide-react';

export const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);

  // Default Open Tabs (Centered around Tax Invoice Core with connected ERP Modules)
  const [openTabs, setOpenTabs] = useState<TabItem[]>([
    { id: 'nts_form', title: '전자세금계산서 발행 (적색)' },
    { id: 'unissued_docs', title: '발급 전 전표/문서함' },
    { id: 'customer_mgt', title: '거래처 마스터' },
    { id: 'bolta_api', title: '볼타 API 연동' },
  ]);
  const [activeTabId, setActiveTabId] = useState<TabId>('nts_form');

  // Comprehensive Tab Title Dictionary for all ERP Views
  const tabTitles: Record<TabId, string> = {
    nts_form: '전자세금계산서 발행 (적색)',
    statement_form: '거래명세서 작성 (청색)',
    amended_form: '수정 세금계산서 작성',
    db_issue: '대량등록 (DB 발행)',
    unissued_docs: '발급 전 전표/문서함',
    nts_transmitted: '국세청 전송문서함',
    statement_inbox: '거래명세서 문서함',
    bolta_api: '볼타 API 연동',
    customer_mgt: '거래처 마스터',
    business_info: '사업자 정보',
    user_permissions: '사용 권한 관리',
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
      {/* Top Header Bar */}
      <HoemusaHeader
        activeTabId={activeTabId}
        onOpenTab={handleOpenTab}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Bar */}
        <HoemusaSidebar
          activeTabId={activeTabId}
          openTab={handleOpenTab}
          collapsed={isSidebarCollapsed}
          setCollapsed={setIsSidebarCollapsed}
        />

        {/* Main Content Area Container */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F4F5F8]">
          {/* Top Sub-Tabs Workspace Bar */}
          <HoemusaWorkspaceTabs
            openTabs={openTabs}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
            closeTab={handleCloseTab}
          />

          {/* Active View Render Workspace */}
          <main className="flex-1 overflow-y-auto">
            {activeTabId === 'nts_form' && (
              <ErpTaxInvoiceModule onNavigateTab={(id) => handleOpenTab(id as TabId)} />
            )}
            {activeTabId === 'statement_form' && <TransactionStatementFormView />}
            {activeTabId === 'amended_form' && <AmendedTaxInvoiceFormView />}
            {activeTabId === 'db_issue' && <DatabaseBoltaIssuePage />}
            {activeTabId === 'unissued_docs' && (
              <UnissuedDocumentsView onOpenTab={handleOpenTab} />
            )}
            {activeTabId === 'nts_transmitted' && <NtsTransmittedView />}
            {activeTabId === 'statement_inbox' && <StatementInboxView />}
            {activeTabId === 'bolta_api' && <BoltaApiImplementationPage />}
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

export default App;
