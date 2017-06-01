import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.scss']
})
export class AddSnippetComponent implements OnInit {

    rowData = [
        {
            language: 'JS',
            code: 'js1'
        }
    ]

    constructor() { }

  ngOnInit() {
  }

  addCodeBlock()
  {
    this.rowData.push({
        language: 'JS',
        code: ''
    })
  }

  removeCodeBlock(row)
  {
       const index: number = this.rowData.indexOf(row)
        if (index !== -1) {
            this.rowData.splice(index, 1)
        }
  }

}
