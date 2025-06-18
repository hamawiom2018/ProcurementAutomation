import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { IdentityService } from '../../services/identity.service';
import { Signin } from '../signin';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent extends Signin {

    constructor(
        protected http: HttpClient,
        protected router: Router,
        protected authenticationService: AuthenticationService,
        private identityService: IdentityService) {
        super(http, router, authenticationService);
    }

    signup(): void {
        this.identityService.create(this.model)
            .subscribe(
                (res: any) => {
                    // IdentityResult.
                    if (res.succeeded) {
                        // Signs in the user.
                        this.signin();
                    } else {
                        this.errorMessages = res.errors;
                    }
                },
                (error: any) => {
                    this.errorMessages.push({ description: 'Server error. Try later.' });
                });
    }

}
