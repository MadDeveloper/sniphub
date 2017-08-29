import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { languages } from './languages'
import { Language } from '../interfaces/language'

@Injectable()
export class LanguageService {
    all() {
        return languages
    }

    find(props: any): Language {
        return find(languages, props)
    }

    mockOne(): Language {
        return {
            id: null,
            text: null,
            value: null
        }
    }

    plainText(): Language {
        return this.find({ value: 'text/plain' })
    }
}
