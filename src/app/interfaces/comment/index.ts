import { User } from 'app/interfaces/user'

export interface Comment {
    id: number
    author: User
    date: Date
    content: string
}
