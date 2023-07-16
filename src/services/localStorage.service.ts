import { Injectable } from '@angular/core';
import { RegisterCompany } from 'src/guards/register-company.model';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  get getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    const user = this.getUser;
    return user !== null;
  }

  set saveRegisterCompany(registerCompany: RegisterCompany) {
    localStorage.setItem('registerCompany', JSON.stringify(registerCompany));
  }

  get getRegisterCompany(): RegisterCompany | null {
    const registerCompany = localStorage.getItem('registerCompany');
    return registerCompany ? JSON.parse(registerCompany) : null;
  }

  isRegistered(): boolean {
    const registerCompany = this.getRegisterCompany;
    return registerCompany !== null;
  }
}
