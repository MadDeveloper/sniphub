import { Component, OnInit, Input } from '@angular/core'
import { Comment } from '../interfaces/comment'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
    @Input()
    private comments: Comment[]

    constructor() { }

    ngOnInit() {}
}
