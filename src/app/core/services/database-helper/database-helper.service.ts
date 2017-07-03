import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { database as databaseConfig } from '../../../../config'

@Injectable()
export class DatabaseHelperService {
    filterListOmittedKeys(list: Observable<any[]>): Observable<any[]> {
        return list.map((elements: any[]) => elements.filter(element => !databaseConfig.keys.omitted.includes(element.$key)))
    }
}
