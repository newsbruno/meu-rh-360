import { LocalStorageService } from 'src/services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { User } from 'src/models/user.model';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LocalidadeService } from 'src/services/localidade.service';
import { lastValueFrom } from 'rxjs';
import { RegisterCompany } from 'src/guards/register-company.model';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.css'],
})
export class MyCompanyComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/vectors/animation_lk4u6rs5.json',
  };

  currentUser: User | null = {} as User;

  registerCompanyForm = this.fb.group({
    tipoEmpresa: ['', [Validators.required, Validators.maxLength(50)]],
    nomeEmpresa: ['', [Validators.required, Validators.maxLength(100)]],
    cnpjEmpresa: ['', [Validators.required, this.patternValidator(/^\d{14}$/)]],
    cep: ['', [Validators.required, this.patternValidator(/^\d{8}$/)]],
    endereco: ['', [Validators.required, Validators.maxLength(150)]],
    bairro: ['', [Validators.required, Validators.maxLength(50)]],
    estado: ['', Validators.required],
    cidade: ['', Validators.required],
    complemento: ['', Validators.maxLength(100)],
    celular: ['', [Validators.required, this.patternValidator(/^\d{11}$/)]],
    nomeAdministrador: ['', [Validators.required, Validators.maxLength(100)]],
    cpf: ['', [Validators.required, this.patternValidator(/^\d{11}$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  estados: any[] | undefined;
  cidades: any[] | undefined;

  registerCompany: RegisterCompany | null = {} as RegisterCompany;

  cidadeLoadedVal: string = '';

  constructor(
    public localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private localidadeService: LocalidadeService
  ) {}

  ngOnInit() {
    this.currentUser = this.localStorageService.getUser;
    this.registerCompany = this.localStorageService.getRegisterCompany;
    this.initEstados();
  }

  async initEstados() {
    const result = await lastValueFrom(this.localidadeService.getEstados());
    this.estados = result;
  }

  async onEstadoSelected(val: any) {
    const result = await lastValueFrom(
      this.localidadeService.getCidades(Number(val.target.value))
    );
    this.cidades = result;

    if (this.cidadeLoadedVal) {
      const cidadeFiltered = this.cidades?.find(
        (v) => v.nome == this.cidadeLoadedVal
      );

      this.registerCompanyForm.patchValue({
        cidade: cidadeFiltered.id,
      });

      this.cidadeLoadedVal = '';
    }
  }

  onSubmit(): void {
    if (this.registerCompanyForm.invalid) {
      this.registerCompanyForm.markAllAsTouched();
      return;
    }

    this.localStorageService.saveRegisterCompany = this.registerCompanyForm
      .value as RegisterCompany;

    alert('Empresa cadastrado com sucesso.');
  }

  patternValidator(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      if (value) {
        value = value
          .replace(/_/g, '')
          .replace(/-/g, '')
          .replace(/\./g, '')
          .replace(/\//g, '')
          .replace(/\(/g, '')
          .replace(/\)/g, '')
          .replace(/\s+/g, '');
      }
      const isValid = pattern.test(value);
      return isValid ? null : { pattern: { value: control.value } };
    };
  }

  async getAddress() {
    const zip_code = this.registerCompanyForm.get('cep')?.value;

    if (this.registerCompanyForm.get('cep')?.valid) {
      const response = await fetch(
        `https://viacep.com.br/ws/${zip_code!.replace('-', '')}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        this.cidadeLoadedVal = data.localidade;
        const estadoFiltered = this.estados?.find((v) => v.sigla == data.uf);
        this.registerCompanyForm.patchValue({
          bairro: data.bairro,
          estado: estadoFiltered.id,
        });
        this.onEstadoSelected({ target: { value: estadoFiltered.id } });
      }
    }
  }
}
