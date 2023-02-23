import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

	visibleLogin: boolean = false;

	visibleRegister: boolean = false;

	usuarioAutenticado: IUsuario | undefined;

	myFormLogin: FormGroup = this.formBuilder.group({
		email: [, [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)]],
		password: [, [Validators.required]]
	});

	myFormRegister: FormGroup = this.formBuilder.group({
		cedula: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
		nombre: [, [Validators.required]],
		apellido: [, [Validators.required]],
		ciudad: [, [Validators.required]],
		celular: [, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
		// mayorInteres: [, [Validators.required]],
		email: [, [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i)]],
		password: [, [Validators.required]]
	});

	constructor(private authService: AuthService, private messageService: MessageService, public carritoServicio: TiendaService, private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.usuarioAutenticado = this.authService.obtenerUsuarioAutenticado();
	}

	logOut() {
		this.usuarioAutenticado = undefined;
		this.authService.establecerUsuarioAutenticado(undefined);
		this.authService.establecerEstaAutenticado(false);

		this.ngOnInit();
	}

	showLoginDialog() {
		this.visibleLogin = true;
	}

	hideLoginDialog() {
		this.visibleLogin = false;
	}

	onSubmitLogin() {
		const authData = { ...this.myFormLogin.value };

		const errorAuth = this.authService.verificarDatos(authData);

		if (errorAuth === "Usuario no existe") {
			this.messageService.add({ severity: "error", summary: "Error", detail: "Datos no encontrados" });
			this.onResetLogin();

			return;
		}

		this.authService.establecerUsuarioAutenticado(authData);
		this.authService.establecerEstaAutenticado(true);

		this.ngOnInit();
		this.visibleLogin = false;
	}

	onResetLogin() {
		this.myFormLogin.setValue({
			email: null,
			password: null
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
		console.log(this.myFormRegister.value);
		// const usuarioNuevo = { ...this.myFormRegister.value };

		// this.authService.guardarUsuario(usuarioNuevo);

		// this.ngOnInit();
		// this.visibleRegister = false;
	}

	onResetRegister() {
		this.myFormRegister.setValue({
			nombre: null,
			apellido: null,
			ciudad: null,
			mayorInteres: null,
			email: null,
			password: null
		});
	}
}
