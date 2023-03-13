import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({
	providedIn: "root"
})
export class UsuarioGuard implements CanActivate, CanLoad {
	autenticado: boolean = false;

	constructor(private authServicio: AuthService, private router: Router) {}

	canActivate(): boolean {
		const res = this.authServicio.obtenerUsuarioAutenticado();

		this.autenticado = res ? true : false;

		if (this.autenticado) return this.autenticado;
		else {
			this.router.navigate(["/"]);

			return false;
		}
	}

	canLoad(): boolean {
		const res = this.authServicio.obtenerUsuarioAutenticado();

		this.autenticado = res ? true : false;

		if (this.autenticado) return this.autenticado;
		else {
			this.router.navigate(["/"]);

			return false;
		}
	}
}
