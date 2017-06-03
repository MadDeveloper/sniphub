import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { Comment } from '../interfaces/comment'
import * as $ from 'jquery'
import { CommentService } from 'app/services/comment/comment.service'
import { CodemirrorComponent } from 'ng2-codemirror'

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
    private codemirrorConfig: any
    public languages: Array<any>
    private language: any
    @ViewChild('comment')
    private comment: ElementRef

    @ViewChild(CodemirrorComponent)
    private codemirror: CodemirrorComponent

    constructor(private commentService: CommentService) { }

    ngOnInit() {
        this.likes = 158
        this.liked = false
        this.comments = this.commentService.all()
        this.languages = [
            { id: 1, text: 'JavaScript', value: 'javascript' },
            { id: 2, text: 'C#', value: 'clike' },
            { id: 3, text: 'PHP', value: 'php' },
            { id: 4, text: 'Java', value: 'clike' }
        ]
        this.codemirrorConfig = {
            lineNumbers: true,
            smartIndent: true,
            mode: null,
            theme: 'dracula'
        }
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

    changeLanguage(language: any) {
        this.language = language
        const foundLanguage = this.findLanguage(language)

        if (foundLanguage) {
            this.codemirror.instance.setOption('mode', foundLanguage.value)
        }
    }

    private findLanguage(language: any) {
        const extractedLanguage = this.languages.filter(current => current.id === language.id)

        if (extractedLanguage.length > 0) {
            return extractedLanguage[0]
        }

        return null
    }

}
