import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/models/users';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal?: ModalDirective;
  userFilter: any = { l_name: '' };
  itemform: FormGroup;
  currentListId: string = '';
  deleteUserId: number = 0;
  userList: Users[] = [];
  userNorecord: string = '';
  modalRef?: BsModalRef;
  loggedInUserData: any = {};

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private toast: ToastrService,
    private auth: AuthService
  ) {
    this.itemform = this.fb.group({
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      user_type: ['', Validators.required],
      mobile: ['', Validators.required],
      country: ['', Validators.required],
      language: ['', Validators.required],
      balanceAmount: ['', Validators.required],
      created_by: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loggedInUserData = this.auth.getToken();
    this.getUserList();
  }
  getUserList() {
    this.apiService
      .getAgentList(2, this.loggedInUserData._id)
      .subscribe((x: any) => {
        if (x.body) {
          this.userList = x.body;
        } else if (x.message) {
          this.userList = [];
          this.userNorecord = x.message;
        }
      });
  }

  addUser() {
    this.currentListId = '';
    this.itemform.controls['password'].enable();
    this.itemform.controls['user_type'].enable();
    this.itemform.controls['email'].enable();
    this.itemform.reset();
    this.modal?.show();
  }

  editUser(user: any) {
    this.currentListId = '';
    if (user._id) {
      this.currentListId = user._id;
    }
    this.itemform.patchValue(user);
    this.itemform.controls['password'].disable();
    this.itemform.controls['user_type'].disable();
    this.itemform.controls['email'].disable();
    this.modal?.show();
  }

  saveToList() {
    if (this.currentListId != '') {
      console.log(this.itemform.getRawValue());
      this.apiService
        .updateAgent(this.itemform.getRawValue(), this.currentListId)
        .subscribe(
          (x: any) => {
            this.currentListId = '';
            this.getUserList();
            this.modal?.hide();
            this.toast.success(x.msg);
          },
          (error) => {
            this.toast.error(error.error.msg);
            console.error(error.error.msg);
          }
        );
    } else {
      this.itemform.controls['created_by'].patchValue(
        this.loggedInUserData._id
      );
      this.apiService.userRegistration(this.itemform.getRawValue()).subscribe(
        (x) => {
          this.getUserList();
          this.modal?.hide();
        },
        (error) => {
          this.toast.error(error.error.msg);
        }
      );
    }
  }

  deleteUser(template: TemplateRef<any>, userId: number) {
    if (userId) {
      this.deleteUserId = userId;
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
  }

  confirm(): void {
    this.apiService.deleteAgent(this.deleteUserId).subscribe((x) => {
      if (x.msg) {
        this.toast.success(x.msg);
      }
      this.getUserList();
    });
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
