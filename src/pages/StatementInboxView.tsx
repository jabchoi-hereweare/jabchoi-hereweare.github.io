import React from 'react';
import { FileText, Search, Download, Printer, Mail } from 'lucide-react';

export const StatementInboxView: React.FC = () => {
  const statements = [
    { id: 'ST-2026-0811-01', date: '2026-08-11', partner: '(주)볼타코퍼레이션', bizNo: '120-88-99012', items: 'ERP 라이선스 외 1건', amount: '2,200,000 원', email: '발송완료' },
    { id: 'ST-2026-0810-02', date: '2026-08-10', partner: '(주)회무사텍', bizNo: '211-86-54321', items: '컨설팅 및 기술지원', amount: '1,100,000 원', email: '미발송' },
    { id: 'ST-2026-0808-03', date: '2026-08-08', partner: '(주)삼일세무법인', bizNo: '105-87-12345', items: '세무서식 양식 세트', amount: '550,000 원', email: '발송완료' },
  ];

  return (
    <div className="p-6 space-y-6 font-sans text-slate-800 bg-[#F4F5F8] min-h-full">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>거래명세서 문서함</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          발행된 거래명세서 내역을 조회하고 엑셀 출력 및 거래처 재발송을 관리합니다.
        </p>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-4 text-xs space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-slate-800">거래명세서 목록</span>
          <div className="flex items-center gap-2">
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1 rounded flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>엑셀 다운로드</span>
            </button>
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1 rounded flex items-center gap-1">
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>인쇄</span>
            </button>
          </div>
        </div>

        <div className="border border-slate-200 rounded overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-blue-50/70 text-blue-900 font-bold border-b border-blue-200">
              <tr>
                <th className="p-2.5">문서번호</th>
                <th className="p-2.5">작성일</th>
                <th className="p-2.5">거래처명</th>
                <th className="p-2.5">사업자번호</th>
                <th className="p-2.5">대표 품목</th>
                <th className="p-2.5 text-right">합계 금액</th>
                <th className="p-2.5 text-center">메일 발송</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statements.map((st) => (
                <tr key={st.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="p-2.5 font-mono text-slate-600">{st.id}</td>
                  <td className="p-2.5 font-medium">{st.date}</td>
                  <td className="p-2.5 font-bold text-slate-900">{st.partner}</td>
                  <td className="p-2.5 font-mono text-slate-600">{st.bizNo}</td>
                  <td className="p-2.5 text-slate-700">{st.items}</td>
                  <td className="p-2.5 text-right font-bold text-blue-900">{st.amount}</td>
                  <td className="p-2.5 text-center text-slate-500">
                    <span className="inline-flex items-center gap-1 text-[11px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {st.email}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
