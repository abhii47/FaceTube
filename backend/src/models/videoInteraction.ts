import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db.js";

type InteractionType = "like" | "dislike";

class VideoInteraction extends Model<InferAttributes<VideoInteraction, { omit: "created_at" }>, InferCreationAttributes<VideoInteraction>>{
    declare interaction_id:CreationOptional<number>;
    declare video_id:number;
    declare user_id:number;
    declare interaction_type:InteractionType;
    
    declare readonly created_at:CreationOptional<Date>;
}

VideoInteraction.init({
    interaction_id:{
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
    interaction_type:{
        type:DataTypes.ENUM("like","dislike"),
        allowNull:false,
    }
},{
    sequelize,
    tableName:"video_interactions",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:false,
    indexes:[
        {
            name:"unique_interaction",
            unique:true,
            fields:["video_id","user_id"],
        }
    ]
})

export default VideoInteraction;