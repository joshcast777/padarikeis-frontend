import { Component, Input } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
	selector: "app-header-page",
	templateUrl: "./header-page.component.html",
	styleUrls: ["./header-page.component.css"]
})
export class HeaderPageComponent {
	@Input() label: string = "Título";
}
