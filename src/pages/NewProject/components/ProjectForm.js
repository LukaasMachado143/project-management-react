import { useEffect, useState } from 'react'
import SelectField from '../../../components/Inputs/SelectField/SelectField'
import SubmitButton from '../../../components/Inputs/SubmitButton/SubmitButton'
import TextField from '../../../components/Inputs/TextField/TextField'
import styles from './ProjectForm.module.css'
import FormService from '../../../Services/formService'

function ProjectForm({ btnText }) {
    const service = new FormService();
    const [categories, setCategories] = useState([])
    useEffect(() => {
        service.getCategories().then((res) => {
            if (res.status != 500) {
                setCategories(res.data)
            }
        }).catch((error) => {
            console.log('Error in getCategories: ', error)
        })
    }, [])


    return (<form className={styles.form}>
        <TextField type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto..." />
        <TextField type="number" text="Orçamento previsto" name="budget" placeholder="Insira o orçamento previsto..." />
        <SelectField name="idCategory" text="Selecione uma categoria" options={categories} />
        <SubmitButton text={btnText} />
    </form>)
}

export default ProjectForm