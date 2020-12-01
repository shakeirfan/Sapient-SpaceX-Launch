import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  private baseDomainUrl = environment.domainBaseUrl;

  getLaunches(year: string, launchSuccessful: string, landSuccessful: string, limit: number) {
    let reqUrl = `${this.baseDomainUrl}/launches?limit=${limit}`;

    if (launchSuccessful) {
      const launchStatus = launchSuccessful === 'Yes' ? true : false;
      reqUrl = reqUrl + `&launch_success=${launchStatus}`;
    }

    if (landSuccessful) {
      const landStatus = landSuccessful === 'Yes' ? true : false;
      reqUrl = reqUrl + `&land_success=${landStatus}`;
    }

    if (year) {
      reqUrl = reqUrl + `&launch_year=${year}`;
    }

   
    return this.http.get<[]>(reqUrl);
  }
}
