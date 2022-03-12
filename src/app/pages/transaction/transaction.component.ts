import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TransService } from 'src/app/services/trans.service';
import { Trans } from 'src/models/trans';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal?: ModalDirective;
  transFilter: any = { operator: '' };
  currentListId: string = '';
  deleteTransId: number = 0;
  transList: Trans[] = [];
  transNorecord: string = '';
  loggedInUserData: any = {};
  modalRef?: BsModalRef;
  currentList: any = {};
  constructor(
    private transService: TransService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private toast: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUserData = this.auth.getToken();
    this.getTransList();
  }

  getTransList() {
    this.transService.getTransList().subscribe(
      (x: any) => {
        if (x.body.length) {
          this.transList = x.body;
        } else {
          this.transList = [];
        }
      },
      (error) => {
        this.toast.error(error.error.msg);
      }
    );
  }

  editTrans(list: any) {
    this.currentListId = '';
    if (list._id) {
      this.currentListId = list._id;
    }
    this.currentList = list;
  }

  saveToList(list:any) {
    let paramObj: any = {};
    paramObj.status = list.selectedstatus;
    paramObj.processedBy = this.loggedInUserData._id;
    if (this.currentListId != '') {
      this.transService
        .updateTrans(paramObj, this.currentListId)
        .subscribe((x) => {
          this.currentListId = '';
          this.getTransList();
          this.modal?.hide();
        });
    }
  }

  deleteTrans(template: TemplateRef<any>, transId: number) {
    if (transId) {
      this.deleteTransId = transId;
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
  }

  confirm(): void {
    this.transService.deleteTrans(this.deleteTransId).subscribe((x) => {
      this.getTransList();
    });
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
