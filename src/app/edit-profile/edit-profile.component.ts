import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

    private activeTab = 'profile'

    constructor() { }

    ngOnInit() { }

    changeTab(tab: string) {
        this.activeTab = tab
    }

}
