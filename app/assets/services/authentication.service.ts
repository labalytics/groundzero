import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  private authenticated: boolean = false;
  public username: string = null;
  private oRoleAndMenu: Object = null;
  private oRoleAndMenuObservable: Observable<any> = null;

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

  constructor(public http: Http) {
    let sUserEmail = localStorage.getItem('userEmail');
    if (sUserEmail) {
      this.username = sUserEmail;
    }
  }

  authorize(username: string, password: string) {
    return this.http.post('/validate', JSON.stringify({email: username, password: password}), this.options)
      .map((response: Response) => {
        this.authenticated = true;
        //localStorage.setItem('currentUser', JSON.stringify(response));
        let result: Object;
        result = JSON.parse(response._body);
        localStorage.setItem('userEmail', result.response.email);
        return result;
      });
  }

  getRoleandMenuData(username: string) {
    if (this.oRoleAndMenu) {
      return Observable.of(this.oRoleAndMenu);
    } else if (this.oRoleAndMenuObservable) {
      return this.oRoleAndMenuObservable;
    } else {
      this.oRoleAndMenuObservable = this.http.post('/getMenuAndRoleItems', JSON.stringify({email: username}), this.options)
        .map((response: Response) => {
          this.oRoleAndMenuObservable = null;
          let result: Object;
          result = JSON.parse(response._body);
          this.oRoleAndMenu = result.response;
          return result.response;
        })
        .share();
      return this.oRoleAndMenuObservable;
    }
  }

  getAllLabs(labid: string , managerEmail: string) {
    //this.http.post('/addLabs', JSON.stringify({email: managerEmail}), this.options)
    return this.http.post('/getAllLabs', JSON.stringify({email: managerEmail}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse(response._body);
        return result;
      });
  }

  insertStudents(newstudents: any)
  {
    return this.http.post('/insertStudents', JSON.stringify({students: newstudents}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse(response._body);
        return result;
      });
  }


  addlabs(info: any = {}) {
    return this.http.post('/addLabs', JSON.stringify({info}), this.options)
      .map((response: Response) => {
        //this.authenticated = true;
        //localStorage.setItem('currentUser', JSON.stringify(response));
        let result: Object;
        result = JSON.parse(response._body);
        return result;
      });
  }

  getStudents(labid: Array<Object>) {
    return this.http.post('/getstudents', JSON.stringify({ labid: labid}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse(response._body);
        return result;
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


  public signup(info: any = {}) {
    return this.http.post('/registration', JSON.stringify({info}), this.options)
      .map((response: Response) => {
        //this.authenticated = true;
        //localStorage.setItem('currentUser', JSON.stringify(response));
        let result: Object;
        result = JSON.parse(response._body);
        return result;
      });
  }

  public logout() {
    // remove user from local storage to log user out
    //this.authenticated = false;
    localStorage.removeItem('currentUser');
  }
}
