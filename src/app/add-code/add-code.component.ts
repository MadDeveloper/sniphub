import { Component, OnInit, Input } from '@angular/core'
import { LanguageService } from '../services/language/language.service'
import { Language } from '../interfaces/language'
import { CodeEditorService } from '../services/code-editor'
import { GuidService } from '../services/guid/guid.service'

@Component({
    selector: 'app-add-code',
    templateUrl: './add-code.component.html',
    styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {
    @Input()
    private configs: any[]
    @Input()
    private asRequest = false

    constructor(
        private languageService: LanguageService,
        private codeEditor: CodeEditorService,
        private guid: GuidService) { }

    async ngOnInit() {
        if (!this.configs) {
            this.configs = []
            this.add()
        }
    }

    add() {
        this.configs.push({
            id: this.guid.newGuid()
        })
    }

    remove(config: any) {
        this.configs = this.configs.filter(current => current.id !== config.id)
    }
}
