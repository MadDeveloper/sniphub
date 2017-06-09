import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { CodemirrorComponent } from 'ng2-codemirror'
import { LanguageService } from 'app/services/language/language.service'

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
    private id: any
    public languages: Array<any>
    private language: any
    private code: string

    constructor(private languageService: LanguageService) {
        this.onChangeCodeBlock = new EventEmitter()
    }

    async ngOnInit() {
        if (!this.config) {
            this.config = {
                lineNumbers: true,
                smartIndent: true,
                mode: null,
                theme: 'dracula',
                change: this.changeCode,
                readOnly: this.readonly ? 'nocursor' : false
            }
        }

        this.languages = await this.languageService.all()
    }

    changeCode = (code: string) => {
        this.code = code
        this.notifiyCodeBlockChange()
    }

    changeLanguage(language: any) {
        const foundLanguage = this.findLanguage(language)

        if (foundLanguage) {
            this.language = language
            this.codemirror.instance.setOption('mode', foundLanguage.value)

            this.notifiyCodeBlockChange()
        }
    }

    private findLanguage(language: any) {
        const extractedLanguage = this.languages.filter(current => current.id === language.id)

        if (extractedLanguage.length > 0) {
            return extractedLanguage[0]
        }

        return null
    }

    private notifiyCodeBlockChange() {
        this.onChangeCodeBlock.emit({
            id: this.id,
            code: this.code,
            language: this.language
        })
    }

}
