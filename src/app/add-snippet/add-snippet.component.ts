import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-add-snippet',
    templateUrl: './add-snippet.component.html',
    styleUrls: ['./add-snippet.component.scss']
})
export class AddSnippetComponent implements OnInit {

    rowData = []
    language = [
        { id: 1, name: 'JS', value: 'javascript' },
        { id: 2, name: 'C#', value: 'clike' },
        { id: 3, name: 'PHP', value: 'php' },
        { id: 4, name: 'Java', value: 'clike' }
    ]
    constructor() { }

    ngOnInit() {
        this.rowData.push({
            code: '',
            language: null,
            selectedValue: null,
            codemirrorConfig: {
                lineNumbers: true,
                smartIndent: true,
                mode: {
                    name: 'javascript',
                    typescript: true
                },
                theme: 'dracula'
            }
        })
    }

    addCodeBlock() {
        this.rowData.push({
            language: null,
            code: '',
            selectedValue: null,
            codemirrorConfig: {
                lineNumbers: true,
                smartIndent: true,
                mode: {
                    name: 'javascript',
                    typescript: true
                },
                theme: 'dracula'
            }
        })
    }

    removeCodeBlock(row) {
        const index: number = this.rowData.indexOf(row)
        if (index !== -1) {
            this.rowData.splice(index, 1)
        }
    }

    onChangeLanguage(i) {
        console.log(this.rowData[i].language)
        this.rowData[i].codemirrorConfig.mode.name = this.rowData[i].selectedValue.value
        this.rowData[i].language = this.rowData[i].selectedValue.name
        console.log(this.rowData[i].language)
    }

}
