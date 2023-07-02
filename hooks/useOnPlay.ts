import { Song } from "@/types";

import { useUser } from "./useUser";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import useSubscriptionModal from "./useSubscriptionModal";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const subscriptionModal = useSubscriptionModal();
    const { user, subscription } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }
        // Uncoment to allow only subscribers to play music
        // if (!subscription) {
        //     return subscriptionModal.onOpen();
        // }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    };

    return onPlay;
};

export default useOnPlay;