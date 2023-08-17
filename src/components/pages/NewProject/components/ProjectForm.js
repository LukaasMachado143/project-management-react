import SelectField from '../../../Layout/Inputs/SelectField/SelectField'
import SubmitButton from '../../../Layout/Inputs/SubmitButton/SubmitButton'
import TextField from '../../../Layout/Inputs/TextField/TextField'
import styles from './ProjectForm.module.css'

function ProjectForm({ btnText }) {
    return (<form className={styles.form}>
        <TextField type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto..." />
        <TextField type="number" text="Orçamento previsto" name="budget" placeholder="Insira o orçamento previsto..." />
        <SelectField name="idCategory" text="Selecione uma categoria" />
        <SubmitButton text={btnText} />
    </form>)
}

export default ProjectForm