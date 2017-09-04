import { Observable } from 'rxjs/Observable'

export interface PaginableResponse<T> {
    hits: T
    raw?: any
    total?: number
    next: () => Promise<PaginableResponse<T>> | Observable<PaginableResponse<T>> | PaginableResponse<T>
    canNext: boolean
}
