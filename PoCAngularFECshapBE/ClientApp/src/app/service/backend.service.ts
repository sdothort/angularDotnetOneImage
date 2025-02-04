// backend.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'  // This makes the service available application-wide
})
export class BackendService {
    // Replace with your actual backend URL
    private apiPath =  '/api/weather';

    constructor(private http: HttpClient) { }

    // Method to GET data from the backend
    getData(): Observable<any> {
        const currentUrl = window.location.origin; // Get the base URL
        const apiURl = `${currentUrl}${this.apiPath}`; // Adjust the endpoint as needed
        return this.http.get<any>(apiURl);
    }
}
