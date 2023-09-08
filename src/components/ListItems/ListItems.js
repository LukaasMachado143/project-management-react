import { useState } from "react";
import styles from "./ListItem.module.css"
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"
import { PiCheckCircleBold, PiXCircleBold } from 'react-icons/pi'
import TextFied from "../Inputs/TextField/TextField"
function ListItems({ listItems, handleEdit }) {
    const [editItem, setEditItem] = useState(null);
    function confirmEditions(item) {
        handleEdit(item)
        setEditItem(null)
    }
    function handleOnChange(e) {
        setEditItem({ ...editItem, name: e.target.value })
    }
    return (
        <>
            {
                listItems.length > 0 ? (
                    <ul className={styles.listContainer}>  {
                        listItems.map((item) => (
                            <li key={item.id} className={editItem !== null && editItem.id === item.id ? styles.selected : ""}>
                                {editItem !== null && editItem.id === item.id ?
                                    (
                                        <>
                                            <input value={editItem.name} type="text" key={item.id} onChange={handleOnChange} />
                                            <div className={styles.actionAreaEditMode} >
                                                <PiCheckCircleBold onClick={() => { confirmEditions(editItem) }} />
                                                <PiXCircleBold onClick={() => { setEditItem(null) }} />
                                            </div>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {item.id} - {item.name}
                                            <div className={styles.actionArea} >
                                                <BsFillPencilFill onClick={() => { setEditItem(item) }} />
                                                <BsFillTrashFill onClick={() => { handleEdit(item.id) }} />
                                            </div>
                                        </>
                                    )}
                            </li>
                        ))
                    }
                    </ul >
                ) : (<p>Não há Categorias.</p>)
            }
        </>

    );
}

export default ListItems;