/**
 * 부가가치세법상 전자세금계산서 법정 발급기한(익월 10일) 및 가산세 판단 유틸리티
 */

/**
 * 작성연월일(YYYY-MM-DD)을 기준으로 가산세 없는 법정 발급 기한(익월 10일) 계산
 * 예: 2026-07-31 작성 건 → 법정 발급기한: 2026-08-10
 */
export const getStatutoryIssueDeadline = (writeDateStr: string): string | null => {
  if (!writeDateStr || !/^\d{4}-\d{2}-\d{2}$/.test(writeDateStr)) return null;

  const [yearStr, monthStr] = writeDateStr.split('-');
  let year = parseInt(yearStr, 10);
  let month = parseInt(monthStr, 10);

  // 익월 (다음 달)
  month += 1;
  if (month > 12) {
    month = 1;
    year += 1;
  }

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  return `${year}-${formattedMonth}-10`;
};

/**
 * 현재 날짜/실제 발급일자가 법정 발급기한(익월 10일)을 초과했는지 판정
 */
export const checkIssueDeadlinePassed = (
  writeDateStr: string,
  actualIssueDateStr?: string
): { isPassed: boolean; deadlineStr: string | null; warningMessage?: string } => {
  const deadlineStr = getStatutoryIssueDeadline(writeDateStr);
  if (!deadlineStr) return { isPassed: false, deadlineStr: null };

  const targetIssueDate = actualIssueDateStr || new Date().toISOString().slice(0, 10);

  if (targetIssueDate > deadlineStr) {
    return {
      isPassed: true,
      deadlineStr,
      warningMessage: `⚠️ 법정 발급기한(${deadlineStr})이 경과했습니다! 발급 시 공급자 지연발급 가산세(1%)가 부과될 수 있습니다.`,
    };
  }

  return {
    isPassed: false,
    deadlineStr,
  };
};
