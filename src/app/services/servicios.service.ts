import { Injectable } from "@angular/core";
import { IServicio, IServicioRegistrado } from "../interfaces/interfaces";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class ServiciosService {
	private env = environment.urlApi;

	constructor(private http: HttpClient) {}

	obtenerServicios(): Observable<IServicio[]> {
		return this.http.get<IServicio[]>(`${this.env}/api/Servicio`);
	}

	agregarServicio(datoServicio: IServicioRegistrado): Observable<IServicioRegistrado> {
		console.log(datoServicio);

		return this.http.post<IServicioRegistrado>(`${this.env}/api/ServicioRegistrado`, datoServicio);
	}

	obtenerServiciosUsuario(usuarioId: number): Observable<IServicioRegistrado[]> {
		return this.http.get<IServicioRegistrado[]>(`${this.env}/api/ServicioRegistrado/${usuarioId}`);
	}

	// eliminarServicio(id: string) {
	// 	this.serviciosRegistrados = this.serviciosRegistrados.filter((servicio: IServicio) => servicio.servicioId !== id);
	// }
}
