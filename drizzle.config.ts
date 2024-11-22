import * as dotenv from "dotenv"
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: '.env.development' });

export default defineConfig({
  out: './drizzle',
  schema: './app/(server)/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL as string,
  },
  verbose: true,
});