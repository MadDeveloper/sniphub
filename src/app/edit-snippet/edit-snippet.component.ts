import { Component, OnInit } from '@angular/core'

@Component({
<<<<<<< HEAD
    selector: 'app-add-snippet',
=======
    selector: 'app-edit-snippet',
>>>>>>> feat(many): design, renaming, etc.
    templateUrl: './edit-snippet.component.html',
    styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent implements OnInit {
<<<<<<< HEAD
=======
    private id: number
    private name: string
    private description: string
    private codeBlocks: Array<any>
>>>>>>> feat(many): design, renaming, etc.

    constructor() { }

    ngOnInit() {
<<<<<<< HEAD

=======
        this.name = ''
        this.description = ''
        this.id = 1
>>>>>>> feat(many): design, renaming, etc.
    }


}
