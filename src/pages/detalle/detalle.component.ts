import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html'
})
export class DetalleComponent implements OnInit {
  receta: any;
  stars: any;
  video: boolean = false;
  ingredientes: boolean = false;
  favorito: boolean;
  share: any = { facebook: true, whatsapp: true, twitter: true, instagram: true };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     private toastCtrl: ToastController, private rest: RestProvider, public socialSharing: SocialSharing) {
    this.receta = this.navParams.get("receta");

  }

  clickStart(num) {

    for (var i = 0; i < this.stars.length; i++) {
      if (i <= num)
        this.stars[i].click = true;
      else
        this.stars[i].click = false;

    }

  }

  borrarLista() {
    let confirm = this.alertCtrl.create({
      title: 'Borrar receta',
      message: 'Esta seguro que usted desea borrar la receta?',
      buttons: [{text:'Cancelar',cssClass:'alert-button'},
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar');
            this.navCtrl.pop();
          },
          cssClass:'alert-button'
        }
      ]
    });
    confirm.present();
  }

  ngOnInit() {
    this.stars = [];
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.socialSharing.canShareVia("com.facebook.android").catch(
      () => this.socialSharing.canShareVia("com.facebook.ios").catch(() => this.share.facebook = false)
    );
    this.socialSharing.canShareVia("com.twitter.android").catch(
      () => this.socialSharing.canShareVia("com.twitter.ios").catch(() => this.share.twitter = false)
    );
    this.socialSharing.canShareVia("com.instagram.android").catch(
      () => this.socialSharing.canShareVia("com.instagram.ios").catch(() => this.share.instagram = false)
    );
    this.socialSharing.canShareVia("com.whatsapp").catch(() => this.share.whatsapp = false)
  }

  agregarFavorito() {
      let toast = this.toastCtrl.create({
          message: 'La receta fue añadida a favoritos!',
          duration: 3000,
          position: 'bottom'
      });
      toast.present();
      this.rest.postFavorito(this.receta).subscribe(data => console.log ("Backend"), offline => console.log ("Offline"));
  }

  eliminarFavorito() {
    let confirm = this.alertCtrl.create({
      title: 'Quitar favorito',
      message: '¿Estás seguro que querés eliminar la receta de la lista de favoritos?',
      buttons: ['Cancelar',
        {
          text: 'Eliminar',
          handler: () => {
            this.receta.favorito = false;
            this.rest.deleteFavorito(this.receta.id).subscribe(data => console.log ("Backend"), offline => console.log ("Offline"));
          }
        }
      ]
    });
    confirm.present();
  }

  shareFacebook() {
    this.socialSharing.shareViaFacebook("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareTwitter() {
    this.socialSharing.shareViaTwitter("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareInstagram() {
    this.socialSharing.shareViaInstagram("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareWhatsApp() {
    this.socialSharing.shareViaWhatsApp("Mirá lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }
}
