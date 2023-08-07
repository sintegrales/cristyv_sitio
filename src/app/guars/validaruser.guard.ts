import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidaruserGuard implements CanActivate {

  iduser: any;

  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.iduser = sessionStorage.getItem('id');
      if(this.iduser==null){
        this.router.navigate(['login']);
        return false;
      }
    
      return true;
  }
  
}
