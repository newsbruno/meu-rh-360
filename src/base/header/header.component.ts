import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
declare let tippy: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  faArrowDown = faArrowAltCircleDown;
  faMenu = faBars;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    tippy('#myButton', {
      content: `<button id="signOutBtn" class="btn btn-light"> Sair </button>`,
      allowHTML: true,
      theme: 'white',
      trigger: 'click',
      interactive: true,
      animation: 'scale',
      onMount(instance: any) {
        instance.popper
          .querySelector('#signOutBtn')
          .addEventListener('click', () => {
            if (confirm('Tem certeza que deseja sair ?')) {
              localStorage.removeItem('user');
              localStorage.removeItem('registerCompany');
              location.reload();
            }
          });
      },
    });
  }
}
