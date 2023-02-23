import { Injectable } from "@angular/core";
import { IProducto } from "../interfaces/interfaces";
import { v4 as uuid } from "uuid";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class TiendaService {
	private carrito: IProducto[] = [];

	public longitudCarrito: number = 0;

	private env = environment.urlApi;

	constructor(private http: HttpClient) {}

	obtenerProductos(): Observable<IProducto[]> {
		return this.http.get<IProducto[]>(`${this.env}/api/Producto`);
	}

	// obtenerProductosAutos(): IProducto[] {
	// 	return [...this.productosAutos];
	// }

	// obtenerProductosMotos(): IProducto[] {
	// 	return [...this.productosMotos];
	// }

	// obtenerAccesorios(): IProducto[] {
	// 	return [...this.accesorios];
	// }

	// agregarElemento(product: IProducto): void {
	// 	product.id = uuid();

	// 	this.carrito.push(product);
	// 	this.longitudCarrito = this.carrito.length;
	// }

	// obtenerCarrito(): IProducto[] {
	// 	return [...this.carrito];
	// }

	// eliminarElemento(id: string): void {
	// 	this.carrito = this.carrito.filter((producto: IProducto) => producto.id !== id);
	// 	this.longitudCarrito = this.carrito.length;
	// }

	// vaciarCarrito() {
	// 	this.carrito = [];
	// }
}
