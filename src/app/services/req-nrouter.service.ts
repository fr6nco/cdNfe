import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReqNrouterService {
  endpoint: string;

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
        timer(0, 10000).pipe(switchMap(_ => this.getCCState())),
        timer(0, 10000).pipe(switchMap(_ => this.getAssets())));
  }

  getSessions() {
    return this.http.get(this.endpoint + '/rr/sessions');
  }

  getCNTSessions() {
    return this.http.get(this.endpoint + '/rr/sessionscnt');
  }

  getPeriodicSessionState() {
    return merge(
        timer(0, 2000).pipe(switchMap(_ => this.getSessions())),
        timer(0, 2000).pipe(switchMap(_ => this.getCNTSessions()))
    );
  }

  constructor(private http: HttpClient) {
    this.endpoint = environment.backend_api;
  }
}
