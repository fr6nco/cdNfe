import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, UrlSegment, Router, RouterEvent, NavigationEnd, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activatedUrl = '';

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
    this.router.events.pipe(
      filter((event: RouterEvent) => {
        return event instanceof ActivationEnd;
      })
    )
    .subscribe((event: any) => {
      const ev = event as ActivationEnd;
      this.activatedUrl = ev.snapshot.url[0].path;
    });
  }
}
