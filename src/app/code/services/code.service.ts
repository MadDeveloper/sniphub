import { Injectable } from '@angular/core'
import { LanguageService } from './language.service'
import { GuidService } from '../../core/services/guid/guid.service'
import { Code } from '../interfaces/code'
import { Snippet } from '../../snippet/interfaces/snippet'

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
