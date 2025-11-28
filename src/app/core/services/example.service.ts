import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para manejar las peticiones HTTP relacionadas con usuarios
 * Utiliza la API de JSONPlaceholder como backend de prueba
 */
@Injectable({
  providedIn: 'root' // El servicio está disponible en toda la aplicación
})
export class ExampleService {
  // URL base de la API externa
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  /**
   * Constructor del servicio
   * @param http - Cliente HTTP de Angular para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los usuarios de la API
   * @returns Observable con el array de usuarios
   * 
   * Nota: Este método realiza una petición GET a la API
   * El Observable debe ser suscrito en el componente para recibir los datos
   */
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  /**
   * Obtiene un usuario específico por su ID
   * @param id - Identificador único del usuario
   * @returns Observable con los datos del usuario solicitado
   * 
   * Nota: La URL se construye dinámicamente agregando el ID al final
   * Ejemplo: https://jsonplaceholder.typicode.com/users/1
   */
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo usuario en la API
   * @param user - Objeto con los datos del nuevo usuario
   * @returns Observable con la respuesta del servidor (usuario creado)
   * 
   * Nota: JSONPlaceholder simula la creación pero no persiste los datos
   * En una API real, esto guardaría el usuario en la base de datos
   */
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  /**
   * Actualiza un usuario existente
   * @param id - Identificador del usuario a actualizar
   * @param user - Objeto con los datos actualizados del usuario
   * @returns Observable con la respuesta del servidor (usuario actualizado)
   * 
   * Nota: PUT reemplaza completamente el recurso
   * Para actualización parcial se usaría PATCH en su lugar
   */
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Elimina un usuario de la API
   * @param id - Identificador del usuario a eliminar
   * @returns Observable con la respuesta del servidor
   * 
   * Nota: JSONPlaceholder simula la eliminación pero no borra realmente el dato
   * Retorna un objeto vacío {} si la operación fue exitosa
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
