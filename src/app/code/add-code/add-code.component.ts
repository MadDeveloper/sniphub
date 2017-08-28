import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Code } from '../interfaces/code'
import { Snippet } from '../../snippet/interfaces/snippet'
import { LanguageService } from '../services/language.service'
import { GuidService } from '../../core/services/guid/guid.service'
import { CodeService } from '../services/code.service'
import { RequestService } from '../../request/services/request.service'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { User } from '../../core/interfaces/user/user'
import swal from 'sweetalert2'

@Component({
    selector: 'app-add-code',
    templateUrl: './add-code.component.html',
    styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {
    @Input()
    infiniteCode = false
    @Input()
    asRequest = false
    @Input()
    asAuthor = false
    @Input()
    codes: Code[] = []
    @Input()
    snippet: Snippet
    @Input()
    author: User
    @Input()
    min = 0
    requested = false
    requestedSuccessfully = false

    constructor(
        private languageService: LanguageService,
        private guid: GuidService,
        private codeService: CodeService,
        private requestService: RequestService,
        private authentication: AuthenticationService) { }

    ngOnInit() {
        if (!Array.isArray(this.codes)) {
            this.codes = []
        }
    }

    add() {
        this.codes.push(this.codeService.mockOne())
    }

    async confirmRemove(code: Code) {
        try {
            const rejected = await swal({
                title: 'Are you sure?',
                text: 'You won\'t be able to get back your code.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Remove',
                cancelButtonText: 'Cancel'
            })

            if (rejected) {
                this.remove(code)
            }
        } catch (reason) {
            // we do nothing
        }
    }

    remove(code: Code) {
        this.codes = this.codes.filter(current => current.id !== code.id)
    }

    async request(code: Code) {
        try {
            if (this.codeService.filterEmptyCodes([code]).length > 0) {

                if (!this.asAuthor) {
                    await this.addCodeAsAuthor(code)
                } else {
                    await this.requestService.add(code, this.authentication.currentUser(), this.snippet, this.author)
                }

                this.requestedSuccessfully = true
                this.requested = true
            } else {
                swal({
                    title: 'Request failed',
                    text: 'You cannot push an empty code (please be sure you have selected a language and entered some code)',
                    type: 'error'
                })
            }
        } catch (error) {
            // todo: error
            console.error(error)
        }
    }

    addCodeAsAuthor(code: Code) {
        return this.codeService.create(code, this.snippet, this.authentication.currentUser())
    }

    newRequest(event: Event) {
        event.preventDefault()
        this.requested = false
        this.requestedSuccessfully = false
        this.codes = []
        this.add()
    }
}
