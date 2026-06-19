import User from "./user.js";
import Video from "./video.js";

Video.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'uploader',
    onDelete:"CASCADE"
});

User.hasMany(Video,{
    foreignKey: "user_id",
    as: "uploaded_videos",
    onDelete:"CASCADE"
});

export { 
    User,
    Video
}