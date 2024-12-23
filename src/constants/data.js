export const FACTORIES = [
  "CJ2",
  "Combo H/Some",
  "Da Cheng",
  "De Quan",
  "Elite",
  "Elite-YM",
  "FHM",
  "HL",
  "JC",
  "Newest",
  "Sunicon",
  "VCOFF",
  "Wing Ying",
  "XYW",
  "ZX",
  "Enternal Fame",
  "KFINE",
  "SYD",
  "Hong Cheng",
  "Blue Vista"
];

export const STYLE_CODES = [
  { code: "PTAR", customer: "Aritzia" },
  { code: "GPAR", customer: "Aritzia" },
  { code: "GPRT", customer: "Aritzia" },
  { code: "PTCOC", customer: "Costco" },
  { code: "PTCOT", customer: "Costco" },
  { code: "PTCOU", customer: "Costco" },
  { code: "PTCOR", customer: "Costco" },
  { code: "PTCOX", customer: "Costco" },
  { code: "PTCOM", customer: "Costco" },
  { code: "PTRT", customer: "Reitmans" },
  { code: "PTAF", customer: "A&F" },
  { code: "PTNTA", customer: "" }
];

export const getCustomerByStyleCode = (styleCode) => {
  const style = STYLE_CODES.find(s => s.code === styleCode);
  return style ? style.customer : '';
};
