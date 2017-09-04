import { Injectable } from '@angular/core'
import { Comment } from '../interfaces/comment'
import { Snippet } from '../interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { UserService } from '../../core/services/user/user.service'
import { GuidService } from '../../core/services/guid/guid.service'
import * as firebase from 'firebase'
import { NotificationService } from '../../notification/services/notification.service'

@Injectable()
export class CommentService {
    constructor(
        private database: AngularFireDatabase,
        private user: UserService,
        private guid: GuidService,
        private notification: NotificationService) { }

    all(snippet: Snippet): Observable<Comment[]> {
        return this
            .database
            .list(this.commentsPath(snippet), {
                query: {
                    orderByChild: 'date'
                }
            })
            .map((comments: any[]): Comment[] => {
                comments.reverse()

                return comments.map((comment: any): Comment => {
                    const commentCloned = Object.assign({}, comment)

                    commentCloned.author = this.user.find(comment.author)

                    return this.forge(commentCloned)
                })
            })
    }

    forge(comment: any): Comment {
        return {
            id: comment.id || this.guid.newGuid(),
            author: comment.author || null,
            date: comment.date || new Date(),
            content: comment.content || null
        }
    }

    add(content, author: User, snippet: Snippet, snippetAuthor: User) {
        if (author.id !== snippetAuthor.id) {
            this.notification.comment(author, snippet, snippetAuthor)
        }

        return this
            .database
            .list(this.commentsPath(snippet))
            .push({
                content,
                date: firebase.database.ServerValue.TIMESTAMP,
                author: author.id
            })
    }

    private commentsPath(snippet: Snippet) {
        return `/comments/${snippet.id}`
    }
}