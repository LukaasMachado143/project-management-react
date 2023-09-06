import styles from "../../../Projects/ProjectCard/ProjectCard.module.css"
import { BsFillTrashFill } from "react-icons/bs"
function ServiceCard({ service, handleRemoveService }) {
    function remove() {

    }
    return (
        <div className={styles.card}>
            <h4>{service.name}</h4>
            <p>
                <span>Custo: </span>R$ {service.cost}
            </p>
            <p>{service.description}</p>
            <div className={styles.actions}>
                <button onClick={remove} >
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;