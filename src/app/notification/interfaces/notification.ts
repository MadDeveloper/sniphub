import { NotificationType } from './notification-type.enum'
import { Snippet } from '../../snippet/interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { Request } from '../../request/interfaces/request'
import { Observable } from 'rxjs/Observable'

export interface Notification {
    id: number
    type: NotificationType
    user: Observable<User>
    snippetName: string
    snippetId: string
    request?: Observable<Request>
    read: boolean
    date: Date
}
