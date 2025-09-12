// jest.setup.ts
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from a specific .env file for testing
dotenv.config({ path: path.resolve(__dirname, "../.env.test") });
