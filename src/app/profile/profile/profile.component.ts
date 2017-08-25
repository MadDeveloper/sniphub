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
import { Like } from '../../snippet/interfaces/like'
import { Code } from '../../code/interfaces/code'
import { find } from 'lodash'
import swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    authorSnippets: Snippet[] = []
    contributorSnippets: Snippet[] = []
    snippetsLoaded = false
    snippetsObserver: Subscription
    user: User
    codes = 0
    likes = 0
    userSnapshot: User
    loggedUser: User
    pendingNotifications: boolean
    notifications: Notification[]
    notificationsObserver: Subscription
    notificationsLoaded = false
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
                this.route
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
        this.snippetsObserver = this
            .snippet
            .author(this.user)
            .mergeMap(authorSnippets => {
                this.authorSnippets = authorSnippets

                return this.snippet.contributor(this.user)
            })
            .subscribe(contributorSnippets => {
                this.contributorSnippets = contributorSnippets.filter(snippet => !find(this.authorSnippets, { id: snippet.id }))
                this.countCodes()
                this.countLikes()
                this.snippetsLoaded = true
            })
    }

    countLikes() {
        this.likes = this.authorSnippets.reduce((counter, snippet) => counter + snippet.likesCounter, 0)
    }

    countCodes() {
        const codesAuthor = this.authorSnippets.reduce((counter, snippet) => counter + snippet.codesCounter, 0)
        const codesContributor = this.contributorSnippets.reduce((counter, snippet) => counter + snippet.codesCounter, 0)

        this.codes =  codesAuthor + codesContributor
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

    signOut(event: Event) {
        event.preventDefault()
        this.authentication.logout()
    }

    containsRequestsNotifications() {
        return this.notification.containsRequestsNotifications(this.notifications)
    }

    goToRequests() {
        this.router.navigate(['/requests'])
    }

    editUsername(username: string) {
        if (this.ownProfile()) {
            this.user.username = username

            if (this.userSnapshot.username !== this.user.username) {
                this.userService.changeUsername(this.user)
                this.authentication.reloadUser(this.user)
                this.newUserSnapshot()
            }
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

    async promptUsername(event: Event) {
        event.preventDefault()

        try {
            const username: string = await swal({
                title: '<i class="fa fa-user title mr-4"></i>Username',
                html: 'Type here the new username you want to use',
                input: 'text',
                inputValue: this.user.username,
                inputPlaceholder: 'John Doe',
                showCancelButton: true
            })

            this.editUsername(username)
        } catch (error) {
            // todo
        }
    }

    changeGitHubAccount(githubAccount) {
        if (this.ownProfile()) {
            this.user.github = githubAccount

            if (this.userSnapshot.github !== this.user.github) {
                this.userService.changeGitHub(this.user)
                this.authentication.reloadUser(this.user)
            }
        }
    }

    async promptGitHubAccount(event: Event) {
        event.preventDefault()

        try {
            const githubAccount: string = await swal({
                title: '<i class="fa fa-github title mr-4"></i>GitHub account',
                html: 'Copy and paste your <span class="bold">GitHub</span> account link here',
                input: 'text',
                inputValue: this.user.github,
                inputPlaceholder: 'https://github.com/john.doe',
                showCancelButton: true
            })

            this.changeGitHubAccount(githubAccount)
        } catch (error) {
            // todo
        }
    }
}
