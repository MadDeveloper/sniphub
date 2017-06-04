import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { Comment } from '../interfaces/comment'
import * as $ from 'jquery'
import { CommentService } from 'app/services/comment/comment.service'

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent implements OnInit {
    @Input()
    private snippet: number
    private likes: number
    private liked: boolean
    private comments: Comment[]
    @ViewChild('comment')
    private comment: ElementRef

    constructor(private commentService: CommentService) { }

    ngOnInit() {
        this.likes = 158
        this.liked = false
        this.comments = this.commentService.all()
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
            author: {
                id: 1,
                avatar: '/assets/images/unknown.jpg',
                username: 'Madeveloper'
            },
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
