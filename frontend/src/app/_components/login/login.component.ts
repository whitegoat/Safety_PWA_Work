﻿import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    modalRef: BsModalRef;

    @ViewChild("ErrorAlertBox") ErrorAlertBox: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: BsModalService,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data?.IsError === true) {
                        // const errorMessage = "UserName/Password is Invalid."
                        this.modalRef = this.modalService.show(this.ErrorAlertBox, {
                            backdrop: 'static',
                            keyboard: false,
                            class: 'gray modal-md'
                        });
                        this.loading = false;
                        return false;
                    } else {
                        // this.router.navigate([this.returnUrl]);
                        this.router.navigate(["/home"]);
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}