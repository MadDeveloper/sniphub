import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-edit-snippet',
    templateUrl: './edit-snippet.component.html',
    styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent implements OnInit {
    private id: number
    private name: string
    private snapshotName: string
    private description: string
    private codeBlocks: Array<any>

    constructor() { }

    ngOnInit() {
        this.name = ''
        this.snapshotName = ''
        this.description = ''
        this.id = 1
    }


}
