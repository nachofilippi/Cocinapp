import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';
import 'rxjs/Rx';
import {OfflineProvider} from '../rest/offline'

@Injectable()
export class RestProvider {

    baseUrl: string = "http://localhost/CocinApi/web/app_dev.php/api";

    constructor(public http: HttpClient, public offline: OfflineProvider) {
    }

    getIngredientes(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/ingrediente').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getIngredientes());
            }
            )
        );
    }

    getRecetas(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/receta').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getRecetas());
            })
        );
    }

    getEnfermedades(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/enfermedad').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getEnfermedades());
            })
        );
    }

    getCategoriasRecetas(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/receta/categoria').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getCategoriasRecetas());
            })
        );
    }

    getCategoriasIngredientes(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/ingrediente/categoria').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getCategoriasIngredientes());
            })
        );
    }

    postReceta(receta: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.post(this.baseUrl + '/receta', receta).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.postReceta(receta));
            })
        );
    }
    
    postFavorito(favorito: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let usuario: any = {};
        usuario = JSON.parse(localStorage.getItem("usuario"));
        return this.http.post(this.baseUrl + '/usuario/favorito', {receta: favorito.id, usuario: usuario.email}).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.postFavorito(favorito));
            })
        );
    }
    
    deleteFavorito(idReceta: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let usuario: any = {};
        usuario = JSON.parse(localStorage.getItem("usuario"));
        return this.http.delete(this.baseUrl + '/usuario/favorito?usuario=' + usuario.email + "&receta=" + idReceta).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.deleteFavorito(idReceta));
            })
        );
    }

    getFavoritos(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let usuario: any = {};
        usuario = JSON.parse(localStorage.getItem("usuario"));
        return this.http.get(this.baseUrl + '/usuario/favorito/' + usuario.email).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getFavoritos("MAIL DEL USUARIO"));
            })
        );
    }
    
    postUsuario(usuario: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.post(this.baseUrl + '/usuario', usuario).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(usuario);
            })
        );
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }
}