import React, { useState } from 'react';
import {
  Calendar,
  Search,
  RotateCcw,
  Download,
  Settings,
  Info,
  X,
  FileText,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  Plus,
} from 'lucide-react';
import { TabId } from '../components/HiworksSidebar';

interface UnissuedDocumentsViewProps {
  onOpenTab: (tabId: TabId) => void;
}

export const UnissuedDocumentsView: React.FC<UnissuedDocumentsViewProps> = ({ onOpenTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'sales' | 'purchase'>('sales');
  const [showNotice, setShowNotice] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sample data matching Screenshot 3 layout
  const mockDocuments = [
    {
      id: 1,
      issueDate: '2026-08-11',
      saveDate: '2026-08-11 14:20',
      partnerName: '(주)볼타코퍼레이션',
      bizNo: '120-88-99012',
      taxType: '과세',
      docType: '세금계산서',
      issueType: '정발행',
      status: '저장',
      amount: '1,100,000 원',
      emailStatus: '미발송',
    },
    {
      id: 2,
      issueDate: '2026-08-10',
      saveDate: '2026-08-10 09:45',
      partnerName: '(주)회무사텍',
      bizNo: '211-86-54321',
      taxType: '과세',
      docType: '세금계산서',
      issueType: '정발행',
      status: '승인요청',
      amount: '5,500,000 원',
      emailStatus: '발송완료',
    },
    {
      id: 3,
      issueDate: '2026-08-08',
      saveDate: '2026-08-08 17:10',
      partnerName: '(주)삼일세무법인',
      bizNo: '105-87-12345',
      taxType: '면세',
      docType: '계산서',
      issueType: '정발행',
      status: '저장',
      amount: '3,000,000 원',
      emailStatus: '미발송',
    },
  ];

  return (
    <div className="p-6 space-y-6 font-sans text-slate-800 bg-[#F4F5F8] min-h-full">
      {/* Top Notice Bar (Reference Screenshot 2 & 3) */}
      {showNotice && (
        <div className="bg-[#FFF8E6] border border-[#FFE6A3] text-[#8C6400] px-4 py-2.5 rounded-md flex items-center justify-between text-xs shadow-sm">
          <div className="flex items-center gap-2 font-medium">
            <Info className="w-4 h-4 text-[#D99B00] shrink-0" />
            <span>
              <strong>8월 세금계산서 발급 마감일은 2026-09-10 목요일 (30일 전)</strong> 입니다.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 cursor-pointer text-[11px] text-slate-600 hover:text-slate-900">
              <input type="checkbox" className="rounded text-purple-600" />
              <span>오늘 하루 보지 않기</span>
            </label>
            <button
              onClick={() => setShowNotice(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Title Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">발급 전 문서</h1>
          <p className="text-xs text-slate-500 mt-1">
            국세청으로 발급하기 전 상태의 매출/매입 문서를 확인하고 세금계산서를 발급합니다.
          </p>
        </div>
        <button
          onClick={() => onOpenTab('nts_form')}
          className="bg-[#5E48B4] hover:bg-[#4E39A2] text-white text-xs font-semibold px-4 py-2 rounded shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>세금계산서 작성</span>
        </button>
      </div>

      {/* Summary Cards Grid (Reference Screenshot 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: 국세청 전송 문서 */}
        <div className="bg-white rounded-md p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <Send className="w-4 h-4 text-purple-600" />
              국세청 전송 문서
            </span>
            <span className="text-[11px] text-slate-400">작성년월 기준</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* 매출 */}
            <div className="bg-red-50/60 rounded p-3 border border-red-100">
              <div className="font-bold text-red-700 text-center mb-2 bg-red-100/70 py-1 rounded">
                매출
              </div>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>전송실패</span>
                  <span className="font-bold text-red-600">0건</span>
                </div>
                <div className="flex justify-between">
                  <span>전송 중</span>
                  <span className="font-bold text-slate-700">0건</span>
                </div>
                <div className="flex justify-between">
                  <span>전송완료</span>
                  <span className="font-bold text-slate-900">0건</span>
                </div>
              </div>
            </div>

            {/* 매입 */}
            <div className="bg-blue-50/60 rounded p-3 border border-blue-100">
              <div className="font-bold text-blue-700 text-center mb-2 bg-blue-100/70 py-1 rounded">
                매입
              </div>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>전송실패</span>
                  <span className="font-bold text-red-600">0건</span>
                </div>
                <div className="flex justify-between">
                  <span>전송 중</span>
                  <span className="font-bold text-slate-700">0건</span>
                </div>
                <div className="flex justify-between">
                  <span>전송완료</span>
                  <span className="font-bold text-slate-900">0건</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: 발급 전 문서 */}
        <div className="bg-white rounded-md p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <Inbox className="w-4 h-4 text-purple-600" />
              발급 전 문서
            </span>
            <span className="text-[11px] text-slate-400">실시간 현황</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* 매출 */}
            <div className="bg-red-50/60 rounded p-3 border border-red-100">
              <div className="font-bold text-red-700 text-center mb-2 bg-red-100/70 py-1 rounded">
                매출
              </div>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>저장</span>
                  <span className="font-bold text-purple-700">2건</span>
                </div>
                <div className="flex justify-between">
                  <span>승인요청</span>
                  <span className="font-bold text-purple-700">1건</span>
                </div>
                <div className="flex justify-between">
                  <span>반려 / 취소</span>
                  <span className="font-bold text-slate-700">0건</span>
                </div>
              </div>
            </div>

            {/* 매입 */}
            <div className="bg-blue-50/60 rounded p-3 border border-blue-100">
              <div className="font-bold text-blue-700 text-center mb-2 bg-blue-100/70 py-1 rounded">
                매입
              </div>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>저장</span>
                  <span className="font-bold text-purple-700">1건</span>
                </div>
                <div className="flex justify-between">
                  <span>역발행요청</span>
                  <span className="font-bold text-slate-700">0건</span>
                </div>
                <div className="flex justify-between">
                  <span>반려 / 취소</span>
                  <span className="font-bold text-slate-700">0건</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tab: 매출 / 매입 & Filter Controls (Reference Screenshot 3) */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        {/* Sales / Purchase Sub-tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 pt-3 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('sales')}
            className={`px-5 py-2 rounded-t border-t border-x transition-colors ${
              activeSubTab === 'sales'
                ? 'bg-white border-slate-200 text-purple-800 border-b-2 border-b-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            매출
          </button>
          <button
            onClick={() => setActiveSubTab('purchase')}
            className={`px-5 py-2 rounded-t border-t border-x transition-colors ${
              activeSubTab === 'purchase'
                ? 'bg-white border-slate-200 text-blue-800 border-b-2 border-b-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            매입
          </button>
        </div>

        {/* Filter Controls Box */}
        <div className="p-4 bg-slate-50/50 border-b border-slate-200 text-xs space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-semibold">기간:</span>
              <select className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700">
                <option>작성일</option>
                <option>저장일</option>
              </select>
              <input
                type="date"
                defaultValue="2026-07-01"
                className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700"
              />
              <span className="text-slate-400">~</span>
              <input
                type="date"
                defaultValue="2026-08-11"
                className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-semibold">문서검색:</span>
              <select className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700">
                <option>모두</option>
                <option>공급받는자명</option>
                <option>사업자등록번호</option>
              </select>
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색어 입력"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-slate-300 rounded pl-2 pr-7 py-1 bg-white text-slate-700 w-44"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1.5" />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-semibold">과세타입:</span>
              <select className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700">
                <option>전체</option>
                <option>과세</option>
                <option>면세</option>
                <option>영세</option>
              </select>
            </div>

            <button className="bg-white hover:bg-slate-50 border border-slate-300 text-purple-700 px-3 py-1 rounded font-semibold flex items-center gap-1 shadow-sm">
              <Search className="w-3.5 h-3.5" />
              <span>검색</span>
            </button>
            <button className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-600 px-3 py-1 rounded flex items-center gap-1 shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>검색 취소</span>
            </button>
          </div>

          {/* Status Badges Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
            <span className="text-slate-600 font-semibold mr-1">문서상태:</span>
            {[
              { label: '전체', count: 3, value: 'all' },
              { label: '저장', count: 2, value: 'draft' },
              { label: '승인요청', count: 1, value: 'requested' },
              { label: '승인완료', count: 0, value: 'approved' },
              { label: '역발행대기', count: 0, value: 'reverse' },
              { label: '반려', count: 0, value: 'rejected' },
              { label: '취소', count: 0, value: 'cancelled' },
            ].map((st) => (
              <button
                key={st.value}
                onClick={() => setSelectedStatus(st.value)}
                className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold transition-colors ${
                  selectedStatus === st.value
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                }`}
              >
                {st.label} <span className="ml-0.5 opacity-90">{st.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Toolbars & Table */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-purple-600" id="selectAll" />
              <label htmlFor="selectAll" className="font-semibold text-slate-700 cursor-pointer">
                모두 선택
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1 rounded flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>엑셀 다운로드</span>
              </button>
              <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-2.5 py-1 rounded flex items-center gap-1">
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
                  <th className="p-2.5">작성일</th>
                  <th className="p-2.5">저장일</th>
                  <th className="p-2.5">공급받는자</th>
                  <th className="p-2.5">등록번호</th>
                  <th className="p-2.5">과세타입</th>
                  <th className="p-2.5">문서종류</th>
                  <th className="p-2.5">발급형태</th>
                  <th className="p-2.5">문서상태</th>
                  <th className="p-2.5 text-right">합계 금액</th>
                  <th className="p-2.5 text-center">메일발송현황</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="p-2.5 text-center">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-2.5 font-medium">{doc.issueDate}</td>
                    <td className="p-2.5 text-slate-500">{doc.saveDate}</td>
                    <td className="p-2.5 font-bold text-slate-900">{doc.partnerName}</td>
                    <td className="p-2.5 font-mono text-slate-600">{doc.bizNo}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 text-[11px]">
                        {doc.taxType}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-600">{doc.docType}</td>
                    <td className="p-2.5 text-slate-600">{doc.issueType}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full font-bold text-[11px]">
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right font-bold text-slate-900">{doc.amount}</td>
                    <td className="p-2.5 text-center">
                      <span className="text-slate-500 text-[11px] flex items-center justify-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {doc.emailStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
            <span>총 {mockDocuments.length}건</span>
            <div className="flex items-center gap-1 font-mono">
              <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">
                &laquo;
              </button>
              <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">
                &lt;
              </button>
              <span className="px-3 py-1 bg-purple-600 text-white rounded font-bold">1</span>
              <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">
                &gt;
              </button>
              <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
