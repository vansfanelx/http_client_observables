# Documentación del Proyecto - Angular HTTP Example

## 📋 Descripción
Proyecto de ejemplo en **Angular 20** que demuestra el uso de HttpClient para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con una API REST.

## 🚀 Actualización Realizada
✅ **Angular actualizado de v19 a v20**

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       └── example.service.ts       # Servicio HTTP para gestión de usuarios
│   ├── features/
│   │   └── components/
│   │       └── users/
│   │           ├── users.component.ts   # Componente de usuarios
│   │           ├── users.component.html # Template del componente
│   │           └── users.component.css  # Estilos del componente
│   ├── app.component.ts                 # Componente raíz
│   └── app.config.ts                    # Configuración de la aplicación
```

## 🔧 Servicios Implementados

### ExampleService (`example.service.ts`)

Servicio que maneja todas las peticiones HTTP relacionadas con usuarios usando JSONPlaceholder como API de prueba.

#### Métodos Disponibles:

1. **`getUsers(): Observable<any>`**
   - **Descripción**: Obtiene todos los usuarios de la API
   - **Método HTTP**: GET
   - **Endpoint**: `https://jsonplaceholder.typicode.com/users`
   - **Retorno**: Observable con array de usuarios

2. **`getUserById(id: number): Observable<any>`**
   - **Descripción**: Obtiene un usuario específico por su ID
   - **Método HTTP**: GET
   - **Endpoint**: `https://jsonplaceholder.typicode.com/users/{id}`
   - **Parámetros**: 
     - `id`: Identificador único del usuario
   - **Retorno**: Observable con datos del usuario

3. **`createUser(user: any): Observable<any>`**
   - **Descripción**: Crea un nuevo usuario
   - **Método HTTP**: POST
   - **Endpoint**: `https://jsonplaceholder.typicode.com/users`
   - **Parámetros**: 
     - `user`: Objeto con los datos del nuevo usuario
   - **Retorno**: Observable con el usuario creado
   - **Nota**: JSONPlaceholder simula la creación pero no persiste los datos

4. **`updateUser(id: number, user: any): Observable<any>`**
   - **Descripción**: Actualiza un usuario existente
   - **Método HTTP**: PUT
   - **Endpoint**: `https://jsonplaceholder.typicode.com/users/{id}`
   - **Parámetros**: 
     - `id`: Identificador del usuario a actualizar
     - `user`: Objeto con los datos actualizados
   - **Retorno**: Observable con el usuario actualizado

5. **`deleteUser(id: number): Observable<any>`**
   - **Descripción**: Elimina un usuario
   - **Método HTTP**: DELETE
   - **Endpoint**: `https://jsonplaceholder.typicode.com/users/{id}`
   - **Parámetros**: 
     - `id`: Identificador del usuario a eliminar
   - **Retorno**: Observable con la respuesta del servidor

## 📦 Componente UsersComponent

### Propiedades:

- **`usuarios: any[]`**: Array que almacena la lista de todos los usuarios
- **`usuarioSeleccionado: any`**: Objeto que almacena el usuario actualmente seleccionado
- **`cargando: boolean`**: Indica si hay una operación en curso
- **`error: string`**: Almacena mensajes de error

### Métodos:

1. **`ngOnInit()`**
   - Se ejecuta al inicializar el componente
   - Carga la lista inicial de usuarios

2. **`cargarUsuarios()`**
   - Obtiene y muestra todos los usuarios
   - Actualiza el estado de carga y maneja errores

3. **`cargarUsuario(id: number)`**
   - Carga los detalles de un usuario específico
   - Almacena el resultado en `usuarioSeleccionado`

4. **`crearUsuario(nuevoUsuario: any)`**
   - Crea un nuevo usuario en la API
   - Agrega el usuario a la lista local si es exitoso

5. **`actualizarUsuario(id: number, datosActualizados: any)`**
   - Actualiza los datos de un usuario existente
   - Actualiza el usuario en la lista local

6. **`eliminarUsuario(id: number)`**
   - Elimina un usuario de la API
   - Remueve el usuario de la lista local

7. **`limpiarSeleccion()`**
   - Limpia el usuario seleccionado
   - Cierra la vista de detalles

## 🎨 Características de la Interfaz

### Vista Principal
- Lista de usuarios con información básica (nombre, email, teléfono, ciudad, empresa)
- Botones de acción para ver detalles y eliminar
- Diseño responsivo con tarjetas

### Vista de Detalles
- Información completa del usuario seleccionado
- Datos de dirección
- Datos de empresa
- Botón para cerrar la vista

### Estados de la UI
- **Cargando**: Muestra indicador mientras se obtienen datos
- **Error**: Muestra mensaje de error si algo falla
- **Sin datos**: Muestra mensaje cuando no hay usuarios

## 🔄 Patrones y Conceptos Utilizados

### 1. **Inyección de Dependencias**
```typescript
constructor(private api: ExampleService) { }
```
Angular inyecta automáticamente el servicio en el componente.

### 2. **Observables y Subscripciones**
```typescript
this.api.getUsers().subscribe({
  next: (data) => { /* éxito */ },
  error: (err) => { /* error */ }
});
```
Los Observables son lazy (no se ejecutan hasta que alguien se subscribe).

### 3. **HttpClient**
Módulo de Angular para realizar peticiones HTTP de manera simple y poderosa.

### 4. **CommonModule**
Proporciona directivas esenciales como:
- `*ngFor`: Iterar sobre arrays
- `*ngIf`: Renderizado condicional
- Pipes para transformar datos

### 5. **Standalone Components**
Angular 20 usa componentes standalone sin necesidad de módulos.

## 📝 Notas Importantes

### Sobre JSONPlaceholder
- Es una API REST de prueba
- Las operaciones POST, PUT y DELETE se simulan pero no persisten
- Útil para desarrollo y testing sin necesidad de backend real

### Manejo de Errores
Todos los métodos implementan manejo de errores para:
- Mostrar mensajes al usuario
- Registrar errores en consola
- Evitar que la aplicación se rompa

### Optimizaciones
- Se actualiza la lista local después de operaciones CRUD para evitar peticiones innecesarias
- Estados de carga para mejor experiencia de usuario
- Código documentado con comentarios explicativos

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test
```

## 📚 Recursos Adicionales

- [Documentación Angular](https://angular.dev/)
- [HttpClient Guide](https://angular.dev/guide/http)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [RxJS Documentation](https://rxjs.dev/)

## ✅ Checklist de Implementación

- ✅ Actualización a Angular 20
- ✅ Servicio HTTP completo con CRUD
- ✅ Componente con todas las funcionalidades
- ✅ Template HTML responsive
- ✅ Estilos CSS profesionales
- ✅ Manejo de errores
- ✅ Estados de carga
- ✅ Documentación completa del código
- ✅ Comentarios explicativos en cada función

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025  
**Framework**: Angular 20
