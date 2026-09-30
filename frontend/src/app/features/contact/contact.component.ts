import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Altere estes dados para os seus dados reais.
  readonly email = 'arthur1vieira2@gmail.com';
  readonly telefone = '(11) 97866-2084';
  readonly localizacao = 'São Paulo Zona Sul, Brasil';
  readonly github = 'https://github.com/ArtVieiraSantana';
  readonly linkedin = 'https://www.linkedin.com/in/arthur-vieira-santana-390757264/';
}
