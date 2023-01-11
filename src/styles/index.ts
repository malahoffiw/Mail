const styles = {
    transition: "transition-all duration-100 ease-out",

    btnLarge: "p-6 py-2 rounded cursor-pointer hover:brightness-75",
    btnSmall: "p-4 py-1 rounded cursor-pointer hover:brightness-75",

    messageLine: "p-1 rounded cursor-pointer hover:brightness-125",

    sidebarIconSecondary:
        "w-full h-10 p-2 cursor-pointer rounded " +
        "bg-neutral-800 hover:brightness-150",
    sidebarIconMain:
        "w-full h-10 p-2 mb-2 cursor-pointer rounded " +
        "bg-green hover:brightness-75",
    sidebarMobile:
        "absolute z-20 top-16 left-0 h-[calc(100vh_-_64px)] " +
        "flex flex-col gap-2 " +
        "p-4 bg-neutral-900",
    sidebarDesktop: "m-4 mt-2 flex flex-col gap-1 items-center",
    sidebarBtn: "grid grid-cols-[24px_1fr_24px] gap-2 w-full",

    mainCenter:
        "min-h-full m-4 my-2 rounded bg-neutral-800 grid place-items-center text-neutral-100",
}

export default styles
