import ApiError from "../utils/apiError.js";
import { Subscription,User } from "../models/index.js";

type SubscribePayload = {
    subscribedToId:number,
    userId:number,
}

const subscribeOrUnsubscribeUser = async(payload:SubscribePayload) => {
    const {subscribedToId,userId} = payload;
    
    if(subscribedToId === userId){
        throw new ApiError(400,"You cannot subscribe to yourself");
    }
    const user = await User.findByPk(subscribedToId);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    
    const subscription = await Subscription.findOne({
        where:{
            subscriber_id:userId,
            subscribed_to_id:subscribedToId
        }
    });
    if(subscription){
        await subscription.destroy();
        return {
            action:"unsubscribed",
        }
    }else{
        await Subscription.create({
            subscriber_id:userId,
            subscribed_to_id:subscribedToId
        });
        return {
            action:"subscribed",
        }
    }
}

export default {
    subscribeOrUnsubscribeUser
};