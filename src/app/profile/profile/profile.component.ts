import swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core'
import { Code } from '../../code/interfaces/code'
import { FirebaseService } from '../../core/services/firebase/firebase.service'
import { Like } from '../../snippet/interfaces/like'
import { Observable } from 'rxjs/Observable'
import { PaginableResponse } from '../../core/interfaces/response/paginable-response'
import { RequestService } from '../../request/services/request.service'
import { Snippet } from '../../snippet/interfaces/snippet'
import { SnippetService } from '../../snippet/services/snippet.service'
import { Subscription } from 'rxjs/Subscription'
import { User } from '../../core/interfaces/user/user'
import { UserService } from '../../core/services/user/user.service'
import { config } from '../../../config'
import { MetaService } from '@ngx-meta/core'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    authorSnippets: Snippet[] = []
    contributorSnippets: Snippet[] = []
    snippetsAuthorLoaded = false
    snippetsContributorLoaded = false
    snippetsAuthorObserver: Subscription
    snippetsContributorObserver: Subscription
    activeTab = 'author'
    user: User
    codes = 0
    likes = 0
    userSnapshot: User
    loggedUser: User
    hasPendingRequests: boolean
    requestsObserver: Subscription
    username: ElementRef
    promptError: string
    @ViewChild('username') set usernameRef(username: ElementRef) {
        this.username = username
    }

    constructor(
        private snippet: SnippetService,
        private route: ActivatedRoute,
        private router: Router,
        private authentication: AuthenticationService,
        private request: RequestService,
        private userService: UserService,
        private firebaseService: FirebaseService,
        private cdr: ChangeDetectorRef,
        private readonly meta: MetaService) { }

    ngOnInit() {
        if (this.authentication.logged) {
            this.user = Object.assign({}, this.authentication.currentUser())
            this.loggedUser = Object.assign({}, this.user)
            this.newUserSnapshot()

            if (this.ownProfile()) {
                this.loadRequests()
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

        this.changeMeta()
        this.loadSnippets()
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        if (this.snippetsAuthorObserver) {
            this.snippetsAuthorObserver.unsubscribe()
        }

        if (this.snippetsContributorObserver) {
            this.snippetsContributorObserver.unsubscribe()
        }

        if (this.requestsObserver) {
            this.requestsObserver.unsubscribe()
        }
    }

    changeMeta() {
        this.meta.setTitle(this.user.username, true)
    }

    loadRequests() {
        this.requestsObserver = this
            .request
            .all(this.user)
            .subscribe(requests => this.hasPendingRequests = requests && requests.length > 0)
    }

    loadSnippets() {
        this.loadAuthorSnippets()
        this.loadContributorSnippets()
    }

    loadAuthorSnippets() {
        this.snippetsAuthorObserver = this.snippet.author(this.user).subscribe(snippets => {
            this.authorSnippets = snippets
            this.snippetsAuthorLoaded = true
            this.countLikes()

            // TODO: can't use codesCounter
            // if (this.snippetsContributorLoaded) {
            //     this.countCodes()
            // }
        })
    }

    loadContributorSnippets() {
        this.snippetsContributorObserver = this.snippet.contributor(this.user).subscribe(snippets => {
            this.contributorSnippets = snippets
            this.snippetsContributorLoaded = true

            if (this.snippetsAuthorLoaded) {
                this.countCodes()
            }
        })
    }

    countLikes() {
        this.likes = this.authorSnippets.reduce((counter, snippet) => counter + snippet.likesCounter, 0)
    }

    countCodes() {
        const codesAuthor = this.authorSnippets.reduce((counter, snippet) => counter + snippet.codesCounter, 0)
        const codesContributor = this.contributorSnippets.reduce((counter, snippet) => counter + snippet.codesCounter, 0)

        this.codes = codesAuthor + codesContributor
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
        const newPhotoURL = this.userService.photoURL(firebaseUser.photoURL, this.authentication.providerData.uid)

        if (this.user.avatar !== newPhotoURL) {
            this.user.avatar = newPhotoURL
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
                inputValue: this.user.username || '',
                inputPlaceholder: 'John Doe',
                showCancelButton: true
            })
            const usernameConfig = config.profile.username

            if (username.length < usernameConfig.minLength) {
                throw Error(`Username must contains at least ${usernameConfig.minLength} characters`)
            }

            if (username.length > usernameConfig.maxLength) {
                throw Error(`Username cannot contains more than ${usernameConfig.maxLength} characters`)
            }

            this.promptError = null
            this.editUsername(username)
        } catch (error) {
            const swalEvents = ['cancel', 'overlay', 'esc']

            if (!swalEvents.includes(error)) {
                // TODO: sentry
                this.promptError = error.message || error
            }
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
                inputValue: this.user.github || '',
                inputPlaceholder: 'https://github.com/john.doe',
                showCancelButton: true
            })

            this.changeGitHubAccount(githubAccount)
        } catch (error) {
            // TODO: sentry
            if ('cancel' !== error && 'overlay' !== error) { // swal specific (close event)
                this.promptError = error.message || error
            }
        }
    }

    toggleTab(tab: string) {
        switch (tab) {
            case 'contributor':
                if (this.contributorSnippets.length > 0) {
                    this.activeTab = 'contributor'
                }
                break

            default:
                if (this.authorSnippets.length > 0) {
                    this.activeTab = 'author'
                }
                break
        }
    }
}
