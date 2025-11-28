import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private http: HttpClient) { }

  // getAll()
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  // getById()

  // create()

  // update()

  // delete()
}
