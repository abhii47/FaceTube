import {Comment,User, Video} from "../models/index.js";
import ApiError from "../utils/apiError.js";

type AddCommentPayload = {
    videoId:number,
    userId:number,
    comment:string
}
type DeleteCommentPayload = {
    commentId:number,
    userId:number,
}
type CommentsOnVideoPayload = {
    videoId:number,
    page:number,
    limit:number
}

const addComment = async(payload:AddCommentPayload) => {
    const {videoId,userId,comment} = payload;

    const video = await Video.findByPk(videoId);
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    if(!comment){
        throw new ApiError(400,"Comment is required");
    }
    
    const uploadedComment = await Comment.create({
        video_id:videoId,
        user_id:userId,
        comment
    });
    return uploadedComment.toJSON();
}

const commentsOnVideo = async(payload:CommentsOnVideoPayload) => {
    const {videoId,page,limit} = payload;

    const video = await Video.findByPk(videoId);
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    const comments = await Comment.findAndCountAll({
        where:{
            video_id:videoId
        },
        offset:(page-1)*limit,
        limit,
        order:[['created_at','DESC']],
        include:{
            model:User,
            as:"user",
            attributes:["username","avatar_url"]
        },
    });
    return {
        totalComments:comments.count,
        totalPages:Math.ceil(comments.count/limit),
        currentPage:page,
        comments:comments.rows.map(c => c.toJSON())
    };  
}

const deleteComment = async(payload:DeleteCommentPayload) => {
    const {commentId,userId} = payload;
    const comment = await Comment.findByPk(commentId);
    if(!comment){
        throw new ApiError(404,"Comment not found");
    }
    if(comment.user_id !== userId){
        throw new ApiError(403,"You are not authorized to delete this comment");
    }
    await comment.destroy();
    return {action:"deleted"};
}

export default {
    addComment,
    commentsOnVideo,
    deleteComment
}