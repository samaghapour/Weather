// get realTime of city | country
export const GetTimeZone = (timezone) => {
  const now = new Date();
  const utc = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  ).getTime();

  return new Date(utc + timezone * 1000);
};
