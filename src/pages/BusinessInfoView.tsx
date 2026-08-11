import React, { useState } from 'react';
import { Save, CheckCircle, Search, ShieldCheck } from 'lucide-react';

export const BusinessInfoView: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '(주)회무사텍',
    ceoName: '최승용',
    bizNo: '211-86-54321',
    companyType: 'corporate', // 법인 / 개인
    taxCategory: 'taxable', // 과세 / 면세 / 과세+면세
    subBizNo: '',
    corpRegNo: '110111-1234567',
    fiscalYearStart: '01',
    fiscalYearEnd: '12',
    startDate: '2022-03-15',
    bizType: '소프트웨어 개발 및 서비스업',
    bizItem: '경리회계 ERP / 세무 솔루션',
    phone: '02-777-9876',
    fax: '02-777-9877',
    address: '서울특별시 강남구 테헤란로 427, 10층 (삼성동, 회무사타워)',
    addressDetail: '1001호',
    sealUsed: true,
  });

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 font-sans text-slate-800 bg-[#F4F5F8] min-h-full">
      {/* Page Header (Reference Screenshot 1) */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          사업자 정보
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          경리회계, 세금계산서/계산서/거래명세서 발급 시, 공급자 정보로 자동 기재 될 사업자 정보를 등록/관리합니다.
        </p>
      </div>

      {/* Save Success Alert */}
      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-md flex items-center gap-2 text-xs font-semibold animate-fade-in shadow-sm">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>사업자 정보가 성공적으로 저장되었습니다.</span>
        </div>
      )}

      {/* Form Container (Reference Screenshot 1 Grid) */}
      <form onSubmit={handleSave} className="bg-white rounded-md border border-slate-200 shadow-sm p-6 space-y-6 text-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="font-bold text-sm text-slate-900">기본정보</h2>
          <span className="text-[11px] text-slate-400">* 필수 입력 사항입니다</span>
        </div>

        {/* Crisp Bordered Label-Input Form Grid */}
        <div className="border border-slate-200 rounded overflow-hidden">
          {/* Row 1: 회사명 & 대표자명 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                회사명*
              </div>
              <div className="p-2 flex-1">
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:border-purple-600"
                  required
                />
              </div>
            </div>

            <div className="flex items-center border-t md:border-t-0 border-slate-200">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                대표자명*
              </div>
              <div className="p-2 flex-1">
                <input
                  type="text"
                  value={formData.ceoName}
                  onChange={(e) => setFormData({ ...formData, ceoName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:border-purple-600"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: 사업자등록번호 */}
          <div className="flex items-center border-b border-slate-200">
            <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
              사업자등록번호*
            </div>
            <div className="p-2 flex-1 flex items-center gap-2">
              <input
                type="text"
                value={formData.bizNo}
                onChange={(e) => setFormData({ ...formData, bizNo: e.target.value })}
                className="w-64 border border-slate-300 rounded px-2.5 py-1.5 bg-white font-mono text-slate-800 focus:outline-none focus:border-purple-600"
                required
              />
              <button
                type="button"
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-3 py-1.5 rounded font-semibold flex items-center gap-1 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>인증</span>
              </button>
              <span className="text-slate-400 text-[11px]">사업자 정보 인증이 필요합니다.</span>
            </div>
          </div>

          {/* Row 3: 회사유형 & 사업자구분 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                회사유형*
              </div>
              <div className="p-2 flex-1 flex items-center gap-6">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="companyType"
                    checked={formData.companyType === 'corporate'}
                    onChange={() => setFormData({ ...formData, companyType: 'corporate' })}
                    className="text-purple-600"
                  />
                  <span>법인</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="companyType"
                    checked={formData.companyType === 'individual'}
                    onChange={() => setFormData({ ...formData, companyType: 'individual' })}
                    className="text-purple-600"
                  />
                  <span>개인</span>
                </label>
              </div>
            </div>

            <div className="flex items-center border-t md:border-t-0 border-slate-200">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                사업자구분*
              </div>
              <div className="p-2 flex-1 flex items-center gap-6">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="taxCategory"
                    checked={formData.taxCategory === 'taxable'}
                    onChange={() => setFormData({ ...formData, taxCategory: 'taxable' })}
                    className="text-purple-600"
                  />
                  <span>과세</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="taxCategory"
                    checked={formData.taxCategory === 'taxfree'}
                    onChange={() => setFormData({ ...formData, taxCategory: 'taxfree' })}
                    className="text-purple-600"
                  />
                  <span>면세</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="taxCategory"
                    checked={formData.taxCategory === 'both'}
                    onChange={() => setFormData({ ...formData, taxCategory: 'both' })}
                    className="text-purple-600"
                  />
                  <span>과세+면세</span>
                </label>
              </div>
            </div>
          </div>

          {/* Row 4: 종사업자 번호 & 법인등록번호 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                종사업자 번호
              </div>
              <div className="p-2 flex-1">
                <input
                  type="text"
                  placeholder="종사업자 번호를 입력하세요"
                  value={formData.subBizNo}
                  onChange={(e) => setFormData({ ...formData, subBizNo: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white font-mono text-slate-800 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div className="flex items-center border-t md:border-t-0 border-slate-200">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                법인등록번호
              </div>
              <div className="p-2 flex-1">
                <input
                  type="text"
                  value={formData.corpRegNo}
                  onChange={(e) => setFormData({ ...formData, corpRegNo: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white font-mono text-slate-800 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Row 5: 회계기간 & 사업개시년도 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                회계기간
              </div>
              <div className="p-2 flex-1 flex items-center gap-2">
                <select
                  value={formData.fiscalYearStart}
                  onChange={(e) => setFormData({ ...formData, fiscalYearStart: e.target.value })}
                  className="border border-slate-300 rounded px-2 py-1.5 bg-white"
                >
                  <option value="01">1 월</option>
                  <option value="04">4 월</option>
                  <option value="07">7 월</option>
                </select>
                <span>~</span>
                <select
                  value={formData.fiscalYearEnd}
                  onChange={(e) => setFormData({ ...formData, fiscalYearEnd: e.target.value })}
                  className="border border-slate-300 rounded px-2 py-1.5 bg-white"
                >
                  <option value="12">12 월</option>
                  <option value="03">3 월</option>
                  <option value="06">6 월</option>
                </select>
              </div>
            </div>

            <div className="flex items-center border-t md:border-t-0 border-slate-200">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                사업개시년도
              </div>
              <div className="p-2 flex-1">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Row 6: 업종 & 업태 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                업종*
              </div>
              <div className="p-2 flex-1">
                <input
                  type="text"
                  value={formData.bizItem}
                  onChange={(e) => setFormData({ ...formData, bizItem: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:border-purple-600"
                  required
                />
              </div>
            </div>

            <div className="flex items-center border-t md:border-t-0 border-slate-200">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                업태*
              </div>
              <div className="p-2 flex-1">
                <input
                  type="text"
                  value={formData.bizType}
                  onChange={(e) => setFormData({ ...formData, bizType: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:border-purple-600"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 7: 사업장 전화번호 & 팩스번호 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                사업장 전화번호*
              </div>
              <div className="p-2 flex-1">
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center border-t md:border-t-0 border-slate-200">
              <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
                팩스번호
              </div>
              <div className="p-2 flex-1">
                <input
                  type="text"
                  value={formData.fax}
                  onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Row 8: 사업장 주소 */}
          <div className="flex items-center border-b border-slate-200">
            <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
              사업장 주소*
            </div>
            <div className="p-2 flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full max-w-xl border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-3 py-1.5 rounded font-semibold flex items-center gap-1 shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>주소 검색</span>
                </button>
              </div>
              <input
                type="text"
                placeholder="상세주소 입력"
                value={formData.addressDetail}
                onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                className="w-full max-w-xl border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 9: 인감 등록 */}
          <div className="flex items-center">
            <div className="w-36 bg-[#F8F9FB] p-3 font-semibold text-slate-700 border-r border-slate-200 shrink-0">
              인감 등록
            </div>
            <div className="p-3 flex-1 flex flex-wrap items-center gap-6">
              <div className="w-24 h-24 border border-dashed border-slate-300 rounded bg-slate-50 flex items-center justify-center text-slate-400 relative">
                <span className="font-serif font-bold text-slate-300 text-lg">인감</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="bg-white hover:bg-slate-50 border border-slate-300 text-purple-700 px-3 py-1 rounded font-semibold shadow-sm"
                  >
                    등록
                  </button>
                  <button
                    type="button"
                    className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-600 px-3 py-1 rounded shadow-sm"
                  >
                    삭제
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="sealUsed"
                      checked={formData.sealUsed === true}
                      onChange={() => setFormData({ ...formData, sealUsed: true })}
                      className="text-purple-600"
                    />
                    <span>사용</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="sealUsed"
                      checked={formData.sealUsed === false}
                      onChange={() => setFormData({ ...formData, sealUsed: false })}
                      className="text-purple-600"
                    />
                    <span>사용 안 함</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#5E48B4] hover:bg-[#4E39A2] text-white px-6 py-2 rounded font-semibold shadow transition-colors flex items-center gap-2 text-xs"
          >
            <Save className="w-4 h-4" />
            <span>저장</span>
          </button>
        </div>
      </form>
    </div>
  );
};
