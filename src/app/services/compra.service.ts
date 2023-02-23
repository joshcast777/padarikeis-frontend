import { Injectable } from "@angular/core";
import { ICompraCarrito } from "../interfaces/interfaces";
import { AuthService } from "./auth.service";
import { v4 as uuid } from "uuid";

@Injectable({
	providedIn: "root"
})
export class CompraService {
	private compras: ICompraCarrito[] = [
		// {
		// 	cantidadProductos: 2,
		// 	codigoSeguridad: "123",
		// 	fecha: new Date(),
		// 	fechaVencimiento: "12/3456",
		// 	id: "5c9ba237-5720-4e7c-851b-2b2da01298be",
		// 	nombreTarjeta: "Emily Valencia",
		// 	numeroTarjeta: "1234-5678-9098-7654",
		// 	productos: [
		// 		{
		// 			cantidad: 1,
		// 			id: "db19caa2-3aca-4bfb-8005-24da1f98ba67",
		// 			imagen: "/assets/img/Sor1.webp",
		// 			name: "Cilindro Hidráulico",
		// 			precio: 89.95
		// 		},
		// 		{
		// 			cantidad: 2,
		// 			id: "c3265ab9-43df-442d-a38f-5fada6a1f163",
		// 			imagen: "/assets/img/accesorios/cascoMoto.jpg",
		// 			name: "Casco para motociclistas",
		// 			precio: 45
		// 		}
		// 	],
		// 	total: 269.9,
		// 	usuarioId: "444d6965-79ec-4bc8-a415-5215fade123e"
		// }
	];

	constructor(private authServicio: AuthService) {}

	obtenerCompras(usuarioId: string | undefined): ICompraCarrito[] {
		return this.compras.filter((elemento: ICompraCarrito) => elemento.usuarioId === usuarioId);
	}

	generarCompra(compra: ICompraCarrito): void {
		compra.usuarioId = this.authServicio.obtenerUsuarioAutenticado()?.id;
		compra.id = uuid();
		compra.fecha = new Date();

		this.compras.push(compra);
	}
}
