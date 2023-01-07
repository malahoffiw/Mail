import React, { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import type { Editor } from "tinymce"
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react"
import { env } from "../../../env/client.mjs"

import initOptions from "@/pages/newMessage/initOptions"

type MessageEditorProps = {
    // editorRef: React.MutableRefObject<Editor>
}

const MessageEditor = ({}: MessageEditorProps) => {
    const editorRef = useRef<Editor | null>(null)

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

    return (
        <TinyMCEEditor
            apiKey={env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
                // todo - somethings wrong with width
                // editor doesn't resize on window resize
                // useEffect decision is just for now (works only on page reload)
                width: windowWidth - 128,
                ...initOptions,
            }}
        />
    )
}

// disabling ssr to avoid error "Prop `id` did not match. Server: "tinymce-X" Client: "tinymce-Y""
// tinymce-react initialize editor with componentDidMount, which is not called on server
export default dynamic(() => Promise.resolve(MessageEditor), {
    ssr: false,
})
