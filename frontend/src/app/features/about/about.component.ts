import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

interface Skill {
  name: string;
  icon: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective, MagneticDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // Edite livremente sua bio aqui
  readonly bioParagrafo1 =
    'Sou apaixonado por tecnologia e desenvolvimento. Busco sempre criar soluções efetivas e de qualidade, unindo boas práticas de código com atenção ao usuário final.';
  readonly bioParagrafo2 =
    'Minha jornada começou com a curiosidade em entender como as coisas funcionam, e hoje estudo Análise e Desenvolvimento de Sistemas para transformar ideias em realidade através do código.';

  readonly skills: Skill[] = [
    { name: 'HTML & CSS', icon: 'fa-brands fa-html5' },
    { name: 'Java', icon: 'fa-brands fa-java' },
    { name: 'Angular', icon: 'fa-brands fa-angular' },
    { name: 'Git & Versionamento', icon: 'fa-brands fa-git-alt' }
  ];

  readonly stats: Stat[] = [
    { value: '10+', label: 'Projetos Completos' },
    { value: '1', label: 'Ano de Estudos' }
  ];
}
