import { MdOutlineAlternateEmail, MdOutlineSearch } from "react-icons/md"

const Header = () => {
    return (
        <header className="col-span-2 border-b flex text-neutral-100 h-14 items-center p-4">
            <MdOutlineAlternateEmail size={24} />
            <h1 className="text-xl font-bold mx-auto">Входящие</h1>
            <MdOutlineSearch size={24} />
        </header>
    )
}

export default Header
