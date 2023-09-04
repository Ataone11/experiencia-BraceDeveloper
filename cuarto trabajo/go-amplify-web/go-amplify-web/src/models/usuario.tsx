export interface User {
    id: string
    nombre: string
    apellido: string
    correo: string|null
    instagram: string|null
    urlFoto: string|null
    telefono: string
    numeroDocumento: string
    direccion: string|null
    indicacionesAdicionales: string|null
    fechaDeNacimiento: string|null
    longitud: string|null
    latitud: string|null
    seguidores: number|null
    estado: number
    rol: number
    tipoDocumento: {}
    ciudad: string|null
    puntos_mes: number|null
    puntos_semestre: number|null
    puntos_año: number|null
    puntos_totales: number
    campañasTerminadas: []
    campañasActivas: []
}