import React, { useState } from 'react';
import { FileText, Save, Printer, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const TransactionStatementFormView: React.FC = () => {
  const [supplier, setSupplier] = useState({
    name: '(주)회무사텍',
    ceo: '최승용',
    bizNo: '211-86-54321',
    address: '서울특별시 강남구 테헤란로 427',
    phone: '02-777-9876',
  });

  const [buyer, setBuyer] = useState({
    name: '(주)볼타코퍼레이션',
    ceo: '이볼타',
    bizNo: '120-88-99012',
    address: '서울특별시 서초구 강남대로 381',
    phone: '02-555-1234',
  });

  const [items, setItems] = useState([
    { id: '1', date: '08-11', name: 'ERP 소프트웨어 공급 라이선스', spec: 'Standard', qty: 1, price: 1000000, supply: 1000000, tax: 100000, remark: '8월 정기분' },
    { id: '2', date: '08-11', name: '볼타 API 커스텀 연동 컨설팅', spec: 'v1.0', qty: 5, price: 200000, supply: 1000000, tax: 100000, remark: '기술지원' },
  ]);

  const [isSaved, setIsSaved] = useState(false);

  const totalSupply = items.reduce((acc, cur) => acc + cur.supply, 0);
  const totalTax = items.reduce((acc, cur) => acc + cur.tax, 0);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 font-sans text-slate-800 bg-[#F4F5F8] min-h-full">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>거래명세서 작성</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            납품 및 거래 품목에 대한 세부 항목을 거래명세서 양식으로 발행합니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>저장 및 발행</span>
          </button>
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs px-3 py-2 rounded flex items-center gap-1 shadow-sm">
            <Printer className="w-4 h-4 text-slate-500" />
            <span>인쇄</span>
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2.5 rounded-md flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>거래명세서가 성공적으로 저장 및 발행되었습니다.</span>
        </div>
      )}

      {/* Blue / Cyan Statement Paper Form */}
      <div className="bg-white border-2 border-blue-600 rounded-md p-6 shadow-sm space-y-4 max-w-5xl mx-auto text-xs">
        <div className="text-center border-b-2 border-blue-600 pb-3">
          <h2 className="text-2xl font-black text-blue-800 tracking-widest">거 래 명 세 서</h2>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">(공급받는자 보관용 / 공급자 보관용)</p>
        </div>

        {/* Supplier & Buyer Info Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Supplier (공급자) */}
          <div className="border border-blue-300 rounded overflow-hidden">
            <div className="bg-blue-100/70 p-2 font-bold text-blue-900 text-center border-b border-blue-300">
              공 급 자 (출하처)
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center">
                <span className="w-24 text-slate-500 font-semibold">등록번호:</span>
                <input
                  type="text"
                  value={supplier.bizNo}
                  onChange={(e) => setSupplier({ ...supplier, bizNo: e.target.value })}
                  className="font-mono border border-slate-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <span className="w-24 text-slate-500 font-semibold">상호(법인명):</span>
                <input
                  type="text"
                  value={supplier.name}
                  onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                  className="font-bold border border-slate-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <span className="w-24 text-slate-500 font-semibold">성명(대표자):</span>
                <input
                  type="text"
                  value={supplier.ceo}
                  onChange={(e) => setSupplier({ ...supplier, ceo: e.target.value })}
                  className="border border-slate-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <span className="w-24 text-slate-500 font-semibold">사업장주소:</span>
                <input
                  type="text"
                  value={supplier.address}
                  onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
                  className="border border-slate-300 rounded px-2 py-1 w-full"
                />
              </div>
            </div>
          </div>

          {/* Buyer (공급받는자) */}
          <div className="border border-blue-300 rounded overflow-hidden">
            <div className="bg-blue-100/70 p-2 font-bold text-blue-900 text-center border-b border-blue-300">
              공 급 받 는 자 (납품처)
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center">
                <span className="w-24 text-slate-500 font-semibold">등록번호:</span>
                <input
                  type="text"
                  value={buyer.bizNo}
                  onChange={(e) => setBuyer({ ...buyer, bizNo: e.target.value })}
                  className="font-mono border border-slate-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <span className="w-24 text-slate-500 font-semibold">상호(법인명):</span>
                <input
                  type="text"
                  value={buyer.name}
                  onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                  className="font-bold border border-slate-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <span className="w-24 text-slate-500 font-semibold">성명(대표자):</span>
                <input
                  type="text"
                  value={buyer.ceo}
                  onChange={(e) => setBuyer({ ...buyer, ceo: e.target.value })}
                  className="border border-slate-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div className="flex items-center">
                <span className="w-24 text-slate-500 font-semibold">사업장주소:</span>
                <input
                  type="text"
                  value={buyer.address}
                  onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
                  className="border border-slate-300 rounded px-2 py-1 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Item Rows Table */}
        <div className="border border-blue-300 rounded overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-blue-100/80 text-blue-900 font-bold border-b border-blue-300">
              <tr>
                <th className="p-2 text-center w-12">월일</th>
                <th className="p-2">품목명</th>
                <th className="p-2">규격</th>
                <th className="p-2 text-center w-16">수량</th>
                <th className="p-2 text-right">단가</th>
                <th className="p-2 text-right">공급가액</th>
                <th className="p-2 text-right">세액</th>
                <th className="p-2">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 text-center font-mono">{item.date}</td>
                  <td className="p-2 font-bold text-slate-800">{item.name}</td>
                  <td className="p-2 text-slate-600">{item.spec}</td>
                  <td className="p-2 text-center font-mono">{item.qty}</td>
                  <td className="p-2 text-right font-mono">{item.price.toLocaleString()} 원</td>
                  <td className="p-2 text-right font-bold text-slate-900">{item.supply.toLocaleString()} 원</td>
                  <td className="p-2 text-right font-bold text-blue-700">{item.tax.toLocaleString()} 원</td>
                  <td className="p-2 text-slate-500">{item.remark}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-blue-50 font-bold border-t border-blue-300 text-blue-900">
              <tr>
                <td colSpan={5} className="p-2 text-right">합계 금액 (공급가액 + 세액):</td>
                <td className="p-2 text-right text-slate-900">{totalSupply.toLocaleString()} 원</td>
                <td className="p-2 text-right text-blue-700">{totalTax.toLocaleString()} 원</td>
                <td className="p-2 text-right font-black text-sm text-purple-900">
                  {(totalSupply + totalTax).toLocaleString()} 원
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
