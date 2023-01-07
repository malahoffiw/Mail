import React from "react"
import MessageEditor from "@/pages/newMessage/MessageEditor"
import styles from "../../../styles"

const MessageForm = () => {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
        >
            <label className="text-neutral-600 bg-neutral-100 pl-4 rounded grid grid-cols-[35px_1fr] items-center gap-2">
                Кому
                <input
                    className={`min-w-120px bg-neutral-100 outline-0 border-0 text-neutral-900 p-4 py-1 rounded-r`}
                    type="text"
                />
            </label>
            <label className="text-neutral-600 bg-neutral-100 pl-4 rounded grid grid-cols-[35px_1fr] items-center gap-2">
                Тема
                <input
                    className={`min-w-120px bg-neutral-100 outline-0 border-0 text-neutral-900 p-4 py-1 rounded-r`}
                    type="text"
                />
            </label>
            <MessageEditor />
            <div className="self-end flex gap-2">
                <button
                    className={`${styles.btnSmallDarker} ${styles.transition} bg-ruby`}
                    type="button"
                >
                    Delete
                </button>
                <button
                    className={`${styles.btnSmallDarker} ${styles.transition} bg-blue`}
                    type="submit"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default MessageForm
