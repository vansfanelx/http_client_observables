import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../../../core/services/example.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente para mostrar y gestionar usuarios
 * Implementa OnInit para ejecutar lógica al inicializar el componente
 */
@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule], // FormsModule para usar ngModel en formularios
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  // Array que almacena la lista de todos los usuarios
  usuarios: any[] = [];
  
  // Variable para almacenar un usuario individual
  usuarioSeleccionado: any = null;
  
  // Variable para controlar estados de carga
  cargando: boolean = false;
  
  // Variable para almacenar mensajes de error
  error: string = '';

  // Variables para el modal de formulario
  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  
  // Modelo del formulario
  formularioUsuario: any = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  };

  /**
   * Constructor del componente
   * @param api - Servicio inyectado para realizar operaciones HTTP
   * 
   * Nota: La inyección de dependencias se realiza automáticamente por Angular
   */
  constructor(private api: ExampleService) { }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente
   * Es el lugar ideal para cargar datos iniciales
   */
  ngOnInit(): void {
    console.log('Componente Users cargado correctamente');
    this.cargarUsuarios();
  }

  /**
   * Carga la lista completa de usuarios desde la API
   * 
   * Nota: subscribe() ejecuta la petición HTTP y maneja la respuesta
   * - next: Se ejecuta cuando la petición es exitosa
   * - error: Se ejecuta si hay algún error en la petición
   */
  cargarUsuarios(): void {
    this.cargando = true;
    this.error = '';
    
    this.api.getUsers().subscribe({
      next: (data: any) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', this.usuarios);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.error = 'No se pudieron cargar los usuarios';
        this.cargando = false;
      }
    });
  }

  /**
   * Carga los datos de un usuario específico por su ID
   * @param id - Identificador del usuario a cargar
   * 
   * Nota: Este método puede usarse para mostrar detalles de un usuario
   * o para editar sus datos
   */
  cargarUsuario(id: number): void {
    this.cargando = true;
    this.error = '';
    
    this.api.getUserById(id).subscribe({
      next: (data: any) => {
        this.usuarioSeleccionado = data;
        console.log('Usuario cargado:', this.usuarioSeleccionado);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el usuario:', err);
        this.error = `No se pudo cargar el usuario con ID ${id}`;
        this.cargando = false;
      }
    });
  }

  /**
   * Crea un nuevo usuario en la API
   * @param nuevoUsuario - Objeto con los datos del usuario a crear
   * 
   * Nota: En una aplicación real, este método se llamaría desde un formulario
   * Ejemplo de uso: this.crearUsuario({ name: 'Juan', email: 'juan@example.com' })
   */
  crearUsuario(nuevoUsuario: any): void {
    this.cargando = true;
    this.error = '';
    
    this.api.createUser(nuevoUsuario).subscribe({
      next: (data: any) => {
        console.log('Usuario creado:', data);
        // Agregar el nuevo usuario a la lista local
        this.usuarios.push(data);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        this.error = 'No se pudo crear el usuario';
        this.cargando = false;
      }
    });
  }

  /**
   * Actualiza los datos de un usuario existente
   * @param id - Identificador del usuario a actualizar
   * @param datosActualizados - Objeto con los nuevos datos del usuario
   * 
   * Nota: Después de actualizar, se puede recargar la lista o actualizar
   * el elemento específico en el array local
   */
  actualizarUsuario(id: number, datosActualizados: any): void {
    this.cargando = true;
    this.error = '';
    
    this.api.updateUser(id, datosActualizados).subscribe({
      next: (data: any) => {
        console.log('Usuario actualizado:', data);
        // Actualizar el usuario en la lista local
        const index = this.usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
          this.usuarios[index] = data;
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        this.error = 'No se pudo actualizar el usuario';
        this.cargando = false;
      }
    });
  }

  /**
   * Elimina un usuario de la API
   * @param id - Identificador del usuario a eliminar
   * 
   * Nota: Después de eliminar, se actualiza la lista local para reflejar
   * el cambio en la interfaz sin necesidad de recargar todos los datos
   */
  eliminarUsuario(id: number): void {
    this.cargando = true;
    this.error = '';
    
    this.api.deleteUser(id).subscribe({
      next: () => {
        console.log('Usuario eliminado con ID:', id);
        // Eliminar el usuario de la lista local
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        this.error = 'No se pudo eliminar el usuario';
        this.cargando = false;
      }
    });
  }

  /**
   * Método auxiliar para limpiar el usuario seleccionado
   * Útil para cerrar vistas de detalle o formularios de edición
   */
  limpiarSeleccion(): void {
    this.usuarioSeleccionado = null;
  }

  /**
   * Abre el modal de formulario para crear un nuevo usuario
   */
  abrirFormularioCrear(): void {
    this.modoEdicion = false;
    this.resetFormulario();
    this.mostrarFormulario = true;
  }

  /**
   * Abre el modal de formulario para editar un usuario existente
   * @param usuario - Usuario a editar
   */
  abrirFormularioEditar(usuario: any): void {
    this.modoEdicion = true;
    this.formularioUsuario = {
      id: usuario.id,
      name: usuario.name,
      username: usuario.username,
      email: usuario.email,
      phone: usuario.phone,
      website: usuario.website,
      address: {
        street: usuario.address?.street || '',
        suite: usuario.address?.suite || '',
        city: usuario.address?.city || '',
        zipcode: usuario.address?.zipcode || ''
      },
      company: {
        name: usuario.company?.name || '',
        catchPhrase: usuario.company?.catchPhrase || '',
        bs: usuario.company?.bs || ''
      }
    };
    this.mostrarFormulario = true;
  }

  /**
   * Cierra el modal de formulario
   */
  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.resetFormulario();
  }

  /**
   * Resetea el formulario a sus valores por defecto
   */
  resetFormulario(): void {
    this.formularioUsuario = {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: ''
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    };
  }

  /**
   * Guarda el usuario (crear o actualizar según el modo)
   */
  guardarUsuario(): void {
    if (this.modoEdicion) {
      this.actualizarUsuario(this.formularioUsuario.id, this.formularioUsuario);
    } else {
      this.crearUsuario(this.formularioUsuario);
    }
    this.cerrarFormulario();
  }
}
