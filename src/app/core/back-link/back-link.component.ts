import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Location } from '@angular/common'

@Component({
  selector: 'app-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent {
    constructor(private location: Location) { }

    back() {
        this.location.back()
    }
}
