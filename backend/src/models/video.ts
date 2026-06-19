import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Video extends Model<InferAttributes<Video, { omit: "created_at" | "deleted_at" }>, InferCreationAttributes<Video>>{
    declare video_id:CreationOptional<number>;
    declare user_id:number;
    declare title:string;
    declare description:string | null;
    declare video_url:string;
    declare thumbnail_url:string | null;
    declare view_count:CreationOptional<number>;
    
    declare readonly created_at:CreationOptional<Date>;
    declare readonly deleted_at:CreationOptional<Date | null>;
}

Video.init({
    video_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    video_url:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    thumbnail_url:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    view_count:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},{
    sequelize,
    tableName:"videos",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:false,
    paranoid:true,
    deletedAt:"deleted_at"
})

export default Video;