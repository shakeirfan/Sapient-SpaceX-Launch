import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'launch-home-component',
  templateUrl: './launch-home.component.html',
  styleUrls: ['./launch-home.component.scss'],
})
export class HomeComponent implements OnInit {
  yearApplied: string;
  launchSuccessful: string;
  landSuccessful: string;
  recordLimit: number;
  launchList = [];

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.recordLimit = 50;
    this.getLaunchList();
  }

  applyFilters(payload) {
    this.generalFilter(payload);
  }

  generalFilter(payload) {
    if (payload.selection.isSelected) {
      this[payload.propertyName] = payload.selection.value;
    } else {
      this[payload.propertyName] = null;
    }
    this.navigateToFiltersPage();
    this.getLaunchList();
  }

  navigateToFiltersPage() {
    this.router.navigate(['/filter'], {
      queryParams: {
        year: this.yearApplied,
        launchSucess: this.launchSuccessful,
        landSucess: this.landSuccessful,
      },
    });
  }

  getLaunchList() {
    this.dashboardService
      .getLaunches(
        this.yearApplied,
        this.launchSuccessful,
        this.landSuccessful,
        this.recordLimit
      )
      .subscribe((data: []) => (this.launchList = data));
  }
}
