import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core'
import { CodemirrorComponent } from 'ng2-codemirror'
import { Code } from '../interfaces/code'
import { CodeService } from '../services/code.service'
import { LanguageService } from '../services/language.service'
import { CodeEditorService } from '../services/code-editor.service'
import { Language } from '../interfaces/language'
import { languages } from '../services/languages'
import { Snippet } from '../../snippet/interfaces/snippet'
import swal from 'sweetalert2'

@Component({
    selector: 'app-code-block',
    templateUrl: './code-block.component.html',
    styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit {
    @ViewChild(CodemirrorComponent)
    codemirror: CodemirrorComponent

    @Input()
    snippet: Snippet
    @Input()
    config = null
    @Input()
    hideLanguage = false
    @Input()
    useAllLanguages = false
    @Input()
    readonly = false
    @Input()
    code: Code
    @Input()
    codes: Code[] = []
    @Input()
    withAuthor = false
    @Input()
    deleteOption = false

    languages: Language[]
    usingMock = false

    constructor(
        private codeService: CodeService,
        private languageService: LanguageService,
        private codeEditor: CodeEditorService) { }

    ngOnInit() {
        if (!this.code && this.codes.length > 0) {
            this.code = this.codes[0]
        }

        this.languages = this.extractLanguages()

        if (!this.config) {
            const mode = this.code ? this.code.language.value : this.languageService.plainText().value

            this.config = Object.assign({}, this.codeEditor.config, {
                mode,
                extraKeys: { 'Ctrl-Space': 'autocomplete' },
                readOnly: !!this.readonly
            })
        }
    }

    changeLanguage(language: any) {
        const foundLanguage = this.findLanguage(language)

        if (foundLanguage) {
            const code: Code = this.codeService.findCodeByLanguage(this.codes, foundLanguage)

            this.changeMode(foundLanguage)

            if (code) {
                this.code = code
            } else {
                // code does not exists yet
                this.code.language = foundLanguage
            }
        }
    }

    extractLanguages(): Language[] {
        if (this.useAllLanguages) {
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

    async confirmDeleteCode() {
        try {
            const rejected = await swal({
                title: 'Are you sure?',
                text: `You won't be able to get back this code.`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel'
            })

            if (rejected) {
                this.deleteCode()
            }
        } catch (reason) {
            // TODO: sentry
        }
    }

    async deleteCode() {
        try {
            const code = this.code

            await this.codeService.delete(code, this.snippet)
            this.removeCodeFromList(code)

            if (this.isCurrentCode(code)) {
                this.updateCurrentCode()
            }
        } catch (error) {
            // TODO: sentry
        }
    }

    removeCodeFromList(code: Code) {
        this.codes = this.codes.filter(current => current.id !== code.id)
        this.languages = this.languages.filter(language => language.id !== code.language.id)
    }

    isCurrentCode(code: Code) {
        return code.id === this.code.id
    }

    updateCurrentCode() {
        if (this.codes.length > 0) {
            this.code = this.codes[0]
        } else {
            this.code = this.codeService.mockOne()
        }
    }
}
