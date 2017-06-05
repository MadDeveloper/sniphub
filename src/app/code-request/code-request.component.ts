import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-code-request',
    templateUrl: './code-request.component.html',
    styleUrls: ['./code-request.component.scss']
})
export class CodeRequestComponent implements OnInit {

    // codemirrorConfig: {
    //     lineNumbers: true,
    //     smartIndent: true,
    //     mode: {
    //         name: 'php',
    //         typescript: true
    //     },
    //     theme: 'dracula'
    // }

    // code = 'test'

    codeRequests = [{
        name: 'trim',
        username: 'John Doe',
        language: 'VB',
        code: 'Test',
        date: '2 days ago',
        showCode: false,
        codemirrorConfig: {
            lineNumbers: true,
            smartIndent: true,
            mode: {
                name: 'php',
                typescript: true
            },
            theme: 'dracula'
        }

    }]

    constructor() { }

    ngOnInit() {
        this.codeRequests.push({
            name: 'Uppercase',
            username: 'John Doe',
            language: 'PHP',
            code: 'Test',
            date: '2 days ago',
            showCode: false,
            codemirrorConfig: {
                lineNumbers: true,
                smartIndent: true,
                mode: {
                    name: 'php',
                    typescript: true
                },
                theme: 'dracula'
            }
        })
    }

    showCode(index) {
        this.codeRequests[index].showCode = !this.codeRequests[index].showCode
    }

    accept(index) {
        this.codeRequests.splice(index, 1)
    }

    reject(index)
    {
        // implémenter confirmation dans boite de dialogue
        this.codeRequests.splice(index, 1)
    }

}
