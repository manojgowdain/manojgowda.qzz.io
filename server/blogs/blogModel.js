import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export const Blog = sequelize.define("Blog", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true }, // New field
}, {
  tableName: "blogs",
  timestamps: true,
});

export async function initDB() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true ,force:false}); // This will automatically add the imageUrl column if it doesn't exist
}
