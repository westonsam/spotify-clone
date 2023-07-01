"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";



const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div
            className="
        fixed
        bottom-0
        bg-black
        w-full
        h-[80px]
        py-2
        px-4
        ">
            {/* Using key destroys the element that was using it when it changes,
                Therefore, it willbe destroyed before new song*/}
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
}

export default Player;