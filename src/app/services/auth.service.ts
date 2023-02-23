import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { IAuthData, IUsuario } from "../interfaces/interfaces";
import { v4 as uuid } from "uuid";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private usuarios: IUsuario[] = [
		// {
		// 	id: "444d6965-79ec-4bc8-a415-5215fade123e",
		// 	nombre: "Dayanna",
		// 	apellido: "Espinoza",
		// 	ciudad: "Guayaquil",
		// 	mayorInteres: "Carro",
		// 	email: "dayanna.espinoza@mail.com",
		// 	password: "dayanna.espinoza"
		// },
		// {
		// 	id: "87ca6fca-1cb9-4819-98c2-1e67ddb2ec62",
		// 	nombre: "Keila",
		// 	apellido: "Morante",
		// 	ciudad: "Nobol",
		// 	mayorInteres: "Moto",
		// 	email: "keila.morante@mail.com",
		// 	password: "keila.morante"
		// }
	];

	private usuarioAutenticado: IUsuario | undefined = undefined;

	private estaAutenticado: boolean = false;

	constructor(private router: Router) {}

	obtenerUsuarios(): IUsuario[] {
		return [...this.usuarios];
	}

	obtenerUsuario(id: number): IUsuario {
		return this.usuarios[id];
	}

	guardarUsuario(usuario: IUsuario): void {
		usuario.id = uuid();

		this.usuarios.push(usuario);

		this.establecerUsuarioAutenticado({ ...usuario });

		this.establecerEstaAutenticado(true);
	}

	obtenerUsuarioAutenticado(): IUsuario | undefined {
		return this.usuarioAutenticado ? { ...this.usuarioAutenticado } : undefined;
	}

	establecerUsuarioAutenticado(authData: IAuthData | undefined): void {
		this.usuarioAutenticado = this.usuarios.find((usuario: IUsuario) => usuario.email === authData?.email && usuario.password === authData.password);
	}

	obtenerEstaAutenticado(): boolean {
		return this.estaAutenticado;
	}

	establecerEstaAutenticado(estaAutenticado: boolean): void {
		this.estaAutenticado = estaAutenticado;
	}

	verificarDatos({ email, password }: IAuthData): string | void {
		const datosVerificados = this.usuarios.find((user: IAuthData) => user.email === email && user.password === password) ?? "Usuario no existe";

		if (datosVerificados === "Usuario no existe") return datosVerificados;
	}

	eliminarUsuario(usuarioId: string | undefined) {
		this.usuarios = this.usuarios.filter((usuario: IUsuario) => usuario.id === usuarioId);

		this.usuarioAutenticado = undefined;

		this.estaAutenticado = false;

		this.router.navigate(["/"]);
	}
}
