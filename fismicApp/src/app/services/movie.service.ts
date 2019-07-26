import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
   url: string = 'www.omdbapi.com';
   apiKey: string='';

  constructor() { }
}
