import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DropdownItem } from "primeng/dropdown";
import { IServicio, IServicioRegistrado, IUsuario } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { ServiciosService } from "src/app/services/servicios.service";
import { v4 as uuid } from "uuid";

@Component({
	selector: "app-servicios",
	templateUrl: "./servicios.component.html",
	styleUrls: ["./servicios.component.css"],
	providers: [MessageService]
})
export class ServiciosComponent {
	anioFabricacion: number = new Date().getFullYear();

	visible: boolean = false;

	servicios: IServicio[] = [];

	ciudades = ["Guayaquil", "Manabi", "Santa Elena", "Esmeralda", "Los Rios", "Latacunga"];

	estaAutenticado: boolean = false;

	nombreServicios: string[] = [];

	marcasVehiculos = ["Nissan", "Toyota", "Chery", "Chevrolet", "Mazda", "Hyundai", "Dongfeng"];

	myForm: FormGroup = this.formBuilder.group({
		placaVehiculo: [, [Validators.required]],
		marcaVehiculo: [, [Validators.required]],
		anioVehiculo: [, [Validators.required, Validators.max(this.anioFabricacion), Validators.min(this.anioFabricacion - 15)]],
		servicioId: [, [Validators.required]]
	});

	constructor(private serviciosServicio: ServiciosService, private authService: AuthService, private messageService: MessageService, private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.validarAutenticado();

		this.serviciosServicio.obtenerServicios().subscribe((servicios: IServicio[]): void => {
			this.servicios = servicios;

			this.nombreServicios = servicios.map((servicio: IServicio): string => servicio.nombre);
		});
	}

	validarAutenticado() {
		const res = this.authService.obtenerUsuarioAutenticado();

		this.estaAutenticado = res ? true : false;
	}

	showDialogOrToast() {
		this.estaAutenticado ? (this.visible = true) : this.messageService.add({ severity: "warn", summary: "Aviso", detail: "Debe iniciar sesión" });
	}

	onSubmit() {
		const datoServicio: IServicioRegistrado = { ...this.myForm.value };

		this.authService.obtenerUsuarioAutenticado()?.subscribe((data: IUsuario): number => (datoServicio.usuarioId = data.usuarioId));

		console.log(datoServicio);

		this.serviciosServicio.agregarServicio(datoServicio).subscribe({
			next: (): void => {
				this.visible = false;

				this.messageService.add({ severity: "success", summary: "Éxito", detail: "Servicio registrado" });
			},
			error: (): void => {
				this.messageService.add({ severity: "error", summary: "Error", detail: "Error al registrar el servicio" });
			}
		});
	}

	onReset() {
		this.visible = false;

		this.myForm.setValue({
			placaVehiculo: null,
			marcaVehiculo: null,
			anioVehiculo: null,
			servicioId: null
		});
	}
}
