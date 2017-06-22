import { NgModule, ModuleWithProviders } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { CodeBlockComponent } from './code-block/code-block.component'
import { AddCodeComponent } from './add-code/add-code.component'
import { CodeEditorService } from './services/code-editor.service'
import { CodeService } from './services/code.service'
import { LanguageService } from './services/language.service'
import { CodemirrorModule } from 'ng2-codemirror'
import { SelectModule } from 'ng2-select'

@NgModule({
    imports: [
        SharedModule,
        CodemirrorModule,
        SelectModule
    ],
    declarations: [
        CodeBlockComponent,
        AddCodeComponent
    ],
    exports: [
        CodeBlockComponent,
        AddCodeComponent
    ]
})
export class CodeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CodeModule,
            providers: [
                CodeEditorService,
                CodeService,
                LanguageService
            ]
        }
    }
}
