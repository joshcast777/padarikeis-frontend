export interface IAuthData {
	email: string;
	password: string;
}

export interface ICapacitacion {
	capacitacionId: number;
	nombre: string;
	imagen: string;
	texto: string;
}

export interface ICompraCarrito {
	id: string;
	productos: IProducto[];
	cantidadProductos: number;
	usuarioId?: string;
	fecha: Date;
	total: number;
	nombreTarjeta: string;
	numeroTarjeta: string;
	fechaVencimiento: string;
	codigoSeguridad: string;
}

export interface IProducto {
	productoId: number;
	imagen: string;
	nombre: string;
	precio: number;
	categoriaProductoId: number;
}

export interface IServicio {
	servicioId: number;
	imagen: string;
	nombre: string;
	precio: number;
	texto: string;
}

export interface IUsuario {
	id: string;
	nombre: string;
	apellido: string;
	ciudad: string;
	mayorInteres: string;
	email: string;
	password: string;
}
