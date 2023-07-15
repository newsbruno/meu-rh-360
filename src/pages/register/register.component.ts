import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rates: any[] = [
    {
      signature: 'JG',
      title: '5k+ de clientes satisfeitos',
      description: 'Meu Rh 360 é incrível! Ele é a solução perfeita para gerenciamento de pessoas e processos de contratação. Ele facilita a busca de novos talentos e ajuda a manter a equipe organizada e bem gerenciada. Além disso, o suporte é excepcional e sempre disposto a ajudar.'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
