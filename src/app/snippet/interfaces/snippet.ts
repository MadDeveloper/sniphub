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
    codes: Code[] | Observable<Code[]>
    likes?: Like[] | Observable<Like[]>
}
