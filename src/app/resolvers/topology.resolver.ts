import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ReqNrouterService } from '../services/req-nrouter.service';
import { catchError, map } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopologyResolver implements Resolve<any> {
  constructor(private reqNservice: ReqNrouterService, private router: Router) {}

  resolve() {
    return this.reqNservice.getTopology();
  }
}

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<any> {
  constructor(private reqNservice: ReqNrouterService) {}

  resolve() {
    return this.reqNservice.getAssets();
  }
}



