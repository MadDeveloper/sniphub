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
import find from 'lodash-es/find'
import * as firebase from 'firebase/app'

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
            .map((codes: any[]): Code[] => this.filterRequestsNotValidated(this.forgeAll(codes)))
    }

    find(id: string, snippet: Snippet) {
        return this
            .database
            .object(this.codePath(id, snippet))
            .map((code: any): Code => this.forge(code))
    }

    create(code: Code, snippet: Snippet, author: User, asRequest = false) {
        return this
            .database
            .list(this.codesSnippetPath(snippet))
            .update(code.id, this.forgeForDatabase(code, author, asRequest))
    }

    saveAll(codes: Code[], snippet: Snippet, author: User) {
        return this
            .database
            .object(this.codesSnippetPath(snippet))
            .set(this.forgeAllForDatabase(codes, author))
    }

    delete(code: Code, snippet: Snippet) {
        return this
            .database
            .object(this.codePath(code.id, snippet))
            .remove()
    }

    deleteAll(snippet: Snippet) {
        return this
            .database
            .list(this.codesSnippetPath(snippet))
            .remove()
    }

    deleteAllAsUpdates(snippet: Snippet) {
        const updates = {}

        updates[this.codesSnippetPath(snippet)] = null

        return updates
    }

    mockOne(): Code {
        return {
            id: this.uniqFirebaseId(),
            language: this.language.mockOne(),
            code: null,
            author: null,
            date: new Date()
        }
    }

    forgeAll(codes: any[]) {
        return codes.map((code: any): Code => this.forge(code))
    }

    forge(code: any): Code {
        return {
            id: code.$key,
            language: this.language.find({ value: code.language }),
            author: this.user.find(code.user),
            code: code.code,
            date: new Date(code.date),
            request: code.request || false,
            validated: code.validated || false
        }
    }

    forgeAllForDatabase(codes: Code[], author: User) {
        const codesFormatted = {}

        codes.forEach(code => {
            codesFormatted[code.id || this.uniqFirebaseId()] = this.forgeForDatabase(code, author)
        })

        return codesFormatted
    }

    forgeForDatabase(code: Code, author: User, asRequest = false) {
        let codeForDatabase = {
            user: author.id,
            code: code.code,
            language: code.language.value,
            date: firebase.database.ServerValue.TIMESTAMP
        }

        if (asRequest) {
            codeForDatabase = Object.assign({}, codeForDatabase, {
                request: true,
                validated: false
            })
        }

        return codeForDatabase
    }

    findCodeByLanguage(codes: Code[], language: Language) {
        return find(codes, current => current.language.value === language.value)
    }

    filterRequestsNotValidated(codes: Code[]): Code[] {
        return codes.filter((code: Code) => !code.request || (code.request && code.validated))
    }

    private uniqFirebaseId() {
        return this.database.app.database().ref().push().key
    }

    codesPath() {
        return '/codes'
    }

    codesSnippetPath(snippet: Snippet) {
        return `${this.codesPath()}/${snippet.id}`
    }

    codePath(id: string, snippet: Snippet) {
        return `${this.codesSnippetPath(snippet)}/${id}`
    }

    filterEmptyCodes(codes: Code[]): Code[] {
        return codes.filter(code => code.code && code.code.length > 0 && code.language.text)
    }
}
