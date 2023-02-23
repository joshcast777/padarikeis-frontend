import { Injectable } from "@angular/core";
import { IServicio } from "../interfaces/interfaces";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class ServiciosService {
	private env = environment.urlApi;

	constructor(private authService: AuthService, private http: HttpClient) {}

	obtenerServicios(): Observable<IServicio[]> {
		return this.http.get<IServicio[]>(`${this.env}/api/Servicio`);
	}

	// agregarServicio(servicio: IServicio): void {
	// 	servicio.servicioId = 1;
	// 	servicio.usuarioId = this.authService.obtenerUsuarioAutenticado()?.id;

	// 	this.serviciosRegistrados.push(servicio);
	// }

	// eliminarServicio(id: string) {
	// 	this.serviciosRegistrados = this.serviciosRegistrados.filter((servicio: IServicio) => servicio.servicioId !== id);
	// }
}
