import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { languages } from './languages'
import { Language } from '../interfaces/language'

@Injectable()
export class LanguageService {
    private languages: Language[]

    constructor() {
        this.languages = languages
    }

    all() {
        return this.languages
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
