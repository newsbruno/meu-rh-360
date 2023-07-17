import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { DeviceService } from 'src/services/device.service';
import { LocalStorageService } from 'src/services/localStorage.service';
import { matchPassword } from 'src/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  rates: any[] = [
    {
      signature: 'JG',
      title: '5k+ de clientes satisfeitos',
      description:
        'Meu Rh 360 é incrível! Ele é a solução perfeita para gerenciamento de pessoas e processos de contratação. Ele facilita a busca de novos talentos e ajuda a manter a equipe organizada e bem gerenciada. Além disso, o suporte é excepcional e sempre disposto a ajudar.',
    },
  ];

  registerForm: FormGroup = this.formBuilder.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    },
    { validators: matchPassword }
  );

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const user: User = {
      fullName: this.registerForm.get('fullName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value,
      acceptTerms: this.registerForm.get('acceptTerms')?.value,
    };

    this.localStorageService.saveUser = user;

    this.router.navigate(['']);
  }
}
