import { Injectable } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'
import { Code } from '../../interfaces/snippet/code'
import { LanguageService } from 'app/services/language/language.service'
import { Language } from '../../interfaces/language/index'
import { GuidService } from '../guid/guid.service'

@Injectable()
export class CodeService {
    constructor(
        private language: LanguageService,
        private guid: GuidService) { }

    async all(snippet: Snippet): Promise<Code[]> {
        return Promise.resolve([{
            id: this.guid.newGuid(),
            language: await this.language.find({ text: 'JavaScript' }),
            code: 'const snipz = "building..."'
        }])
    }

    mockOne(): Code {
        return {
            id: this.guid.newGuid(),
            language: this.language.mockOne(),
            code: null
        }
    }
}
