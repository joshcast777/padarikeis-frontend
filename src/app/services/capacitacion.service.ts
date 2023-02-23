import { Injectable } from "@angular/core";
import { ICapacitacion } from "../interfaces/interfaces";
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

	// registrarCapacitacion(capacitacion: ICapacitacion): void {
	// 	capacitacion.id = uuid();
	// 	capacitacion.usuarioId = this.authServicio.obtenerUsuarioAutenticado()?.id;

	// 	this.capacitaciones.push(capacitacion);
	// }

	// obtenerCapacitaciones(usuarioId: string | undefined) {
	// 	return this.capacitaciones.filter((capacitacion: ICapacitacion) => capacitacion.usuarioId === usuarioId);
	// }

	// eliminarCapacitacion(id: string): void {
	// 	this.capacitaciones = this.capacitaciones.filter((capacitacion: ICapacitacion) => capacitacion.id !== id);
	// }
}
