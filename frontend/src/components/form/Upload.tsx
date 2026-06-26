import { useState } from "react";
import { uploadVideo } from "../../api/client";

const UploadVideo = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [isuploading, setIsUploading] = useState<boolean>(false);
    
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        setIsUploading(true);
        if(!thumbnail || !videoFile){
            alert("Please provide both video and thumbnail");
            return;
        }
        const formData = new FormData();
        formData.append("title",title);
        formData.append("description",description);
        formData.append("video",videoFile);
        if(thumbnail) formData.append("thumbnail",thumbnail);
        try {
            const video = await uploadVideo(formData);
            if(video){
                alert("Video uploaded successfully");
                setTitle("");
                setDescription("");
                setVideoFile(null);
                setThumbnail(null);
            }
        } catch (err) {
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    }
    return(
        <div className="max-w-4xl mx-auto p-4 w-full mt-8">
            <div className="bg-[#111827] p-8 rounded-2xl border border-[#2A3B4A] shadow-2xl">
                <h1 className="text-2xl font-bold text-[#F1F1F1] mb-6">
                    Upload New Video
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="text-gray-300 font-medium mb-2 block">
                            Title
                        </label>
                        <input type="text" id="title" className="w-full p-3 rounded-xl bg-[#090D12] text-[#F1F1F1] border border-[#2A3B4A] focus:outline-none focus:border-[#077A7D] transition-colors" placeholder="Enter video title" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description" className="text-gray-300 font-medium mb-2 block">
                            Description
                        </label>
                        <textarea id="description" rows={4} className="w-full p-3 rounded-xl bg-[#090D12] text-[#F1F1F1] border border-[#2A3B4A] focus:outline-none focus:border-[#077A7D] transition-colors" placeholder="Enter video description" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="video" className="text-gray-300 font-medium mb-2 block">
                            Video File
                        </label>
                        <input 
                            type="file" 
                            id="video"
                            accept="video/*" 
                            className="w-full p-3 rounded-xl bg-[#090D12] text-gray-400 border border-[#2A3B4A] focus:outline-none focus:border-[#077A7D] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#183D3D] file:text-[#077A7D] hover:file:bg-[#1a4747]" 
                            onChange={e => 
                                setVideoFile(e.target.files?.[0] || null)
                            } 
                        />
                    </div>
                    <div>
                        <label htmlFor="thumbnail" className="text-gray-300 font-medium mb-2 block">
                            Thumbnail
                        </label>
                        <input 
                            type="file" 
                            id="thumbnail"
                            accept="image/*"
                            className="w-full p-3 rounded-xl bg-[#090D12] text-gray-400 border border-[#2A3B4A] focus:outline-none focus:border-[#077A7D] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#183D3D] file:text-[#077A7D] hover:file:bg-[#1a4747]" 
                            onChange={e => 
                                setThumbnail(e.target.files?.[0] || null)
                            } 
                        />
                    </div>
                    <button type="submit" disabled={isuploading} className="w-full bg-[#077A7D] hover:bg-[#066264] text-white font-bold py-3 px-4 rounded-xl transition-colors mt-4">
                        {isuploading ? "Uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UploadVideo;