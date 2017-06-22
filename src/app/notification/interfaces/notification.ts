import { NotificationType } from './notification-type.enum'
import { Snippet } from '../../snippet/interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { Request } from '../../request/interfaces/request'

export interface Notification {
    id: number
    type: NotificationType
    user: User
    snippet: Snippet
    request?: Request
}
