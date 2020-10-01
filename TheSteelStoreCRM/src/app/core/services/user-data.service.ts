import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../constants/app.constants';
@Injectable({
  providedIn: 'root',
})
/**
 * user service class
 */
export class UserDataService {
  users: User[] = [];
  user: any;

  private dbPath = '/users';

  customersRef: AngularFireList<any> = null;

  steelStoreRef: AngularFireList<any> = null;

  userData: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private db: AngularFireDatabase, private http: HttpClient
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${BASE_URL}login`, {
      email: email,
      password: password
    });
  }

  addUser(userName: string, password: string, email: string, birthdate: Date): Observable<any> {
    return this.http.post(`${BASE_URL}signup`, {
      username: userName, email: email, password: password, birthdate: JSON.stringify(birthdate)
    });
  }

  /**
   * get user by user name and password
   */
  getUserByUserNameAndPassword(userName: string, password: string): User {
    let user: User = null;
    this.users.forEach((element) => {
      if (element.userName === userName && element.password === password) {
        user = element;
      }
    });
    return user;
  }
}
