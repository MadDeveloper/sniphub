import { Injectable } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'
import { Code } from '../../interfaces/snippet/code'
import { LanguageService } from 'app/services/language/language.service'
import { Language } from '../../interfaces/language/index'

@Injectable()
export class CodeService {
    constructor(private language: LanguageService) { }

    async all(snippet: Snippet): Promise<Code[]> {
        return Promise.resolve([{
            id: 1,
            language: await this.language.find({ text: 'JavaScript' }),
            code: 'const snipz = "building..."'
        }])
    }

    mockOne(): Code {
        return {
            id: null,
            language: this.language.mockOne(),
            code: null
        }
    }
}
