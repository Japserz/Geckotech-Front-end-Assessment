import { Component, inject, OnInit, signal } from '@angular/core';
import { BreweriesService } from './services/breweries.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly api: BreweriesService = inject(BreweriesService);
  breweries = [];

  ngOnInit(): void {
    this.api.getBreweries().subscribe((data) => {
      this.breweries = data;
    });
  }
}
