import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { switchMap } from "rxjs";
import { ICompraDatos, IDetalleCompra, IProducto, IProductoCarrito, IUsuario } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { TiendaService } from "src/app/services/tienda.service";

@Component({
	selector: "app-carrito-lista",
	templateUrl: "./carrito-lista.component.html",
	styleUrls: ["./carrito-lista.component.css"],
	providers: [MessageService]
})
export class CarritoListaComponent {
	public carrito: IProductoCarrito[] = [];

	public total: number = 0;

	public visible: boolean = false;

	myForm: FormGroup = this.formBuilder.group({
		nombreTarjeta: [, [Validators.required]],
		numeroTarjeta: [, [Validators.required, Validators.pattern(/(\d{4}\-\d{4}-\d{4}-\d{4})/)]],
		codigoSeguridad: [, [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
		fechaVencimiento: [, [Validators.required, Validators.pattern(/(\d{1}\/\d{4})/)]]
	});

	constructor(private tiendaServicio: TiendaService, private authServicio: AuthService, private messageService: MessageService, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.carrito = this.tiendaServicio.obtenerCarrito();

		this.calcularTotal();
	}

	restarCantidad(productoCarrito: IProductoCarrito) {
		if (this.carrito[this.obtenerIndice(productoCarrito)].cantidad === 1) {
			this.messageService.add({ severity: "warn", summary: "Advertencia", detail: "Mínimo 1 elemento" });

			return;
		}

		this.carrito[this.obtenerIndice(productoCarrito)].cantidad -= 1;

		this.calcularTotal();
	}

	aumentarCantidad(productoCarrito: IProductoCarrito) {
		if (this.carrito[this.obtenerIndice(productoCarrito)].cantidad === 10) {
			this.messageService.add({ severity: "warn", summary: "Advertencia", detail: "Máximo 10 elemento" });

			return;
		}

		this.carrito[this.obtenerIndice(productoCarrito)].cantidad += 1;

		this.calcularTotal();
	}

	private obtenerIndice(productoCarrito: IProductoCarrito): number {
		return this.carrito.indexOf(productoCarrito);
	}

	private calcularTotal(): void {
		this.total = this.carrito.reduce((acumulador, actual) => (acumulador + actual.producto.precio) * actual.cantidad, 0);
	}

	quitarElemento(productoCarrito: IProductoCarrito) {
		this.tiendaServicio.eliminarElemento(productoCarrito.producto.productoId);

		this.carrito = this.tiendaServicio.obtenerCarrito();

		this.calcularTotal();
	}

	mostrarFormularioCompra() {
		this.visible = true;
	}

	comprar() {
		const compraDatos = { ...this.myForm.value };

		this.authServicio.obtenerUsuarioAutenticado()?.subscribe((data: IUsuario) => (compraDatos.usuarioId = data.usuarioId));

		console.log(compraDatos);

		this.tiendaServicio.registrarCompra(compraDatos).subscribe({
			next: (data: ICompraDatos) => {
				const detalleCompra: IDetalleCompra[] = this.carrito.map((producto: IProductoCarrito) => {
					return {
						cantidad: producto.cantidad,
						productoId: producto.producto.productoId,
						compraId: data.compraId!
					}
				})

				this.tiendaServicio.registrarDetalleCompra(detalleCompra).subscribe({
					next: () => {
						this.visible = false;

						this.messageService.add({ severity: "success", summary: "Éxito", detail: "Compra registrada exitosamente" });
					},
					error: () => {
						this.messageService.add({ severity: "error", summary: "Error", detail: "Error al registrar la compra" });
					}
				});
			},
			error: () => {
				this.messageService.add({ severity: "error", summary: "Error", detail: "Error al registrar la compra" });
			}
		});

		// this.tiendaServicio.registrarCompra(compraDatos).subscribe({
		// 	next: (data: string): void => {
		// 		localStorage.setItem("token", data);
		// 		localStorage.setItem("email", this.myFormLogin.value.email);

		// 		this.hideLoginDialog();
		// 		this.ngOnInit();
		// 	},
		// 	error: () => {
		// 		this.myFormLogin.reset();

		// 		this.messageService.add({ severity: "error", summary: "Error", detail: "Combinación errónea" });
		// 	}
		// });

		// const compraData: ICompraCarrito = { ...this.myForm.value };
		// compraData.total = this.total;
		// compraData.productos = [...this.carrito];
		// compraData.cantidadProductos = this.carrito.length;
		// this.compraServicio.generarCompra({ ...compraData });
		// this.visible = false;
		// this.carritoServicio.vaciarCarrito();
		// this.carrito = this.carritoServicio.obtenerCarrito();
		// this.total = 0;
		// this.messageService.add({ severity: "success", summary: "Éxito", detail: "Compra realizada" });
	}
}
