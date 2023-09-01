import styles from "./Projects.module.css"
import Message from "../../components/Message/Message"
import { useLocation, useNavigate } from "react-router-dom"
import LinkButton from "../../components/LinkButton/LinkButton"
import Container from "../../components/Container/Container"
import Loading from "../../components/Loading/Loading"
import { useEffect, useState } from "react"
import FormService from "../../Services/formService"
import ProjectCard from "./ProjectCard/ProjectCard"
function Projects() {
    const service = new FormService();
    const location = useLocation()
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState({ message: "", type: "" })

    useEffect(() => {
        if (location.state) {
            setProjectMessage({ message: location.state.message, type: location.state.type })
            navigate({ ...location, state: null });
        }
    }, [])

    useEffect(() => {
        setIsLoading(true)
        service.getProjects().then((res) => {
            if (res.status != 500) {
                setProjects(res.data)
            }
        }).catch((error) => {
            console.log('Error in getProjects: ', error)

        }).finally(() => { setIsLoading(false) })
    }, [])

    function deleteProject(id) {
        setIsLoading(true)
        service.deleteProject(id).then((res) => {
            if (res.status == 200) {
                setProjectMessage({ message: "Projeto excluido com sucesso !", type: "success" })
                setProjects(projects.filter((project) => project.id !== id))
            } else {
                setProjectMessage({ message: "Problemas ao excluir projeto !", type: "error" })
            }
        }).catch((error) => {
            setProjectMessage({ message: "Erro ao excluir projeto !", type: "error" })
            console.log('Error in getProjects: ', error)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.title}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {projectMessage.message != "" && projectMessage.type != "" &&
                <Message
                    msg={projectMessage.message}
                    type={projectMessage.type}
                    handleCleanMessage={() => setProjectMessage({ message: "", type: "" })}
                />
            }
            <Container customClass="start">
                {projects.length > 0 && !isLoading && projects.map((project) => (
                    <ProjectCard key={project.id} data={project} handleDeleteProject={deleteProject} />
                ))}
                {isLoading && <Loading />}
                {!isLoading && projects.length === 0 && (<p>Não há Projetos cadastrados.</p>)}
            </Container>
        </div>
    )
}
export default Projects