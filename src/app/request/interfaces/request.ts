import { User } from '../../core/interfaces/user/user'
import { Code } from '../../code/interfaces/code'
import { Snippet } from '../../snippet/interfaces/snippet'


export interface Request {
    id: number
    user: User
    date: Date
    code: Code
    snippet: Snippet
}
