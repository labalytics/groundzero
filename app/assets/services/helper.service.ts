import {Injectable} from '@angular/core';

@Injectable()
export class HelperService {
  constructor() {
  }

  FindItemInArray(array: any [], keyName: string, keyVal: string, returnType: string) {
    var found = false;
    if (undefined === keyVal || null === keyVal) {
      return null;
    }
    let nIndex: Number;
    for (var i in array) {
      nIndex = i;
      if (array[i][keyName] == keyVal) {
        found = true;
        break;
      }
    }
    if (!found) {
      return null;
    }
    if (returnType === "index") {
      return i;
    } else {
      return array[i];
    }
  }
}
