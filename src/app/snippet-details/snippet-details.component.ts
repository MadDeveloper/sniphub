import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { Comment } from '../interfaces/comment'
import * as $ from 'jquery'
import { CommentService } from 'app/services/comment/comment.service'
import 'codemirror/mode/javascript/javascript'

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
    private code: string
    private codemirrorConfig = {
        lineNumbers: true,
        smartIndent: true,
        mode: 'javascript'
    }

    constructor(private commentService: CommentService) { }

    ngOnInit() {
        this.likes = 158
        this.liked = false
        this.comments = this.commentService.all()
        this.code = 'str.replace(/\s/g, "")'
    }

    onChange(code) {
        console.log("new code", code);
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
