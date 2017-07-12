import { User } from '../../core/interfaces/user/user'
import { Code } from '../../code/interfaces/code'
import { Snippet } from '../../snippet/interfaces/snippet'
import { Observable } from 'rxjs/Observable'


export interface Request {
    id: string
    user: User | Observable<User>
    date: Date
    code: Code
    snippet: Snippet
}
