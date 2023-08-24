import axiosInstance from "../Configs/axiosConfig";

export default class FormService {
    async getCategories() {
        return await axiosInstance.get("categories")
    }

    async insertNewProject(request) {
        return await axiosInstance.post("projects", request)
    }
}