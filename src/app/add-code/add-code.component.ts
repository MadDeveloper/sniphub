import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-add-code',
    templateUrl: './add-code.component.html',
    styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {


    rowData = [
         {
            code: '',
            language: null,
            selectedValue: null,
            codemirrorConfig: {
                lineNumbers: true,
                smartIndent: true,
                mode: {
                    name: 'php',
                    typescript: true
                },
                theme: 'dracula'
            }
        }
    ]
    languages = [
        { id: 1, name: 'JS', value: 'javascript' },
        { id: 2, name: 'C#', value: 'clike' },
        { id: 3, name: 'PHP', value: 'php' },
        { id: 4, name: 'Java', value: 'clike' }
    ]

    constructor() { }

    ngOnInit() {
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
        this.rowData[i].codemirrorConfig.mode.name = this.rowData[i].selectedValue.value
        this.rowData[i].language = this.rowData[i].selectedValue.name
    }


}
