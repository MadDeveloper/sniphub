import { Injectable } from '@angular/core'
import { LanguageService } from './language.service'
import { GuidService } from '../../core/services/guid/guid.service'
import { Code } from '../interfaces/code'
import { Snippet } from '../../snippet/interfaces/snippet'
import { UserService } from '../../core/services/user/user.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { User } from '../../core/interfaces/user/user'
import { languages } from './languages'
import { Observable } from 'rxjs/Observable'
import { Language } from '../interfaces/language'
import { find } from 'lodash'

@Injectable()
export class CodeService {
    constructor(
        private language: LanguageService,
        private guid: GuidService,
        private user: UserService,
        private database: AngularFireDatabase) { }

    all(snippet: Snippet): Observable<Code[]> {
        return this
            .database
            .list(this.codesSnippetPath(snippet))
            .map((codes: any[]): Code[] => this.forgeAll(codes))
    }

    create(code: Code, snippet: Snippet, author: User) {
        return this
            .database
            .list(this.codesSnippetPath(snippet))
            .push(this.forgeForDatabase(code, author))
    }

    createAll(codes: Code[], snippet: Snippet, author: User) {
        return this
            .database
            .list(this.codesPath())
            .update(snippet.id, this.forgeAllForDatabase(codes, author))
    }

    updateAll(codes: Code[], snippet: Snippet, author: User) {
        return this
            .database
            .object(this.codesSnippetPath(snippet))
            .set(this.forgeAllForDatabase(codes, author))
    }

    mockOne(): Code {
        return {
            id: this.uniqFirebaseId(),
            language: this.language.mockOne(),
            code: null,
            author: null
        }
    }

    forgeAll(codes: any[]) {
        return codes.map((code: any): Code => this.forge(code))
    }

    forge(code: any): Code {
        return {
            id: code.$key,
            language: this.language.find({ value: code.language }),
            author: this.user.find(code.author),
            code: code.code
        }
    }

    forgeAllForDatabase(codes: Code[], author: User) {
        const codesFormatted = {}

        codes.forEach(code => {
            codesFormatted[code.id || this.uniqFirebaseId()] = this.forgeForDatabase(code, author)
        })

        return codesFormatted
    }

    forgeForDatabase(code: Code, author: User) {
        return {
            user: author.id,
            code: code.code,
            language: code.language.value
        }
    }

    findCodeByLanguage(codes: Code[], language: Language) {
        return find(codes, current => current.language.value === language.value)
    }

    private uniqFirebaseId() {
        return this.database.app.database().ref().push().key
    }

    private codesPath() {
        return '/codes'
    }

    private codesSnippetPath(snippet: Snippet) {
        return `${this.codesPath()}/${snippet.id}`
    }
}
