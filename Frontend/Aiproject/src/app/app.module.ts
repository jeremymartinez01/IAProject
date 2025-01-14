import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent, // Registra el componente MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Necesario para Angular Material
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule, // Barra de herramientas
    MatButtonModule, // Botones
    MatIconModule, // Íconos
    MatMenuModule, // Menú desplegable
    MatInputModule, // Inputs de texto
    MatSelectModule, // Combobox o Select
    MatCheckboxModule, // Checkboxes
    MatCardModule, // Tarjetas
    MatFormFieldModule, // Contenedor de formularios
    MatSlideToggleModule, // Slide Toggle
    MatTableModule, // Tablas
    MatPaginatorModule, // Paginador para tablas
    MatSortModule, // Ordenamiento en tablas
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
