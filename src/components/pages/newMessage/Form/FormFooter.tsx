import React from "react"
import { useRouter } from "next/router"
import styles from "../../../../styles"

const FormFooter = () => {
    const router = useRouter()

    return (
        <footer className="self-end flex gap-2">
            <button
                onClick={() => router.back()}
                className={`${styles.btnSmall} ${styles.transition} bg-ruby`}
                type="button"
            >
                Back
            </button>
            <button
                className={`${styles.btnSmall} ${styles.transition} bg-green`}
                type="submit"
            >
                Send
            </button>
        </footer>
    )
}

export default FormFooter
