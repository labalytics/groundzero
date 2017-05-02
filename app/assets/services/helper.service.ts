import {Injectable} from '@angular/core';

@Injectable()
export class HelperService {
  constructor() {
  }

  FindItemInArray(array: any [], keyName: string, keyVal: string, returnType: string) {
    let found = false;
    if (undefined === keyVal || null === keyVal) {
      return null;
    }
    let nIndex: Number;
    for (let i in array) {
      nIndex = i;
      if (array[i][keyName] === keyVal) {
        found = true;
        break;
      }
    }
    if (!found) {
      return null;
    }
    if (returnType === "index") {
      return nIndex;
    } else {
      return array[nIndex];
    }
  }
}
