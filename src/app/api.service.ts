import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getGDPData(country: string) : Observable<any> {
    return this.http.get<any>(`https://api.worldbank.org/v2/country/${country}/indicator/NY.GDP.MKTP.CD?format=json`)
  }

  getPopulationData(country: string) : Observable<any> {
    return this.http.get<any>(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json`)
  }

  getUnemployedRateData(country: string) : Observable<any> {
    return this.http.get<any>(`https://api.worldbank.org/v2/country/${country}/indicator/SL.UEM.TOTL.ZS?format=json`)
  }

  getGlobalPopulation() : Observable<any> {
    return this.http.get<any>(`https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?format=json`)
  }

  getGlobalGPD() : Observable<any> {
    return this.http.get<any>(`https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.CD?format=json`)
  }

  getGlobalUnemployedRate() : Observable<any> {
    return this.http.get<any>(`https://api.worldbank.org/v2/country/WLD/indicator/SL.UEM.TOTL.ZS?format=json`)
  }
}
