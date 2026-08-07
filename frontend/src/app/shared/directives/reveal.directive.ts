import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Diretiva de "revelar ao rolar" (scroll reveal).
 *
 * Uso: <div appReveal [appRevealDelay]="120">...</div>
 *
 * Aplica as classes `.reveal` / `.in-view` já existentes em styles.scss.
 * O elemento entra suavemente (fade + translateY) assim que cruza a viewport,
 * e para de observar em seguida (a animação acontece uma única vez).
 *
 * Respeita `prefers-reduced-motion`: nesse caso o elemento aparece direto,
 * sem animação.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Atraso em ms antes de revelar (útil para escalonar listas de itens). */
  @Input() appRevealDelay = 0;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    node.classList.add('reveal');

    if (reduceMotion) {
      node.classList.add('in-view');
      return;
    }

    if (this.appRevealDelay) {
      node.style.transitionDelay = `${this.appRevealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('in-view');
            this.observer?.unobserve(node);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
