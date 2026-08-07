import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

/**
 * Diretiva "magnética": o elemento se inclina levemente em direção ao cursor
 * ao passar o mouse, e volta suavemente à posição original ao sair.
 *
 * Uso: <button appMagnetic>...</button>
 *      <article appMagnetic [appMagneticStrength]="0.25">...</article>
 *
 * Só ativa em dispositivos com mouse (hover: hover) e quando o usuário não
 * pediu para reduzir animações.
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  /** Intensidade do deslocamento/inclinação (0 a 1). */
  @Input() appMagneticStrength = 0.35;

  private readonly canAnimate =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.canAnimate) return;

    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    const moveX = relX * 16 * this.appMagneticStrength;
    const moveY = relY * 16 * this.appMagneticStrength;
    const tiltX = relY * -6 * this.appMagneticStrength;
    const tiltY = relX * 6 * this.appMagneticStrength;

    node.style.transform = `perspective(600px) translate(${moveX}px, ${moveY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.canAnimate) return;
    this.el.nativeElement.style.transform = '';
  }
}
