import { Component } from '@angular/core';
import {BackendService} from "../service/backend.service";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf
  ],
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  data: any; // This will hold the response from the backend

  // Inject the backend service into the component
  constructor(private backendService: BackendService) { }

  // Method that calls the backend service
  fetchData(): void {
    this.backendService.getData().subscribe({
      next: (response) => {
        this.data = response;
        console.log('Backend response:', this.data);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }
}
