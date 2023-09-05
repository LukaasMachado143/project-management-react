import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormService from "../../Services/formService";
import Loading from "../../components/Loading/Loading"
import Container from "../../components/Container/Container"
import styles from "./DetailedProject.module.css"
import ProjectForm from "../NewProject/components/ProjectForm";
function DetailedProject() {
    const { id } = useParams()
    const service = new FormService()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        service.getProjectById(id).then((res) => {
            if (res.status == 200) {
                setProject(res.data);
            }
        }).catch((error) => {
            console.log('Error in getProjectById: ', error);
        });
    }, [id]);

    function toggleProjectForm(e) {
        e.preventDefault();
        setShowProjectForm(!showProjectForm)
    }
    function editPost(projectData) {
        console.log(projectData)
    }

    return <>
        {project.name ? (<div className={styles.mainContent}>
            <Container customClass="column">
                <div className={styles.detailsContainer}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {showProjectForm ? "Finalizar Edição" : "Editar Projeto"}
                    </button>

                    {showProjectForm ? (
                        <div className={styles.projectInfo}>
                            <ProjectForm handleSubmit={editPost} btnText="Salvar" projectData={project} />
                        </div>
                    ) : (<div className={styles.projectInfo}>
                        <p><span>Categoria:</span>{project.categories.name}</p>
                        <p><span>Total do Orçamento: R$ </span>{project.budget}</p>
                        <p><span>Total Utilizado: R$ </span>{project.cost}</p>
                    </div>)}
                </div>
            </Container>
        </div>) : (<Loading />)}
    </>
}

export default DetailedProject;