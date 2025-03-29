import { Component, inject, OnInit } from '@angular/core';
import { BreweriesService } from './services/breweries.service';
import { CommonModule } from '@angular/common';
import { Brewery } from './components/types/brewery';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Dialog } from '@angular/cdk/dialog';
import { BreweryComponent } from './components/brewery/brewery.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly api: BreweriesService = inject(BreweriesService);

  searchForm: FormGroup = new FormGroup({
    city: new FormControl(''),
    country: new FormControl(''),
  });

  dialog = inject(Dialog);
  breweries: Brewery[] = [];

  ngOnInit(): void {
    this.api
      .getBreweries()
      .pipe(
        map((data: Brewery[]) => {
          for (let brewery of data) {
            brewery.latitude = Number(brewery.latitude);
            brewery.longitude = Number(brewery.longitude);
          }
          return data;
        })
      )
      .subscribe((data) => {
        this.breweries = data;
      });

    this.searchForm.controls['city'].valueChanges.subscribe((_) =>
      this.getBreweries()
    );
    this.searchForm.controls['country'].valueChanges.subscribe((_) =>
      this.getBreweries()
    );
  }

  getBreweries() {
    this.api
      .getBreweries(
        this.searchForm.controls['city'].value,
        this.searchForm.controls['country'].value
      )
      .subscribe((data) => {
        this.breweries = data;
        for (const brewery of this.breweries) {
          brewery.latitude = Number(brewery.latitude);
          brewery.longitude = Number(brewery.longitude);
        }
      });
  }

  openModal(brewery: Brewery) {
    this.dialog.open(BreweryComponent, {
      minWidth: '100%',
      minHeight: '80%',
      data: {
        brewery: brewery,
      },
    });
  }
}
