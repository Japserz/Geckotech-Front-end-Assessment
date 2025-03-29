import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brewery } from '../components/types/brewery';

@Injectable({
  providedIn: 'root',
})
export class BreweriesService {
  private BREWERYURL: string = 'https://api.openbrewerydb.org/v1/breweries';

  private readonly httpClient = inject(HttpClient);

  getBreweries(city?: string, country?: string) {
    return this.httpClient.get<Brewery[]>(
      `${this.BREWERYURL}?${city ? 'by_city=' + encodeURI(city) + '&' : ''}${
        country ? 'by_country=' + encodeURI(country) + '&' : ''
      }per_page=10`
    );
  }
}
