import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreweriesService {
  private BREWERYURL: string = 'https://api.openbrewerydb.org/v1/breweries';

  private readonly httpClient = inject(HttpClient);

  getBreweries() {
    return this.httpClient.get<any>(`${this.BREWERYURL}?per_page=3`);
  }
}
