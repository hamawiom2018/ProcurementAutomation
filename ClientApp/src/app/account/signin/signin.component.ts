import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { Signin } from '../signin';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent extends Signin {

    constructor(
        protected http: HttpClient,
        protected router: Router,
        protected authenticationService: AuthenticationService) {
        super(http, router, authenticationService);
    }

}
