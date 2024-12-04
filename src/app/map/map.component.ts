import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnChanges {
  @Input() latitude!: string;
  @Input() longitude!: string;

  private map: L.Map | undefined;

  constructor() {}

  ngOnInit(): void {
    if (this.latitude && this.longitude) {
      this.initMap();
    }
  }

  ngOnChanges(): void {
    if (this.map) {
      // Recentrez la vue uniquement si nécessaire
      this.map.setView([Number(this.latitude), Number(this.longitude)], 10);
    }
  }

  private initMap(): void {
    // Vérifiez si la carte existe déjà pour éviter les rechargements
    if (this.map) return;

    this.map = L.map('map', {
      center: [Number(this.latitude), Number(this.longitude)],
      zoom: 10,
      preferCanvas: true,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([Number(this.latitude), Number(this.longitude)])
      .addTo(this.map)
      .bindPopup('Position actuelle')
      .openPopup();
  }
}
