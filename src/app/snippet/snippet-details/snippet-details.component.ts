import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Comment } from '../interfaces/comment'
import * as $ from 'jquery'
import { Subscription } from 'rxjs/Subscription'
import { Snippet } from '../interfaces/snippet'
import { Code } from '../../code/interfaces/code'
import { Language } from '../../code/interfaces/language'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { RequestService } from '../../request/services/request.service'
import { LikeService } from '../services/like.service'
import { CodeService } from '../../code/services/code.service'
import { SweetAlertService } from 'ng2-sweetalert2'
import { CommentService } from '../services/comment.service'
import { Observable } from 'rxjs/Observable'
import { Like } from '../interfaces/like'

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent implements OnInit, OnDestroy {
    private notification: any
    private snippet: Snippet
    private likes: Observable<Like[]>
    private liked = false
    private codes: Code[] = []
    private code: Code
    private languages: Language[]
    private comments: Observable<Comment[]>
    @ViewChild('comment')
    private comment: ElementRef
    private ownSnippet = false
    private authorObserver: Subscription
    private likedObserver: Subscription
    private hasPendingRequests = false
    private loaded = false
    private requestCodes: Code[] = []
    private isAuthenticated: boolean

    constructor(
        private commentService: CommentService,
        private route: ActivatedRoute,
        private authentication: AuthenticationService,
        private request: RequestService,
        private router: Router,
        private likeService: LikeService,
        private codeService: CodeService,
        private swal: SweetAlertService) { }

    ngOnInit() {
        this.route
            .data
            .subscribe(async (data: { snippet: Snippet }) => {
                const user = this.authentication.currentUser()

                this.snippet = data[0]

                if (this.snippet) {
                    this.isAuthenticated = this.authentication.logged
                    this.comments = this.commentService.all(this.snippet)
                    this.likes = this.likeService.all(this.snippet)
                    this.codes = await this.codeService.all(this.snippet)

                    if (this.codes.length > 0) {
                        this.code = this.codes[0]
                        this.languages = this.extractLanguages()
                    }

                    if (user) {
                        this.authorObserver = this.snippet.author.subscribe(author => {
                            if (author && author.email) {
                                this.ownSnippet = user.email === author.email
                            } else {
                                this.ownSnippet = false
                            }
                        })
                        this.likedObserver = this.likeService.liked(this.snippet).subscribe(liked => this.liked = liked)
                        this.hasPendingRequests = (await this.request.forSnippet(this.snippet)).length > 0
                    }

                    this.loaded = true
                }
            })
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    private closeSubscriptions() {
        if (this.authorObserver) {
            this.authorObserver.unsubscribe()
        }

        if (this.likedObserver) {
            this.likedObserver.unsubscribe()
        }
    }

    focusComment() {
        this.comment.nativeElement.focus()
    }

    addComment(event: Event) {
        event.preventDefault()

        const commentContent = this.comment.nativeElement.value.trim()

        if (commentContent.length > 0) {
            const author = this.authentication.currentUser()

            this.commentService.add(commentContent, author, this.snippet)
            this.comment.nativeElement.value = ''
        }
    }

    like() {
        if (!this.liked) {
            this.likeService.like(this.snippet)
            this.liked = true
        } else {
            this.unlike()
        }
    }

    unlike() {
        this.likeService.unlike(this.snippet)
        this.liked = false
    }

    goToRequests() {
        this.router.navigate(['/requests'])
    }

    extractLanguages(): Language[] {
        return this.codes.map(code => code.language)
    }

    codeBlockChange(code: Code) {
        this.code = code
    }

    async confirmDelete() {
        try {
            const rejected = await this.swal.swal({
                title: 'Are you sure?',
                text: 'You won\'t be able to get back your snippet.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel'
            })

            if (rejected) {
                this.delete()
            }
        } catch (reason) {
            // we do nothing
        }
    }

    delete() {

    }
}
