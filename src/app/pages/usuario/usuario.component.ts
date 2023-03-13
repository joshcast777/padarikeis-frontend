import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HeaderNavComponent } from "../../components/header-nav/header-nav.component";
import { ICapacitacion, ICapacitacionRegistrada, IServicio, IServicioRegistrado, IUsuario } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { CapacitacionService } from "src/app/services/capacitacion.service";
import { ServiciosService } from "src/app/services/servicios.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Component({
	selector: "app-usuario",
	templateUrl: "./usuario.component.html",
	styleUrls: ["./usuario.component.css"],
	providers: [MessageService]
})
export class UsuarioComponent {
	usuarioAutenticado: IUsuario | null = null;

	editarUsuario: FormGroup = this.fb.group({
		cedula: [this.usuarioAutenticado?.cedula, [Validators.required]],
		nombre: [, [Validators.required]],
		apellido: [, [Validators.required]],
		ciudad: [, [Validators.required]],
		celular: [, [Validators.required]],
		email: [, [Validators.required]],
		contrasena: [, [Validators.required]]
	});

	capacitacionColumnas = [
		{ field: "ocupacion", header: "Ocupacion" },
		{ field: "capacitacion", header: "Capacitacion" },
		{ field: "lugar", header: "Lugar" },
		{ field: "hora", header: "Hora" },
		{ field: "comentario", header: "Comentario" }
	];

	serviciosColumnas = [
		{ field: "placaVehiculo", header: "Placa del vehículo" },
		{ field: "marcaVehiculo", header: "Marca del vehículo" },
		{ field: "anioVehiculo", header: "Año del vehículo" },
		{ field: "servicio", header: "Servicio" }
	];

	capacitaciones!: ICapacitacionRegistrada[];

	servicios: IServicioRegistrado[] = [];

	constructor(private serviciosServicio: ServiciosService, private authService: AuthService, private fb: FormBuilder, private capacitacionServicio: CapacitacionService, private router: Router, private messageService: MessageService) {}

	ngOnInit() {
		this.obtenerUsuarioAutenticado();

		setTimeout(() => {
			this.establecerDatosUsuario();

			this.obtenerCapacitaciones();

			this.obtenerServicios();
		}, 2000);
	}

	private obtenerUsuarioAutenticado(): void {
		this.editarUsuario.disable();

		const res = this.authService.obtenerUsuarioAutenticado();

		res &&
			res.subscribe((data: IUsuario | null): void => {
				this.usuarioAutenticado = data;
			});
	}

	establecerDatosUsuario() {
		setTimeout(() => {
			this.editarUsuario.setValue({
				cedula: this.usuarioAutenticado?.cedula,
				nombre: this.usuarioAutenticado?.nombre,
				apellido: this.usuarioAutenticado?.apellido,
				ciudad: this.usuarioAutenticado?.ciudad,
				celular: this.usuarioAutenticado?.celular,
				email: this.usuarioAutenticado?.email,
				contrasena: this.usuarioAutenticado?.contrasena
			});
		}, 2000);
	}

	editar() {
		this.editarUsuario.enable();
	}

	cancelar() {
		this.editarUsuario.disable();

		this.editarUsuario.setValue({
			cedula: this.usuarioAutenticado?.cedula,
			nombre: this.usuarioAutenticado?.nombre,
			apellido: this.usuarioAutenticado?.apellido,
			ciudad: this.usuarioAutenticado?.ciudad,
			celular: this.usuarioAutenticado?.celular,
			email: this.usuarioAutenticado?.email,
			contrasena: this.usuarioAutenticado?.contrasena
		});
	}

	obtenerCapacitaciones() {
		this.capacitacionServicio.obtenerCapacitacionesUsuario(this.usuarioAutenticado?.usuarioId!).subscribe((data: ICapacitacionRegistrada[]) => {
			this.capacitaciones = data;
		});
	}

	obtenerServicios() {
		this.serviciosServicio.obtenerServiciosUsuario(this.usuarioAutenticado?.usuarioId!).subscribe((data: IServicioRegistrado[]) => {
			this.servicios = data;
		});
	}

	eliminarUsuario() {
		this.authService.eliminarUsuario(this.usuarioAutenticado?.usuarioId!).subscribe({
			next: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("email");

				this.router.navigate(["/"]);
			},
			error: () => {
				this.messageService.add({ severity: "error", summary: "Error", detail: "Error al eliminar el ususario" });
			}
		});
	}
}
