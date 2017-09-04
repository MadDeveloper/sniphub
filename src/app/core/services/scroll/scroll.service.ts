import { Injectable } from '@angular/core'

@Injectable()
export class ScrollService {
    documentScrolledBottom(): boolean {
        const html = document.documentElement
        const body = document.body
        const userScroll = Math.ceil(window.innerHeight + (document.documentElement.scrollTop || body.scrollTop))
        const maxScroll = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )

        if (userScroll >= maxScroll) {
            return true
        }

        return false
    }
}
