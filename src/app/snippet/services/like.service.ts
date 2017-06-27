import { Injectable } from '@angular/core'
import { Snippet } from '../interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase } from 'angularfire2/database'
import { Like } from '../interfaces/like'
import { AuthenticationService } from '../../authentication/services/authentication.service'

@Injectable()
export class LikeService {
    constructor(
        private database: AngularFireDatabase,
        private authentication: AuthenticationService) { }

    all(snippet: Snippet): Observable<Like[]> {
        return this.database.list(this.likesSnippetPath(snippet))
    }

    like(snippet: Snippet) {
        this.database
            .object(this.likesSnippetPath(snippet))
            .update({ [this.authentication.user.id]: true })
    }

    unlike(snippet: Snippet): Promise<boolean> {
        return Promise.resolve(true)
    }

    private likesPath() {
        return '/likes'
    }

    private likesSnippetPath(snippet: Snippet) {
        return `${this.likesPath()}/${snippet.id}`
    }
}
