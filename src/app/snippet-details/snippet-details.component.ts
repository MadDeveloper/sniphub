import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent implements OnInit {

    @Input()
    private snippetId: number

    constructor() { }

    ngOnInit() { }

}
