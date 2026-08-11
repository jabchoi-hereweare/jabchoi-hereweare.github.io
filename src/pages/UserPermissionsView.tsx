import React from 'react';
import { Plus, Printer, Settings, ShieldCheck, Users } from 'lucide-react';

export const UserPermissionsView: React.FC = () => {
  const permissionsData = [
    {
      id: 1,
      groupName: '회계 총관리자',
      assignedUser: '최승용',
      commonPerm: '모든 권한',
      expensePerm: '모든 권한',
      taxPerm: '관리자',
      status: '사용',
    },
    {
      id: 2,
      groupName: '회계 담당자',
      assignedUser: '사용자를 지정해주세요.',
      commonPerm: '모든 권한',
      expensePerm: '권한 지정',
      taxPerm: '사용자',
      status: '사용',
    },
    {
      id: 3,
      groupName: '세금계산서 사용자',
      assignedUser: '사용자를 지정해주세요.',
      commonPerm: '권한 지정',
      expensePerm: '미사용',
      taxPerm: '사용자',
      status: '사용',
    },
  ];

  return (
    <div className="p-6 space-y-6 font-sans text-slate-800 bg-[#F4F5F8] min-h-full">
      {/* Page Header (Reference Screenshot 5) */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          사용 권한 관리
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          경리회계, 세금계산서의 사용자를 등록하고, 기능별 권한을 설정 합니다.
        </p>
      </div>

      {/* Main Container & Action Toolbar (Reference Screenshot 5) */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-4 text-xs space-y-4">
        {/* Action Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded text-purple-600" id="selectAll" />
            <button className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              <span>추가하기</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Permissions Data Table (Reference Screenshot 5 Table Layout) */}
        <div className="border border-slate-200 rounded overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700 border-collapse">
            <thead className="bg-[#F8F9FB] text-slate-700 border-b border-slate-200 font-bold">
              <tr>
                <th className="p-3 text-center w-10">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-3">그룹명</th>
                <th className="p-3">권한 사용자</th>
                <th className="p-3">공통</th>
                <th className="p-3">경비지출</th>
                <th className="p-3">전자세금계산서</th>
                <th className="p-3 text-center">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsData.map((row) => (
                <tr key={row.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="p-3 text-center">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-3 font-bold text-slate-900 underline underline-offset-2 cursor-pointer hover:text-purple-700">
                    {row.groupName}
                  </td>
                  <td className="p-3">
                    <span className={row.assignedUser.includes('지정') ? 'text-slate-400 italic' : 'font-bold text-slate-900'}>
                      {row.assignedUser}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700">{row.commonPerm}</td>
                  <td className="p-3 text-slate-700">{row.expensePerm}</td>
                  <td className="p-3 text-slate-700">{row.taxPerm}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 text-[11px]">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1 font-mono text-xs text-slate-500 pt-2">
          <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">&laquo;</button>
          <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">&lt;</button>
          <span className="px-3 py-1 bg-purple-600 text-white rounded font-bold">1</span>
          <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">&gt;</button>
          <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">&raquo;</button>
        </div>
      </div>
    </div>
  );
};
