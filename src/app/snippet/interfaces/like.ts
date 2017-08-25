import { User } from '../../core/interfaces/user/user'
import { Snippet } from './snippet'

export interface Like {
    id: string
    user: User
    snippet: Snippet
}
