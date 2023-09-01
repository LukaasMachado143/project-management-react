import { useEffect, useState } from 'react'
import SelectField from '../../../components/Inputs/SelectField/SelectField'
import SubmitButton from '../../../components/Inputs/SubmitButton/SubmitButton'
import TextField from '../../../components/Inputs/TextField/TextField'
import styles from './ProjectForm.module.css'
import FormService from '../../../Services/formService'

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const service = new FormService();
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    useEffect(() => {
        service.getCategories().then((res) => {
            if (res.status == 200) {
                setCategories(res.data)
            } else {
                setCategories([])
            }
        }).catch((error) => {
            console.log('Error in getCategories: ', error)
        })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleSelect(e) {
        setProject({
            ...project, categories: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }

    return (<form onSubmit={submit} className={styles.form}>
        <TextField type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto..." handleOnChange={handleChange} value={project.name ? project.name : ""} />
        <TextField type="number" text="Orçamento previsto" name="budget" placeholder="Insira o orçamento previsto..." handleOnChange={handleChange} value={project.budget ? project.budget : ""} />
        <SelectField name="idCategory" text="Selecione uma categoria" options={categories} handleOnChange={handleSelect} value={project.categories ? project.categories.id : ""} />
        <SubmitButton text={btnText} />
    </form>)
}

export default ProjectForm