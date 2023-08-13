import { Link } from "react-router-dom"
import styles from './LinkButton.module.css'
import { PiPlusCircleBold } from 'react-icons/pi'

function LinkButton({ to, text }) {
    return (
        <Link className={styles.btn} to={to}>
            <span>
                <PiPlusCircleBold className={styles.icon} />{text}
            </span>
        </Link>
    )
}

export default LinkButton