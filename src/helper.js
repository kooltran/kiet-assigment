const monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const convertSecondToHours = seconds => {
  var h = Math.floor(Number(seconds) / 3600);
  var m = Math.floor((Number(seconds) % 3600) / 60);
  var s = Math.floor((Number(seconds) % 3600) % 60);

  var hDisplay = h > 0 ? `${h}h` : "";
  var mDisplay = m > 0 ? `${m}m` : "";
  return hDisplay + mDisplay + s;
};

export const convertToLongDate = dateString => {
  if (!dateString) {
    return undefined;
  }

  const d = new Date(dateString);
  const h = ("0" + d.getHours()).slice(-2);
  const min = ("0" + d.getMinutes()).slice(-2);
  const sec = ("0" + d.getSeconds()).slice(-2);
  const day = d.getDate();
  const month = d.getMonth();
  const monthName = monthsName[month];
  const year = d.getFullYear();
  return {
    time: `${h}:${min}:${sec}`,
    date: `${day} ${monthName} ${year}`
  };
};
