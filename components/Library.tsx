"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscriptionModal from "@/hooks/useSubscriptionModal";

import MediaItem from "./MediaItem";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const subscriptionModal = useSubscriptionModal();
    const { user, subscription } = useUser();
    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }
        
        if (!subscription){
            return subscriptionModal.onOpen();
        }

        return uploadModal.onOpen();
    };
    return (
        <div className="flex flex-col">
            <div className="
            flex
            items-center
            justify-between
            px-5
            pt-4
            ">
                <div
                    className="
                inline-flex
                items-center
                gap-x-2
                ">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p
                        className="
                    text-neutral-400
                    font-medium
                    text-md
                    ">Your Library</p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="
                    text-neutral-400
                    cursor-pointer
                    hover:text-white
                    transition"
                />
            </div>
            <div
                className="
                flex
                flex-col
                gap-y-2
                mt-3
                px-3
            ">
                {songs.map((item) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;