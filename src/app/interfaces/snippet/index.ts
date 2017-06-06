import { User } from 'app/interfaces/user'

export interface Snippet {
    id: number
    name: string
    description: string
    date: Date
    author: User
}
