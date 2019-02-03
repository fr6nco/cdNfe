import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReqNrouterService {
  endpoint = 'http://localhost:3000';

  getTopology() {
    return this.http.get(this.endpoint + '/rr/topology');
  }

  getAssets() {
    return this.http.get(this.endpoint + '/rr/assets');
  }

  getCCState() {
    return this.http.get(this.endpoint + '/cc/status');
  }

  getPeriodicState() {
    return merge(
        timer(0, 2000).pipe(switchMap(_ => this.getCCState())),
        timer(0, 2000).pipe(switchMap(_ => this.getAssets())));
  }

  constructor(private http: HttpClient) {}
}
