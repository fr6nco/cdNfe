import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReqNrouterService } from '../services/req-nrouter.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit, OnDestroy {
  private sessionSubscription: Subscription;
  rrSessions: any;
  rrData: any;
  cntSessions: any;
  loaded: number = 0;

  constructor(private reqNrouter: ReqNrouterService) {}

  ngOnInit() {
    this.sessionSubscription = this.reqNrouter
      .getPeriodicSessionState()
      .subscribe((data: any) => {
        if ('sessions' in data) {
          this.rrSessions = data;
          this.loaded |= 1;
        } else {
          this.cntSessions = data;
          this.loaded |= 1 << 1;
        }
        if (this.loaded === 3) {
          console.log(this.rrSessions);
          console.log(this.cntSessions);
        }
      });
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }
}
