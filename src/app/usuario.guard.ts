import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable({
	providedIn: "root"
})
export class UsuarioGuard implements CanActivate, CanLoad {
	constructor(private authServicio: AuthService, private router: Router) {}

	canActivate(): boolean {
		let estaAutenticado = this.authServicio.obtenerEstaAutenticado();

		if (estaAutenticado) return estaAutenticado;
		else {
			this.router.navigate(["/"]);

			return false;
		}
	}

	canLoad(): boolean {
		let estaAutenticado = this.authServicio.obtenerEstaAutenticado();

		if (estaAutenticado) return estaAutenticado;
		else {
			this.router.navigate(["/"]);

			return false;
		}
	}
}
