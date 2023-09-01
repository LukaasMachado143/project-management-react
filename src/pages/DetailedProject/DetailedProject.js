import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormService from "../../Services/formService";
function DetailedProject() {
    const { id } = useParams()
    const service = new FormService()
    const [project, setProject] = useState([])
    
    useEffect(() => {
        service.getProjectById(id).then((res) => {
            if (res.status == 200) {
                setProject(res.data);
            }
        }).catch((error) => {
            console.log('Error in getProjectById: ', error);
        });
    }, [id]);

    return (<h1>{project.id}</h1>);
}

export default DetailedProject;