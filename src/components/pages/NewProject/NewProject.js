import styles from './NewProject.module.css'
import Form from './components/ProjectForm'
function NewProject() {
    return (<div className={styles.newProjectContainer}>
        <h1>Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <Form btnText="Criar projeto"/>
    </div>)
}
export default NewProject