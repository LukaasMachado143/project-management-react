import styles from "./Projects.module.css"
import Message from "../../components/Message/Message"
import { useLocation } from "react-router-dom"
import LinkButton from "../../components/LinkButton/LinkButton"
import Container from "../../components/Container/Container"
import Loading from "../../components/Loading/Loading"
import { useEffect, useState } from "react"
import FormService from "../../Services/formService"
import ProjectCard from "./ProjectCard/ProjectCard"
function Projects() {
    const service = new FormService();
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const location = useLocation()
    let message = ''
    let type = ''

    if (location.state) {
        message = location.state.message
        type = location.state.type
    }
    useEffect(() => {
        setIsLoading(true)
        service.getProjects().then((res) => {
            console.log(res)
            if (res.status != 500) {
                setProjects(res.data)
                setIsLoading(false)
            }
        }).catch((error) => {
            setIsLoading(false)
            console.log('Error in getProjects: ', error)
        })
    }, [])


    return (
        <div className={styles.projectContainer}>
            <div className={styles.title}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && type && <Message timeOut={3500} type={type} msg={message} />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => (
                    <ProjectCard key={project.id} data={project} />
                ))}
                {isLoading && <Loading />}
                {!isLoading && projects.length === 0 && (<p>Não há Projetos cadastrados.</p>)}
            </Container>\
        </div>
    )
}
export default Projects