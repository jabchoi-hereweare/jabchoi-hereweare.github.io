import React from 'react';
import { TaxInvoiceForm } from '../modules/tax-invoice';

interface Block3Props {
  widgetRef?: React.RefObject<HTMLDivElement>;
  formData?: any;
  setFormData?: any;
}

export const Block3TaxInvoiceWidget: React.FC<Block3Props> = ({ widgetRef }) => {
  return (
    <section ref={widgetRef} className="py-12 border-b border-slate-800" id="widget-section">
      <div className="container max-w-5xl mx-auto">
        {/* Header Tag */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-3 tracking-wide uppercase border border-emerald-500/20">
            블록 ③ · 볼타(Bolta) API 연동 세금계산서 작성 모듈
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            직접 채워보는 <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">세금계산서 연습장</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            국세청 MOD-10 사업자번호 검증, 5대 날짜 이상탐지, 다중 품목 입력을 지원하는 ERP 모듈입니다.
          </p>
        </div>

        {/* Embedded Tax Invoice Form Module */}
        <TaxInvoiceForm widgetRef={widgetRef} />
      </div>
    </section>
  );
};
