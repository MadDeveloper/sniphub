import { Component, OnInit, Input } from '@angular/core'
import { LanguageService } from '../services/language/language.service'
import { Language } from '../interfaces/language'
import { GuidService } from '../services/guid/guid.service'
import { Code } from '../interfaces/snippet/code'
import { CodeService } from '../services/code/code.service'
import { Snippet } from 'app/interfaces/snippet'
import { RequestService } from '../services/request/index'
import { AuthenticationService } from '../services/authentication/authentication.service'
import { SweetAlertService } from 'ng2-sweetalert2'

@Component({
    selector: 'app-add-code',
    templateUrl: './add-code.component.html',
    styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {
    @Input()
    private asRequest = false
    @Input()
    private codes: Code[]
    @Input()
    private snippet: Snippet
    private requested = false
    private requestedSuccessfully = false

    constructor(
        private languageService: LanguageService,
        private guid: GuidService,
        private codeService: CodeService,
        private requestService: RequestService,
        private authentication: AuthenticationService,
        private swal: SweetAlertService) { }

    ngOnInit() {
        if (!this.codes) {
            this.initCodes()
        }
    }

    initCodes() {
        this.codes = []
        this.add()
    }

    add() {
        this.codes.push(this.codeService.mockOne())
    }

    async confirmRemove(code: Code) {
        try {
            const rejected = await this.swal.swal({
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
        const request = this.requestService.forge(this.authentication.currentUser(), code, this.snippet)

        this.requestedSuccessfully = await this.requestService.add(request)
        this.requested = true
    }

    newRequest(event: Event) {
        event.preventDefault()
        this.requested = false
        this.requestedSuccessfully = false
        this.initCodes()
    }

    codeBlockChange(event: any) {

    }
}
