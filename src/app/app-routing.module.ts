import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NosotrosComponent } from "./pages/nosotros/nosotros.component";
import { CapacitacionComponent } from "./pages/capacitacion/capacitacion.component";
import { CarritoListaComponent } from "./pages/carrito-lista/carrito-lista.component";
import { CatalogoComponent } from "./pages/catalogo/catalogo.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { UsuarioGuard } from "./usuario.guard";
import { UsuarioComponent } from "./pages/usuario/usuario.component";
import { ServiciosComponent } from "./pages/servicios/servicios.component";

const routes: Routes = [
	{
		path: "",
		component: InicioComponent
	},
	{
		path: "nosotros",
		component: NosotrosComponent
	},
	{
		path: "servicios",
		component: ServiciosComponent
	},
	{
		path: "catalogo",
		component: CatalogoComponent
	},
	{
		path: "carrito",
		component: CarritoListaComponent
	},
	{
		path: "capacitacion",
		component: CapacitacionComponent
	},
	{
		path: "usuario",
		component: UsuarioComponent,
		canActivate: [UsuarioGuard],
		canLoad: [UsuarioGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
