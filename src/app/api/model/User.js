import { Sequelize, DataTypes } from 'sequelize'
import { config } from 'dotenv'

config();

// Sequelize setup
const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    ssl: true, // Enable SSL
    dialectOptions: {
        ssl: {
            require: true, // Require SSL
        },
    },
});

await sequelize.sync();
  
  
// Defining User model
const User = sequelize.define('User', { 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

export default User;