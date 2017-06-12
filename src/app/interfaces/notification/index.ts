import { User } from '../user/index'
import { NotificationType } from './notification-type.enum'
import { Snippet } from 'app/interfaces/snippet'
import { Request } from '../request'

export interface Notification {
    id: number
    type: NotificationType
    user: User
    snippet: Snippet
    request?: Request
}
