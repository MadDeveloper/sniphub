import { Injectable } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'
import { User } from 'app/interfaces/user'

@Injectable()
export class LikeService {
    constructor() { }

    async all(snippet: Snippet): Promise<number> {
        return Promise.resolve(158)
    }

    async like(snippet: Snippet, user: User): Promise<boolean> {
        return Promise.resolve(true)
    }

    async unloke(snippet: Snippet): Promise<boolean> {
        return Promise.resolve(true)
    }
}