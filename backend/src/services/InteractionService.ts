import ApiError from "../utils/apiError.js";
import { Video, VideoInteraction } from "../models/index.js";

type InteractionPayload = {
    videoId:number,
    userId:number,
    interactionType: "like" | "dislike"
}

const toggleInteraction = async(payload:InteractionPayload) => {
    const {videoId,userId,interactionType} = payload;

    if(!interactionType || !["like","dislike"].includes(interactionType)){
        throw new ApiError(400,"Invalid interaction type");
    }

    const video = await Video.findByPk(videoId);
    if(!video){
        throw new ApiError(404,"Video not found");
    }

    const interaction = await VideoInteraction.findOne({
        where:{
            video_id:videoId,
            user_id:userId
        }
    });
    if(interaction){
        if(interaction.interaction_type === interactionType){
            await interaction.destroy();
            return {
                action:"removed",
                interactionType:null
            }
        }else{
            await interaction.update({
                interaction_type:interactionType
            });
            return {
                action:"updated",
                interactionType
            }
        }
    }else{
        await VideoInteraction.create({
            video_id:videoId,
            user_id:userId,
            interaction_type:interactionType
        });
        return {
            action:"created",
            interactionType
        }
    }
}

export default {
    toggleInteraction
}