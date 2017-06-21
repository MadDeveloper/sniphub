import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RequestService } from '../services/request/index'
import { Request } from '../interfaces/request/index'
import { Subscription } from 'rxjs/Subscription'
import { SweetAlertService } from 'ng2-sweetalert2'

@Component({
    selector: 'app-snippet-request',
    templateUrl: './snippet-request.component.html',
    styleUrls: ['./snippet-request.component.scss']
})
export class SnippetRequestComponent implements OnInit, OnDestroy {
    private request: Request
    private routeDataObserver: Subscription
    private loaded = false
    private accepted = false
    private rejected = false

    constructor(
        private requestService: RequestService,
        private route: ActivatedRoute,
        private swal: SweetAlertService) { }

    ngOnInit() {
        this.routeDataObserver = this
            .route
            .data
            .subscribe((data: { request: Request }) => {
                this.request = data[0]
                this.loaded = true
            })
    }

    ngOnDestroy() {
        this.routeDataObserver.unsubscribe()
    }

    accept() {
        this.requestService.accept(this.request)
        this.accepted = true
    }

    async confirmReject() {
        try {
            const rejected = await this.swal.swal({
                title: 'Are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Reject',
                cancelButtonText: 'Cancel'
            })

            if (rejected) {
                this.reject()
            }
        } catch (reason) {
            // we do nothing
        }
    }

    reject = () => {
        this.requestService.reject(this.request)
        this.rejected = true
    }
}
