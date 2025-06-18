import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

/**
 * Provides signin method to signin & signup components.
 */
export class Signin {

    model: any = {};

    errorMessages: any[] = [];

    constructor(
        protected http: HttpClient,
        protected router: Router,
        protected authenticationService: AuthenticationService) { }

    signin(): void {
        this.http.post('/api/auth/login', this.model)
            .subscribe(
                () => {
                    const user = new User();
                    user.userName = this.model.username;
                    user.roles = [this.model.username.indexOf('admin') !== -1 ? 'administrator' : 'user'];
                    this.authenticationService.init(user);
                    this.router.navigate(['/home']);
                },
                () => this.errorMessages.push({ description: 'Invalid email or password.' })
            );
    }

    clearMessages(): void {
        this.errorMessages = [];
    }

}
