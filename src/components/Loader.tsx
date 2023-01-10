import React from "react"
import { GiPlainCircle } from "react-icons/gi"
import styles from "../styles"

const Loader = () => {
    return (
        <div className={styles.mainCenter}>
            <GiPlainCircle size={32} className="text-green animate-ping" />
        </div>
    )
}

export default Loader
