import React from "react"
import { GiPlainCircle } from "react-icons/gi"
import styles from "../styles"
import { ICON_SIZE_LARGE } from "@/Sidebar"

const Loader = () => {
    return (
        <div className={styles.mainCenter}>
            <GiPlainCircle
                size={ICON_SIZE_LARGE}
                className="text-green animate-ping"
            />
        </div>
    )
}

export default Loader
