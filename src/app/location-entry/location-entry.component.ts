import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country, LocationService } from "../location.service";

@Component({
  selector: 'app-location-entry',
  templateUrl: './location-entry.component.html',
  styleUrls: ['./location-entry.component.css']
})
export class ZipcodeEntryComponent implements OnInit, OnDestroy {

  countries: string[] = [];
  country = '';
  zipcode = '';
  error = '';
  btnHandler: Subject<boolean> = new Subject();
  destroyUntil: Subject<boolean> = new Subject();

  constructor(private service : LocationService) { }

  ngOnInit() {
    this.service.getCountries().pipe(takeUntil(this.destroyUntil)).subscribe((list: Country[]) =>{
      this.countries = list.map((c) => c.name);
    });
  }

  ngOnDestroy() {
    this.destroyUntil.complete();
  }

  addLocation() {
    if(this.zipcode?.length && this.country?.length) {
      this.service.addLocation(this.country, this.zipcode)
      .pipe(takeUntil(this.destroyUntil))
      .subscribe(() => {
        this.btnHandler.next(true);
      }, (error) => {
        this.error = error;
        this.btnHandler.next(true);
      });
    } else {
      this.btnHandler.next(true);
    }
  }

  onZipChange(event: InputEvent) { 
    if(!event?.target || !event.target['value'] || event.target['value'].length === 0) {
      this.zipcode = '';
    }
    this.zipcode = event.target['value'];
  }

  onCountrySelect(country: string) {
    this.country = country;
  }
}
