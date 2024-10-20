// CACHE kEYS

export const BALANCE_CACHE_KEY = ['balance'] //key for query balance

// Function to get the key for query transactions
export const getTransactionsKey = (date: string) => {
    return [`transactions ${date}`] //key for query transactions
}

export const CATEGORIES_CACHE_KEY = ['categories'] //Key for query categories

export const getProjectCacheKey = (isActive: boolean, projectId?: number) => {
    if (projectId) {
        return [`project ${projectId}`]
    }
    return isActive ? ['projects active'] : ['projects inactive']
}

export const getTasksCacheKey = (projectId: number) => {
    return [`tasks ${projectId}`]
}