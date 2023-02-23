import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ICapacitacion } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { CapacitacionService } from "src/app/services/capacitacion.service";

@Component({
	selector: "app-capacitacion",
	templateUrl: "./capacitacion.component.html",
	styleUrls: ["./capacitacion.component.css"],
	providers: [MessageService]
})
export class CapacitacionComponent {
	formCapacitacion: FormGroup = this.formBuilder.group({
		ocupacion: ["", [Validators.required]],
		capacitacion: ["", [Validators.required]],
		lugar: ["", [Validators.required]],
		hora: ["", [Validators.required]],
		comentario: ["", [Validators.required]],
		aceptoTermino: ["", [Validators.required]]
	});

	selectCapacitacion: string[] = ["Lubricante", "Salud Ocupacional", "Importancia de los Lubricantes", "Seguridad Industrial"];
	selectLugar: string[] = ["La playita", "La 8", "Urdesa norte", "Guasmo"];
	selectHora: string[] = ["Lunes a viernes: 8AM-11AM", "Sabados: 9AM-12PM", "Domingos: 12PM-3PM"];

	displayModal: boolean = false;

	estaAutenticado: boolean = false;

	capacitaciones: ICapacitacion[] = [];

	constructor(private capacitacionServicio: CapacitacionService, private authService: AuthService, private messageService: MessageService, private formBuilder: FormBuilder) {
		capacitacionServicio.obtenerCapacitaciones().subscribe((capacitaciones: ICapacitacion[]): ICapacitacion[] => this.capacitaciones = capacitaciones);
	}

	ngOnInit(): void {
		this.validarAutenticado();
	}

	validarAutenticado() {
		this.estaAutenticado = this.authService.obtenerUsuarioAutenticado() ? true : false;
	}

	showModalDialog() {
		this.validarAutenticado();

		if (this.estaAutenticado) this.displayModal = true;
		else this.messageService.add({ severity: "warn", summary: "Aviso", detail: "Debe iniciar sesión" });
	}

	registrarCapacitacion(): void {
		// const capacitacionData: ICapacitacion = { ...this.formCapacitacion.value };

		// this.capacitacionServicio.registrarCapacitacion(capacitacionData);

		// this.displayModal = false;

		// this.messageService.add({ severity: "success", summary: "Éxito", detail: "Capacitación registrada" });
	}
}
