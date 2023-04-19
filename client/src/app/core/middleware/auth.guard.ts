import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TaskService} from "../../services/task/task.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly taskService:TaskService,
              private readonly router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
      const url = route.url.map(segment => segment.path).join('/');
      return this.taskService.checkPrivilege()
        .then(()=>
                  {
                    if (url.startsWith('landing')) return this.router.navigate(['/dashboard'])
                    return true;
                  })
        .catch(()=> {
                      if (url.startsWith('landing')) return true;
                      this.router.navigate(['/landing'])
                      return false;
                    })
  }

}
