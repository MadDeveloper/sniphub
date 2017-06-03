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
    private code: string
    private codemirrorConfig = {
        lineNumbers: true,
        smartIndent: true,
        mode: {
            name: 'javascript',
            typescript: true
        },
        theme: 'dracula'
    }
    public languages: Array<string>
    private language: string
    @ViewChild('comment')
    private comment: ElementRef

    constructor(private commentService: CommentService) { }

    ngOnInit() {
        this.likes = 158
        this.liked = false
        this.comments = this.commentService.all()
        this.code = 'interface Http {\n\tstatus: number\n\tstatusCode: number\n}'
        this.languages = ['JavaScript', 'TypeScript', 'PHP', 'C#', 'Java', 'Swift', 'Scala', 'Python', 'Ruby']
    }

    onChange(code: string) {
        this.code = code
    }

    focusComment() {
        this.comment.nativeElement.focus()
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

    changeLanguage(language: string) {
        this.language = language
    }

}
