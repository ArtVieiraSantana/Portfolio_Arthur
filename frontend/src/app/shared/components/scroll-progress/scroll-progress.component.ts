import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-progress.component.html',
  styleUrl: './scroll-progress.component.scss'
})
export class ScrollProgressComponent {
  progresso = signal(0);

  constructor() {
    this.atualizar();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.atualizar();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.atualizar();
  }

  private atualizar(): void {
    const doc = document.documentElement;
    const alturaTotal = doc.scrollHeight - doc.clientHeight;
    const percentual = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
    this.progresso.set(percentual);
  }
}
