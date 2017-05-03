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
        result = JSON.parse((response as any)._body);
        localStorage.setItem('userEmail', (result as any).response.email);
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
          result = JSON.parse((response as any)._body);
          this.oRoleAndMenu = (result as any).response;

          const userInfo = (this.oRoleAndMenu as any).userDetails;
          /*Temp dummy user details*/
          (this.oRoleAndMenu as any).userInfo = {
            userName: userInfo.userId.firstName + ", " + userInfo.userId.lastName,
            userEmail: userInfo.userId.email,
            dateAdded: userInfo.userId.dateCreation,
            userRole: userInfo.roleId.roleName
          };

          return (result as any).response;
        })
        .share();
      return this.oRoleAndMenuObservable;
    }
  }

  getAllLabs(roleid: any, managerEmail: string ) {
    //this.http.post('/addLabs', JSON.stringify({email: managerEmail}), this.options)
    return this.http.post('/getLabs', JSON.stringify({email: managerEmail, roleId: roleid}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  getAvailables(reservation: any ) {
    //this.http.post('/addLabs', JSON.stringify({email: managerEmail}), this.options)
    return this.http.post('/getAvailable', JSON.stringify(reservation), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  getBookings(username: string) {
    //this.http.post('/addLabs', JSON.stringify({email: managerEmail}), this.options)
    return this.http.post('/labReport', JSON.stringify({email: username}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        console.log(result);
        return result;
      });
  }

  getBookingToPayByLabs(username: string) {
    //this.http.post('/addLabs', JSON.stringify({email: managerEmail}), this.options)
    return this.http.post('/getBills', JSON.stringify({email: username}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        console.log(result);
        return result;
      });
  }

  getBookingOwedByLabs(username: string) {
    //this.http.post('/addLabs', JSON.stringify({email: managerEmail}), this.options)
    return this.http.post('/getbillsOwed', JSON.stringify({email: username}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        console.log(result);
        return result;
      });
  }

  makePayments(bookingIdList: any ) {
    //this.http.post('/addLabs', JSON.stringify({email: managerEmail}), this.options)
    return this.http.post('/makePayment', JSON.stringify({bookingIdList: bookingIdList}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }


  getEvents() {

    return this.http.get('showcase/resources/data/scheduleevents.json')
      .toPromise()
      .then(res => <any[]> res.json().data)
      .then(data => { return data; });
  }

  insertStudents(newstudents: any) {
    return this.http.post('/insertStudents', JSON.stringify({students: newstudents}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }


  addlabs(info: any = {}) {
    return this.http.post('/addLabs', JSON.stringify({info}), this.options)
      .map((response: Response) => {
        //this.authenticated = true;
        //localStorage.setItem('currentUser', JSON.stringify(response));
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  getStudents(labid: Array<Object>, roleId: any) {
    return this.http.post('/getstudents', JSON.stringify({labid: labid, role: roleId}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
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
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  public logout() {
    // remove user from local storage to log user out
    //this.authenticated = false;
    localStorage.removeItem('currentUser');
  }

  public getEquipments(userDetails: any) {
    let id: any = [];
    for (let i = 0; i < userDetails.length; i++) {
      id.push(userDetails[i].labId.id);
    }
    return this.http.post('/getEquipments', JSON.stringify({id}), this.options)
      .map((response: Response) => {
        //this.authenticated = true;
        //localStorage.setItem('currentUser', JSON.stringify(response));
        let result: Object;
        result = JSON.parse((response as any)._body);
        console.log((result as any).response);
        return (result as any).response;
      });
  }

  public addEquipment(equipment: any) {
    return this.http.post('/addEquipment', JSON.stringify({equipment}), this.options)
      .map((response: Response) => {
        //this.authenticated = true;
        //localStorage.setItem('currentUser', JSON.stringify(response));
        let result: Object;
        result = JSON.parse((response as any)._body);
        console.log((result as any).response);
        return (result as any).response;
      });
  }

  public forgotpassword(email :any)
  {
    return this.http.post('/forgotpassword', JSON.stringify({email}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        console.log((result as any).message);
        return (result as any).message;
      });
  }

  public resetpassword(email :any, reset: any)
  {
    return this.http.post('/resetpassword', JSON.stringify({email,reset}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        console.log((result as any).message);
        return (result as any).message;
      });
  }

  public labAccessRequest(currentLabId :any, requestedLabId: any)
  {
    return this.http.post('/labAccessRequest', JSON.stringify({currentLabId,requestedLabId}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        console.log((result as any).message);
        return (result as any).message;
      });
  }

  public getUnrefferedLabs(LabId :any, email: any, roleId:any)
  {
    return this.http.post('/getUnrefferedLabs', JSON.stringify({LabidA: LabId, email: email, roleId: roleId}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  public makeReservation(unitId : any, date: any, strtTime : any, endTime : any, isRef : any, refLab : any)
  {
    console.log(this.username);
    return this.http.post('/makeReservation', JSON.stringify({unitId: unitId,date: date, strtTime: strtTime, endTime: endTime, isRef: isRef, refLab: refLab, userId: this.username}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  public getSchedule(type:any, id: any)
  {
    console.log('Here');
    return this.http.post('/getSchedule', JSON.stringify({type: type,id: id}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  public getEquipmentNotification()
  {
    return this.http.post('/getEquipmentNotification', JSON.stringify({username: this.username}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  public getSelfSchedule()
  {
    return this.http.post('/getSelfSchedule', JSON.stringify({username: this.username}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  public getLabRequests()
  {
    return this.http.post('/getLabRequests', JSON.stringify({email: this.username}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  public acceptLabRequest(id: any, value: any)
  {
    return this.http.post('/acceptLabRequest', JSON.stringify({reqId: id, value: value}), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }

  public profileUpdate(details: any)
  {
    return this.http.post('/updateProfile', JSON.stringify(details), this.options)
      .map((response: Response) => {
        let result: Object;
        result = JSON.parse((response as any)._body);
        return result;
      });
  }
}
