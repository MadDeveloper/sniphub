import { Injectable } from '@angular/core'
import { Comment } from '../interfaces/comment'
import { Snippet } from '../interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { UserService } from '../../core/services/user/user.service'
import * as firebase from 'firebase'
import { NotificationService } from '../../notification/services/notification.service'
import { PaginableResponse } from '../../core/interfaces/response/paginable-response'
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces'
import { config } from '../../../config'
import { FirebaseService } from '../../core/services/firebase/firebase.service'

@Injectable()
export class CommentService {
    constructor(
        private database: AngularFireDatabase,
        private user: UserService,
        private firebaseService: FirebaseService,
        private notification: NotificationService) { }

    all(snippet: Snippet, endAt: string = null): Observable<PaginableResponse<Comment[]>> {
        const options: FirebaseListFactoryOpts = {
            query: {
                orderByKey: true,
                limitToLast: config.comments.maxPerPage
            }
        }

        if (endAt) {
            options.query.endAt = endAt
        }

        return this
            .database
            .list(this.commentsPath(snippet), options)
            .map((comments: any[]): Comment[] => comments.map((comment: any): Comment => this.forge(comment)))
            .map(comments => {
                const clonedComments = comments.slice().reverse()
                const lastComment = clonedComments.pop()

                return {
                    canNext: comments.length >= config.comments.maxPerPage,
                    hits: clonedComments,
                    next: () => this.all(snippet, lastComment.id)
                }
            })
    }

    forge(comment: any): Comment {
        return {
            id: comment.id || comment.$key || this.firebaseService.uniqId(),
            author: this.user.find(comment.author),
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
