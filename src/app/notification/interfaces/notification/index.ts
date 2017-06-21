import { NotificationType } from './notification-type.enum'
import { Snippet } from 'app/interfaces/snippet'
import { User } from '../../../interfaces/user/index'
import { Request } from '../../../interfaces/request/index'

export interface Notification {
    id: number
    type: NotificationType
    user: User
    snippet: Snippet
    request?: Request
}
