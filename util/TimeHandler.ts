// returns the latest time
export function getLatestTime(times) {
  const convertedTimes = times.map(Number);
  return Math.max(...convertedTimes);
}

// returns either Today or last date something was updated in the format of MM/DD/YYYY
export function getUpdated(date) {
  const today = new Date();
  return today.toISOString().split("T")[0] ===
    new Date(date).toISOString().split("T")[0]
    ? "Today"
    : new Date(date).toLocaleDateString("en-US").split("T")[0];
}

// returns current year
export function getCurrentYear() {
  return new Date().getFullYear();
}

// returns exact time if the ms is within today or date
export function getTimeOrDate(ms) {
  const today = new Date();
  const givenDate = new Date(ms);
  if (today.getDate() === givenDate.getDate()) {
    const time = new Date(ms).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (time[0] === "0") return time.substr(1);
    else return time;
  } else {
    console.log(
      new Date(1621690770108).toLocaleDateString("en-US").split("T")[0]
    );
    return new Date(ms).toLocaleDateString("en-US").split("T")[0];
  }
}
