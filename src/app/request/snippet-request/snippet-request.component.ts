import { Component, OnInit, OnDestroy } from '@angular/core'
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

@Component({
    selector: 'app-snippet-request',
    templateUrl: './snippet-request.component.html',
    styleUrls: ['./snippet-request.component.scss']
})
export class SnippetRequestComponent implements OnInit, OnDestroy {
    request: Request
    snippet: Snippet
    author: User
    code: Code
    loaded = false
    accepted = false
    rejected = false
    private authorObserver: Subscription
    private codeObserver: Subscription
    private snippetObserver: Subscription

    constructor(
        private requestService: RequestService,
        private snippetService: SnippetService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this
            .route
            .data
            .subscribe((data: { request: Request }) => {
                this.request = data[0]
                this.loadCode()
                this.loadSnippet()
            })
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        this.authorObserver.unsubscribe()
        this.codeObserver.unsubscribe()
        this.snippetObserver.unsubscribe()
    }

    loadSnippet() {
        this.snippetObserver = this.request.snippet.subscribe(snippet => this.snippet = snippet)
    }

    loadCode() {
        this.codeObserver = this.request.code.subscribe(code => {
            this.code = code
            this.loadAuthor()
        })
    }

    loadAuthor() {
        this.authorObserver = this.code.author.subscribe(author => {
            this.author = author
            this.loaded = true
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
                this.accept()
            }
        } catch (reason) {
            // we do nothing
        }
    }

    accept() {
        this.requestService.accept(this.request, this.code, this.author, <Snippet>this.requestService.storedSnippet)
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
                this.reject()
            }
        } catch (reason) {
            // we do nothing
        }
    }

    reject = () => {
        this.requestService.reject(this.request, this.code, <Snippet>this.requestService.storedSnippet)
        this.rejected = true
    }
}