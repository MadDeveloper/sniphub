import { Language } from './language'
import { Observable } from 'rxjs/Observable'
import { User } from '../../core/interfaces/user/user'

export interface Code {
    id: any
    language: Language
    code: string
    author: Observable<User>
}
