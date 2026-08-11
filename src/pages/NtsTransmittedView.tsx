import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Clock, Search, Download, ExternalLink } from 'lucide-react';

export const NtsTransmittedView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const transmittedDocs = [
    {
      id: 'NTS-20260811-001',
      ntsApprovalNo: '20260811-41000000-00998877',
      transmittedAt: '2026-08-11 09:30:15',
      partnerName: '(주)볼타코퍼레이션',
      bizNo: '120-88-99012',
      amount: '1,100,000 원',
      status: '전송완료',
      ntsCode: 'SUCCESS_200',
    },
    {
      id: 'NTS-20260810-002',
      ntsApprovalNo: '20260810-41000000-00998876',
      transmittedAt: '2026-08-10 18:14:02',
      partnerName: '(주)회무사텍',
      bizNo: '211-86-54321',
      amount: '5,500,000 원',
      status: '전송완료',
      ntsCode: 'SUCCESS_200',
    },
    {
      id: 'NTS-20260809-003',
      ntsApprovalNo: '20260809-41000000-00998875',
      transmittedAt: '2026-08-09 11:05:44',
      partnerName: '(주)삼일세무법인',
      bizNo: '105-87-12345',
      amount: '3,300,000 원',
      status: '전송완료',
      ntsCode: 'SUCCESS_200',
    },
    {
      id: 'NTS-20260807-004',
      ntsApprovalNo: '미발급 (전송실패)',
      transmittedAt: '2026-08-07 14:02:11',
      partnerName: '오류발생 수임처',
      bizNo: '999-00-00000',
      amount: '500,000 원',
      status: '전송실패',
      ntsCode: 'ERR_INVALID_BIZ_NO',
    },
  ];

  return (
    <div className="p-6 space-y-6 font-sans text-slate-800 bg-[#F4F5F8] min-h-full">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Send className="w-5 h-5 text-purple-600" />
          <span>국세청 전송문서함</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          국세청 홈택스로 전송 완료되었거나 전송 중인 세금계산서의 24자리 승인번호 및 전송 결과를 관제합니다.
        </p>
      </div>

      {/* Filter Box */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm text-xs flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-600 font-semibold">검색:</span>
          <div className="relative">
            <input
              type="text"
              placeholder="국세청 승인번호 / 거래처명"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-slate-300 rounded pl-7 pr-3 py-1.5 bg-white text-slate-700 w-64 focus:outline-none focus:border-purple-600"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-600 font-semibold">전송 결과:</span>
          <select className="border border-slate-300 rounded px-3 py-1.5 bg-white text-slate-700">
            <option>전체</option>
            <option>전송완료</option>
            <option>전송중</option>
            <option>전송실패</option>
          </select>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded font-semibold ml-auto shadow-sm">
          조회
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-4 text-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-slate-800">국세청 전송 성공/실패 내역</span>
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1 rounded flex items-center gap-1">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>결과 엑셀 다운로드</span>
          </button>
        </div>

        <div className="border border-slate-200 rounded overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#F8F9FB] text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">전송 일시</th>
                <th className="p-2.5">국세청 승인번호 (24자리)</th>
                <th className="p-2.5">공급받는자</th>
                <th className="p-2.5">사업자번호</th>
                <th className="p-2.5 text-right">발급 금액</th>
                <th className="p-2.5 text-center">전송 상태</th>
                <th className="p-2.5 text-center">상세</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transmittedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="p-2.5 font-mono text-slate-600">{doc.transmittedAt}</td>
                  <td className="p-2.5 font-mono font-bold text-purple-900">{doc.ntsApprovalNo}</td>
                  <td className="p-2.5 font-bold text-slate-900">{doc.partnerName}</td>
                  <td className="p-2.5 font-mono text-slate-600">{doc.bizNo}</td>
                  <td className="p-2.5 text-right font-bold text-slate-900">{doc.amount}</td>
                  <td className="p-2.5 text-center">
                    {doc.status === '전송완료' ? (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[11px]">
                        ✓ 전송완료
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-full font-bold text-[11px]">
                        ✕ 전송실패 (오류)
                      </span>
                    )}
                  </td>
                  <td className="p-2.5 text-center">
                    <button className="text-purple-600 hover:underline flex items-center justify-center gap-0.5 mx-auto font-semibold">
                      <span>조회</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
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
