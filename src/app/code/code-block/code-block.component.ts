import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { CodemirrorComponent } from 'ng2-codemirror'
import { Code } from '../interfaces/code'
import { CodeService } from '../services/code.service'
import { LanguageService } from '../services/language.service'
import { CodeEditorService } from '../services/code-editor.service'
import { Language } from '../interfaces/language'
import { languages } from '../services/languages'

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit {
    @ViewChild(CodemirrorComponent)
    private codemirror: CodemirrorComponent
    @Input()
    private config = null
    @Output()
    private onChangeLanguage = new EventEmitter<any>()
    @Input()
    private hideLanguage = false
    @Input()
    private useAllLanguages = false
    @Input()
    private readonly = false
    @Input()
    private code: Code
    @Input()
    private codes: Code[]
    @Input()
    private withAuthor = false
    private languages: Language[]
    private usingMock = false

    constructor(
        private codeService: CodeService,
        private languageService: LanguageService,
        private codeEditor: CodeEditorService) { }

    ngOnInit() {
        if (!Array.isArray(this.codes) || this.codes.length === 0) {
            this.codes = [this.codeService.mockOne()]
            this.usingMock = true
        }

        if (!this.code) {
            this.code = this.codes[0]
        }

        this.languages = this.extractLanguages()

        if (!this.config) {
            this.config = Object.assign({}, this.codeEditor.config, {
                mode: this.code.language.value || this.languageService.plainText().value,
                extraKeys: { 'Ctrl-Space': 'autocomplete' },
                readOnly: this.readonly ? 'nocursor' : false,
                change: this.changeCode
            })
        }
    }

    changeCode = (code: string) => this.code.code = code

    changeLanguage(language: any) {
        const foundLanguage = this.findLanguage(language)

        if (foundLanguage) {
            this.changeMode(foundLanguage)
            const code = this.codeService.findCodeByLanguage(this.codes, foundLanguage)

            if (this.usingMock) {
                this.code.language = foundLanguage
            } else {
                this.code = code
            }
        }
    }

    extractLanguages(): Language[] {
        if (this.usingMock || this.useAllLanguages) {
            return languages
        } else {
            return this.codes.map(code => code.language)
        }
    }

    changeMode(language: Language) {
        this.codemirror.instance.setOption('mode', language.value)
    }

    findLanguage(language: any) {
        const extractedLanguage = this.languages.filter(current => current.id === language.id)

        if (extractedLanguage.length > 0) {
            return extractedLanguage[0]
        }

        return null
    }
}
