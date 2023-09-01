import styles from "./Projects.module.css"
import Message from "../../components/Message/Message"
import { useLocation } from "react-router-dom"
function Projects() {
    const location = useLocation()
    let message = ''
    let type = ''
    if (location.state) {
        message = location.state.message
        type = location.state.type
    }
    return (
        <div>
            <h1>Projects</h1>
            {message && type && <Message timeOut={3500} type={type} msg={message} />}

        </div>
    )
}
export default Projects