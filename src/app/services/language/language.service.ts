import { Injectable } from '@angular/core'
import { Language } from '../../interfaces/language/index'
import { User } from 'app/interfaces/user'
import { find } from 'lodash'
import { languages } from './languages'

@Injectable()
export class LanguageService {
    private languages: Language[]

    constructor() {
        this.languages = languages
    }

    async all(): Promise<Language[]> {
        return Promise.resolve(this.languages)
    }

    async find( props: any ): Promise<Language> {
        return Promise.resolve(find(this.languages, props ))
    }

    mockOne(): Language {
        return {
            id: null,
            text: null,
            value: null
        }
    }
}
