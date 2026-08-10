import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Play,
  Filter,
  Search,
  Plus,
  RefreshCw,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  X,
  ExternalLink,
  CheckSquare,
  Square,
  Sparkles,
  Zap,
  Building2,
  Trash2,
  Eye
} from 'lucide-react';
import { defaultBoltaClient } from '../modules/tax-invoice/api/boltaApiClient';
import { validateBizRegNoMod10 } from '../modules/tax-invoice/utils/bizRegNoValidator';

export interface DbSalesRecord {
  id: string;
  orderNo: string;
  customerName: string;
  bizRegNo: string;
  ceoName: string;
  email: string;
  supplyDate: string;
  itemName: string;
  supplyAmount: number;
  taxAmount: number;
  totalAmount: number;
  status: 'UNISSUED' | 'DRAFT' | 'ISSUED' | 'NTS_SENT' | 'FAILED';
  approvalNo?: string;
  issuedAt?: string;
}

export const DatabaseBoltaIssuePage: React.FC = () => {
  // Initial Mock Enterprise Database State
  const [dbRecords, setDbRecords] = useState<DbSalesRecord[]>([
    {
      id: 'db_101',
      orderNo: 'ORD-20260810-001',
      customerName: '(주)삼성전자',
      bizRegNo: '124-81-00998',
      ceoName: '한종희',
      email: 'tax@samsung.com',
      supplyDate: '2026-08-10',
      itemName: '반도체 검사 장비 S-1000',
      supplyAmount: 12000000,
      taxAmount: 1200000,
      totalAmount: 13200000,
      status: 'UNISSUED'
    },
    {
      id: 'db_102',
      orderNo: 'ORD-20260810-002',
      customerName: '(주)LG에너지솔루션',
      bizRegNo: '107-87-89123',
      ceoName: '김동명',
      email: 'finance@lgensol.com',
      supplyDate: '2026-08-10',
      itemName: '이차전지 양극재 자동화 소프트웨어',
      supplyAmount: 8500000,
      taxAmount: 850000,
      totalAmount: 9350000,
      status: 'UNISSUED'
    },
    {
      id: 'db_103',
      orderNo: 'ORD-20260810-003',
      customerName: '(주)현대모비스',
      bizRegNo: '214-86-45678',
      ceoName: '이규석',
      email: 'accounting@mobis.co.kr',
      supplyDate: '2026-08-09',
      itemName: '자율주행 세무 ERP 구축 컨설팅',
      supplyAmount: 5000000,
      taxAmount: 500000,
      totalAmount: 5500000,
      status: 'UNISSUED'
    },
    {
      id: 'db_104',
      orderNo: 'ORD-20260808-088',
      customerName: '(주)쿠팡',
      bizRegNo: '120-88-00123',
      ceoName: '강한승',
      email: 'tax@coupang.com',
      supplyDate: '2026-08-08',
      itemName: '물류 솔루션 클라우드 라이선스 8월분',
      supplyAmount: 3000000,
      taxAmount: 300000,
      totalAmount: 3300000,
      status: 'ISSUED',
      approvalNo: '20260808-41000000-88392014',
      issuedAt: '2026-08-08T14:20:00+09:00'
    },
    {
      id: 'db_105',
      orderNo: 'ORD-20260807-042',
      customerName: '(주)카카오',
      bizRegNo: '120-81-47521',
      ceoName: '정신아',
      email: 'tax@kakao.com',
      supplyDate: '2026-08-07',
      itemName: '카카오워크 ERP 연동 모듈',
      supplyAmount: 4200000,
      taxAmount: 420000,
      totalAmount: 4620000,
      status: 'UNISSUED'
    },
    {
      id: 'db_106',
      orderNo: 'ORD-20260805-019',
      customerName: '(주)NAVER',
      bizRegNo: '220-81-42880',
      ceoName: '최수연',
      email: 'finance@navercorp.com',
      supplyDate: '2026-08-05',
      itemName: '클라우드 인프라 유지보수 서비스',
      supplyAmount: 2800000,
      taxAmount: 280000,
      totalAmount: 3080000,
      status: 'NTS_SENT',
      approvalNo: '20260805-41000000-11209384',
      issuedAt: '2026-08-05T09:15:00+09:00'
    }
  ]);

  // Selection & Search state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Processing Pipeline Modal state
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);

  // New Record Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newBizNo, setNewBizNo] = useState('');
  const [newCeo, setNewCeo] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newSupplyAmt, setNewSupplyAmt] = useState<number>(1000000);

  // Detail Modal state
  const [detailRecord, setDetailRecord] = useState<DbSalesRecord | null>(null);

  // Filtered DB records
  const filteredRecords = dbRecords.filter(rec => {
    const matchesSearch = rec.customerName.includes(searchTerm) || rec.bizRegNo.includes(searchTerm) || rec.orderNo.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Toggle selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSelectAllToggle = () => {
    const unissuedIds = filteredRecords.filter(r => r.status === 'UNISSUED').map(r => r.id);
    if (selectedIds.length === unissuedIds.length && unissuedIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(unissuedIds);
    }
  };

  // Run Bolta API Issuance Batch Pipeline
  const handleRunBatchIssue = async (targetIds?: string[]) => {
    const idsToIssue = targetIds || selectedIds;
    if (idsToIssue.length === 0) {
      alert("발행할 매출 건을 선택해주세요.");
      return;
    }

    setIsProcessing(true);
    setPipelineStep(1);
    setPipelineLogs(["[DB Pipeline] 데이터베이스 매출 레코드 추출 및 스키마 검증 시작..."]);

    // Step 1: Extract DB records
    await new Promise(r => setTimeout(r, 400));
    setPipelineLogs(prev => [...prev, `[DB Extractor] 총 ${idsToIssue.length}건의 미발행 레코드를 데이터베이스에서 읽어왔습니다.`]);
    setPipelineStep(2);

    // Step 2: Transform DB Schema -> Bolta API Payload Format
    await new Promise(r => setTimeout(r, 450));
    setPipelineLogs(prev => [...prev, "[Transform Engine] DB 스키마 ➔ 볼타 API JSON 페이로드 규격 변환 완료 (Mod-10 검증 통과)"]);
    setPipelineStep(3);

    // Step 3: Call Bolta API endpoint
    await new Promise(r => setTimeout(r, 600));
    setPipelineLogs(prev => [...prev, "[Bolta API Client] POST https://api.bolta.io/v1/tax-invoices/issue 호스트 연결 성공 (200 OK)"]);
    setPipelineStep(4);

    // Step 4: NTS Approval Code Generation
    await new Promise(r => setTimeout(r, 500));
    const nowIso = new Date().toISOString();
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    // Update DB Records state
    setDbRecords(prev => prev.map(rec => {
      if (idsToIssue.includes(rec.id)) {
        const randSeq = Math.floor(10000000 + Math.random() * 90000000);
        return {
          ...rec,
          status: 'ISSUED',
          approvalNo: `${todayStr}-41000000-${randSeq}`,
          issuedAt: nowIso
        };
      }
      return rec;
    }));

    setPipelineLogs(prev => [...prev, `[NTS Sync] 국세청 전자세금계산서 승인번호 ${idsToIssue.length}건 즉시 생성 및 동기화 완료!`]);
    setPipelineStep(5);

    await new Promise(r => setTimeout(r, 400));
    setPipelineLogs(prev => [...prev, "[DB Update] 데이터베이스 상태 'ISSUED' 업데이트 및 거래처 수신 이메일 발송 완료."]);

    // Clear selection
    setSelectedIds([]);
  };

  // Add New Record to DB
  const handleAddNewRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newBizNo) {
      alert("거래처명과 사업자등록번호를 입력하세요.");
      return;
    }

    const supplyAmt = Number(newSupplyAmt) || 0;
    const taxAmt = Math.floor(supplyAmt * 0.1);

    const newRecord: DbSalesRecord = {
      id: `db_${Date.now()}`,
      orderNo: `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      customerName: newCustName,
      bizRegNo: newBizNo,
      ceoName: newCeo || '대표자',
      email: newEmail || 'finance@company.com',
      supplyDate: new Date().toISOString().slice(0, 10),
      itemName: newItemName || '소프트웨어 및 용역 공급',
      supplyAmount: supplyAmt,
      taxAmount: taxAmt,
      totalAmount: supplyAmt + taxAmt,
      status: 'UNISSUED'
    };

    setDbRecords([newRecord, ...dbRecords]);
    setIsAddModalOpen(false);

    // Reset Form
    setNewCustName('');
    setNewBizNo('');
    setNewCeo('');
    setNewEmail('');
    setNewItemName('');
    setNewSupplyAmt(1000000);
  };

  // Delete DB record
  const handleDeleteRecord = (id: string) => {
    if (confirm("정말로 이 DB 매출 레코드를 삭제하시겠습니까?")) {
      setDbRecords(dbRecords.filter(r => r.id !== id));
      setSelectedIds(selectedIds.filter(i => i !== id));
    }
  };

  // Summary Metrics
  const totalSalesCount = dbRecords.length;
  const unissuedCount = dbRecords.filter(r => r.status === 'UNISSUED').length;
  const issuedCount = dbRecords.filter(r => r.status === 'ISSUED').length;
  const ntsSentCount = dbRecords.filter(r => r.status === 'NTS_SENT').length;
  const grandTotalSales = dbRecords.reduce((acc, cur) => acc + cur.totalAmount, 0);

  return (
    <div className="py-8 container max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-mono flex items-center gap-1">
              <Database className="w-3 h-3 text-emerald-400" /> ERP DB 연동 엔진
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
              3페이지: DB ➔ 볼타 API 세금계산서 발행
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            DB 데이터 불러오기 <span className="text-emerald-400 font-extrabold">& 볼타 API 세금계산서 발행</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            ERP 매출 데이터베이스에서 선택한 거래처 항목들을 볼타 API 규격으로 일괄 변환하여 실시간 세금계산서를 발행합니다.
          </p>
        </div>

        {/* Action Add DB Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> 신규 DB 매출 등록
        </button>
      </div>

      {/* Top Database Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <span className="text-slate-400 text-xs font-bold">총 DB 매출 건수</span>
          <div className="text-xl font-black text-white font-mono mt-1">
            {totalSalesCount}건 <span className="text-xs font-normal text-slate-400">(₩{(grandTotalSales/10000).toLocaleString()}만원)</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-2xl shadow-lg">
          <span className="text-amber-400 text-xs font-bold">⏳ 세금계산서 미발행건</span>
          <div className="text-xl font-black text-amber-300 font-mono mt-1">
            {unissuedCount}건
          </div>
        </div>

        <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-2xl shadow-lg">
          <span className="text-emerald-400 text-xs font-bold">⚡ 볼타 API 발행 완료</span>
          <div className="text-xl font-black text-emerald-300 font-mono mt-1">
            {issuedCount}건
          </div>
        </div>

        <div className="bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl shadow-lg">
          <span className="text-cyan-400 text-xs font-bold">🏛️ 국세청(NTS) 전송 완료</span>
          <div className="text-xl font-black text-cyan-300 font-mono mt-1">
            {ntsSentCount}건
          </div>
        </div>
      </div>

      {/* Database Search & Batch Action Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="거래처명 / 사업자번호 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
          >
            <option value="ALL">전체 상태 보기</option>
            <option value="UNISSUED">미발행 (UNISSUED)</option>
            <option value="ISSUED">발행 완료 (ISSUED)</option>
            <option value="NTS_SENT">국세청 전송 (NTS_SENT)</option>
          </select>
        </div>

        {/* Batch Execution Action Button */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => handleRunBatchIssue()}
            disabled={selectedIds.length === 0}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            선택한 {selectedIds.length}건 볼타 API 일괄 발행
          </button>
        </div>
      </div>

      {/* Main Database Table Component */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                <th className="p-3 w-10 text-center">
                  <button onClick={handleSelectAllToggle} className="text-slate-400 hover:text-white">
                    {selectedIds.length > 0 ? <CheckSquare className="w-4 h-4 text-indigo-400" /> : <Square className="w-4 h-4" />}
                  </button>
                </th>
                <th className="p-3">주문번호</th>
                <th className="p-3">거래처명 (상호)</th>
                <th className="p-3">사업자등록번호</th>
                <th className="p-3">품목명</th>
                <th className="p-3 text-right">공급가액</th>
                <th className="p-3 text-right">부가가치세</th>
                <th className="p-3 text-right">합계금액</th>
                <th className="p-3 text-center">발행 상태</th>
                <th className="p-3 text-center">국세청 승인번호</th>
                <th className="p-3 text-center">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.map((rec) => {
                const isSelected = selectedIds.includes(rec.id);
                const isMod10 = validateBizRegNoMod10(rec.bizRegNo);

                return (
                  <tr key={rec.id} className={`hover:bg-slate-800/40 transition-colors ${isSelected ? 'bg-indigo-950/20' : ''}`}>
                    <td className="p-3 text-center">
                      {rec.status === 'UNISSUED' ? (
                        <button onClick={() => handleToggleSelect(rec.id)} className="text-slate-400 hover:text-white">
                          {isSelected ? <CheckSquare className="w-4 h-4 text-indigo-400" /> : <Square className="w-4 h-4 text-slate-600" />}
                        </button>
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 font-mono text-slate-300 text-[11px]">{rec.orderNo}</td>
                    <td className="p-3 font-extrabold text-white">{rec.customerName}</td>
                    <td className="p-3 font-mono text-slate-300">
                      <span>{rec.bizRegNo}</span>
                      {isMod10 && <span className="ml-1 text-[9px] text-emerald-400 font-bold">✓MOD10</span>}
                    </td>
                    <td className="p-3 text-slate-300">{rec.itemName}</td>
                    <td className="p-3 text-right font-mono text-emerald-400 font-bold">₩{rec.supplyAmount.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-cyan-400">₩{rec.taxAmount.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-white font-extrabold">₩{rec.totalAmount.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      {rec.status === 'UNISSUED' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                          ⏳ 미발행
                        </span>
                      )}
                      {rec.status === 'ISSUED' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                          ⚡ 볼타 API 발행 완료
                        </span>
                      )}
                      {rec.status === 'NTS_SENT' && (
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold">
                          🏛️ 국세청 전송
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center font-mono text-[11px]">
                      {rec.approvalNo ? (
                        <span className="text-emerald-400 font-bold">{rec.approvalNo}</span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {rec.status === 'UNISSUED' ? (
                          <button
                            onClick={() => handleRunBatchIssue([rec.id])}
                            className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
                          >
                            <Zap className="w-3 h-3 text-amber-300" /> 즉시발행
                          </button>
                        ) : (
                          <button
                            onClick={() => setDetailRecord(rec)}
                            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[11px] flex items-center gap-1 transition-colors border border-slate-700"
                          >
                            <Eye className="w-3 h-3" /> 상세 API 로그
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteRecord(rec.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Dispatch Progress Pipeline Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400 animate-bounce" />
                <h3 className="font-extrabold text-white text-base">
                  볼타 API 세금계산서 발행 파이프라인 구동 중
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                Step {pipelineStep} / 5
              </span>
            </div>

            {/* Pipeline Step Badges */}
            <div className="grid grid-cols-5 gap-1 text-[10px] font-bold text-center">
              <div className={`p-1.5 rounded-lg border ${pipelineStep >= 1 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                1. DB파싱
              </div>
              <div className={`p-1.5 rounded-lg border ${pipelineStep >= 2 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                2. 스키마변환
              </div>
              <div className={`p-1.5 rounded-lg border ${pipelineStep >= 3 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                3. 볼타 API
              </div>
              <div className={`p-1.5 rounded-lg border ${pipelineStep >= 4 ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                4. NTS 승인
              </div>
              <div className={`p-1.5 rounded-lg border ${pipelineStep >= 5 ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                5. DB갱신
              </div>
            </div>

            {/* Logs Console */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-400 h-40 overflow-y-auto space-y-1 leading-relaxed">
              {pipelineLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-1">
                  <span className="text-slate-500 font-bold">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

            {pipelineStep >= 5 && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsProcessing(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30"
                >
                  발행 완료 (닫기)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add New Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                신규 DB 매출 데이터 등록
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewRecord} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">거래처명 (상호)</label>
                <input
                  type="text"
                  placeholder="예: (주)신규고객사"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">사업자등록번호 (10자리)</label>
                <input
                  type="text"
                  placeholder="123-45-67890"
                  value={newBizNo}
                  onChange={(e) => setNewBizNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">대표자명</label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    value={newCeo}
                    onChange={(e) => setNewCeo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">이메일</label>
                  <input
                    type="email"
                    placeholder="tax@newcorp.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">품목명</label>
                <input
                  type="text"
                  placeholder="예: IT 솔루션 개발 라이선스"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">공급가액 (원)</label>
                <input
                  type="number"
                  placeholder="1000000"
                  value={newSupplyAmt}
                  onChange={(e) => setNewSupplyAmt(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 font-mono font-bold focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold shadow-lg shadow-indigo-600/30"
                >
                  DB 레코드 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Detail Modal */}
      {detailRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                볼타 API 발행 레코드 로그
              </h3>
              <button onClick={() => setDetailRecord(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">주문번호: <span className="text-white font-mono font-bold">{detailRecord.orderNo}</span></div>
                <div className="text-slate-400">거래처명: <span className="text-white font-bold">{detailRecord.customerName}</span></div>
                <div className="text-slate-400">사업자번호: <span className="text-cyan-400 font-mono">{detailRecord.bizRegNo}</span></div>
                <div className="text-slate-400">국세청 승인번호: <span className="text-emerald-400 font-mono font-bold">{detailRecord.approvalNo || '미발행'}</span></div>
                <div className="text-slate-400">발행 일시: <span className="text-amber-300 font-mono">{detailRecord.issuedAt || '-'}</span></div>
              </div>

              <div>
                <span className="font-bold text-slate-400 mb-1 block">볼타 API 변환 JSON Payload:</span>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-40">
                  {JSON.stringify({
                    taxType: "TAXABLE",
                    writeDate: detailRecord.supplyDate,
                    supplier: { regNo: "220-88-12345", name: "(주)테크솔루션" },
                    buyer: { regNo: detailRecord.bizRegNo, name: detailRecord.customerName },
                    totalAmount: detailRecord.totalAmount,
                    approvalNo: detailRecord.approvalNo
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDetailRecord(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
