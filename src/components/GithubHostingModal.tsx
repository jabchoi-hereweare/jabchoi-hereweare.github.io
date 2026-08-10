import React, { useState } from 'react';
import { X, Globe, Github, Terminal, CheckCircle2, Copy, ExternalLink, Code2, Sparkles, BookOpen } from 'lucide-react';

interface GithubHostingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubHostingModal: React.FC<GithubHostingModalProps> = ({ isOpen, onClose }) => {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(label);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const workflowYmlCode = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-6 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                GitHub Pages 호스팅 가이드
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  아이디.github.io
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                무료로 깃허브 웹 호스팅(GitHub Pages)에 1분만에 배포하는 단계별 가이드입니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 text-sm">
          {/* Highlight Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm">Vite 상대 경로 설정 완료 (`base: './'`)</h3>
              <p className="text-xs text-slate-300">
                이미 프로젝트의 <code className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded">vite.config.ts</code>에 <code className="text-emerald-400">base: './'</code> 설정이 적용되어 있어, 루트 도메인(<code className="text-amber-300">username.github.io</code>)이나 서브경로(<code className="text-amber-300">username.github.io/taccx</code>) 어느 곳에 배포해도 정적 리소스(CSS, JS)가 완벽히 동작합니다.
              </p>
            </div>
          </div>

          {/* Option A: GitHub Actions (Recommended) */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">1</span>
                방법 A: GitHub Actions 자동 배포 (추천 🔥)
              </h3>
              <span className="text-[11px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md font-mono border border-indigo-500/30">
                git push 시 자동 배포
              </span>
            </div>

            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 pl-1 leading-relaxed">
              <li>
                <strong>깃허브 레포지토리 생성</strong>: GitHub에서 신규 저장소를 만듭니다 (예: <code className="text-cyan-300 font-mono">username.github.io</code> 또 다른 이름).
              </li>
              <li>
                <strong>프로젝트 푸시</strong>: local 프로젝트 코드를 GitHub <code className="text-cyan-300 font-mono">main</code> 브랜치로 푸시합니다.
              </li>
              <li>
                <strong>GitHub Pages 설정</strong>:
                <div className="mt-1 ml-4 p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  <span className="font-semibold text-white">Repository Settings</span> → <span className="font-semibold text-white">Pages</span> 이동 → Build and deployment의 <span className="text-amber-300 font-bold">Source</span>를 <code className="text-emerald-400 font-bold font-mono">GitHub Actions</code>로 선택!
                </div>
              </li>
              <li>
                자동으로 프로젝트 루트의 <code className="text-cyan-300 font-mono">.github/workflows/deploy.yml</code> 파일이 실행되며 배포됩니다.
              </li>
            </ol>

            {/* Workflow File Code Block */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  .github/workflows/deploy.yml (이미 생성됨)
                </span>
                <button
                  onClick={() => handleCopy(workflowYmlCode, 'workflow')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium flex items-center gap-1 transition-colors text-slate-200"
                >
                  {copiedScript === 'workflow' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">복사완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>코드 복사</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 text-[11px] font-mono overflow-x-auto">
                {workflowYmlCode}
              </pre>
            </div>
          </div>

          {/* Option B: gh-pages Package */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                방법 B: gh-pages 패키지 CLI 수동 배포
              </h3>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-mono border border-emerald-500/30">
                터미널 명령어 한 줄 배포
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                터미널에서 <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">gh-pages</code> 패키지를 통해 정적 빌드 결과물(<code className="text-emerald-400 font-mono">dist/</code>)을 직접 <code className="text-amber-300 font-mono">gh-pages</code> 브랜치에 게시할 수 있습니다.
              </p>

              {/* Step Commands */}
              <div className="space-y-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-300">npm install -D gh-pages</span>
                  <button
                    onClick={() => handleCopy('npm install -D gh-pages', 'gh-install')}
                    className="p-1 text-slate-400 hover:text-white"
                    title="복사"
                  >
                    {copiedScript === 'gh-install' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-slate-400 text-[11px]">package.json 의 scripts에 추가:</p>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300">
                  "predeploy": "npm run build",<br />
                  "deploy": "gh-pages -d dist"
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">npm run deploy</span>
                  <button
                    onClick={() => handleCopy('npm run deploy', 'gh-deploy')}
                    className="p-1 text-slate-400 hover:text-white"
                    title="복사"
                  >
                    {copiedScript === 'gh-deploy' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Domain Setup Tip */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-white text-xs flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-400" />
              나만의 도메인 주소 만들기 (username.github.io)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              GitHub 아이디가 <code className="text-cyan-300 font-mono font-bold">myid</code>라면, 레포지토리 이름을 정확히 <code className="text-amber-300 font-mono font-bold">myid.github.io</code>로 생성하고 배포하면 서브 경로 없이 <code className="text-emerald-400 font-mono font-bold">https://myid.github.io</code> 메인 도메인 주소로 즉시 호스팅됩니다!
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            확인했습니다 (닫기)
          </button>
        </div>
      </div>
    </div>
  );
};
