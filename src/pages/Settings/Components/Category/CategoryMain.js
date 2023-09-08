import { useState, useEffect } from "react";
import ListItems from "../../../../components/ListItems/ListItems";
import SettingsService from "../../../../Services/settingsService";
import { PiPlusCircleBold, PiXCircleBold } from 'react-icons/pi'
import styles from './CategoryMain.module.css'
function CategoryMain() {
    const service = new SettingsService();
    const [listCategories, setlistCategories] = useState([])
    const [showCategoryForm, setShowCategoryForm] = useState(false)

    useEffect(() => {
        getAllCategories()
    }, [])

    function getAllCategories() {
        setlistCategories([])
        service.getCategories().then((res) => {
            if (res.status == 200) {
                setlistCategories(res.data)
            }
        }).catch((error) => {
            console.log('Erro do getCategories: ', error)
        })
    }

    function handleCategoryForm() {
        setShowCategoryForm(!showCategoryForm)
    }

    function deleteCategory(id) {
        service.deleteCategory(id).then((res) => {
            if (res.status == 200) {
                const categories = listCategories.filter((category) => category.id !== id)
                setlistCategories(categories)
            }
        }).catch((error) => {
            console.log("Erro do deleteCategory: ", error)
        })
    }

    function editCategory(item) {
        service.editCategory(item).then((res) => {
            if (res.status == 200) {
                const updatedList = [...listCategories]
                const index = updatedList.findIndex((category) => category.id === item.id)
                updatedList[index].name = item.name
                setlistCategories(updatedList)
            }
        }).catch((error) => {
            console.log("Erro do editCategory: ", error)
        })
    }

    function handleCategory(categoryData) {
        if (typeof categoryData === "object") {
            editCategory(categoryData)
        } else if (typeof categoryData === "number") {
            deleteCategory(Number(categoryData))
        }
    }

    return (<>
        <div className={styles.titleSection}>
            <h2>Categorias:</h2>
            <button onClick={handleCategoryForm}>
                {showCategoryForm ? (<PiXCircleBold />) : (<PiPlusCircleBold />)}
            </button>
        </div>
        <div className={styles.section}>
            {showCategoryForm ?
                (
                    <h3>Form</h3>
                )
                :
                (
                    <ListItems listItems={listCategories} handleEdit={handleCategory} />
                )
            }

        </div>
    </>

    );
}

export default CategoryMain;