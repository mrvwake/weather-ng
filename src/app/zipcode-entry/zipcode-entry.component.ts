import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import {LocationService} from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  constructor(private service : LocationService) { }

  addLocation(zipcode : string):Observable<any> {
    if(zipcode?.length > 0) {
      return this.service.addLocation(zipcode);
    }
    return of(1);
  }

}
