import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ICompraCarrito, IProducto, IUsuario } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { TiendaService } from "src/app/services/tienda.service";
import { CompraService } from "src/app/services/compra.service";

@Component({
	selector: "app-carrito-lista",
	templateUrl: "./carrito-lista.component.html",
	styleUrls: ["./carrito-lista.component.css"],
	providers: [MessageService]
})
export class CarritoListaComponent {
	public carrito: IProducto[] = [];

	public usuarioAutenticado?: IUsuario;

	public total: number = 0;

	public visible: boolean = false;

	myForm: FormGroup = this.formBuilder.group({
		nombreTarjeta: [, [Validators.required]],
		numeroTarjeta: [, [Validators.required, Validators.pattern(/(\d{4}\-\d{4}-\d{4}-\d{4})/)]],
		codigoSeguridad: [, [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
		fechaVencimiento: [, [Validators.required, Validators.pattern(/(\d{1}\/\d{4})/)]]
	});

	constructor(private compraServicio: CompraService, private authServicio: AuthService, private carritoServicio: TiendaService, private messageService: MessageService, private formBuilder: FormBuilder) {
		this.usuarioAutenticado = authServicio.obtenerUsuarioAutenticado();

		// this.carrito = carritoServicio.obtenerCarrito();

		this.calcularTotal();
	}

	restarCantidad(carrito: IProducto) {
		// if (this.carrito[this.obtenerIndice(carrito)].cantidad === 1) {
		// 	this.messageService.add({ severity: "warn", summary: "Advertencia", detail: "Mínimo 1 elemento" });

		// 	return;
		// }

		// this.carrito[this.obtenerIndice(carrito)].cantidad -= 1;
		// this.calcularTotal();
	}

	aumentarCantidad(carrito: IProducto) {
		// if (this.carrito[this.obtenerIndice(carrito)].cantidad === 10) {
		// 	this.messageService.add({ severity: "warn", summary: "Advertencia", detail: "Máximo 10 elemento" });

		// 	return;
		// }

		// this.carrito[this.obtenerIndice(carrito)].cantidad += 1;
		// this.calcularTotal();
	}

	private obtenerIndice(carrito: IProducto): number {
		return this.carrito.indexOf(carrito);
	}

	private calcularTotal(): void {
		// this.total = this.carrito.reduce((acumulador, actual) => (acumulador + actual.precio) * actual.cantidad, 0);
	}

	quitarElemento(id: string) {
		// this.carritoServicio.eliminarElemento(id);
		// this.carrito = this.carritoServicio.obtenerCarrito();
		// this.total = this.carrito.reduce((acumulador, actual) => acumulador + actual.precio, 0);
	}

	mostrarFormularioCompra() {
		this.visible = true;
	}

	comprar() {
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
