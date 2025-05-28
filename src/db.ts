import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DATABASE_URL || '';

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Allow self-signed certs (common on Render)
    }
  },
  logging: false // Optional: disable SQL logging
});