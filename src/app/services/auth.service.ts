import { Injectable } from "@angular/core";
import { IUsuario } from "../interfaces/interfaces";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private urlApi: string = environment.urlApi;

	constructor(private http: HttpClient) {}

	guardarUsuario(usuario: IUsuario): Observable<string> {
		return this.http.post<string>(`${this.urlApi}/api/UsuarioAutenticado/Register`, usuario);
	}

	iniciarSesion(datosAutenticacion: { email: string; contrasena: string }): Observable<string> {
		return this.http.post<string>(`${this.urlApi}/api/UsuarioAutenticado/Login`, datosAutenticacion);
	}

	obtenerUsuarioAutenticado(): Observable<IUsuario> | null {
		const email: string | null = localStorage.getItem("email");

		return email ? this.http.get<IUsuario>(`${this.urlApi}/api/USuario/${localStorage.getItem("email")}`) : null;
	}

	eliminarUsuario(usuarioId: number): Observable<void> {
		return this.http.delete<void>(`${this.urlApi}/api/Usuario/${usuarioId}`);
	}
}
