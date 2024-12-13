export const convertDurationToDays = (duration: string) => {
  const value = duration.split(" ")[0];
  const unit = duration.split(" ")[1];
  switch (unit) {
    case "día":
      return parseInt(value);
    case "días":
      return parseInt(value);
    case "semana":
      return parseInt(value) * 7;
    case "semanas":
      return parseInt(value) * 7;
    case "mes":
      return parseInt(value) * 30;
    case "meses":
      return parseInt(value) * 30;
    case "año":
      return parseInt(value) * 365;
    case "años":
      return parseInt(value) * 365;
    default:
      return 0;
  }
};
