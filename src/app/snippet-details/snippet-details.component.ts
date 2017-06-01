import { Component, OnInit, Input } from '@angular/core'
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

    constructor(private commentService: CommentService) { }

    ngOnInit() {
        this.likes = 158
        this.liked = false
        this.comments = this.commentService.all()
    }

    focusComment() {
        $('#comment').focus()
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
