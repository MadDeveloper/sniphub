import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RequestService } from '../services/request.service'
import { Request } from '../interfaces/request'
import { SnippetService } from '../../snippet/services/snippet.service'
import { Snippet } from '../../snippet/interfaces/snippet'
import { Observable } from 'rxjs/Observable'
import { Code } from '../../code/interfaces/code'
import { User } from '../../core/interfaces/user/user'
import swal from 'sweetalert2'
import { CodeService } from '../../code/services/code.service'
import { MetaService } from '@ngx-meta/core'

@Component({
    selector: 'app-snippet-request',
    templateUrl: './snippet-request.component.html',
    styleUrls: ['./snippet-request.component.scss']
})
export class SnippetRequestComponent implements OnInit {
    request: Request
    snippet: Snippet
    snippetCodes: Code[]
    author: User
    code: Code
    codeAlreadyExists = false
    currentCode: Code
    loaded = false
    accepted = false
    rejected = false

    constructor(
        private requestService: RequestService,
        private snippetService: SnippetService,
        private route: ActivatedRoute,
        private codeService: CodeService,
        private readonly meta: MetaService) { }

    ngOnInit() {
        this
            .route
            .data
            .subscribe((data: { request: Request }) => {
                this.request = data[0]
                this.loadSnippet()
            })
    }

    changeMeta() {
        this.meta.setTitle(`Request for snippet ${this.snippet.name}`, true)
    }

    loadSnippet() {
        this.request
            .snippet
            .first()
            .subscribe(snippet => {
                this.snippet = snippet
                this.loadSnippetCodes()
                this.changeMeta()
            })
    }

    loadSnippetCodes() {
        this.codeService
            .all(this.snippet)
            .first()
            .subscribe(codes => {
                this.snippetCodes = codes
                this.loadRequestCode()
            })
    }

    loadRequestCode() {
        this.request
            .code
            .first()
            .subscribe(code => {
                this.code = code
                this.detectIfCodeAlreadyExists()
                this.loadAuthor()
            })
    }

    loadAuthor() {
        this.code
            .author
            .first()
            .subscribe(author => {
                this.author = author
                this.loaded = true
            })
    }

    detectIfCodeAlreadyExists() {
        this.snippetCodes.forEach(code => {
            if (this.code.language.text === code.language.text) {
                this.currentCode = code
            }
        })
    }

    async confirmAccept() {
        try {
            const accepted = await swal({
                title: 'Are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Accept',
                cancelButtonText: 'Cancel'
            })

            if (accepted) {
                await this.accept()
            }
        } catch (reason) {
            // TODO: sentry
            // TODO: display UI error
        }
    }

    async accept() {
        const snippet: Snippet = <Snippet>this.requestService.storedSnippet

        await this.requestService.accept(this.request, this.code, this.author, snippet)
        this.accepted = true
    }

    async confirmReject() {
        try {
            const rejected = await swal({
                title: 'Are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Reject',
                cancelButtonText: 'Cancel'
            })

            if (rejected) {
                await this.reject()
            }
        } catch (reason) {
            // TODO: sentry
            // TODO: display UI error
        }
    }

    async reject() {
        const snippet: Snippet = <Snippet>this.requestService.storedSnippet

        await this.requestService.reject(this.request, this.code, this.author, snippet)
        this.rejected = true
    }
}
