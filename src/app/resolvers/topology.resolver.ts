import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ReqNrouterService } from '../services/req-nrouter.service';

@Injectable({
  providedIn: 'root'
})
export class TopologyResolver implements Resolve<any> {
  constructor(private reqNservice: ReqNrouterService) {}

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



