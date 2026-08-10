import React, { useState } from 'react';
import {
  Server,
  Send,
  Code2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Globe,
  Key,
  Layers,
  FileCode,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { defaultBoltaClient } from '../modules/tax-invoice/api/boltaApiClient';

type EndpointType = 
  | 'POST /v1/tax-invoices/issue'
  | 'POST /v1/tax-invoices/draft'
  | 'GET /v1/tax-invoices/:id'
  | 'POST /v1/tax-invoices/:id/cancel';

export const BoltaApiImplementationPage: React.FC = () => {
  const [environment, setEnvironment] = useState<'sandbox' | 'production'>('sandbox');
  const [apiKey, setApiKey] = useState('bolta_test_sec_8923a1f490bc78d2');
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointType>('POST /v1/tax-invoices/issue');

  // Payload Preset Templates
  const PRESET_TAXABLE = JSON.stringify({
    taxType: "TAXABLE",
    writeDate: new Date().toISOString().slice(0, 10),
    supplier: {
      regNo: "220-88-12345",
      name: "(주)테크솔루션",
      ceoName: "김회계",
      email: "tax@techsolution.co.kr"
    },
    buyer: {
      regNo: "110-81-98765",
      name: "(주)한국유통",
      ceoName: "이세무",
      email: "accounting@koreadist.com"
    },
    items: [
      {
        monthDay: "08/10",
        itemName: "ERP 세후 연동 API 라이선스",
        quantity: 1,
        unitPrice: 3000000,
        supplyAmount: 3000000,
        taxAmount: 300000
      }
    ],
    totalSupplyAmount: 3000000,
    totalTaxAmount: 300000,
    totalAmount: 3300000,
    remark: "볼타 API v1.0 정식 발행 테스트"
  }, null, 2);

  const PRESET_ZERO_RATE = JSON.stringify({
    taxType: "ZERO_RATE",
    writeDate: new Date().toISOString().slice(0, 10),
    supplier: {
      regNo: "220-88-12345",
      name: "(주)테크솔루션",
      ceoName: "김회계",
      email: "tax@techsolution.co.kr"
    },
    buyer: {
      regNo: "999-88-77777",
      name: "Global Tech Inc (미국 지사)",
      ceoName: "John Doe",
      email: "finance@globaltech.com"
    },
    items: [
      {
        monthDay: "08/10",
        itemName: "Software Export (Direct Export)",
        quantity: 1,
        unitPrice: 5000000,
        supplyAmount: 5000000,
        taxAmount: 0
      }
    ],
    totalSupplyAmount: 5000000,
    totalTaxAmount: 0,
    totalAmount: 5000000,
    remark: "내국신용장 / 영세율 직접수출 건"
  }, null, 2);

  const PRESET_ERROR = JSON.stringify({
    taxType: "TAXABLE",
    writeDate: "2026-08-10",
    supplier: {
      regNo: "123-45-67890", // MOD-10 Checksum Fail
      name: "(주)테크솔루션",
      email: "tax@techsolution.co.kr"
    },
    buyer: {
      regNo: "000-00-00000",
      name: "오류 거래처"
    },
    items: [],
    totalSupplyAmount: 0,
    totalTaxAmount: 0,
    totalAmount: 0
  }, null, 2);

  const [jsonPayload, setJsonPayload] = useState<string>(PRESET_TAXABLE);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Response state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseBody, setResponseBody] = useState<any>(null);

  // Code Tab state
  const [codeTab, setCodeTab] = useState<'curl' | 'js' | 'ts' | 'python'>('js');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Handle Payload Changes & Validate JSON
  const handlePayloadChange = (text: string) => {
    setJsonPayload(text);
    try {
      JSON.parse(text);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  // Format JSON
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonPayload);
      setJsonPayload(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err: any) {
      setJsonError("유효하지 않은 JSON 구조입니다.");
    }
  };

  // Execute API Call Simulation
  const handleExecuteRequest = async () => {
    if (jsonError) {
      alert("JSON 페이로드 문법 오류를 수정한 후 전송하세요.");
      return;
    }

    setIsLoading(true);
    setResponseStatus(null);
    setResponseBody(null);

    let parsedData: any = {};
    try {
      parsedData = JSON.parse(jsonPayload);
    } catch (e) {
      parsedData = {};
    }

    // Simulate API Latency (500ms)
    await new Promise(r => setTimeout(r, 550));

    // Simulated Response Validation Check
    if (parsedData.supplier?.regNo === "123-45-67890" || parsedData.buyer?.regNo === "000-00-00000") {
      setResponseStatus(400);
      setResponseHeaders({
        'content-type': 'application/json; charset=utf-8',
        'x-bolta-request-id': `req_${Date.now()}`,
        'x-bolta-environment': environment
      });
      setResponseBody({
        error: "INVALID_BUSINESS_NUMBER",
        status: 400,
        message: "사업자등록번호 Modulo-10 검증 알고리즘 불합격",
        details: [
          "공급자 사업자등록번호(123-45-67890)의 체크섬 가중치 연산 결과가 일치하지 않습니다.",
          "공급받는자 사업자등록번호(000-00-00000)는 존재하지 않는 사업자번호입니다."
        ],
        timestamp: new Date().toISOString()
      });
      setIsLoading(false);
      return;
    }

    // Success Mock Response
    const mockApprovalNo = `20260810-41000000-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const mockInvoiceId = `inv_bolta_${Date.now()}`;

    setResponseStatus(200);
    setResponseHeaders({
      'content-type': 'application/json; charset=utf-8',
      'x-bolta-request-id': `req_${Date.now()}`,
      'x-bolta-approval-no': mockApprovalNo,
      'x-bolta-environment': environment
    });
    setResponseBody({
      success: true,
      statusCode: 200,
      invoiceId: mockInvoiceId,
      ntsApprovalNo: mockApprovalNo,
      status: "ISSUED",
      ntsTransmissionStatus: "NTS_ACCEPTED",
      issuedAt: new Date().toISOString(),
      summary: {
        supplierName: parsedData.supplier?.name || "(주)테크솔루션",
        buyerName: parsedData.buyer?.name || "(주)한국유통",
        totalAmount: parsedData.totalAmount || 3300000,
        taxType: parsedData.taxType || "TAXABLE"
      },
      message: "볼타 API를 통해 전자세금계산서가 정상 발행되었으며, 국세청 승인번호가 부여되었습니다."
    });
    setIsLoading(false);
  };

  // Generate Code Snippets
  const getCodeSnippet = () => {
    const baseUrl = environment === 'sandbox' ? 'https://api.bolta.io/v1/sandbox' : 'https://api.bolta.io/v1';

    if (codeTab === 'curl') {
      return `curl -X POST "${baseUrl}/tax-invoices/issue" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '${jsonPayload.replace(/'/g, "\\'")}'`;
    }

    if (codeTab === 'js') {
      return `// JavaScript (Fetch API)
const issueTaxInvoice = async () => {
  const response = await fetch("${baseUrl}/tax-invoices/issue", {
    method: "POST",
    headers: {
      "Authorization": "Bearer ${apiKey}",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(${jsonPayload})
  });
  
  const data = await response.json();
  console.log("국세청 승인번호:", data.ntsApprovalNo);
  return data;
};`;
    }

    if (codeTab === 'ts') {
      return `import { BoltaTaxInvoiceApiClient } from './boltaApiClient';

const boltaClient = new BoltaTaxInvoiceApiClient({
  apiKey: "${apiKey}",
  baseUrl: "${baseUrl}",
  isSandbox: ${environment === 'sandbox'}
});

async function run() {
  const result = await boltaClient.issueInvoice(${jsonPayload});
  console.log("발행 성공:", result.approvalNo);
}`;
    }

    if (codeTab === 'python') {
      return `# Python (requests)
import requests

url = "${baseUrl}/tax-invoices/issue"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}
payload = ${jsonPayload}

response = requests.post(url, json=payload, headers=headers)
print("Response:", response.json())`;
    }

    return '';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="py-8 container max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold font-mono flex items-center gap-1">
              <Server className="w-3 h-3 text-cyan-400" /> REST API v1.0
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
              2페이지: 볼타 API 세금계산서 연동 구현
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            볼타 API (Bolta API) <span className="text-cyan-400 font-extrabold">세금계산서 연동 테스트</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            볼타 API 엔드포인트 규격에 맞춰 JSON 페이로드를 조작하고, 실시간 API 발행 및 HTTP 응답을 검증하세요.
          </p>
        </div>

        {/* Environment Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setEnvironment('sandbox')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              environment === 'sandbox'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🧪 Sandbox (테스트)
          </button>

          <button
            onClick={() => setEnvironment('production')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              environment === 'production'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🚀 Production (라이브)
          </button>
        </div>
      </div>

      {/* API Endpoint & Credentials Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Method & Endpoint Selector */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" /> API 엔드포인트 URL
            </label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold shrink-0">
                POST
              </span>
              <select
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value as EndpointType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
              >
                <option value="POST /v1/tax-invoices/issue">/v1/tax-invoices/issue (세금계산서 정식 발행 & 국세청 동기화)</option>
                <option value="POST /v1/tax-invoices/draft">/v1/tax-invoices/draft (임시저장 DRAFT 생성)</option>
                <option value="GET /v1/tax-invoices/:id">/v1/tax-invoices/:id (발행건 상세 & 승인번호 조회)</option>
                <option value="POST /v1/tax-invoices/:id/cancel">/v1/tax-invoices/:id/cancel (취소/수정 세금계산서 발행)</option>
              </select>
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" /> Authorization Header (API Key)
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Payload Editor / Right Response & Snippets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT: JSON Payload Editor */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" />
              JSON Request Payload Body
            </h3>
            <button
              onClick={handleFormatJson}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors border border-slate-700"
            >
              JSON 정렬 (Format)
            </button>
          </div>

          {/* Quick Template Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 font-bold">빠른 페이로드 템플릿:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handlePayloadChange(PRESET_TAXABLE)}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold"
              >
                🟢 정상 과세 10%
              </button>

              <button
                onClick={() => handlePayloadChange(PRESET_ZERO_RATE)}
                className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold"
              >
                🔵 영세율 0% (수출)
              </button>

              <button
                onClick={() => handlePayloadChange(PRESET_ERROR)}
                className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold"
              >
                🔴 MOD-10 검증 실패 오류
              </button>
            </div>
          </div>

          {/* Code Textarea */}
          <div className="relative flex-1">
            <textarea
              value={jsonPayload}
              onChange={(e) => handlePayloadChange(e.target.value)}
              className="w-full h-[360px] p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed focus:border-cyan-500 focus:outline-none resize-none shadow-inner"
              spellCheck={false}
            />
            {jsonError && (
              <div className="mt-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>JSON 문법 오류: {jsonError}</span>
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={handleExecuteRequest}
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>볼타 API 전송 중...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>볼타 API 세금계산서 발행 요청 (Send Request)</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT: Response & Code Snippets */}
        <div className="space-y-6">
          {/* Response Console */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Bolta API HTTP Response Console
              </h3>
              {responseStatus && (
                <span className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-extrabold border ${
                  responseStatus === 200
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}>
                  HTTP Status {responseStatus} {responseStatus === 200 ? 'OK' : 'Bad Request'}
                </span>
              )}
            </div>

            {responseBody ? (
              <div className="space-y-3 animate-fadeIn">
                {/* Headers Info */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-0.5">
                  <div>content-type: {responseHeaders['content-type']}</div>
                  <div>x-bolta-request-id: {responseHeaders['x-bolta-request-id']}</div>
                  {responseHeaders['x-bolta-approval-no'] && (
                    <div className="text-emerald-400 font-bold">
                      x-bolta-approval-no: {responseHeaders['x-bolta-approval-no']}
                    </div>
                  )}
                </div>

                {/* Response JSON Body */}
                <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[300px] leading-relaxed shadow-inner">
                  {JSON.stringify(responseBody, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="h-[220px] bg-slate-950 rounded-2xl border border-slate-800 border-dashed flex flex-col items-center justify-center text-slate-500 text-xs gap-2">
                <Server className="w-8 h-8 text-slate-600 animate-pulse" />
                <span>왼쪽에서 요청을 실행하면 실시간 API 응답이 여기에 출력됩니다.</span>
              </div>
            )}
          </div>

          {/* Code Generator Snippets */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <Code2 className="w-4 h-4 text-purple-400" />
                연동 코드 자동 생성기
              </h3>

              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1 border border-slate-700 transition-colors"
              >
                {copiedCode ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">복사완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>코드 복사</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Language Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setCodeTab('js')}
                className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                  codeTab === 'js' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                JavaScript (Fetch)
              </button>
              <button
                onClick={() => setCodeTab('ts')}
                className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                  codeTab === 'ts' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                TypeScript SDK
              </button>
              <button
                onClick={() => setCodeTab('curl')}
                className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                  codeTab === 'curl' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setCodeTab('python')}
                className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                  codeTab === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Python
              </button>
            </div>

            {/* Generated Code Display */}
            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto max-h-[220px] leading-relaxed shadow-inner">
              {getCodeSnippet()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
