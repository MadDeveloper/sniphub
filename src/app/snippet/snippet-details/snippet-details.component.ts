import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Comment } from '../interfaces/comment'
import { Subscription } from 'rxjs/Subscription'
import { Snippet } from '../interfaces/snippet'
import { Code } from '../../code/interfaces/code'
import { Language } from '../../code/interfaces/language'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { RequestService } from '../../request/services/request.service'
import { LikeService } from '../services/like.service'
import { CodeService } from '../../code/services/code.service'
import { CommentService } from '../services/comment.service'
import { Like } from '../interfaces/like'
import { SnippetService } from '../services/snippet.service'
import { User } from '../../core/interfaces/user/user'
import { config } from '../../../config'
import swal from 'sweetalert2'
import { ScrollService } from '../../core/services/scroll/scroll.service'
import { PaginableResponse } from '../../core/interfaces/response/paginable-response'
import { Observable } from 'rxjs/Observable'
import { FirebaseService } from '../../core/services/firebase/firebase.service'

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent implements OnInit, OnDestroy {
    notification: any
    snippet: Snippet
    description: string
    descriptionExpanded = false
    liked = false
    codes: Code[] = []
    codesLoaded = false
    codesObserver: Subscription
    comments: Comment[] = []
    commentsObserver: Subscription
    responseComments: PaginableResponse<Comment[]>
    @ViewChild('comment')
    comment: ElementRef
    ownSnippet = false
    authorObserver: Subscription
    likedObserver: Subscription
    requestsObserver: Subscription
    hasPendingRequests = false
    loaded = false
    loadingComments = true
    requestCodes: Code[] = []
    newCodes: Code[] = []
    isAuthenticated: boolean
    snippetAuthor: User
    user: User

    constructor(
        private commentService: CommentService,
        private route: ActivatedRoute,
        private authentication: AuthenticationService,
        private request: RequestService,
        private router: Router,
        private likeService: LikeService,
        private codeService: CodeService,
        private snippetService: SnippetService,
        private requestService: RequestService,
        private scroll: ScrollService,
        private firebaseService: FirebaseService) { }

    ngOnInit() {
        this.route
            .data
            .subscribe(data => {
                this.user = this.authentication.currentUser()

                this.snippet = data[0]

                if (this.snippet) {
                    this.description = this.snippet.description
                    this.truncateDescription()

                    this.isAuthenticated = this.authentication.logged

                    this.loadComments()
                    this.loadCodes()

                    if (this.user) {
                        this.loadSnippetAuthor()
                        this.likedObserver = this.likeService.liked(this.snippet).subscribe(liked => this.liked = liked)
                        this.loadRequests()
                    }
                }
            })
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        if (this.authorObserver) {
            this.authorObserver.unsubscribe()
        }

        if (this.likedObserver) {
            this.likedObserver.unsubscribe()
        }

        if (this.requestsObserver) {
            this.requestsObserver.unsubscribe()
        }

        if (this.commentsObserver) {
            this.commentsObserver.unsubscribe()
        }
    }

    loadSnippetAuthor() {
        this.authorObserver = this.snippet.author.subscribe(author => {
            this.snippetAuthor = author

            if (author && author.email) {
                this.ownSnippet = this.user.email === author.email
            }
        })
    }

    loadCodes() {
        this.codesObserver = this
            .codeService
            .all(this.snippet)
            .subscribe((codes: Code[]) => {
                this.codes = codes
                this.codesLoaded = true
                this.loaded = true
            })
    }

    loadComments() {
        // we keep the last comments sync with the database, in order to see in real time the new comments
        this.loadingComments = true
        this.commentsObserver = this.commentService
            .all(this.snippet)
            .subscribe(response => {
                this.responseComments = response

                if (this.loaded && this.comments.length > 0) {
                    let preservedComments = []

                    if (response.hits.length < this.comments.length) {
                        preservedComments = this.comments.slice(response.hits.length - 1)
                    }

                    this.comments = response.hits.concat(preservedComments)
                } else {
                    this.comments = response.hits
                }

                this.loadingComments = false
            })
    }

    loadMoreComments() {
        const comments$ = this.responseComments.next() as Observable<PaginableResponse<Comment[]>>

        this.loadingComments = true

        comments$.first().subscribe(response => {
            this.responseComments = response
            this.comments.push(...response.hits)
            this.loadingComments = false
        })
    }

    loadRequests() {
        this.requestsObserver = this
            .request
            .forSnippet(this.snippet).subscribe(requests => this.hasPendingRequests = requests.length > 0)
    }

    focusComment() {
        if (this.isAuthenticated) {
            this.comment.nativeElement.focus()
        } else {
            this.showSignInPopup()
        }
    }

    truncateDescription() {
        if (this.isDescriptionTooLong()) {
            this.description = `${this.description.substring(0, config.snippet.maxLengthDescription - 3)}...`
            this.descriptionExpanded = false
        }
    }

    isDescriptionTooLong() {
        return this.description && this.description.length > config.snippet.maxLatestAddedDisplayed
    }

    expandDescription(event: Event) {
        event.preventDefault()
        this.description = this.snippet.description
        this.descriptionExpanded = true
    }

    async addComment(event: Event) {
        event.preventDefault()

        const content = this.comment.nativeElement.value.trim()

        if (content.length > 0) {
            const author = this.authentication.currentUser()

            this.comment.nativeElement.value = ''
            await this.commentService.add(content, author, this.snippet, this.snippetAuthor)
        }
    }

    like() {
        if (this.isAuthenticated) {
            if (!this.liked) {
                this.snippet.likesCounter++
                this.likeService.like(this.snippet, this.snippetAuthor)
                this.snippetService.increaseLikesCounter(this.snippet)
                this.liked = true
            } else {
                this.unlike()
            }
        } else {
            this.showSignInPopup()
        }
    }

    unlike() {
        this.snippet.likesCounter--
        this.likeService.unlike(this.snippet)
        this.snippetService.decreaseLikesCounter(this.snippet)
        this.liked = false
    }

    goToRequests() {
        this.router.navigate(['/requests'])
    }

    async confirmDelete() {
        try {
            const rejected = await swal({
                title: 'Are you sure?',
                text: `You won't be able to get back your snippet.`,
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

    async delete() {
        try {
            await this.firebaseService.bulk(
                this.likeService.deleteAllAsUpdates(this.snippet),
                this.commentService.deleteAllAsUpdates(this.snippet),
                this.requestService.deleteAllAsUpdates(this.snippet),
                this.codeService.deleteAllAsUpdates(this.snippet),
                this.snippetService.deleteAllAsUpdates(this.snippet, this.snippetAuthor)
            )

            this.router.navigate(['/profile'])
        } catch (error) {
            swal({
                title: 'Oops...',
                text: 'Something went wrong! Please retry again or later.',
                type: 'error'
            })
        }
    }

    private showSignInPopup() {
        swal({
            title: 'Sign in',
            html: 'You need to be logged first. <a class="link" routerLink="/signin">Sign in</a>',
            type: 'info'
        })
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (this.loaded && this.scroll.documentScrolledBottom() && !this.loadingComments && this.responseComments && this.responseComments.canNext) {
            this.loadMoreComments()
        }
    }
}
