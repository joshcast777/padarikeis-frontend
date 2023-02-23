import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { AvatarModule } from "primeng/avatar";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { MessageModule } from "primeng/message";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PanelModule } from "primeng/panel";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";

import { NosotrosComponent } from "./pages/nosotros/nosotros.component";
import { AppComponent } from "./app.component";
import { CapacitacionComponent } from "./pages/capacitacion/capacitacion.component";
import { CatalogoComponent } from "./pages/catalogo/catalogo.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderNavComponent } from "./components/header-nav/header-nav.component";
import { HeaderPageComponent } from "./components/header-page/header-page.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { ServiciosComponent } from "./pages/servicios/servicios.component";
import { CarritoListaComponent } from "./pages/carrito-lista/carrito-lista.component";
import { UsuarioComponent } from "./pages/usuario/usuario.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
	declarations: [AppComponent, NosotrosComponent, CapacitacionComponent, CarritoListaComponent, CatalogoComponent, FooterComponent, HeaderNavComponent, HeaderPageComponent, InicioComponent, ServiciosComponent, UsuarioComponent],
	imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule, AvatarModule, BadgeModule, ButtonModule, CardModule, CarouselModule, CheckboxModule, DialogModule, DividerModule, DropdownModule, FieldsetModule, InputMaskModule, InputNumberModule, InputTextareaModule, InputTextModule, MenubarModule, MessageModule, OverlayPanelModule, PanelModule, PasswordModule, TableModule, TabViewModule, ToastModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
