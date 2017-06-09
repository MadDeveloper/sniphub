import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { Comment } from '../interfaces/comment'
import * as $ from 'jquery'
import { CommentService } from 'app/services/comment/comment.service'
import { Snippet } from '../interfaces/snippet/index'
import { ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../services/authentication/authentication.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent implements OnInit, OnDestroy {
    private snippet: Snippet
    private likes: number
    private liked: boolean
    private comments: Comment[]
    @ViewChild('comment')
    private comment: ElementRef
    private routeDataObserver: Subscription
    private ownSnippet: boolean

    constructor(
        private commentService: CommentService,
        private route: ActivatedRoute,
        private authentication: AuthenticationService) { }

    async ngOnInit() {
        this.likes = 158
        this.liked = false
        this.comments = await this.commentService.all()
        this.ownSnippet = false
        this.routeDataObserver = this
            .route
            .data
            .subscribe((data: { snippet: Snippet }) => {
                const user = this.authentication.currentUser()

                this.snippet = data[0]

                if (user) {
                    this.ownSnippet = user.id === this.snippet.author.id
                }
            })
    }

    ngOnDestroy() {
        this.routeDataObserver.unsubscribe()
    }

    codeBlockChange(event: any) {

    }

    focusComment() {
        this.comment.nativeElement.focus()
    }

    addComment(event: Event) {
        event.preventDefault()
        this.comments.unshift({
            id: 1,
            author: this.authentication.currentUser(),
            date: new Date(),
            content: this.comment.nativeElement.value
        })
        this.comment.nativeElement.value = ''
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
}
