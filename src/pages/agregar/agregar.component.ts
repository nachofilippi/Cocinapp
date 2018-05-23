import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { ListaRecetasServicios } from '../../app/servicios/lista-recetas';
import {RestProvider} from '../../providers/rest/rest';

@Component({
  selector: 'app-agregar',
  templateUrl: 'agregar.component.html'
})
export class AgregarComponent implements OnInit {

  receta: any;
  categorias:any;
  ingredientes: any;
  ingredientesElegidos: any;
  item: any;
  cantidadItem: number;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public _listaRecetas: ListaRecetasServicios,
    public rest: RestProvider
  ) { }

  ngOnInit() { 
      this.receta={};
      this.receta.ingredientes=[];
      this.receta.pasos=[];
      this.receta.imagenes=["data:image/jpeg;base64,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vsw6Mv7aMVp9N/pBjg4ND5eselX3z+/KNyxSu/390jUlNqCnntCX9RSNTXvGrRDhUv7MYKln5HeEPHk7yNZkt7U8/r/iG0/AA0UIkgm9/jyjJa4JJHcgbnPBMpYIVLBB5j5xW3F3YLJWDoGlRoGe3oWq0XtMli0NThobcOfaKUjkLPexCcj3U66Ub5itfs3gDzfhGYgspJFNwdtwfkxb6R3icMHdoH864JlrNUj/ACIerjtObjgzFZcQRQ38h5AD94icXgQQfpd/FWpjsziLsKkrBIDHl1/bp5xVHEXYJNS5SxOwNGHk30hxtJZFxlyc5z8l8nAtYvtTk/WvKGOJysdXLgtXlfoOlbxaWb8BzZZIWOVQK086fGIPEZUXpT5lrm9LMT6Qj1cvg62mitcblekgeE290vQ7b3Y33hjicMQ1G6HcbWrflR4sJeVIezkjytRiB5360hhjsk1AUKX/ACpPw6hNK7w87MLAKK7oBxhiWIbkzM/PV61FN4bT8EyefXlXl+hgxXh2qyhtSvqbmGuLy0lwPP8A9rX5PSJEJ4QiS5A2ThGBrVz8eVtnc/CPUYhmYXtWn6daNtE5MwHOh94s5YVal3LVA2iMnZcwoGN6hnNXDH4uIk79ww1yblZwtJ8KikBrMRawBqxNecTuA7SFAsokmppZqXO9dmgbmizAEghudBTrvDVAZzQMKep3AasMWU12/mRLq1M6uUXJlfaKlQqClyCbchz+npBPheIJajRdT9+W3OOfJCCAGNAa1u/z6esOsPna0kaTUc3YCtAevLaKWzotVnYnR6nL/MdFJxD0PwBpelqt9Y2DFDlbn57fsd4onCdocxOrV5ODVxsbUGxeCnKu0/UA4IO5emxG1TzTWsU76POLw0WEdfB+T9B0KFCjemQFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQoAFChQo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%E2%80%A6%E2%80%A6"];
      this.ingredientesElegidos=[];
      this.rest.getCategoriasRecetas().subscribe(data => {this.categorias = data}, Error => {console.log(Error)});
      this.rest.getIngredientes().subscribe(data => {this.ingredientes = data}, Error => {console.log(Error)});
    }

  agregar() {
      let item: any;
      item={};
      item=this.ingredientes[this.item];
      item.cantidad = this.cantidadItem;
      this.ingredientesElegidos.push(item);
      this.ingredientes.splice (this.item,1);
  }

  agregarPaso(nombre:string, descripcion:string) {
      this.receta.pasos.push({"nombre": nombre, "descripcion": descripcion});
  }

  borrarPaso(i: number) {
      this.receta.pasos.splice(i, 1);
  }
  
  borrarItem(i: number) {
      this.ingredientes.push(this.ingredientesElegidos[i]);
      this.ingredientesElegidos.splice(i, 1);
  }

  postReceta() {
      this.receta;
      this.ingredientesElegidos.forEach((value)=> {
          this.receta.ingredientes.push ({"ingrediente":value.id,"cantidad":value.cantidad});
      });
      this.rest.postReceta(this.receta).subscribe(data => {console.log (data)}, Error => {console.log(Error)});
      this.navCtrl.pop();
  }
}
