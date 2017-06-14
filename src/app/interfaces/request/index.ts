import { User } from '../../interfaces/user/index'
import { Snippet } from '../snippet/index'
import { Code } from '../snippet/code'

export interface Request {
    id: number
    user: User
    date: Date
    code: Code
    snippet: Snippet
}
