import Subscription from "./subscription.js";
import User from "./user.js";
import Video from "./video.js";
import VideoInteraction from "./videoInteraction.js";

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

User.belongsToMany(User,{
    through:Subscription,
    foreignKey:"subscriber_id",
    otherKey:"subscribed_to_id",
    as:"subscribedTo"
});

User.belongsToMany(User,{
    through:Subscription,
    foreignKey:"subscribed_to_id",
    otherKey:"subscriber_id",
    as:"subscribers"
});

Subscription.belongsTo(User,{
    foreignKey:"subscriber_id",
    as:"subscriber"
});

Subscription.belongsTo(User,{
    foreignKey:"subscribed_to_id",
    as:"subscribedTo"
});

VideoInteraction.belongsTo(Video,{
    foreignKey:"video_id",
    as:"video",
    onDelete:"CASCADE"
});

VideoInteraction.belongsTo(User,{
    foreignKey:"user_id",
    as:"user",
    onDelete:"CASCADE"
});

Video.hasMany(VideoInteraction,{
    foreignKey:"video_id",
    as:"interactions"
});

User.hasMany(VideoInteraction,{
    foreignKey:"user_id",
    as:"interacted_videos"
});

export { 
    User,
    Video,
    Subscription,
    VideoInteraction
}