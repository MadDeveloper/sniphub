import { NotificationType } from './notification-type.enum'
import { Snippet } from '../../snippet/interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { Request } from '../../request/interfaces/request'
import { Observable } from 'rxjs/Observable'

export interface Notification {
    id: string
    type: NotificationType
    user: Observable<User>
    snippetName: string
    snippetId: string
    request?: boolean
    requestId?: string
    language?: string
    read: boolean
    date: Date
}
