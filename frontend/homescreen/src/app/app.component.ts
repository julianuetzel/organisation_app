import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'homescreen';
  isPhone = false;

  constructor(private responsive: BreakpointObserver){

  }
  ngOnInit(): void {
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {
        this.isPhone = false;

        if (result.matches) {
          this.isPhone = true;
        }
      })
  }
}




