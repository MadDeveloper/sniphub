import { Injectable } from '@angular/core'
import { SnippetService } from '../../snippet/services/snippet.service'
import { Snippet } from '../../snippet/interfaces/snippet'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class SearchService {
    terms$: BehaviorSubject<string> = new BehaviorSubject(null)

    constructor(private snippet: SnippetService) {}

    changeTerms(terms: string) {
        this.terms$.next(terms)
    }

    searchByAll(terms: string): Observable<Snippet[]> {
        return Observable.of([])
    }

    searchByName(terms: string): Observable<Snippet[]> {
        return Observable.of([])
    }
}
