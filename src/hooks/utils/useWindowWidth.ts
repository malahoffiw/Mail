import { useEffect, useState } from "react"

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        function watchWindow() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", watchWindow)

        return () => {
            window.removeEventListener("resize", watchWindow)
        }
    }, [])

    return windowWidth
}

export default useWindowWidth
