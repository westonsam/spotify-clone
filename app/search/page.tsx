import getSongsByTitle from "@/actions/getSongsByTitle"
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
    searchParams: {
        title: string
    }
};

export const revalidate = 0;
const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);
    // TODO: get SONGS BY ARTIST NAME
    return (
        <div
            className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="gap-y-6 mb-2 flex flex-col">
                    <h1 className="Text-white text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    )
};

export default Search;