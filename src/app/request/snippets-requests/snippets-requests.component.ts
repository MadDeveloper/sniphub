import { Component, OnInit } from '@angular/core'
import { RequestService } from '../services/request.service'
import { Request } from '../interfaces/request'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-snippets-requests',
  templateUrl: './snippets-requests.component.html',
  styleUrls: ['./snippets-requests.component.scss']
})
export class SnippetsRequestsComponent implements OnInit {
    requests: Request[]
    loaded = false

    constructor(
        private requestService: RequestService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route
            .data
            .subscribe((data: { requests: Request[] }) => {
                this.requests = data[0]
                this.loaded = true
            })
    }
}
