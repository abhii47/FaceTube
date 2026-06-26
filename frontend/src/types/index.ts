export type User = {
    user_id:number;
    username:string;
    email:string;
    avatar_url:string | null;
    created_at:string;
}

export type RegisterData = {
    username:string;
    email:string;
    password:string;
}

export type LoginData = {
    email:string;
    password:string;
}

export type Uploader = {
    username:string;
    avatar_url:string | null;
}

export type Video = {
    video_id:number;
    user_id:number;
    title:string;
    description:string;
    video_url:string;
    thumbnail_url:string;
    view_count:number;
    uploader:Uploader;
}