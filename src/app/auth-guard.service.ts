import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild , Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate,CanActivateChild{
  canActivateChild(childRoute: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    
    if(sessionStorage.getItem("sessionId"))
          {
            return true;
          }
          else
          {
            
            this.route.navigate(["../login"]); 
            return false;
          }

  }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
          
    if(sessionStorage.getItem("sessionId"))
          {
            return true;
          }
          else
          {
            
            this.route.navigate(["login"]);
            return false;
          }
  }

  constructor(private route:Router) { }
}
