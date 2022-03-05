import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import { Plan } from 'src/models/plans';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal?: ModalDirective;
  planList: Plan[] = [];
  filteredPlanList: string[] = [];
  planDetails: Plan[] = [];
  homeForm: FormGroup;
  modalRef?: BsModalRef;
  selectedPlan: any;

  constructor(private fb: FormBuilder, private planService: PlansService) {
    this.homeForm = this.fb.group({
      mobileNuber: ['', Validators.required],
      country: ['All', Validators.required],
      operator: ['All', Validators.required],
    });

    this.homeForm.controls['country'].valueChanges.subscribe((x) => {
      this.getFiltered(x);
    });
    this.homeForm.controls['operator'].valueChanges.subscribe((x) => {
      this.getPlanDetails(x);
    });
  }

  ngOnInit(): void {
    this.getPlanList();
  }

  openPlan(plan: Plan) {
    console.log(plan);
    this.selectedPlan = plan;
    this.modal?.show();
  }

  saveToList() {
    console.log(this.selectedPlan);
  }

  getPlanList() {
    this.planList = [];
    this.planService.getPlanList().subscribe((x: any) => {
      if (x.body) {
        this.planList = x.body;
        this.getFiltered('All');
      } else if (x.message) {
        this.planList = [];
      }
    });
  }

  getFiltered(country: string) {
    this.filteredPlanList = [];
    this.planDetails = [];
    if (country != 'All') {
      let filterd = this.planList.filter((item) => item.country == country);
      this.filteredPlanList = Array.from(
        new Set(
          filterd.map((item) => {
            return item.operator;
          })
        )
      );
    } else {
      this.filteredPlanList = [];
    }
    this.getPlanDetails('All');
  }

  getPlanDetails(operator: string) {
    if (operator != 'All') {
      this.planDetails = this.planList.filter(
        (item) => item.operator == operator
      );
    } else {
      this.planDetails = [];
    }
  }
}
