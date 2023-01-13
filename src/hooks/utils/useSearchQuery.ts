import { useEffect, useRef } from "react"
import type React from "react"
import { useAppDispatch, useAppSelector } from "../redux"
import type { MessageType } from "../store/types"

const useSearchQuery = (currentPage: MessageType) => {
    const dispatch = useAppDispatch()
    const query = useAppSelector((state) => state[currentPage].searchQuery)

    // required unused variable to declare type of mutable ref
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const setQuery = useRef((e: React.ChangeEvent<HTMLInputElement>) => {
        return
    })

    useEffect(() => {
        import(`src/store/reducers/${currentPage}`).then((module) => {
            const { setSearchQuery } = module

            setQuery.current = (e) => {
                dispatch(setSearchQuery(e.target.value))
            }
        })
    }, [currentPage, dispatch])

    const state: [string, (e: React.ChangeEvent<HTMLInputElement>) => void] = [
        query,
        setQuery.current,
    ]

    return state
}

export default useSearchQuery
