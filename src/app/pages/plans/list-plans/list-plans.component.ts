import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import { Plan } from 'src/models/plans';

@Component({
  selector: 'app-list-plans',
  templateUrl: './list-plans.component.html',
  styleUrls: ['./list-plans.component.scss'],
})
export class ListPlansComponent implements OnInit {
  planList: Plan[] = [];
  constructor(private planService: PlansService) {}

  ngOnInit(): void {
    this.planService.getPlanList().subscribe((x: any) => {
      if (x.body) {
        this.planList = x.body;
      }
    });
  }

  gotoAddplan(txt: string) {
    if (txt == 'new') {
      console.log('new');
    } else {
      console.log('id');
    }
  }
}
