import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model<InferAttributes<User, { omit: "created_at" }>, InferCreationAttributes<User>>{
    declare user_id:CreationOptional<number>;
    declare username:string;
    declare email:string;
    declare password:string;
    declare avatar_url:CreationOptional<string>;
    declare refresh_token:CreationOptional<string | null>;
    
    declare readonly created_at:CreationOptional<Date>;
}

User.init({
    user_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar_url:{
        type:DataTypes.STRING,
        allowNull:true
    },
    refresh_token:{
        type:DataTypes.STRING(500),
        allowNull:true
    }
},{
    sequelize,
    tableName:"users",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:false
})

export default User;