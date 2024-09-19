// CACHE kEYS
export const BALANCE_CACHE_KEY = ['balance'] //key for query balance
export const getTransactionsKey = (date: string) => {
    return [`transactions ${date}`] //key for query transactions
}
export const CATEGORIES_CACHE_KEY = ['categories'] //Key for query categories