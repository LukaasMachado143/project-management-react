import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormService from "../../Services/formService";
import Loading from "../../components/Loading/Loading"
import Container from "../../components/Container/Container"
import styles from "./DetailedProject.module.css"
import ServiceForm from "./Components/ServiceForm/ServiceForm"
import ProjectForm from "../NewProject/components/ProjectForm";
import Message from "../../components/Message/Message"
import { parse, v4 as uuidv4 } from "uuid"
import ServiceCard from "./Components/ServiceCard/ServiceCard";
function DetailedProject() {
    const { id } = useParams()
    const service = new FormService()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" })

    useEffect(() => {
        service.getProjectById(id).then((res) => {
            if (res.status == 200) {
                setProject(res.data);
                setServices(res.data.services);
            }
        }).catch((error) => {
            console.log('Error in getProjectById: ', error);
        });
    }, [id]);

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
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
    function createService(project) {
        const lastIndex = project.services.length - 1
        const lastService = project.services[lastIndex]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newGeneralCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        if (newGeneralCost > parseFloat(project.budget)) {
            setMessage({ text: "Orçamento ultrapassado, verifique o valor do serviço !", type: "error" })
            project.services.pop()
            toggleServiceForm()
            return;
        }

        project.cost = newGeneralCost

        service.updateProject(project).then((res) => {
            console.log("Resposta do CreateService: ", res)
            if (res.status == 200) {
                setMessage({ text: "Serviço adicionado com sucesso !", type: "success" })
            } else {
                setMessage({ text: "Problemas ao adicionar serviç !", type: "success" })

            }
        }).catch((error) => {
            console.log("Error do CreateService: ", error)
        }).finally(() => {
            toggleServiceForm()
        })

    }
    function removeService() {

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

                <div className={styles.serviceContainer}>
                    <h2>Adicionar um serviço</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {showServiceForm ? "Fechar" : "Adicionar"}
                    </button>
                    <div className={styles.projectInfo}>
                        {showServiceForm && (
                            <ServiceForm
                                btnText="Adicionar"
                                projectData={project}
                                handleSubmit={createService}
                            />
                        )
                        }
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                    {services.length > 0 && services.map((service) => (
                        <ServiceCard service={service} key={service.id} handleRemoveService={removeService} />
                    ))}
                    {services.length === 0 && <p>Não há serviços cadastrado para esse projeto !</p>}
                </Container>
            </Container>
        </div>) : (<Loading />)}
    </>
}

export default DetailedProject;