import { Component, OnInit, Input } from '@angular/core'
import { LanguageService } from '../services/language/language.service'
import { Language } from '../interfaces/language'
import { GuidService } from '../services/guid/guid.service'
import { Code } from '../interfaces/snippet/code'
import { CodeService } from '../services/code/code.service'

@Component({
    selector: 'app-add-code',
    templateUrl: './add-code.component.html',
    styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {
    @Input()
    private asRequest = false
    @Input()
    private codes: Code[]

    constructor(
        private languageService: LanguageService,
        private guid: GuidService,
        private codeService: CodeService) { }

    ngOnInit() {
        if (!this.codes) {
            this.codes = []
            this.add()
        }
    }

    add() {
        this.codes.push(this.codeService.mockOne())
    }

    remove(code: Code) {
        this.codes = this.codes.filter(current => current.id !== code.id)
    }
}
