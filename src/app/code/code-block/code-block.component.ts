import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { CodemirrorComponent } from 'ng2-codemirror'
import { Code } from '../interfaces/code'
import { CodeService } from '../services/code.service'
import { LanguageService } from '../services/language.service'
import { CodeEditorService } from '../services/code-editor.service'
import { Language } from '../interfaces/language'

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit {
    @ViewChild(CodemirrorComponent)
    private codemirror: CodemirrorComponent
    @Input()
    private config: any
    @Output()
    private onChangeCodeBlock: EventEmitter<any>
    @Input()
    private hideLanguage: boolean
    @Input()
    private readonly: boolean
    @Input()
    public languages: any[]
    @Input()
    private code: Code

    constructor(
        private codeService: CodeService,
        private languageService: LanguageService,
        private codeEditor: CodeEditorService) {
        this.onChangeCodeBlock = new EventEmitter()
    }

    ngOnInit() {
        if (!this.code) {
            this.code = this.codeService.mockOne()
        }

        if (!this.config) {
            this.config = Object.assign({}, this.codeEditor.config, {
                mode: this.code.language.value,
                extraKeys: { 'Ctrl-Space': 'autocomplete' },
                readOnly: this.readonly ? 'nocursor' : false,
                change: this.changeCode
            })
        }

        if (!Array.isArray(this.languages)) {
            this.languages = this.languageService.all()
        }
    }

    changeCode = (code: string) => {
        this.code.code = code
        this.notifiyCodeBlockChange()
    }

    changeLanguage(language: any) {
        const foundLanguage = this.findLanguage(language)

        if (foundLanguage) {
            this.code.language = foundLanguage
            this.changeMode(foundLanguage)

            this.notifiyCodeBlockChange()
        }
    }

    private changeMode(language: Language) {
        this.codemirror.instance.setOption('mode', language.value)
    }

    private findLanguage(language: any) {
        const extractedLanguage = this.languages.filter(current => current.id === language.id)

        if (extractedLanguage.length > 0) {
            return extractedLanguage[0]
        }

        return null
    }

    private notifiyCodeBlockChange() {
        this.onChangeCodeBlock.emit(this.code)
    }
}
