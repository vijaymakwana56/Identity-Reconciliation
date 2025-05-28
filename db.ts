import {Sequelize} from "sequelize";
import dotenv from "dotenv"
dotenv.config();

const url = process.env.DATABASE_URL || '';

export const sequelize = new Sequelize(url);