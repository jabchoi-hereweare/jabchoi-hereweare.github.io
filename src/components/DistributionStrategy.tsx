import React from 'react';
import { Share2, Video, Globe, Smartphone, ArrowUpRight } from 'lucide-react';

export const DistributionStrategy: React.FC = () => {
  return (
    <section className="py-12 border-b border-slate-800 bg-slate-950/40">
      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-3 tracking-wide uppercase border border-purple-500/20">
            포맷과 유통 전략
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            하나의 원본 콘텐츠, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">4개의 원소스 멀티유즈(OSMU)</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            인터랙티브 웹 아티클을 축으로 검색 유입, 숏폼 바이럴, 자사 서비스 전환을 동시 타격합니다.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Channel 1: Web Article */}
          <div className="glass-panel p-5 rounded-xl border border-blue-500/30 bg-slate-900/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">1. 주력: 인터랙티브 웹 아티클 (Next.js)</h3>
                <span className="text-[11px] text-blue-400 font-mono">자체 도메인 SEO 자산 구축</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              본문 내 인터랙티브 작성기가 직접 매립된 웹 아티클. 체류 시간을 극대화하고 검색 엔진(Google, Naver)의 상위 노출 자산으로 축적됩니다.
            </p>
          </div>

          {/* Channel 2: Naver Blog */}
          <div className="glass-panel p-5 rounded-xl border border-emerald-500/30 bg-slate-900/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">2. 네이버 블로그: 텍스트 요약 버전</h3>
                <span className="text-[11px] text-emerald-400 font-mono">사장님 타깃 키워드 검색 유입</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              위젯 없이 <strong className="text-emerald-300">"세금계산서 필수 칸은 4개뿐입니다"</strong> 핵심 요약과 캡처 이미지 위주 포스팅. 하단에 '직접 채워보기 링크' 삽입.
            </p>
          </div>

          {/* Channel 3: Short-form Video */}
          <div className="glass-panel p-5 rounded-xl border border-pink-500/30 bg-slate-900/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">3. 숏폼 45초 (인스타 릴스 / 유튜브 쇼츠)</h3>
                <span className="text-[11px] text-pink-400 font-mono">화면 녹화 바이럴 레버리지</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              빈 양식 줌인 → 4개 칸만 입력 → 초록불 4개 점등 & "끝입니다. 가산세 0원!" 사운드 구성. 극도의 안도감을 전달하는 45초 녹화 영상.
            </p>
          </div>

          {/* Channel 4: Landing Page Lead Magnet */}
          <div className="glass-panel p-5 rounded-xl border border-amber-500/30 bg-slate-900/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">4. 랜딩 후크: "세금계산서 연습장" 무료 도구</h3>
                <span className="text-[11px] text-amber-400 font-mono">ERP · SaaS 고객 전환 접점</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              위젯을 단독 페이지로 독립시켜 초보 사장님·프리랜서용 무료 실습 도구로 제공. 추후 전자세금계산서 정식 연동 ERP나 SaaS 서비스로 자연스러운 펀널 연결.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
