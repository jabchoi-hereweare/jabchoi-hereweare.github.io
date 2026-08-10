/**
 * 한국 사업자등록번호 국세청 검증 알고리즘 (Modulo-10 Checksum) 및 하이픈 포맷터
 */

/**
 * 사업자등록번호에서 하이픈 및 특수문자 제거 후 10자리 숫자만 추출
 */
export const sanitizeBizRegNo = (value: string): string => {
  return value.replace(/[^0-9]/g, '').slice(0, 10);
};

/**
 * 사업자등록번호 하이픈 자동 포맷팅 (123-45-67890)
 */
export const formatBizRegNo = (value: string): string => {
  const raw = sanitizeBizRegNo(value);
  if (raw.length <= 3) return raw;
  if (raw.length <= 5) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
  return `${raw.slice(0, 3)}-${raw.slice(3, 5)}-${raw.slice(5)}`;
};

/**
 * 국세청 사업자등록번호 Modulo-10 검증 알고리즘
 * 10자리 숫자에 체크섬 가중치 [1, 3, 7, 1, 3, 7, 1, 3, 5] 적용
 */
export const validateBizRegNoMod10 = (value: string): boolean => {
  const raw = sanitizeBizRegNo(value);
  if (raw.length !== 10) return false;

  const digits = raw.split('').map(Number);
  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += digits[i] * weights[i];
  }

  // 9번째 자리는 (d9 * 5) 결과를 10으로 나눈 몫과 나머지를 가산
  const step9 = digits[8] * weights[8];
  sum += Math.floor(step9 / 10) + (step9 % 10);

  const remainder = sum % 10;
  const checkDigit = (10 - remainder) % 10;

  return checkDigit === digits[9];
};
