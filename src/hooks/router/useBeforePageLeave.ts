import type { DependencyList } from "react"
import { useEffect } from "react"
import { useRouter } from "next/router"

// Should pass a dependency array very carefully
// or apply useCallback before passing callback here
const UseBeforePageLeave = (callback: () => void, deps: DependencyList = []) => {
    const router = useRouter()

    useEffect(() => {
        window.addEventListener("beforeunload", callback)
        router.events.on("routeChangeStart", callback)
        return () => {
            window.removeEventListener("beforeunload", callback)
            router.events.off("routeChangeStart", callback)
        }
    }, [callback, router.events, ...deps])
}

export default UseBeforePageLeave
