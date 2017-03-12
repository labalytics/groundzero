import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class AuthenticationService {
    constructor(public http: Http) { }

    login(username: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/validate', JSON.stringify({ email: username, password: password }), options)
        //return this.http.post('/registration', JSON.stringify({ email: username, password: password }), options)
            .map((response: Response) => {

                console.log(response.json());
                localStorage.setItem('currentUser', JSON.stringify(response.json()));
            });
    }


    signup(info: any = {}) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(info);
    // return this.http.post('/validate', JSON.stringify({ email: info, password: password }), options)
    return this.http.post('/registration', JSON.stringify({ info }), options)
      .map((response: Response) => {

        console.log(response);
       // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
