import styles from './NewProject.module.css'
import Form from './components/ProjectForm'
import Service from '../../Services/formService'
import { useNavigate } from 'react-router-dom'
function NewProject() {
    const service = new Service()
    const navigate = useNavigate()
    function createPost(project) {
        // initialize cost and services
        project.cost = 0
        project.services = []

        service.insertNewProject(project)
            .then((res) => {
                if (res.status == 201) {
                    navigate("/projects", { state: { message: "Projeto adicionado com sucesso !", type: "success" } })
                } else {
                    navigate("/projects", { state: { message: "Problemas ao adicionar projeto", type: "error" } })
                }
            }).catch((error) => {
                navigate("/projects", { state: { message: "Erro ao adicionar projeto", type: "error" } })
                console.log('Erro do insertNewProject:  ', error)
            })
    }


    return (<div className={styles.newProjectContainer}>
        <h1>Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <Form handleSubmit={createPost} btnText="Criar projeto" />
    </div>)
}
export default NewProject