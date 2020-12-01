import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LAUNCHLIST, LANDINGLIST, YEARSLIST } from '../../utils/constants';

@Component({
  selector: 'filter-component',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() yearApplied: number;
  @Input() launchSuccessful: string;
  @Input() landSuccessful: string;
  @Output() applyFilters = new EventEmitter();

  years: Array<any>;
  launchValues: Array<any>;
  landingValues: Array<any>;

  constructor() {}

  ngOnInit() {
    this.launchValues = LAUNCHLIST;
    this.landingValues = LANDINGLIST;
    this.years = YEARSLIST;
  }

  generalMap(field: any, selectedProperty: any) {
    this[field].map((property) => {
      if (property.value === selectedProperty.value) {
        property.isSelected = !property.isSelected;
      } else {
        property.isSelected = false;
      }
    });
  }
  applyUserFilters(field: any, selectedYear: any, propertyName: any) {
    this.generalMap(field, selectedYear);
    this.applyFilters.emit({
      propertyName: propertyName,
      selection: selectedYear,
    });
  }
}
