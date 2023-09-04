export function FormatDate(dateToFormat: string) {
  const day = new Date(dateToFormat).getDate();
  const month = new Date(dateToFormat).getMonth() + 1;
  const year = new Date(dateToFormat).getFullYear();

  return `${day}/${month <= 9 ? `0${month}` : month}/${year}`;
}

export function FormatDateWithTime(dateToFormat: any) {
  return `${dateToFormat.split("T")[0].split("-").reverse().join("/")} ${
    parseInt(
      dateToFormat.split("T")[1].split(".")[0].substr(0, 5).split(":")[0]
    ) > 12
      ? parseInt(dateToFormat.split("T")[1].split(".")[0].substr(0, 5)) - 12
      : parseInt(dateToFormat.split("T")[1].split(".")[0].substr(0, 5))
  }:${dateToFormat.split("T")[1].split(".")[0].substr(0, 5).split(":")[1]} ${
    parseInt(
      dateToFormat.split("T")[1].split(".")[0].substr(0, 5).split(":")[0]
    ) <= 11 &&
    parseInt(
      dateToFormat.split("T")[1].split(".")[0].substr(0, 5).split(":")[1]
    ) <= 59
      ? "a.m."
      : "p.m."
  }`;
}
