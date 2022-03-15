import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import { Plan } from 'src/models/plans';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-plans',
  templateUrl: './list-plans.component.html',
  styleUrls: ['./list-plans.component.scss'],
})
export class ListPlansComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal?: ModalDirective;
  planFilter: any = { operator: '' };
  itemform: FormGroup;
  currentListId: string = '';
  deletePlanId: number = 0;
  planList: Plan[] = [];
  planNorecord: string = '';
  modalRef?: BsModalRef;
  private _jsonURL = '';

  constructor(
    private planService: PlansService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private http: HttpClient
  ) {
    this.itemform = this.fb.group({
      operator: ['', Validators.required],
      country: ['', Validators.required],
      plan_name: ['', Validators.required],
      plan_value: ['', Validators.required],
      Internet_details: ['', Validators.required],
      talk_value: ['', Validators.required],
      validity: ['', Validators.required],
      plan_details: ['', Validators.required],
      othe_details: [''],
    });

    this.getJSON().subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.getPlanList();
  }
  getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  getPlanList() {
    this.planService.getPlanList().subscribe((x: any) => {
      if (x.body) {
        this.planList = x.body;
      } else if (x.message) {
        this.planList = [];
        this.planNorecord = x.message;
      }
    });
  }

  addPlan() {
    this.currentListId = '';
    this.itemform.reset();
    this.modal?.show();
  }

  editPlan(list: any) {
    this.currentListId = '';
    if (list._id) {
      this.currentListId = list._id;
    }
    this.itemform.patchValue(list);
    this.modal?.show();
  }

  saveToList() {
    if (this.currentListId != '') {
      this.planService
        .updatePlan(this.itemform.getRawValue(), this.currentListId)
        .subscribe((x) => {
          this.currentListId = '';
          this.getPlanList();
          this.modal?.hide();
        });
    } else {
      this.planService
        .createPlan(this.itemform.getRawValue())
        .subscribe((x) => {
          this.getPlanList();
          this.modal?.hide();
        });
    }
  }

  deletePlan(template: TemplateRef<any>, planId: number) {
    if (planId) {
      this.deletePlanId = planId;
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
  }

  confirm(): void {
    this.planService.deletePlan(this.deletePlanId).subscribe((x) => {
      this.getPlanList();
    });
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
