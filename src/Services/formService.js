import axiosInstance from "../Configs/axiosConfig";

export default class FormService {
    async getCategories() {
        return await axiosInstance.get("categories")
    }

    async getProjects() {
        return await axiosInstance.get("projects")
    }

    async getProjectById(id) {
        return await axiosInstance.get(`projects/${id}`)
    }

    async insertNewProject(request) {
        return await axiosInstance.post("projects", request)
    }

    async deleteProject(id) {
        return await axiosInstance.delete(`projects/${id}`)
    }

    async updateProject(request) {
        return await axiosInstance.patch(`projects/${request.id}`, request)
    }
}