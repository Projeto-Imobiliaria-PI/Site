import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './components/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {LOCALE_ID} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CadastroVendedoresComponent } from './components/cadastro-vendedores/cadastro-vendedores.component';
import { MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import { AtualizarVendedoresComponent } from './components/atualizar-vendedores/atualizar-vendedores.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroImoveisComponent } from './components/cadastro-imoveis/cadastro-imoveis.component';
import { AtualizarImoveisComponent } from './components/atualizar-imoveis/atualizar-imoveis.component';
import { VisualizarVendedoresComponent } from './components/visualizar-vendedores/visualizar-vendedores.component';
import { HomeComponent } from './components/home/home.component';
import { VisualizarImoveisComponent } from './components/visualizar-imoveis/visualizar-imoveis.component';
import { VisualizarVendedoresInativosComponent } from './components/visualizar-vendedores-inativos/visualizar-vendedores-inativos.component';
import { VisualizarImoveisInativosComponent } from './components/visualizar-imoveis-inativos/visualizar-imoveis-inativos.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CadastroVendedoresComponent,
    AtualizarVendedoresComponent,
    LoginComponent,
    CadastroImoveisComponent,
    AtualizarImoveisComponent,
    VisualizarVendedoresComponent,
    HomeComponent,
    VisualizarImoveisComponent,
    VisualizarVendedoresInativosComponent,
    VisualizarImoveisInativosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
