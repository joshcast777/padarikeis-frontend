import { Injectable } from "@angular/core";
import { ICompraDatos, IDetalleCompra, IProducto, IProductoCarrito } from "../interfaces/interfaces";
import { v4 as uuid } from "uuid";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class TiendaService {
	private carrito: IProductoCarrito[] = [];

	private env = environment.urlApi;

	constructor(private http: HttpClient) {}

	obtenerProductos(): Observable<IProducto[]> {
		return this.http.get<IProducto[]>(`${this.env}/api/Producto`);
	}

	agregarElemento(producto: IProducto): void {
		this.carrito.push({ producto, cantidad: 1 });
	}

	obtenerCarrito(): IProductoCarrito[] {
		return this.carrito;
	}

	eliminarElemento(productoId: number): IProductoCarrito[] {
		this.carrito = this.carrito.filter((productoCarrito: IProductoCarrito) => productoCarrito.producto.productoId !== productoId);

		console.log(this.carrito);

		return this.carrito;
	}

	registrarCompra(compraDatos: ICompraDatos): Observable<ICompraDatos> {
		return this.http.post<ICompraDatos>(`${this.env}/api/Compra`, compraDatos);
	}

	registrarDetalleCompra(detalleCompra: IDetalleCompra[]): Observable<IDetalleCompra> {
		return this.http.post<IDetalleCompra>(`${this.env}/api/DetalleCompra`, detalleCompra);
	}
}
