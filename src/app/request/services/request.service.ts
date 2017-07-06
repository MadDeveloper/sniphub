import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { UserService } from '../../core/services/user/user.service'
import { CodeEditorService } from '../../code/services/code-editor.service'
import { LanguageService } from '../../code/services/language.service'
import { SnippetService } from '../../snippet/services/snippet.service'
import { CodeService } from '../../code/services/code.service'
import { Request } from '../interfaces/request'
import { Snippet } from '../../snippet/interfaces/snippet'
import { Code } from '../../code/interfaces/code'
import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'

@Injectable()
export class RequestService {
    constructor(
        private codeEditor: CodeEditorService,
        private user: UserService,
        private language: LanguageService,
        // private snippet: SnippetService,
        private code: CodeService,
        private database: AngularFireDatabase) { }

    async all(): Promise<Request[]> {
        return Promise.resolve([
            // {
            //     id: 1,
            //     user: await this.user.find({ id: 1 }),
            //     date: new Date(),
            //     code: this.code.mockOne(),
            //     snippet: this.snippet.find('email regex')
            // }
        ])
    }

    find(id: string): Observable<Request> {
        const requests = [{
            id: 1,
            user: this.user.find('ddDADa13ff42'),
            date: new Date(),
            code: this.code.mockOne(),
            snippet: null // this.snippet.mockOne()
        }]

        return Observable.of(requests[0])
    }

    async forSnippet(snippet: Snippet): Promise<Request[]> {
        const requests = [{
            id: 1,
            user: this.user.find('ddDADa13ff42'),
            date: new Date(),
            code: this.code.mockOne(),
            snippet: null // this.snippet.find('email regex')
        }]

        return Promise.resolve([
            // requests.filter(request => request.snippet.id === snippet.id)
        ])
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

    private requestsPath() {
        return '/requests'
    }

    private requestPath(id: string) {
        return `${this.requestsPath()}/${id}`
    }
}
