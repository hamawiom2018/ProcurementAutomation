import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models/user';

@Injectable()
export class AuthenticationService {
    public redirectUrl: string;

    private signinStatus = new BehaviorSubject<boolean>(false);
    private user = new BehaviorSubject<User>(new User());

    constructor(private http: HttpClient) {}

    public init(user?: User): void {
        if (user) {
            this.user.next(user);
        }
        this.signinStatus.next(true);
    }

    public signout(): void {
        this.http.get('/api/auth/logout').subscribe(() => {
            this.redirectUrl = null;
            this.signinStatus.next(false);
            this.user.next(new User());
        });
    }

    public isSignedIn(): Observable<boolean> {
        return this.signinStatus.asObservable();
    }

    public userChanged(): Observable<User> {
        return this.user.asObservable();
    }

    public isInRole(role: string): boolean {
        const roles: string[] = this.user.value.roles || [];
        return roles.indexOf(role) !== -1;
    }

    public setUser(user: User): void {
        this.user.next(user);
    }
}
