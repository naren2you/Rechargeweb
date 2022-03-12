import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import { TransService } from 'src/app/services/trans.service';
import { Plan } from 'src/models/plans';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { Router, CanActivate } from '@angular/router';

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
  LoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private planService: PlansService,
    private auth: AuthService,
    private transervice: TransService,
    private router: Router
  ) {
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

  getPlanList() {
    this.LoggedIn = this.auth.loggedIn();
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
        (item) =>
          item.operator == operator &&
          item.country == this.homeForm.controls['country'].value
      );
    } else {
      this.planDetails = [];
    }
  }

  openPlan(plan: Plan) {
    this.selectedPlan = plan;
    this.modal?.show();
  }

  saveToList() {
    // this.selectedPlan;

    let transData: any = {
      mobile: this.homeForm.controls['mobileNuber'].value,
      country: this.selectedPlan.country,
      operator: this.selectedPlan.operator,
      plan_id: this.selectedPlan._id,
      plan_name: this.selectedPlan.plan_name,
      plan_value: this.selectedPlan.plan_value,
      Internet_details: this.selectedPlan.Internet_details,
      talk_value: this.selectedPlan.talk_value,
      validity: this.selectedPlan.validity,
      plan_details: this.selectedPlan.plan_details,
      status: 'Requested',
      requestBy: this.auth.getToken()._id,
    };

    if (!transData.requestBy || transData.requestBy == null) {
      localStorage.setItem('mobileData', JSON.stringify(transData));
      this.modal?.hide();
      this.router.navigate(['login']);
    }

    //for new user Previous data should be taken and saved...
    this.transervice.createTrans(transData).subscribe((x) => {
      this.selectedPlan = {};
      this.modal?.hide();
      this.homeForm.reset();
    });
  }
}
