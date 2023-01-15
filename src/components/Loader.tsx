import React from "react"
import { GiPlainCircle } from "react-icons/gi"

import { ICON_SIZE_LARGE } from "@/sidebar"

const Loader = () => {
    return (
        <div className="m-4 my-2 grid min-h-max place-items-center rounded bg-neutral-800 text-neutral-100">
            <GiPlainCircle size={ICON_SIZE_LARGE} className="animate-ping text-green" />
        </div>
    )
}

export default Loader
