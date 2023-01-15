import { useEffect, useState } from "react"
import { useAppDispatch } from "../redux"
import type { MessageType } from "../store/types"
import { setStarredInDB } from "../../store/utils/starMessage"

const UseStarMessage = (currentPage: MessageType, starred: boolean) => {
    const dispatch = useAppDispatch()

    // required unused variable to declare type of mutable ref
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [starMessage, setStarMessage] = useState<(id: string) => void>(() => () => {
        return
    })

    useEffect(() => {
        import(`src/store/reducers/${currentPage}`).then((module) => {
            const { setStarred } = module

            if (currentPage === "trash") {
                return
            }

            setStarMessage(() => (id: string) => {
                dispatch(setStarred({ id, starred: !starred }))
                dispatch(setStarredInDB({ id, starred: !starred }))
            })
        })
    }, [currentPage, dispatch, starred])

    return starMessage
}

export default UseStarMessage
