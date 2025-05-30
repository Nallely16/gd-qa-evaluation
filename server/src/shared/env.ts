import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    DB_PORT: parseInt(process.env.DB_PORT || "3306"),
    DB_HOST: process.env.DB_HOST ?? "localhost",
    DB_USERNAME: process.env.DB_USER ?? '',
    DB_PASSWORD: process.env.DB_PASS ?? '',
    DB_NAME: process.env.DB_NAME ?? '',
};

console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
