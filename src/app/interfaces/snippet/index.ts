import { User } from 'app/interfaces/user'
import { Code } from './code'

export interface Snippet {
    id: number
    name: string
    description: string
    date: Date
    author: User
    codes: Code[]
}
