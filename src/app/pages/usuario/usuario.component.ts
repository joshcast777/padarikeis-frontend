import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HeaderNavComponent } from "../../components/header-nav/header-nav.component";
import { ICapacitacion, ICompraCarrito, IServicio, IUsuario } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { CapacitacionService } from "src/app/services/capacitacion.service";
import { CompraService } from "src/app/services/compra.service";
import { ServiciosService } from "src/app/services/servicios.service";
import { MessageService } from "primeng/api";

@Component({
	selector: "app-usuario",
	templateUrl: "./usuario.component.html",
	styleUrls: ["./usuario.component.css"],
	providers: [MessageService]
})
export class UsuarioComponent {
	usuario: IUsuario | undefined = this.authService.obtenerUsuarioAutenticado();

	editarUsuario: FormGroup = this.fb.group({
		nombre: [this.usuario?.nombre, [Validators.required]],
		apellido: [this.usuario?.apellido, [Validators.required]],
		ciudad: [this.usuario?.ciudad, [Validators.required]],
		mayorInteres: [this.usuario?.mayorInteres, [Validators.required]],
		email: [this.usuario?.email, [Validators.required]],
		password: [this.usuario?.password, [Validators.required]]
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

	capacitaciones!: ICapacitacion[];

	compras: ICompraCarrito[];

	servicios: IServicio[] = [];

	ciudad = ["Guayaquil", "Manabi", "Santa Elena", "Esmeralda", "Los Rios", "Latacunga"];

	constructor(private headerNav: HeaderNavComponent, private serviciosServicio: ServiciosService, private comprasServicio: CompraService, private authService: AuthService, private fb: FormBuilder, private capacitacion: CapacitacionService) {
		this.obtenerCapacitacion();

		this.editarUsuario.disable();

		this.compras = comprasServicio.obtenerCompras(authService.obtenerUsuarioAutenticado()?.id);

		// this.servicios = serviciosServicio.obtenerServiciosAntes(authService.obtenerUsuarioAutenticado()?.id);
	}

	editar() {
		this.editarUsuario.enable();
	}

	cancelar() {
		this.editarUsuario.disable();

		this.editarUsuario.setValue({
			nombre: this.usuario?.nombre,
			apellido: this.usuario?.apellido,
			ciudad: this.usuario?.ciudad,
			mayorInteres: this.usuario?.mayorInteres,
			email: this.usuario?.email,
			password: this.usuario?.password
		});
	}

	obtenerCapacitacion() {
		// this.capacitaciones = this.capacitacion.obtenerCapacitaciones(this.usuario?.id);
	}

	eliminarUsuario() {
		this.authService.eliminarUsuario(this.usuario?.id);

		this.headerNav.ngOnInit();
	}
}
