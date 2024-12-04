import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GeoIpResponse {
  ip: string;
  location: {
    country: string;
    region: string;
    timezone: string;
    lat: string;
    lng: string;
  };
  domains: string[];
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
}

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private readonly apiKey = 'at_5PrZkNPeqmnPEM9d8fb9Etz8kMCeX';
  private readonly apiUrl = 'https://geo.ipify.org/api/v2/country,city';

  constructor(private http: HttpClient) {}

  getGeoLocation(ipAddress: string): Observable<GeoIpResponse> {
    const url = `${this.apiUrl}?apiKey=${this.apiKey}&ipAddress=${ipAddress}`;
    return this.http.get<GeoIpResponse>(url);
  }
}
