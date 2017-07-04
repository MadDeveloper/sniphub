import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { config } from '../../../../config'

@Injectable()
export class DatabaseHelperService {
    filterListOmittedKeys(list: Observable<any[]>): Observable<any[]> {
        return list.map((elements: any[]) => elements.filter(element => !config.database.keys.omitted.includes(element.$key)))
    }
}
