export interface PaginableResponse<T> {
    hits: T
    raw: any
    total: number
    next: () => Promise<PaginableResponse<T>> | PaginableResponse<T>
    canNext: boolean
}
