export const url =
  process.env.NODE_ENV === "production"
    ? "https://everytindiscount.onrender.com/graphql"
    : "http://localhost:4000/graphql";
export const wsurl =
  process.env.NODE_ENV === "production"
    ? "wss://everytindiscount.onrender.com/graphql"
    : "ws://localhost:4000/graphql";
