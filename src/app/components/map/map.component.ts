import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { Brewery } from '../types/brewery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'map',
  standalone: true,
  imports: [GoogleMap, MapAdvancedMarker, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  @Input() brewery?: Brewery;
  options: google.maps.MapOptions = {};

  ngOnInit(): void {
    this.options = {
      mapId: 'DEMO_MAP_ID',
      center: {
        lat: this.brewery!.latitude,
        lng: this.brewery!.longitude,
      },
      zoom: 12,
    };
  }
}
