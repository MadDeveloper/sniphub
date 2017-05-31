import { Component, OnInit } from '@angular/core'
import { SnippetService } from 'app/services/snippet/snippet.service'
import { Snippet } from 'app/interfaces/snippet'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    private snippets: Snippet[]

    constructor(private snippetService: SnippetService) { }

    ngOnInit() {
        this.snippets = this.snippetService.all()
    }

}
