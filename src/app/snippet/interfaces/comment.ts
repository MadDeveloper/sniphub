import { User } from '../../core/interfaces/user/user'

export interface Comment {
    id: number
    author: User
    date: Date
    content: string
}
