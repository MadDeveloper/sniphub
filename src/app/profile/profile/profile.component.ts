import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Snippet } from '../../snippet/interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { SnippetService } from '../../snippet/services/snippet.service'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { NotificationService } from '../../notification/services/notification.service'
import { Notification } from '../../notification/interfaces/notification'
import { Observable } from 'rxjs/Observable'
import { UserService } from '../../core/services/user/user.service'
import { FirebaseService } from '../../core/services/firebase/firebase.service'
import { LikeService } from '../../snippet/services/like.service'
import { Like } from '../../snippet/interfaces/like'
import { CodeService } from '../../code/services/code.service'
import { Code } from '../../code/interfaces/code'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    routeDataObserver: Subscription
    authorSnippets: Snippet[]
    contributorSnippets: Snippet[]
    snippetsLoaded = false
    snippetsObserver: Subscription
    user: User
    likes: Observable<Like[]>
    codes: Observable<Code[]>
    userSnapshot: User
    loggedUser: User
    pendingNotifications: boolean
    notifications: Notification[]
    notificationsObserver: Subscription
    notificationsLoaded = false
    editing = false
    username: ElementRef
    @ViewChild('username') set usernameRef(username: ElementRef) {
        this.username = username
    }

    constructor(
        private snippet: SnippetService,
        private route: ActivatedRoute,
        private router: Router,
        private authentication: AuthenticationService,
        private notification: NotificationService,
        private userService: UserService,
        private like: LikeService,
        private code: CodeService,
        private firebaseService: FirebaseService,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        if (this.authentication.logged) {
            this.user = Object.assign({}, this.authentication.currentUser())
            this.loggedUser = Object.assign({}, this.user)
            this.newUserSnapshot()

            if (this.ownProfile()) {
                this.loadNotifications()
            }
        }

        if (this.route.snapshot.params['id']) {
            const userId = this.route.snapshot.params['id']

            if (this.loggedUser && userId === this.loggedUser.id) {
                this.user = Object.assign({}, this.loggedUser)
                this.newUserSnapshot()
            } else {
                this.routeDataObserver = this
                    .route
                    .data
                    .subscribe((data: { user: User }) => {
                        this.user = Object.assign({}, data[0])
                        this.newUserSnapshot()
                    })
            }
        }

        this.loadSnippets()
    }

    loadNotifications() {
        this.notificationsObserver = this
            .notification
            .all(this.user)
            .subscribe(notifications => {
                this.notifications = notifications
                this.notificationsLoaded = true
                this.pendingNotifications = this.notifications.length > 0
            })
    }

    loadSnippets() {
        this.snippetsObserver = this.snippet
            .author(this.user)
            .mergeMap(authorSnippets => {
                this.authorSnippets = authorSnippets
                this.loadLikes()

                return this.snippet.contributor(this.user)
            })
            .subscribe(contributorSnippets => {
                this.contributorSnippets = contributorSnippets
                this.loadCodes()
                this.snippetsLoaded = true
            })
    }

    loadLikes() {
        this.likes = Observable
            .from(this.authorSnippets)
            .mergeMap(snippet => this.like.all(snippet))
    }

    loadCodes() {
        this.codes = Observable
            .from(this.authorSnippets)
            .mergeMap(snippet => this.code.all(snippet))
            .concat(Observable
                .from(this.authorSnippets)
                .mergeMap(snippet => this.code.all(snippet)))
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        this.snippetsObserver.unsubscribe()
        this.notificationsObserver.unsubscribe()
    }

    newUserSnapshot() {
        this.userSnapshot = Object.assign({}, this.user)
    }

    ownProfile() {
        return this.loggedUser && this.user && this.loggedUser.id === this.user.id
    }

    signOut() {
        this.authentication.logout()
    }

    containsRequestsNotifications() {
        return this.notification.containsRequestsNotifications(this.notifications)
    }

    goToRequests() {
        this.router.navigate(['/requests'])
    }

    setUsernameEditable() {
        if (this.ownProfile()) {
            this.editing = true
            // if we remove timeout, focus() won't work because the input won't be displayed yet
            setTimeout(() => this.username.nativeElement.focus(), 0)
        }
    }

    editUsername() {
        if (this.ownProfile()) {
            this.editing = false

            if (this.userSnapshot.username !== this.user.username) {
                this.userService.changeUsername(this.user)
                this.authentication.reloadUser(this.user)
                this.newUserSnapshot()
            }

            this.cdr.detectChanges()
        }
    }

    syncAvatar() {
        const firebaseUser = this.firebaseService.currentUser()

        if (this.user.avatar !== firebaseUser.photoURL) {
            this.user.avatar = firebaseUser.photoURL
            this.userService.changeAvatar(this.user)
            this.authentication.reloadUser(this.user)
        }
    }
}
