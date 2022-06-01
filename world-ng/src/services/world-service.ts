import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../model/country";



@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor(private httpClient :HttpClient) { }

  getContinents() : Observable<Array<String>> {
    return this.httpClient.get<Array<String>>("http://localhost:9100/world/api/v1/continents");
  }
  getCountriesByContinent(continent : String ) : Observable<Array<Country>> {
    return this.httpClient.get<Array<Country>>(`http://localhost:9100/world/api/v1/countries?continent=${continent}`);
  }
}
