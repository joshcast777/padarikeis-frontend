import { Injectable } from "@angular/core";
import { ICapacitacion, ICapacitacionRegistrada, IServicioRegistrado } from "../interfaces/interfaces";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class CapacitacionService {
	private env = environment.urlApi;

	constructor(private authServicio: AuthService, private http: HttpClient) {}

	obtenerCapacitaciones(): Observable<ICapacitacion[]> {
		return this.http.get<ICapacitacion[]>(`${this.env}/api/Capacitacion`);
	}

	registrarCapacitacion(datoCapacitacion: ICapacitacionRegistrada): Observable<ICapacitacionRegistrada> {
		return this.http.post<ICapacitacionRegistrada>(`${this.env}/api/CapacitacionRegistrada`, datoCapacitacion);
	}

	obtenerCapacitacionesUsuario(usuarioId: number): Observable<ICapacitacionRegistrada[]> {
		return this.http.get<ICapacitacionRegistrada[]>(`${this.env}/api/CapacitacionRegistrada/${usuarioId}`);
	}

	// eliminarCapacitacion(id: string): void {
	// 	this.capacitaciones = this.capacitaciones.filter((capacitacion: ICapacitacion) => capacitacion.id !== id);
	// }
}
