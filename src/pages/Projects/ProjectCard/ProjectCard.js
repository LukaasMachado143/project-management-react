import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css"
import { BsFillTrashFill, BsPencil } from "react-icons/bs"
function ProjectCard({ data, handleDeleteProject }) {
    const deleteThisProject = (e) => {
        e.preventDefault()  
        handleDeleteProject(data.id)
    }
    return (
        <div className={styles.card}>
            <h4>{data.name}</h4>
            <p>
                <span>Orçamento:</span> R${data.budget}
            </p>
            <p className={styles.category}>
                <span className={`${styles[data.categories.name.toLowerCase()]}`}></span>
                {data.categories.name}
            </p>
            <div className={styles.actions}>
                <Link to="/">
                    <BsPencil /> Editar
                </Link>
                <button onClick={deleteThisProject}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;