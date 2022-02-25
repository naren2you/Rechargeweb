import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.regForm = this.fb.group({
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      email: [
        '',
        Validators.required,
        Validators.minLength(1),
        Validators.email,
      ],
      password: ['', Validators.required, Validators.minLength(6)],
      mobile: ['', Validators.required],
      user_type: ['', Validators.required],
      country: ['', Validators.required],
      language: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  postData(regForm: any) {
    console.log(regForm.getRawValue());
    this.dataService.userRegistration(regForm.getRawValue()).subscribe((x) => {
      this.router.navigate(['login']);
    });
  }
}
