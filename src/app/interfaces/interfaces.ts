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

export interface ICapacitacionRegistrada {
	capacitacionRegistradaId?: number;
	ocupacion: string;
	lugar: string;
	hora: string;
	motivo: string;
	usuarioId: number;
	capacitacionId: number;
}

// export interface ICompraCarrito {
// 	id: string;
// 	productos: IProducto[];
// 	cantidadProductos: number;
// 	usuarioId?: string;
// 	fecha: Date;
// 	total: number;
// 	nombreTarjeta: string;
// 	numeroTarjeta: string;
// 	fechaVencimiento: string;
// 	codigoSeguridad: string;
// }

export interface ICompraDatos {
	compraId?: number;
	nombreTarjeta: string;
	numeroTarjeta: string;
	condigoTarjeta: string;
	fechaVencimiento: string;
	usuarioId: number;
}

export interface IDetalleCompra {
	compraDetalleId?: number;
	cantidad: number;
	productoId: number;
	compraId: number;
}

export interface IProducto {
	productoId: number;
	imagen: string;
	nombre: string;
	precio: number;
	categoriaProductoId: number;
}

export interface IProductoCarrito {
	producto: IProducto;
	cantidad: number;
}

export interface IServicio {
	servicioId: number;
	imagen: string;
	nombre: string;
	precio: number;
	texto: string;
}

export interface IServicioRegistrado {
	servicioRegistradoId?: number;
	placaVehiculo: string;
	marcaVehiculo: string;
	anioVehiculo: number;
	servicioId: number;
	usuarioId: number;
}

export interface IUsuario {
	usuarioId: number;
	cedula: string;
	nombre: string;
	apellido: string;
	ciudad: string;
	celular: number;
	email: string;
	contrasena: string;
}
