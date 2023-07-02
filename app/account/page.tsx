import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";

const Account = () => {
    return (
        <div
            className="
        overflow-hidden
        overflow-y-auto
        h-full
        w-full
        bg-neutral-900
        rounded-lg
        ">
            <Header
                className="from-bg-neutral-900">
                <div
                    className="
                flex
                flex-col
                gap-y-6
                mb-2
                ">
                    <h1
                        className="
                    text-white
                    text-3xl
                    font-semibold">
                        Account Setting
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
    );
}

export default Account;