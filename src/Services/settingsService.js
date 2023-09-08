import axiosInstance from "../Configs/axiosConfig";

export default class SettingsService {
    async getCategories() {
        return await axiosInstance.get("categories")
    }

    async deleteCategory(id) {
        return await axiosInstance.delete(`categories/${id}`)
    }

    async editCategory(categoryData) {
        return await axiosInstance.patch(`categories/${categoryData.id}`, categoryData)
    }
}