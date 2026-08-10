import React, { useState } from 'react';
import { Header, MainPageType } from './components/Header';
import { NtsBlankFormPage } from './pages/NtsBlankFormPage';
import { BoltaApiImplementationPage } from './pages/BoltaApiImplementationPage';
import { DatabaseBoltaIssuePage } from './pages/DatabaseBoltaIssuePage';
import { PreviousComprehensiveModulePage } from './pages/PreviousComprehensiveModulePage';
import { GithubHostingModal } from './components/GithubHostingModal';
import { ArrowUp, Github, Sparkles, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<MainPageType>('nts');
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Main Top Header Navigation */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
      />

      {/* Main Page Render Workspace */}
      <main className="flex-1 pb-16">
        {/* PAGE 1: 국세청 세금계산서 화면 (빈 칸 + 힌트) */}
        {activePage === 'nts' && <NtsBlankFormPage />}

        {/* PAGE 2: 볼타 API 세금계산서 발행 API 구현 */}
        {activePage === 'bolta_api' && <BoltaApiImplementationPage />}

        {/* PAGE 3: DB 불러와서 볼타 API를 통해 세금계산서 발행하는 페이지 */}
        {activePage === 'db_issue' && <DatabaseBoltaIssuePage />}

        {/* PAGE 4: 기존에 만들던 화면 (종합 ERP 세금계산서 관제 모듈 & 시뮬레이터) */}
        {activePage === 'previous' && <PreviousComprehensiveModulePage />}
      </main>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 no-print">
        <button
          onClick={() => setIsGithubModalOpen(true)}
          className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-600/30 transition-all group border border-purple-400/30"
          title="GitHub Pages 호스팅 가이드"
        >
          <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-xl transition-all group"
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

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-slate-500 text-xs text-center no-print">
        <div className="container mx-auto space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 font-bold text-slate-400">
            <span>회무사 ERP 세무 시스템</span>
            <span>·</span>
            <span>국세청 표준 적색 양식</span>
            <span>·</span>
            <span>볼타(Bolta) REST API v1</span>
            <span>·</span>
            <span className="text-emerald-400 font-mono">GitHub Pages (아이디.github.io) 호스팅 규격</span>
          </div>
          <p>© 2026 HOEMUSA. All rights reserved. 중소기업 ERP 내부 시스템 테스트 및 세무 학습 전용 모듈입니다.</p>
        </div>
      </footer>
    </div>
  );
};
