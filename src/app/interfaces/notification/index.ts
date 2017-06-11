import { User } from '../user/index'
import { NotificationType } from './notification-type.enum'
import { Snippet } from 'app/interfaces/snippet'

export interface Notification {
    id: number
    type: NotificationType
    user: User
    content: string
    snippet: Snippet
}
