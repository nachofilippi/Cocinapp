import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// servicios
import { ListaRecetasServicios } from './servicios/lista-recetas';

// pipes
import { PlaceHolderPipe } from './pipes/placeholder.pipe';

// paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IngredientesPage } from '../pages/ingredientes/ingredientes.component';

// otras importaciones
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgregarComponent} from '../pages/agregar/agregar.component';
import { DetalleComponent } from '../pages/detalle/detalle.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IngredientesPage,
    AgregarComponent,
    PlaceHolderPipe,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IngredientesPage,
    AgregarComponent,
    DetalleComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ListaRecetasServicios,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
