
import jalaali from "jalaali-js";
export function convertToShamsiWithTime (isoDateStr)  {
  if (!isoDateStr) return "";

  // جدا کردن تاریخ و زمان
  const [datePart, timePart] = isoDateStr.split("T"); // ["2025-09-17", "19:47:06"]
  const [year, month, day] = datePart.split("-").map(Number);

  // تبدیل میلادی به شمسی
  const { jy, jm, jd } = jalaali.toJalaali(year, month, day);

  // تاریخ شمسی با ساعت
  return `${timePart} - ${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")} `;
};

