/**
 * "n時間前" 等の相対的な時間差を示す文字列を生成します。
 * @param from 日時
 * @returns 時間差を示す文字列
 */
export const relativeTime = (from: Date): string => {
  const diff = new Date().getTime() - from.getTime();
  const elapsed = new Date(diff);
  if (elapsed.getUTCFullYear() - 1970) {
    return elapsed.getUTCFullYear() - 1970 + "年前";
  } else if (elapsed.getUTCMonth()) {
    return elapsed.getUTCMonth() + "ヶ月前";
  } else if (elapsed.getUTCDate() - 1) {
    return elapsed.getUTCDate() - 1 + "日前";
  } else if (elapsed.getUTCHours()) {
    return elapsed.getUTCHours() + "時間前";
  } else if (elapsed.getUTCMinutes()) {
    return elapsed.getUTCMinutes() + "分前";
  } else {
    return "たった今";
  }
};
