import { Injectable } from '@angular/core'
import { Snippet } from '../interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Like } from '../interfaces/like'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { NotificationService } from '../../notification/services/notification.service'

@Injectable()
export class LikeService {
    constructor(
        private database: AngularFireDatabase,
        private authentication: AuthenticationService,
        private notification: NotificationService) { }

    all(snippet: Snippet): Observable<Like[]> {
        return this.database.list(this.likesSnippetPath(snippet))
    }

    like(snippet: Snippet, snippetAuthor: User) {
        const user = this.authentication.currentUser()

        if (user.id !== snippetAuthor.id) {
            this.notification.like(snippet, user, snippetAuthor)
        }

        return this.database
            .object(this.likesSnippetPath(snippet))
            .update({ [user.id]: true })
    }

    liked(snippet: Snippet): Observable<boolean> {
        const user = this.authentication.currentUser()

        return this
            .database
            .object(this.likePath(user, snippet))
            .map(like => like.$exists())
    }

    unlike(snippet: Snippet) {
        const user = this.authentication.currentUser()

        this.database
            .object(this.likePath(user, snippet))
            .remove()
    }

    deleteAll(snippet: Snippet) {
        return this
            .database
            .list(this.likesSnippetPath(snippet))
            .remove()
    }

    private likesPath() {
        return '/likes'
    }

    private likesSnippetPath(snippet: Snippet) {
        return `${this.likesPath()}/${snippet.id}`
    }

    private likePath(user: User, snippet: Snippet) {
        return `${this.likesSnippetPath(snippet)}/${user.id}`
    }
}
