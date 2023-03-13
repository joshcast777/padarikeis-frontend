import { Component, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { IUsuario } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { TiendaService } from "src/app/services/tienda.service";

@Component({
	selector: "app-header-nav",
	templateUrl: "./header-nav.component.html",
	styleUrls: ["./header-nav.component.css"],
	providers: [MessageService]
})
@Injectable({
	providedIn: "root"
})
export class HeaderNavComponent implements OnInit {
	items: MenuItem[] = [
		{
			label: "Inicio",
			routerLink: "/"
		},
		{
			label: "Nosotros",
			routerLink: "/nosotros"
		},
		{
			label: "Servicios",
			routerLink: "/servicios"
		},
		{
			label: "Catálogo",
			routerLink: "/catalogo"
		},
		{
			label: "Capacitación",
			routerLink: "/capacitacion"
		}
	];

	usuarioAutenticado: IUsuario | null = null;

	visibleLogin: boolean = false;

	visibleRegister: boolean = false;

	myFormLogin: FormGroup = this.formBuilder.group({
		email: [, [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)]],
		contrasena: [, [Validators.required]]
	});

	myFormRegister: FormGroup = this.formBuilder.group({
		cedula: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
		nombre: [, [Validators.required]],
		apellido: [, [Validators.required]],
		ciudad: [, [Validators.required]],
		celular: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
		email: [, [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i)]],
		contrasena: [, [Validators.required]]
	});

	constructor(private authService: AuthService, private messageService: MessageService, public tiendaServicio: TiendaService, private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.obtenerUsuarioAutenticado();
	}

	logOut() {
		this.usuarioAutenticado = null;
		// this.authService.establecerUsuarioAutenticado(undefined);
		// this.authService.establecerEstaAutenticado(false);

		this.ngOnInit();
	}

	showLoginDialog() {
		this.visibleLogin = true;
	}

	hideLoginDialog() {
		this.visibleLogin = false;
	}

	onSubmitLogin() {
		this.authService.iniciarSesion({ ...this.myFormLogin.value }).subscribe({
			next: (data: string): void => {
				localStorage.setItem("token", data);
				localStorage.setItem("email", this.myFormLogin.value.email);

				this.hideLoginDialog();
				this.ngOnInit();
			},
			error: () => {
				this.myFormLogin.reset();

				this.messageService.add({ severity: "error", summary: "Error", detail: "Combinación errónea" });
			}
		});
	}

	onResetLogin() {
		this.myFormLogin.setValue({
			email: null,
			contrasena: null
		});
	}

	switchDialog() {
		this.visibleLogin = !this.visibleLogin;
		this.visibleRegister = !this.visibleRegister;
	}

	hideRegisterDialog() {
		this.visibleRegister = false;
	}

	onSubmitRegister() {
		this.authService.guardarUsuario({ ...this.myFormRegister.value }).subscribe({
			next: (data: string): void => {
				localStorage.setItem("token", data);
				localStorage.setItem("email", this.myFormRegister.value.email);

				this.hideRegisterDialog();
				this.ngOnInit();
			},
			error: () => {
				this.myFormRegister.reset();

				this.messageService.add({ severity: "error", summary: "Error", detail: "Error al guardar los datos" });
			}
		});
	}

	onResetRegister() {
		this.myFormRegister.setValue({
			cedula: null,
			nombre: null,
			apellido: null,
			ciudad: null,
			celular: null,
			email: null,
			contrasena: null
		});
	}

	private obtenerUsuarioAutenticado(): void {
		const res = this.authService.obtenerUsuarioAutenticado();

		res &&
			res.subscribe((data: IUsuario | null): void => {
				this.usuarioAutenticado = data;
			});
	}
}
