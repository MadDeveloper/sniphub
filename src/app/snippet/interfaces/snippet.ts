import { User } from '../../core/interfaces/user/user'
import { Code } from '../../code/interfaces/code'
import { Like } from './like'
import { Observable } from 'rxjs/Observable'

export interface Snippet {
    id: string
    name: string
    description: string
    date: Date
    author: Observable<User>
    codes: Observable<Code[]>
    likes: Observable<Like[]>
    likesCounter: number
    codesCounter: number
}
