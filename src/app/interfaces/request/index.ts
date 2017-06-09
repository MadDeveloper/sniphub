import { User } from '../../interfaces/user/index'
import { Language } from '../../interfaces/language/index'
import { Snippet } from '../snippet/index'

export interface Request {
    id: number
    user: User
    date: Date
    language: Language
    code: string
    snippet: Snippet
}
