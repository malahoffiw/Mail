import { MdOutlineSearch } from "react-icons/md"
import { signOut } from "next-auth/react"
import styles from "../styles"

const Header = () => {
    return (
        <header className="col-span-2 border-b flex gap-2 text-neutral-100 h-14 items-center p-4">
            <h1 className="text-lg font-bold flex items-center gap-2 mr-auto">
                Входящие
            </h1>
            <MdOutlineSearch size={24} />
            <button
                className={`${styles.btnSmallDarker} ${styles.transition} bg-ruby`}
                onClick={() => signOut()}
            >
                Sign out
            </button>
        </header>
    )
}

export default Header
