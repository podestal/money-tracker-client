import APIClient from "./apiClient"

export interface Project {
    id: number
    name: string
    description?: string
    endDate?: Date
    user: number
}

export type ProjectCreateUpdate = Omit<Project, 'id'| 'user'>

const getProjectService = (projectId?: number) => {
    const URL = projectId ? 'projects/' : `projects/${projectId}`
    return new APIClient<Project, ProjectCreateUpdate>(URL)
}

export default getProjectService

// import APIClient from "./apiClient" // Import the APIClient class for making API requests

// // Interface representing a Category object
// export interface Category {
//     id: number // Unique identifier of the category
//     name: string // Name of the category
//     user: number // User ID associated with the category
// }

// // Type representing the data required to create or update a category
// export type CategoryCreateUpdate = Omit<Category, 'id' | 'user'> // Exclude 'id' and 'user' fields when creating or updating

// // Factory function to create an instance of APIClient for categories
// const getCategoryService = (categoryId?: number) => {
//     // Determine the endpoint URL based on whether a category ID is provided
//     const URL = categoryId ? `categories/${categoryId}/` : 'categories/' // If categoryId is provided, use it in the URL

//     // Return an instance of APIClient with the appropriate URL for making requests
//     return new APIClient<Category, CategoryCreateUpdate>(URL)
// }

// export default getCategoryService // Export the function to provide the category service for use in other modules
