import { Code } from '../../code/interfaces/code'
import { Observable } from 'rxjs/Observable'
import { Snippet } from '../../snippet/interfaces/snippet'

export interface Request {
    id: string
    snippet: Observable<Snippet>
    code: Observable<Code>
}
