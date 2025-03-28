import { Component, inject, OnInit, signal } from '@angular/core';
import { BreweriesService } from './services/breweries.service';
import { CommonModule } from '@angular/common';
import { Brewery } from './components/types/brewery';
import { TextFieldModule } from '@angular/cdk/text-field';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Dialog, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { BreweryComponent } from './components/brewery/brewery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TextFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly api: BreweriesService = inject(BreweriesService);

  dialog = inject(Dialog);
  breweries: Brewery[] = [];

  ngOnInit(): void {
    this.api.getBreweries().subscribe((data) => {
      this.breweries = data;
    });
  }

  getBreweries(event: Event) {
    this.api
      .getBreweries((<HTMLInputElement>event.target).value)
      .subscribe((data) => {
        this.breweries = data;
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
