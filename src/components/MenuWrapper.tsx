import MenuItem from "@/components/MenuItem";

const MenuWrapper = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-slate-500 to-slate-800">
            <div className="items-left flex-col flex bg-slate-200 p-4 w-1/4 ">
                <h1 className="text-2xl font-bold mb-4">Indexes</h1>
                <ul className="flex flex-col divide-y">
                    <MenuItem index="Rulebooks"/>
                    <MenuItem index="Game Recordings" />
                    <MenuItem index="World Map" />
                    <MenuItem index="Lore" />
                    <MenuItem index="Faction Tracker" />
                    <MenuItem index="Player Characters"/>
                    <MenuItem index="NPCs" />
                    <MenuItem index="Items" />
                </ul>
            </div>
            <div className="bg-slate-300 p-4"></div>
            <div className="flex  flex-col h-screen w-full items-center justify-center">
                {children}
            </div>
        </div>
    );
}

export default MenuWrapper;