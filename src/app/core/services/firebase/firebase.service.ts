import * as firebase from 'firebase'
import { AngularFireDatabase } from 'angularfire2/database'
import { FirebaseUser } from '../../interfaces/user/firebaseUser'
import { Injectable } from '@angular/core'

@Injectable()
export class FirebaseService {
    constructor(private database: AngularFireDatabase) { }

    currentUser(): FirebaseUser {
        return firebase.auth().currentUser
    }

    uniqId() {
        return firebase.database().ref().push().key
    }

    bulk(...actions) {
        const updates = {}

        actions.forEach(action => Object.assign(updates, action()))

        return this.database
            .app
            .database()
            .ref()
            .update(updates)
    }
}
