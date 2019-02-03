import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReqNrouterService } from '../services/req-nrouter.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit, OnDestroy {

  ccState: any;
  rrData: any;
  loaded: number = 0;

  constructor(
    private route: ActivatedRoute,
    private rrservice: ReqNrouterService
  ) {}

  periodicSubscription: Subscription;

  ngOnInit() {
    this.periodicSubscription = this.rrservice.getPeriodicState().subscribe((data: any) => {
      if ('url' in data) {
        this.ccState = data;
        this.loaded |= 1;
      }
      if ('rr' in data) {
        this.rrData = data;
        this.loaded |= 1 << 1;
      }
    });
  }

  ngOnDestroy() {
    this.periodicSubscription.unsubscribe();
  }

}
