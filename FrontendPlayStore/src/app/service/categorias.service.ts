import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor( private httpCliente : HttpClient) { }
  obtenerCategorias():Observable<any>{
    return this.httpCliente.get('http://localhost:8888/categorias',{});
  }
  obtenerCategoria(idCategoria:any):Observable<any>{
    return this.httpCliente.get(`http://localhost:8888/categorias/${idCategoria}`,{});
  }
  obtenerOneApp(idCategoria:any,idApp:any):Observable<any>{
    return this.httpCliente.get(`http://localhost:8888/categorias/${idCategoria}/applicaciones/${idApp}`,{});
  }
  EliminarOneApp(idCategoria:any,idApp:any):Observable<any>{
    return this.httpCliente.delete(`http://localhost:8888/categorias/${idCategoria}/applicaciones/${idApp}`,{});
  }
  GuardarComentadario(idCategoria:any,idApp:any,informacion:any):Observable<any>{
    return this.httpCliente.post(`http://localhost:8888/categorias/${idCategoria}/applicaciones/${idApp}/comentario`,{
      calificación: informacion.calificación,
      comentario: informacion.comentario,
      fecha : informacion.fecha,
      usuario : informacion.usuario
    });
  }
  GuardarApp(idCategoria:any,informacion:any):Observable<any>{
    return this.httpCliente.post(`http://localhost:8888/categorias/${idCategoria}/applicaciones/`,{
      nombre: informacion.nombre,
      descripcion: informacion.descripcion,
      icono: informacion.icono,
      instalada: informacion.instalada,
      app: informacion.app,
      calificacion: informacion.calificacion,
      descargas: informacion.descargas,
      precio: informacion.precio,
      desarrollador: informacion.desarrollador,
    });
  }
}
