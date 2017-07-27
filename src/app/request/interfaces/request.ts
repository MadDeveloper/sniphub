import { Code } from '../../code/interfaces/code'
import { Observable } from 'rxjs/Observable'

export interface Request {
    id: string
    code: Observable<Code>
}
