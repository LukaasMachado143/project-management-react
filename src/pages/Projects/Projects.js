import styles from "./Projects.module.css"
import Message from "../../components/Message/Message"
import { useLocation } from "react-router-dom"
import LinkButton from "../../components/LinkButton/LinkButton"
import Container from "../../components/Container/Container"
function Projects() {
    const location = useLocation()
    let message = ''
    let type = ''
    if (location.state) {
        message = location.state.message
        type = location.state.type
    }
    return (
        <div className={styles.projectContainer}>
            <div className={styles.title}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            <Container customClass="start">
                {message && type && <Message timeOut={3500} type={type} msg={message} />}
                <p>Projetos...</p>
            </Container>

        </div>
    )
}
export default Projects