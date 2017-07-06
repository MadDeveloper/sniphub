import { Component, Input } from '@angular/core'
import { Comment } from '../interfaces/comment'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
    @Input()
    comments: Observable<Comment[]>
}
