import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Comment extends Model<InferAttributes<Comment, { omit: "created_at" | "updated_at" }>, InferCreationAttributes<Comment>>{
    declare comment_id:CreationOptional<number>;
    declare video_id:number;
    declare user_id:number;
    declare comment:string;
    
    declare readonly created_at:CreationOptional<Date>;
    declare readonly updated_at:CreationOptional<Date>;
}

Comment.init({
    comment_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    video_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    comment:{
        type:DataTypes.TEXT,
        allowNull:false,
    }
},{
    sequelize,
    tableName:"comments",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at",
})

export default Comment;