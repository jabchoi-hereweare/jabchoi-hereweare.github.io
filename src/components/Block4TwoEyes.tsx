import React from 'react';
import { TwoEyesSplitViewer } from '../modules/tax-invoice';

interface Block4Props {
  formData?: any;
}

export const Block4TwoEyes: React.FC<Block4Props> = ({ formData }) => {
  return (
    <section className="py-12 border-b border-slate-800">
      <div className="container max-w-5xl mx-auto">
        <TwoEyesSplitViewer formData={formData} />
      </div>
    </section>
  );
};
