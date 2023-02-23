import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.css"]
})
export class FooterComponent {
	items!: MenuItem[];

	ngOnInit() {
		this.items = [
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
	}
}
