import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  private authenticated: boolean;
  private result: Object;

  constructor(public http: Http) {
    this.authenticated = false;
  }

  authorize(username: string, password: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post('/validate', JSON.stringify({email: username, password: password}), options)
    //return this.http.post('/registration', JSON.stringify({ email: username, password: password }), options)
      .map((response: Response) => {
        this.authenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.result = JSON.parse(response._body);
        return this.result;
      });
  }

  private CheckIfAuthenticated() {
    if (localStorage.getItem('currentUser') === null) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
  }

  public isAuthenticated() {
    return this.authenticated;
  }


  signup(info: any = {}) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    console.log(info);
    // return this.http.post('/validate', JSON.stringify({ email: info, password: password }), options)
    return this.http.post('/registration', JSON.stringify({info}), options)
      .map((response: Response) => {
        this.authenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.result = JSON.parse(response._body);
        return this.result;
      });
  }

  logout() {
    // remove user from local storage to log user out
    //this.authenticated = false;
    localStorage.removeItem('currentUser');
  }
}
