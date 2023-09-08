import styles from "../../../../../NewProject/components/ProjectForm.module.css"
import Input from "../../../../../../components/Inputs/TextField/TextField"
import SubmitButton from "../../../../../../components/Inputs/SubmitButton/SubmitButton"
import { useEffect, useState } from "react";
import { parse, v4 as uuidv4 } from "uuid"

function CategoryForm({ handleCreateCategory }) {
    const [newCategory, setNewCategory] = useState({})

    useEffect(() => {
        const newId = uuidv4()
        setNewCategory({ ...newCategory, id: newId })
    }, [])

    function handleChange(e) {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value })
    }

    function submit(e) {
        e.preventDefault();
        handleCreateCategory(newCategory)
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome da Categoria"
                name="name"
                placeholder="Insira o nome da categoria"
                handleOnChange={handleChange}
            />
            <SubmitButton text="Adicionar" />
        </form>
    );
}

export default CategoryForm;