import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { FirebaseUser } from '../../interfaces/user/firebaseUser'

@Injectable()
export class FirebaseService {
    currentUser(): FirebaseUser {
        return firebase.auth().currentUser
    }

    uniqId() {
        return firebase.database().ref().push().key
    }
}
