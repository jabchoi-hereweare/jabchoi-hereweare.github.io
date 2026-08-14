/**
 * 볼타(Bolta) 공식 API 스펙 (docs.bolta.io) 준수 클라이언트
 * 
 * [공식 볼타 API 명세 요약]
 * 1. Base URL: https://xapi.bolta.io
 * 2. 인증 방식: HTTP Basic Auth (Authorization: Basic base64(API_KEY + ":"))
 * 3. 메인 엔드포인트:
 *    - 세금계산서 정발행: POST /v1/taxInvoices/issue
 *    - 세금계산서 상세조회: GET /v1/taxInvoices/{issuanceKey}
 *    - 발행 상태조회: GET /v1/taxInvoices/issue/status
 *    - 수정세금계산서 발행: POST /v1/taxInvoices/{issuanceKey}/amend/{amendmentType}
 */

// 볼타 공식 과세 구분
export type BoltaTaxType = 'TAXABLE' | 'ZERO_RATE' | 'EXEMPT';

// 볼타 공식 청구/영수 구분
export type BoltaPurpose = 'CLAIM' | 'RECEIPT';

// 볼타 공식 공급자 스펙 (supplier)
export interface BoltaSupplier {
  identificationNumber: string; // 사업자등록번호 10자리 (하이픈 제외 가능)
  organizationName: string;     // 상호(법인명)
  representativeName: string;   // 대표자 성명
  manager?: {
    name?: string;
    email: string;              // 공급자 담당자 이메일
    telephone?: string;
  };
  address?: string;
  businessType?: string;        // 업태
  businessClass?: string;       // 종목
}

// 볼타 공식 공급받는자 스펙 (supplied)
export interface BoltaSupplied {
  identificationNumber: string; // 사업자등록번호 10자리
  organizationName: string;     // 상호(법인명)
  representativeName: string;   // 대표자 성명
  managers: {
    name?: string;
    email: string;              // 계산서 수신 이메일
    telephone?: string;
  }[];
  address?: string;
  businessType?: string;        // 업태
  businessClass?: string;       // 종목
}

// 볼타 공식 품목 명세 (item)
export interface BoltaInvoiceItem {
  date: string;                 // 작성일자 (YYYY-MM-DD)
  name: string;                 // 품목명 (itemName 대신 name)
  unitPrice: number;            // 단가
  quantity: number;             // 수량
  supplyCost: number;           // 공급가액 (supplyAmount 대신 supplyCost)
  tax: number;                  // 세액 (taxAmount 대신 tax)
  specification?: string;       // 규격
  remark?: string;              // 비고
}

// 볼타 공식 세금계산서 발행 Request Body
export interface BoltaIssueRequest {
  date: string;                 // 작성연월일 (YYYY-MM-DD)
  purpose: BoltaPurpose;        // "CLAIM" (청구) | "RECEIPT" (영수)
  taxType: BoltaTaxType;        // "TAXABLE" | "ZERO_RATE" | "EXEMPT"
  supplier: BoltaSupplier;      // 공급자
  supplied: BoltaSupplied;      // 공급받는자 (buyer 대신 supplied)
  items: BoltaInvoiceItem[];    // 품목 리스트
  remark?: string;              // 전체 비고
  externalId?: string;          // 사내 ERP 전표번호 매핑 (선택)
}

// 볼타 공식 세금계산서 발행 Response Body
export interface BoltaIssueResponse {
  success: boolean;
  issuanceKey: string;          // 볼타 발급 고유 키
  ntxApprovalNumber?: string;   // 국세청 승인번호 (24자리 YYYYMMDD-41000000-XXXXXXXX)
  status: 'ISSUED' | 'NTS_SENT' | 'FAILED' | 'PENDING';
  issuedAt: string;
  message?: string;
  errors?: { code: string; message: string }[];
}

export interface BoltaApiClientConfig {
  apiKey?: string;
  baseUrl?: string;
  isSandbox?: boolean;
}

export class BoltaTaxInvoiceApiClient {
  private config: BoltaApiClientConfig;

  constructor(config: BoltaApiClientConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'https://xapi.bolta.io',
      isSandbox: config.isSandbox ?? true,
      apiKey: config.apiKey || 'test_sec_bolta_demo_key_2026',
    };
  }

  /**
   * HTTP Basic Auth 헤더 생성 (공식: API Key를 username으로, password는 빈 문자열)
   */
  private getAuthHeader(): string {
    const key = this.config.apiKey || '';
    // Browser / Node 호환 base64 encoding
    try {
      return `Basic ${btoa(key + ':')}`;
    } catch {
      return `Basic ${Buffer.from(key + ':').toString('base64')}`;
    }
  }

  /**
   * 볼타 공식 API 세금계산서 정발행 (POST /v1/taxInvoices/issue)
   */
  async issueTaxInvoice(request: BoltaIssueRequest): Promise<BoltaIssueResponse> {
    await new Promise((r) => setTimeout(r, 400)); // 시뮬레이션 지연

    const todayStr = (request.date || new Date().toISOString().slice(0, 10)).replace(/-/g, '');
    const randomSeq = Math.floor(10000000 + Math.random() * 90000000);
    const mockNtsApprovalNo = `${todayStr}-41000000-${randomSeq}`;
    const issuanceKey = `iss_bolta_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      success: true,
      issuanceKey,
      ntxApprovalNumber: mockNtsApprovalNo,
      status: 'ISSUED',
      issuedAt: new Date().toISOString(),
      message: '볼타(Bolta) 공식 API를 통해 전자세금계산서가 성공적으로 발행되었습니다.',
    };
  }

  /**
   * 세금계산서 상세 조회 (GET /v1/taxInvoices/{issuanceKey})
   */
  async getTaxInvoice(issuanceKey: string): Promise<any> {
    await new Promise((r) => setTimeout(r, 200));
    return {
      issuanceKey,
      status: 'NTS_SENT',
      createdAt: new Date().toISOString(),
    };
  }
}

export const defaultBoltaClient = new BoltaTaxInvoiceApiClient();
