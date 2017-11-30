import * as firebase from 'firebase/app'
import find from 'lodash-es/find'
import { AngularFireDatabase } from 'angularfire2/database'
import { Code } from '../interfaces/code';
import { GuidService } from '../../core/services/guid/guid.service'
import { Injectable } from '@angular/core'
import { Language } from '../interfaces/language'
import { languages } from './languages'
import { LanguageService } from './language.service'
import { Observable } from 'rxjs/Observable'
import { Snippet } from '../../snippet/interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { UserService } from '../../core/services/user/user.service'

@Injectable()
export class CodeService {
    constructor(
        private language: LanguageService,
        private guid: GuidService,
        private user: UserService,
        private database: AngularFireDatabase) { }

    all(snippet: Snippet, includeRequests?: boolean): Observable<Code[]> {
        return this
            .database
            .list(this.codesSnippetPath(snippet))
            .map((codesRaw: any[]): Code[] => {
                const codes: Code[] = this.forgeAll(codesRaw)

                if (includeRequests) {
                    return codes
                }

                return this.filterRequestsNotValidated(codes)
            })
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
            .update(this.forgeAllForDatabase(codes, author))
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
            date: new Date(),
            request: null,
            validated: null
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
            request: 'request' in code ? code.request : null,
            validated: 'validated' in code ? code.validated : null
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
        let codeForDatabase = { // FIXME: should be typed, or properties can be forgot when we translate code for database
            user: author.id,
            code: code.code,
            language: code.language.value,
            date: firebase.database.ServerValue.TIMESTAMP,
            request: code.request,
            validated: code.validated,
        }

        if (asRequest) {
            codeForDatabase = Object.assign({}, codeForDatabase, {
                request: true,
                validated: false
            })
        }

        return codeForDatabase
    }

    findCodeByLanguageWithProvidedList(codes: Code[], language: Language) {
        return find(codes, current => current.language.value === language.value)
    }

    findCodeByLanguage(language: Language, snippet: Snippet, excluded?: Code): Promise<Code> {
        return this
            .database
            .list(this.codesSnippetPath(snippet), {
                query: {
                    orderByChild: 'language',
                    equalTo: language.value
                }
            })
            .map((codesFound: any[]): Code => codesFound.reduce((previousCode, codeRaw) => {
                const code = this.forge(codeRaw)

                if (!excluded || excluded.id !== code.id) { // in case of request, we will get two codes, we can exclude one code here
                    return code
                }

                return previousCode
            }, null))
            .first()
            .toPromise()
    }

    filterRequestsNotValidated(codes: Code[]): Code[] {
        return codes.filter((code: Code) => !code.request || (code.request && code.validated))
    }

    extractCodesAndCodesFromRequests(allCodes: Code[]): { codes: Code[], codesFromRequests: Code[] } {
        const codes = this.filterRequestsNotValidated(allCodes)
        const codesFromRequests = allCodes.filter(code => !codes.find(current => current.id === code.id))

        return {
            codes,
            codesFromRequests
        }
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
