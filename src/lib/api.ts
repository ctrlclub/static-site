const dev = import.meta.env.MODE === "development";

export const API_URL: string = dev
  ? "https://ctrlclub.mqlvin.dev"
  : "https://ctrlclub.mqlvin.dev";
