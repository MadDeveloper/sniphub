import { Injectable } from '@angular/core'
import { Language } from '../../interfaces/language/index'

@Injectable()
export class LanguageService {
    all(): Language[] {
        return [
            { id: 1, text: 'JavaScript', value: 'javascript' },
            { id: 2, text: 'C#', value: 'clike' },
            { id: 3, text: 'PHP', value: 'php' },
            { id: 4, text: 'Java', value: 'clike' }
        ]
    }
}
