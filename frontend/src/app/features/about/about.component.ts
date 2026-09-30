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
  
  readonly bioParagrafo1 =
    'Sou apaixonado por tecnologia e desenvolvimento de software, com foco em Java e desenvolvimento backend. Atualmente, curso Análise e Desenvolvimento de Sistemas e atuo como estagiário de desenvolvimento Java, onde venho adquirindo experiência prática com desenvolvimento, banco de dados, APIs e ferramentas utilizadas no dia a dia de uma equipe de tecnologia.';
  readonly bioParagrafo2 =
    'Ao longo da minha trajetória, venho aprofundando meus conhecimentos em Java, Spring, SQL, Git e desenvolvimento de aplicações, sempre buscando escrever código organizado, aplicar boas práticas e entender não apenas como uma solução funciona, mas também como ela pode ser evoluída e gerar valor para o usuário. Meu objetivo é continuar desenvolvendo minha experiência como profissional de tecnologia e transformar conhecimento em soluções cada vez mais eficientes e de qualidade.';

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
