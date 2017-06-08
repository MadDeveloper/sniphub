import { Component, OnInit } from '@angular/core'
import { LanguageService } from '../services/language/language.service'
import { Language } from '../interfaces/language/index'

@Component({
    selector: 'app-add-code',
    templateUrl: './add-code.component.html',
    styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {
    private rowData: any[]
    private languages: Language[]

    constructor(private languageService: LanguageService) { }

    ngOnInit() {
        this.rowData = []
        this.languages = this.languageService.all()
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
