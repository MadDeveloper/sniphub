import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class NetworkService {
    state$ = new BehaviorSubject<boolean>(true)
    private firebaseDatabase: any
    private oldState = false

    constructor(private database: AngularFireDatabase) {
        this.listenNetworkState()
    }

    private listenNetworkState() {
        this.database
            .app
            .database()
            .ref('.info/connected')
            .on('value', state => {
                if (true === state.val()) {
                    this.oldState = true
                    this.state$.next(true)
                } else if (true === this.oldState) {
                    this.oldState = false
                    this.state$.next(false)
                }
            })
    }
}
