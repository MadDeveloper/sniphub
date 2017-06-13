import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { CodemirrorComponent } from 'ng2-codemirror'
import { LanguageService } from 'app/services/language/language.service'
import { Code } from '../interfaces/snippet/code'
import { CodeService } from '../services/code/code.service'
import { Language } from '../interfaces/language/index'

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
        private languageService: LanguageService) {
        this.onChangeCodeBlock = new EventEmitter()
    }

    async ngOnInit() {
        if (!this.code) {
            this.code = this.codeService.mockOne()
        }

        if (!this.config) {
            this.config = {
                lineNumbers: true,
                smartIndent: true,
                mode: this.code.language.value,
                theme: 'dracula',
                change: this.changeCode,
                readOnly: this.readonly ? 'nocursor' : false
            }
        }

        if (!Array.isArray(this.languages)) {
            this.languages = await this.languageService.all()
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
