import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vida: number;
  tamanho: number;
}

/**
 * Rastro sutil de partículas que segue o cursor, nas cores roxo/fúcsia
 * do tema. Só é ativado em telas grandes com mouse (hover: hover) e
 * quando o usuário não pediu para reduzir animações — não interfere em
 * nada no mobile.
 */
@Component({
  selector: 'app-cursor-trail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor-trail.component.html',
  styleUrl: './cursor-trail.component.scss'
})
export class CursorTrailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private ctx?: CanvasRenderingContext2D | null;
  private rafId: number | null = null;
  private particulas: Particula[] = [];
  private dpr = 1;
  private ultimoX = 0;
  private ultimoY = 0;
  private ativo = false;

  private readonly onMouseMove = (e: MouseEvent) => this.emitir(e.clientX, e.clientY);
  private readonly onResize = () => this.redimensionar();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const podeAnimar =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!podeAnimar || !this.canvasRef) return;

    this.ativo = true;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.redimensionar();

    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
  }

  ngOnDestroy(): void {
    if (!this.ativo) return;
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  private redimensionar(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * this.dpr;
    canvas.height = window.innerHeight * this.dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }

  private emitir(clientX: number, clientY: number): void {
    if (!this.ativo) return;
    const x = clientX * this.dpr;
    const y = clientY * this.dpr;
    const dx = x - this.ultimoX;
    const dy = y - this.ultimoY;
    const distancia = Math.hypot(dx, dy);

    if (distancia > 2) {
      const quantidade = Math.min(3, Math.floor(distancia / 8) + 1);
      for (let i = 0; i < quantidade; i++) {
        this.particulas.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.3 + dx * 0.015,
          vy: (Math.random() - 0.5) * 0.3 + dy * 0.015,
          vida: 1,
          tamanho: (Math.random() * 1.1 + 0.5) * this.dpr
        });
      }
      this.ultimoX = x;
      this.ultimoY = y;
      if (this.rafId === null) this.rafId = requestAnimationFrame(() => this.loop());
    }
  }

  private loop(): void {
    this.rafId = null;
    if (!this.ctx || !this.canvasRef) return;

    const { width, height } = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, width, height);

    if (this.particulas.length === 0) return;

    for (let i = this.particulas.length - 1; i >= 0; i--) {
      const p = this.particulas[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.vida -= 0.02;

      if (p.vida <= 0) {
        this.particulas.splice(i, 1);
        continue;
      }

      // Alterna entre roxo e fúcsia para casar com o gradiente do tema
      const usaFucsia = i % 2 === 0;
      const cor = usaFucsia ? '217, 70, 239' : '139, 92, 246';

      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(${cor}, ${p.vida * 0.7})`;
      this.ctx.arc(p.x, p.y, p.tamanho * p.vida, 0, Math.PI * 2);
      this.ctx.fill();
    }

    if (this.particulas.length > 0) {
      this.rafId = requestAnimationFrame(() => this.loop());
    }
  }
}
