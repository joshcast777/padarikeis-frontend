import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { IProducto } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { TiendaService } from "src/app/services/tienda.service";

@Component({
	selector: "app-catalogo",
	templateUrl: "./catalogo.component.html",
	styleUrls: ["./catalogo.component.css"],
	providers: [MessageService]
})
export class CatalogoComponent {
	// productosAutos: IProducto[] = this.carritoServicio.obtenerProductosAutos();

	// productosMotos: IProducto[] = this.carritoServicio.obtenerProductosMotos();

	// accesorios: IProducto[] = this.carritoServicio.obtenerAccesorios();

	productosAuto: IProducto[] = [];

	productosMoto: IProducto[] = [];

	productosAccesorio: IProducto[] = [];

	responsiveOptions = [
		{
			breakpoint: "1024px",
			numVisible: 3,
			numScroll: 3
		},
		{
			breakpoint: "768px",
			numVisible: 2,
			numScroll: 2
		},
		{
			breakpoint: "560px",
			numVisible: 1,
			numScroll: 1
		}
	];

	estaAutenticado: boolean = false;

	visible: boolean = false;

	constructor(private authService: AuthService, private tiendaServicio: TiendaService, private messageService: MessageService) {
		tiendaServicio.obtenerProductos().subscribe((productos: IProducto[]): void => {
			this.productosAuto = productos.filter((producto: IProducto): boolean => producto.categoriaProductoId === 1);

			this.productosMoto = productos.filter((producto: IProducto):boolean => producto.categoriaProductoId === 2);

			this.productosAccesorio = productos.filter((producto: IProducto): boolean => producto.categoriaProductoId === 3);
		});
	}

	ngOnInit(): void {
		this.validarAutenticado();
	}

	validarAutenticado() {
		this.estaAutenticado = this.authService.obtenerUsuarioAutenticado() ? true : false;
	}

	agregarElemento(product: IProducto) {
		// this.estaAutenticado && this.validarAutenticado();
		// this.estaAutenticado ? this.tiendaServicio.agregarElemento({ ...product }) : this.messageService.add({ severity: "warn", summary: "Aviso", detail: "Debe iniciar sesión" });
	}
}
