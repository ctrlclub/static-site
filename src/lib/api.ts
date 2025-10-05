const dev = import.meta.env.MODE === "development";

export const API_URL: string = dev
  ? "http://localhost:3000"
  : "https://ctrlclub.mqlvin.dev";
