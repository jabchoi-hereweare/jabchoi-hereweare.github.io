/**
 * 볼타(Bolta) API 세금계산서 연동 클라이언트 인터페이스 및 Mock 구동체
 * 백엔드 REST API 또는 Bolta API 서비스와 동기화
 */

import { TaxInvoiceData, InvoiceStatus } from '../types';

export interface BoltaIssueResponse {
  success: boolean;
  approvalNo?: string;     // 국세청 승인번호 (24자리 예: 20260801-41000000-12345678)
  status: InvoiceStatus;
  issuedAt: string;
  ntsSentAt?: string;
  message: string;
  errors?: string[];
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
      baseUrl: config.baseUrl || 'https://api.bolta.io/v1',
      isSandbox: config.isSandbox ?? true,
      apiKey: config.apiKey || 'mock-bolta-api-key',
    };
  }

  /**
   * 임시저장 (DRAFT) 생성
   */
  async createDraft(data: TaxInvoiceData): Promise<{ id: string; status: InvoiceStatus }> {
    await new Promise(r => setTimeout(r, 200)); // API Latency 흉내
    const draftId = data.id || `bolta_draft_${Date.now()}`;
    return {
      id: draftId,
      status: 'DRAFT',
    };
  }

  /**
   * 볼타 API 세금계산서 정식 발행 (ISSUED)
   */
  async issueInvoice(data: TaxInvoiceData): Promise<BoltaIssueResponse> {
    await new Promise(r => setTimeout(r, 400)); // API Latency

    // 승인번호 생성 (24자리: YYYYMMDD + 8자리 사업자식별 + 8자리 일련번호)
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSeq = Math.floor(10000000 + Math.random() * 90000000);
    const mockApprovalNo = `${todayStr}-41000000-${randomSeq}`;
    const issuedAt = new Date().toISOString();

    return {
      success: true,
      approvalNo: mockApprovalNo,
      status: 'ISSUED',
      issuedAt,
      message: '전자세금계산서가 성공적으로 발행되었습니다. (볼타 API 연동)',
    };
  }

  /**
   * 국세청 전송 (NTS_SENT)
   */
  async sendToNTS(approvalNo: string): Promise<{ success: boolean; ntsSentAt: string }> {
    await new Promise(r => setTimeout(r, 300));
    return {
      success: true,
      ntsSentAt: new Date().toISOString(),
    };
  }
}

export const defaultBoltaClient = new BoltaTaxInvoiceApiClient();
