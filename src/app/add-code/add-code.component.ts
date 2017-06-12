import { Component, OnInit, Input } from '@angular/core'
import { LanguageService } from '../services/language/language.service'
import { Language } from '../interfaces/language'
import { CodeEditorService } from '../services/code-editor'

@Component({
    selector: 'app-add-code',
    templateUrl: './add-code.component.html',
    styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {
    @Input()
    private configs: any[]

    constructor(
        private languageService: LanguageService,
        private codeEditor: CodeEditorService) { }

    async ngOnInit() {
        if (!this.configs) {
            this.configs = [
                ...this.codeEditor.config
            ]
        }
    }

    addCodeBlock() {
        this.configs.push(...this.codeEditor.config)
    }

    removeCodeBlock(id: any) {
        this.configs = this.configs.filter(config => config.id !== id)
    }
}
