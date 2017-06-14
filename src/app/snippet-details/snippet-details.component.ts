import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { Comment } from '../interfaces/comment'
import * as $ from 'jquery'
import { CommentService } from 'app/services/comment/comment.service'
import { Snippet } from '../interfaces/snippet/index'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication/authentication.service'
import { Subscription } from 'rxjs/Subscription'
import { RequestService } from '../services/request/index'
import { LikeService } from '../services/like/like.service'
import { CodeService } from '../services/code/code.service'
import { Code } from '../interfaces/snippet/code'
import { languages } from '../services/language/languages'
import { Language } from '../interfaces/language/index'

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent implements OnInit, OnDestroy {
    private notification: any
    private snippet: Snippet
    private likes = 0
    private liked = false
    private codes: Code[] = []
    private code: Code
    private languages: Language[]
    private comments: Comment[] = []
    @ViewChild('comment')
    private comment: ElementRef
    private routeDataObserver: Subscription
    private ownSnippet = false
    private hasPendingRequests = false
    private loaded = false
    private requestCodes: Code[] = []

    constructor(
        private commentService: CommentService,
        private route: ActivatedRoute,
        private authentication: AuthenticationService,
        private request: RequestService,
        private router: Router,
        private likeService: LikeService,
        private codeService: CodeService) { }

    async ngOnInit() {
        this.routeDataObserver = this
            .route
            .data
            .subscribe(async(data: { snippet: Snippet }) => {
                const user = this.authentication.currentUser()

                this.snippet = data[0]
                this.comments = await this.commentService.all(this.snippet)
                this.likes = await this.likeService.all(this.snippet)
                this.codes = await this.codeService.all(this.snippet)

                if (this.codes.length > 0) {
                    this.code = this.codes[0]
                    this.languages = this.extractLanguages()
                }

                if (user) {
                    this.ownSnippet = user.id === this.snippet.author.id
                    this.hasPendingRequests = (await this.request.forSnippet(this.snippet)).length > 0
                }

                this.loaded = true
            })
    }

    ngOnDestroy() {
        this.routeDataObserver.unsubscribe()
    }

    focusComment() {
        this.comment.nativeElement.focus()
    }

    addComment(event: Event) {
        event.preventDefault()

        const commentContent = this.comment.nativeElement.value.trim()

        if (commentContent.length > 0) {
            const author = this.authentication.currentUser()
            const comment = this.commentService.forge(commentContent, author)

            this.comments.unshift(comment)
            this.commentService.add(comment, this.snippet)
            this.comment.nativeElement.value = ''
        }
    }

    like() {
        if (!this.liked) {
            this.likes++
            this.liked = true
        } else {
            this.unlike()
        }
    }

    unlike() {
        this.likes--
        this.liked = false
    }

    goToRequests() {
        this.router.navigate(['/snippets/requests'])
    }

    extractLanguages(): Language[] {
        return this.codes.map(code => code.language)
    }

    codeBlockChange(code: Code) {
        this.code = code
    }
}
