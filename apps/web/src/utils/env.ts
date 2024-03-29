export const env = {
  BE_BASE_URL: process.env.NEXT_PUBLIC_BE_BASE_URL || "http://localhost:8080",
  BE_BASE_WS_URL: process.env.NEXT_PUBLIC_BE_BASE_WS || "ws://localhost:8080",
} as const;
