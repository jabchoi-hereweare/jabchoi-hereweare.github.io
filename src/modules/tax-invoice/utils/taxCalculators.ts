/**
 * 부가가치세 및 세금계산서 공급가액/세액/합계금액 계산 유틸리티
 */

import { TaxInvoiceItem, TaxType } from '../types';

/**
 * 과세 유형에 따른 부가가치세액 계산 (기본 10% 과세)
 */
export const calculateTaxAmount = (supplyAmount: number, taxType: TaxType = 'TAXABLE'): number => {
  if (taxType === 'ZERO_RATE' || taxType === 'EXEMPT') {
    return 0;
  }
  // 과세 거래 (10%) - 원 미만 절사
  return Math.floor(supplyAmount * 0.1);
};

/**
 * 단가와 수량으로 행별 공급가액 및 세액 계산
 */
export const calculateItemAmounts = (
  quantity: number | '',
  unitPrice: number | '',
  taxType: TaxType = 'TAXABLE'
): { supplyAmount: number; taxAmount: number } => {
  const qty = typeof quantity === 'number' && !isNaN(quantity) ? quantity : 0;
  const price = typeof unitPrice === 'number' && !isNaN(unitPrice) ? unitPrice : 0;
  const supply = Math.round(qty * price);
  const tax = calculateTaxAmount(supply, taxType);

  return {
    supplyAmount: supply,
    taxAmount: tax,
  };
};

/**
 * 품목 목록 전체의 총 공급가액, 총 세액, 총 합계금액 집계
 */
export const aggregateInvoiceTotals = (
  items: TaxInvoiceItem[],
  taxType: TaxType = 'TAXABLE'
): { totalSupplyAmount: number; totalTaxAmount: number; totalAmount: number } => {
  if (!items || items.length === 0) {
    return { totalSupplyAmount: 0, totalTaxAmount: 0, totalAmount: 0 };
  }

  const totalSupplyAmount = items.reduce((acc, item) => acc + (item.supplyAmount || 0), 0);
  const totalTaxAmount = items.reduce((acc, item) => {
    // 행별 세액이 있으면 합산, 없으면 계산
    const itemTax = typeof item.taxAmount === 'number' 
      ? item.taxAmount 
      : calculateTaxAmount(item.supplyAmount || 0, taxType);
    return acc + itemTax;
  }, 0);

  return {
    totalSupplyAmount,
    totalTaxAmount,
    totalAmount: totalSupplyAmount + totalTaxAmount,
  };
};
