"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/')
        }

    }, [isLoading, user, router]);


    if (songs.length === 0) {
        return (
            <div
                className="
            flex
            flex-col
            text-neutral-400
            gap-y-2
            px-6
            w-full">
                No liked songs.
            </div>
        )
    }

    return (
        <div className="
        flex
        flex-col
        gap-y-2
        p-6
        w-full
        ">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="
                    flex
                    items-center
                    gap-x-4
                    w-full
                    ">
                    <div className="
                        flex-1
                        ">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
    );
}

export default LikedContent;