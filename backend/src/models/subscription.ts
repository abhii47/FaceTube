import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Subscription extends Model<InferAttributes<Subscription, { omit: "created_at" }>, InferCreationAttributes<Subscription>>{
    declare subscription_id:CreationOptional<number>;
    declare subscriber_id:number;
    declare subscribed_to_id:number;
    
    declare readonly created_at:CreationOptional<Date>;
}

Subscription.init({
    subscription_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    subscriber_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    subscribed_to_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    tableName:"subscriptions",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:false,
    indexes:[
        {
            name:"unique_subscription",
            unique:true,
            fields:["subscriber_id","subscribed_to_id"],
        }
    ]
})

export default Subscription;