import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeoIpResponse, IpService } from './ip.service';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ip-address-tracker';
  ip: string = '';
  geoResponse?: GeoIpResponse;

  constructor(private ipService: IpService) {}

  searchIp() {
    this.ipService.getGeoLocation(this.ip).subscribe((res: GeoIpResponse) => {
      this.geoResponse = res;
    });
  }
}
