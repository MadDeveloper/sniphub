import { Injectable } from '@angular/core'
import { modes } from './modes'
import find from 'lodash-es/find'

@Injectable()
export class CodeEditorService {
    private standardConfig: any
    private mode: any
    private theme: string

    constructor() {
        this.standardConfig = {
            lineNumbers: true,
            smartIndent: true
        }
        this.mode = null
        this.theme = 'dracula'
    }

    get config() {
        return {
            ...this.standardConfig,
            mode: this.mode,
            theme: this.theme
        }
    }

    useMode(mode: string) {
        const foundMode: any = find(modes, current => current.name.toLowerCase() === mode)

        if (foundMode) {
            this.mode = foundMode.mime
        }
    }

    useTheme(theme: string) {
        this.theme = theme
    }
}
