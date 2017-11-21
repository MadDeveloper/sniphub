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
            .list(this.commentsSnippetPath(snippet), options)
            .map((comments: any[]): Comment[] => comments.map((comment: any): Comment => this.forge(comment)))
            .map(comments => {
                const hits = comments.slice().reverse()
                const canNext = comments.length >= config.comments.maxPerPage
                let next = null
                let lastComment = null

                if (canNext) {
                    lastComment = hits.pop()
                    next = () => this.all(snippet, lastComment.id)
                }

                return {
                    canNext,
                    hits,
                    next
                }
            })
    }

    forge(comment: any): Comment {
        return {
            id: comment.id || comment.$key || this.firebaseService.uniqId(),
            author: this.user.find(comment.user),
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
            .list(this.commentsSnippetPath(snippet))
            .push({
                content,
                date: firebase.database.ServerValue.TIMESTAMP,
                user: author.id
            })
    }

    deleteAll(snippet: Snippet) {
        return this
            .database
            .list(this.commentsSnippetPath(snippet))
            .remove()
    }

    deleteAllAsUpdates(snippet: Snippet) {
        const updates = {}

        updates[this.commentsSnippetPath(snippet)] = null

        return updates
    }

    private commentsPath() {
        return '/comments'
    }

    private commentsSnippetPath(snippet: Snippet) {
        return `${this.commentsPath()}/${snippet.id}`
    }
}
