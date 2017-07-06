import { Component, OnInit, OnDestroy } from '@angular/core'
import { RequestService } from '../services/request.service'
import { Request } from '../interfaces/request'
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-snippets-requests',
  templateUrl: './snippets-requests.component.html',
  styleUrls: ['./snippets-requests.component.scss']
})
export class SnippetsRequestsComponent implements OnInit, OnDestroy {
    private requests: Request[] = []
    private routeDataObserver: Subscription
    loaded = false

    constructor(
        private requestService: RequestService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.routeDataObserver = this
            .route
            .data
            .subscribe((data: { requests: Request[] }) => {
                this.requests = data[0]
                this.loaded = true
            })
    }

    ngOnDestroy() {
        this.routeDataObserver.unsubscribe()
    }
}
