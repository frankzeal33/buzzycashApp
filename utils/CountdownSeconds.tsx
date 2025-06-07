export const getCountdownSeconds = (targetDateStr: string) => {
  const targetDate = new Date(targetDateStr);
  const now = new Date();

  const diffMs = targetDate.getTime() - now.getTime();
  const diffSec = Math.max(Math.floor(diffMs / 1000), 0); // Prevent negatives

  return diffSec;
};
