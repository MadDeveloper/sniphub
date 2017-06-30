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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    private routeDataObserver: Subscription
    private snippets: Observable<Snippet[]>
    private user: User
    private userSnapshot: User
    private loggedUser: User
    private pendingNotifications: boolean
    private notifications: Notification[]
    private editing = false
    private username: ElementRef
    @ViewChild('username') set usernameRef(username: ElementRef) {
        this.username = username
    }

    constructor(
        private snippetService: SnippetService,
        private route: ActivatedRoute,
        private router: Router,
        private authentication: AuthenticationService,
        private notification: NotificationService,
        private userService: UserService,
        private cdr: ChangeDetectorRef) { }

    async ngOnInit() {
        this.notifications = await this.notification.all()
        this.snippets = this.snippetService.all()
        this.pendingNotifications = this.notifications.length > 0

        if (this.authentication.logged) {
            this.user = Object.assign({}, this.authentication.currentUser())
            this.loggedUser = Object.assign({}, this.user)
            this.newUserSnapshot()
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
    }

    ngOnDestroy() {
        if (this.routeDataObserver) {
            this.routeDataObserver.unsubscribe()
        }
    }

    private newUserSnapshot() {
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
        this.editing = true
        // if we remove timeout, focus() won't work because the input won't be displayed yet
        setTimeout(() => this.username.nativeElement.focus(), 0)
    }

    editUsername() {
        this.editing = false

        if (this.userSnapshot.username !== this.user.username) {
            this.userService.changeUsername(this.user)
            this.newUserSnapshot()
        }

        this.cdr.detectChanges()
    }
}
