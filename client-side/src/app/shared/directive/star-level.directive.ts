
import { Directive, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStarLevel]',
  standalone: true
})
export class StarLevelDirective implements OnInit {
  @Input() appStarLevel: number = 0;

  constructor(
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.viewContainer.clear();
    for (let i = 0; i < this.appStarLevel; i++) {
      const star = this.renderer.createElement('span');
      const text = this.renderer.createText('★');
      this.renderer.appendChild(star, text);
      this.renderer.setStyle(star, 'color', '#eeee1b');
      this.renderer.setStyle(star, 'fontSize', '30px');
      this.renderer.appendChild(this.viewContainer.element.nativeElement, star);
    }
  }
}