import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormService from "../../Services/formService";
import Loading from "../../components/Loading/Loading"
import Container from "../../components/Container/Container"
import styles from "./DetailedProject.module.css"
import ProjectForm from "../NewProject/components/ProjectForm";
import Message from "../../components/Message/Message"
function DetailedProject() {
    const { id } = useParams()
    const service = new FormService()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" })

    useEffect(() => {
        service.getProjectById(id).then((res) => {
            if (res.status == 200) {
                setProject(res.data);
            }
        }).catch((error) => {
            console.log('Error in getProjectById: ', error);
        });
    }, [id]);

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function budgetValidate(budget, actualCost) {
        if (budget > actualCost) return true
        return false
    }

    function editProject(projectData) {
        if (budgetValidate(projectData.budget, projectData.cost) == true) {
            service.updateProject(projectData).then((res) => {
                console.log('Resposta do updateProject: ', res)
                if (res.status == 200) {
                    setProject(res.data)
                    setMessage({ text: "Projeto atualizado com sucesso !", type: "success" })
                }
            }).catch((error) => {
                console.log('Erro do updateProject: ', error)
            }).finally(() => {
                toggleProjectForm()
            })
        }
        else {
            setMessage({ text: "Saldo insuficiente !", type: "error" })
        }

    }

    return <>
        {project.name ? (<div className={styles.mainContent}>
            <Container customClass="column">
                {message.text != "" && message.type != "" &&
                    <Message
                        msg={message.text}
                        type={message.type}
                        handleCleanMessage={() => setMessage({ text: "", type: "" })}
                    />
                }
                <div className={styles.detailsContainer}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {showProjectForm ? "Finalizar Edição" : "Editar Projeto"}
                    </button>

                    {showProjectForm ? (
                        <div className={styles.projectInfo}>
                            <ProjectForm handleSubmit={editProject} btnText="Salvar" projectData={project} />
                        </div>
                    ) : (<div className={styles.projectInfo}>
                        <p><span>Categoria: </span>{project.categories.name}</p>
                        <p><span>Total do Orçamento: </span>R$ {project.budget}</p>
                        <p><span>Total Utilizado: </span>R$ {project.cost}</p>
                    </div>)}
                </div>
            </Container>
        </div>) : (<Loading />)}
    </>
}

export default DetailedProject;