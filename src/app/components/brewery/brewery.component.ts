import { Component, inject, Input } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-brewery',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './brewery.component.html',
  styleUrl: './brewery.component.scss',
})
export class BreweryComponent {
  dialogRef = inject(DialogRef);
  data = inject(DIALOG_DATA);
}
