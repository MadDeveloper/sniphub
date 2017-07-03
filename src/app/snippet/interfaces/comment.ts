import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'

export interface Comment {
    id: number
    author: Observable<User>
    date: Date
    content: string
}
