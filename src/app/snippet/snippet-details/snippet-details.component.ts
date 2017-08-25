import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
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
import { CommentService } from '../services/comment.service'
import { Observable } from 'rxjs/Observable'
import { Like } from '../interfaces/like'
import { SnippetService } from '../services/snippet.service'
import { User } from '../../core/interfaces/user/user'
import { config } from '../../../config'
import swal from 'sweetalert2'

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
    comments: Observable<Comment[]>
    @ViewChild('comment')
    comment: ElementRef
    ownSnippet = false
    authorObserver: Subscription
    likedObserver: Subscription
    requestsObserver: Subscription
    hasPendingRequests = false
    loaded = false
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
        private snippetService: SnippetService) { }

    ngOnInit() {
        this.route
            .data
            .subscribe((data: { snippet: Snippet }) => {
                this.user = this.authentication.currentUser()

                this.snippet = data[0]

                if (this.snippet) {
                    this.description = this.snippet.description
                    this.truncateDescription()

                    this.isAuthenticated = this.authentication.logged
                    this.comments = this.commentService.all(this.snippet)

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

    loadRequests() {
        this.requestsObserver = this
            .request
            .forSnippet(this.snippet).subscribe(requests => this.hasPendingRequests = requests.length > 0)
    }

    focusComment() {
        this.comment.nativeElement.focus()
    }

    truncateDescription() {
        if (this.isDescriptionTooLong()) {
            this.description = `${this.description.substring(0, config.snippet.maxLengthDescription - 3)}...`
            this.descriptionExpanded = false
        }
    }

    isDescriptionTooLong() {
        return this.description.length > config.snippet.maxLastestAddedDisplayed
    }

    expandDescription(event: Event) {
        event.preventDefault()
        this.description = this.snippet.description
        this.descriptionExpanded = true
    }

    addComment(event: Event) {
        event.preventDefault()

        const commentContent = this.comment.nativeElement.value.trim()

        if (commentContent.length > 0) {
            const author = this.authentication.currentUser()

            this.commentService.add(commentContent, author, this.snippet, this.snippetAuthor)
            this.comment.nativeElement.value = ''
        }
    }

    like() {
        if (!this.liked) {
            this.snippet.likesCounter++
            this.likeService.like(this.snippet, this.snippetAuthor)
            this.snippetService.increaseLikesCounter(this.snippet)
            this.liked = true
        } else {
            this.unlike()
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
            await this.snippetService.delete(this.snippet)
            this.router.navigate(['/profile'])
        } catch (error) {
            swal({
                title: 'Oops...',
                text: 'Something went wrong! Please retry again or later.',
                type: 'error'
            })
        }
    }
}
