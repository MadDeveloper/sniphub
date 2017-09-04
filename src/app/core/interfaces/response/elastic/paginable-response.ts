export interface PaginableResponse<T> {
    hits: T
    raw: Elasticsearch.SearchResponse<any>
    total: number
    next: () => Promise<PaginableResponse<T>>
    canNext: boolean
}
