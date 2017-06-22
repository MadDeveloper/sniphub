import { User } from '../../core/interfaces/user/user'
import { Code } from '../../code/interfaces/code'

export interface Snippet {
    id: number
    name: string
    description: string
    date: Date
    author: User
    codes: Code[]
}
