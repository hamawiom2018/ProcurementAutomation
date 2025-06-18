import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    navItems: any[] = [
        { name: 'Home', route: 'home' },
        { name: 'Resources', route: 'resources' }
    ];

    signedIn: Observable<boolean>;

    name: string;
    isAdmin: boolean;

    constructor(
        public title: Title,
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.title.setTitle('Angular SPA WebAPI');

        this.signedIn = this.authenticationService.isSignedIn();

        this.authenticationService.userChanged().subscribe(
            (user: User) => {
                this.name = user.givenName;
                this.isAdmin = this.authenticationService.isInRole('administrator');
            });
    }

    signout(): void {
        this.authenticationService.signout();

        this.router.navigate(['/home']);
    }

}
