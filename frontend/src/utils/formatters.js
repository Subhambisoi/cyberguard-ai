export const riskClass = (
  risk = ""
) => {

  const value =
    risk.toLowerCase();


  if (
    value === "critical"
  ) {

    return "risk-critical";

  }


  if (
    value === "high"
  ) {

    return "risk-high";

  }


  if (
    value === "medium"
  ) {

    return "risk-medium";

  }


  return "risk-low";

};


export const initials = (
  name = ""
) => {

  return name

    .split(" ")

    .filter(Boolean)

    .slice(0, 2)

    .map(
      part => part[0]
    )

    .join("")

    .toUpperCase();

};