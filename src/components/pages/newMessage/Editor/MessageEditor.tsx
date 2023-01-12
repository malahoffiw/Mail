import React from "react"
import dynamic from "next/dynamic"
import type { Editor } from "tinymce"
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react"
import { env } from "../../../../env/client.mjs"

import initOptions from "@/pages/newMessage/Editor/initOptions"

type MessageEditorProps = {
    editorRef: React.MutableRefObject<Editor | null>
    initialContent: string | null
}

const MessageEditor = ({ editorRef, initialContent }: MessageEditorProps) => {
    return (
        <TinyMCEEditor
            apiKey={env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={initialContent ?? ""}
            init={{
                ...initOptions,
                mobile: {
                    toolbar_mode: "sliding",
                    toolbar:
                        "fullscreen export undo redo | bold italic underline | backcolor forecolor | " +
                        "fontsize | fontfamily | bullist numlist |" +
                        "table image media",
                },
            }}
        />
    )
}

// disabling ssr to avoid error "Prop `id` did not match. Server: "tinymce-X" Client: "tinymce-Y""
// tinymce-react initialize editor with componentDidMount, which is not called on server
export default dynamic(() => Promise.resolve(MessageEditor), {
    ssr: false,
})
