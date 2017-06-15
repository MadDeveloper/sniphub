import { Injectable } from '@angular/core'
import { Request } from '../../interfaces/request/index'
import { CodeEditorService } from '../code-editor/index'
import { find } from 'lodash'
import { LanguageService } from '../language/language.service'
import { SnippetService } from '../snippet/snippet.service'
import { UserService } from '../user/user.service'
import { Snippet } from 'app/interfaces/snippet'
import { Language } from '../../interfaces/language/index'
import { User } from '../../interfaces/user/index'
import { Code } from '../../interfaces/snippet/code'
import { CodeService } from '../code/code.service'

@Injectable()
export class RequestService {
    constructor(
        private codeEditor: CodeEditorService,
        private user: UserService,
        private language: LanguageService,
        private snippet: SnippetService,
        private code: CodeService) { }

    async all(): Promise<Request[]> {
        return Promise.resolve([{
            id: 1,
            user: await this.user.find({ id: 1 }),
            date: new Date(),
            code: this.code.mockOne(),
            snippet: await this.snippet.find({ id: 1 })
        }])
    }

    async find( props: any ): Promise<Request> {
        const requests = [{
            id: 1,
            user: await this.user.find({ id: 1 }),
            date: new Date(),
            code: this.code.mockOne(),
            snippet: this.snippet.mockOne()
        }]

        return Promise.resolve(find(requests, props))
    }

    async forSnippet(snippet: Snippet): Promise<Request[]> {
        const requests = [{
            id: 1,
            user: await this.user.find({ id: 1 }),
            date: new Date(),
            code: this.code.mockOne(),
            snippet: await this.snippet.find({ id: 1 })
        }]

        return Promise.resolve(requests.filter(request => request.snippet.id === snippet.id))
    }

    forge(user: User, code: Code, snippet: Snippet): Request {
        return {
            id: null,
            user,
            date: new Date(),
            code,
            snippet
        }
    }

    async accept(request: Request): Promise<boolean> {
        return Promise.resolve(true)
    }

    async reject(request: Request): Promise<boolean> {
        return Promise.resolve(true)
    }

    async add(request: Request): Promise<boolean> {
        return Promise.resolve(true)
    }
}
