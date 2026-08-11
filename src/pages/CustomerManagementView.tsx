import React, { useState } from 'react';
import { Search, Plus, Upload, Download, Printer, Settings } from 'lucide-react';

export const CustomerManagementView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const mockCustomers = [
    {
      code: 'CUST-001',
      category: '매출처',
      name: '(주)볼타코퍼레이션',
      ceo: '이볼타',
      bizNo: '120-88-99012',
      type: '법인사업자',
      phone: '02-555-1234',
      bizType: '소프트웨어 개발 / 세무 API',
      status: '사용',
    },
    {
      code: 'CUST-002',
      category: '매출/매입처',
      name: '(주)회무사텍',
      ceo: '최승용',
      bizNo: '211-86-54321',
      type: '법인사업자',
      phone: '02-777-9876',
      bizType: '경리회계 ERP 서비스',
      status: '사용',
    },
    {
      code: 'CUST-003',
      category: '매입처',
      name: '(주)삼일세무법인',
      ceo: '김삼일',
      bizNo: '105-87-12345',
      type: '법인사업자',
      phone: '02-333-4455',
      bizType: '세무대리 / 회계감사',
      status: '사용',
    },
    {
      code: 'CUST-004',
      category: '매출처',
      name: '국세청 홈택스 연동고객',
      ceo: '홍길동',
      bizNo: '301-81-00987',
      type: '개인사업자',
      phone: '010-9988-7766',
      bizType: '전자상거래 도소매',
      status: '사용',
    },
  ];

  return (
    <div className="p-6 space-y-6 font-sans text-slate-800 bg-[#F4F5F8] min-h-full">
      {/* Page Title & Subtitle (Reference Screenshot 4) */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          거래처관리
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          경리회계, 세금계산서에서 사용하는 거래처를 통합 관리합니다.
        </p>
      </div>

      {/* Filter Box (Reference Screenshot 4) */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm text-xs space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-semibold">거래처:</span>
            <div className="relative">
              <input
                type="text"
                placeholder="거래처명/사업자등록번호"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-slate-300 rounded pl-7 pr-3 py-1.5 bg-white text-slate-700 w-56 focus:outline-none focus:border-purple-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-semibold">거래처 구분:</span>
            <select className="border border-slate-300 rounded px-3 py-1.5 bg-white text-slate-700">
              <option>전체</option>
              <option>매출처</option>
              <option>매입처</option>
              <option>매출/매입처</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-semibold">사용 구분:</span>
            <select className="border border-slate-300 rounded px-3 py-1.5 bg-white text-slate-700">
              <option>전체</option>
              <option>일반거래처</option>
              <option>금융기관</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-semibold">사용여부:</span>
            <select className="border border-slate-300 rounded px-3 py-1.5 bg-white text-slate-700">
              <option>전체</option>
              <option>사용</option>
              <option>미사용</option>
            </select>
          </div>

          <button className="bg-[#5E48B4] hover:bg-[#4E39A2] text-white px-4 py-1.5 rounded font-semibold flex items-center gap-1.5 shadow-sm transition-colors ml-auto">
            <Search className="w-3.5 h-3.5" />
            <span>조회</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Action Toolbar & Table (Reference Screenshot 4) */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-4 text-xs">
        {/* Action Buttons Toolbar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded text-purple-600" id="selectAll" />
            <button className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              <span>추가하기</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded flex items-center gap-1">
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>엑셀업로드</span>
            </button>
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>엑셀다운로드</span>
            </button>
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded flex items-center gap-1">
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>인쇄</span>
            </button>
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-2.5 py-1.5 rounded flex items-center gap-1">
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>설정</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="border border-slate-200 rounded overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700 border-collapse">
            <thead className="bg-[#F8F9FB] text-slate-700 border-b border-slate-200 font-bold">
              <tr>
                <th className="p-2.5 text-center w-10">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-2.5">거래처 코드</th>
                <th className="p-2.5">거래처 구분</th>
                <th className="p-2.5">거래처명</th>
                <th className="p-2.5">대표자명</th>
                <th className="p-2.5">사업자번호</th>
                <th className="p-2.5">거래처 종류</th>
                <th className="p-2.5">전화번호</th>
                <th className="p-2.5">업태 / 종목</th>
                <th className="p-2.5 text-center">사용여부</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCustomers.map((cust) => (
                <tr key={cust.code} className="hover:bg-purple-50/30 transition-colors">
                  <td className="p-2.5 text-center">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-2.5 font-mono text-slate-500">{cust.code}</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 text-[11px]">
                      {cust.category}
                    </span>
                  </td>
                  <td className="p-2.5 font-bold text-slate-900">{cust.name}</td>
                  <td className="p-2.5">{cust.ceo}</td>
                  <td className="p-2.5 font-mono text-slate-600">{cust.bizNo}</td>
                  <td className="p-2.5 text-slate-600">{cust.type}</td>
                  <td className="p-2.5 text-slate-600">{cust.phone}</td>
                  <td className="p-2.5 text-slate-600">{cust.bizType}</td>
                  <td className="p-2.5 text-center">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold text-[11px]">
                      {cust.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
          <span>총 {mockCustomers.length}건</span>
          <div className="flex items-center gap-1 font-mono">
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">&laquo;</button>
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">&lt;</button>
            <span className="px-3 py-1 bg-purple-600 text-white rounded font-bold">1</span>
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">&gt;</button>
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  );
};
