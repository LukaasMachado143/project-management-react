import styles from "./Message.module.css"
import { useState, useEffect } from "react";

function Message({ type, msg, timeOut, handleCleanMessage }) {
    const [localTimeOut, setLocalTimeOut] = useState(3500)
    const [visible, setVisible] = useState(false)

    if (timeOut) {
        setLocalTimeOut(timeOut)
    }

    useEffect(() => {
        if (!msg) {
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
            handleCleanMessage();
        }, localTimeOut)
        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>{
            visible && (
                <div className={`${styles.message} ${styles[type]}`}>
                    {msg}
                </div>
            )
        }
        </>
    );
}

export default Message;