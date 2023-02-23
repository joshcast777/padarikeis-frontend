import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DropdownItem } from "primeng/dropdown";
import { IServicio } from "src/app/interfaces/interfaces";
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

	// servicios = ["Aire Acondicionado", "Venta de Accesorios", "Balanceo", "Electrónica", "Frenos", "Inyectores", "Limpieza", "Lubricación", "Motores", "Latonería y Pintura", "Suspensión y Dirección", "Transmisión"];

	nombreServicios: string[] = this.servicios.map((servicio: IServicio): string => servicio.nombre);

	marcasVehiculos = ["Nissan", "Toyota", "Chery", "Chevrolet", "Mazda", "Hyundai", "Dongfeng"];

	myForm: FormGroup = this.formBuilder.group({
		placaVehiculo: [, [Validators.required]],
		marcaVehiculo: [, [Validators.required]],
		anioVehiculo: [, [Validators.required, Validators.max(this.anioFabricacion), Validators.min(this.anioFabricacion - 15)]],
		servicio: [, [Validators.required]]
	});

	constructor(private serviciosServicio: ServiciosService, private authService: AuthService, private messageService: MessageService, private formBuilder: FormBuilder) {
		this.validarAutenticado();

		serviciosServicio.obtenerServicios().subscribe((servicios: IServicio[]): IServicio[] => (this.servicios = servicios));
		console.log(this.servicios);
	}

	validarAutenticado() {
		this.estaAutenticado = this.authService.obtenerUsuarioAutenticado() ? true : false;
	}

	showDialogOrToast() {
		this.validarAutenticado();

		this.estaAutenticado ? (this.visible = true) : this.messageService.add({ severity: "warn", summary: "Aviso", detail: "Debe iniciar sesión" });
	}

	onSubmit() {
		const servicioData: IServicio = { ...this.myForm.value };

		// this.serviciosServicio.agregarServicio(servicioData);

		this.visible = false;

		this.messageService.add({ severity: "success", summary: "Éxito", detail: "Servicio agendado" });
	}

	onReset() {
		this.myForm.setValue({
			placaVehiculo: null,
			marcaVehiculo: null,
			anioFabricacion: null,
			servicios: null
		});
	}
}
