import { Component } from '@angular/core';
import { ExampleService } from '../../../core/services/example.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  usuarios: any[] = [];

  constructor(private api: ExampleService) { }

  ngOnInit() {
    console.log('Componente cargado');
    this.cargarUsuarios();
    this.cargarUsuario(1);
  }

  cargarUsuarios() {
    this.api.getUsers().subscribe((data: any) => {
      this.usuarios = data;
      console.log(this.usuarios);
    });
  }

  cargarUsuario(id: number) {
    // Lógica para cargar un usuario por ID
  }
}
