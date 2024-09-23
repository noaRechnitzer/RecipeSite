// import { Directive, Input, ViewContainerRef, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';

// @Directive({
//   selector: '[appStructural]',
//   standalone: true
// })
// export class StructuralDirective implements OnChanges {
//   @Input() 
//   appStructural: number=0;

//   constructor(private viewContainer: ViewContainerRef, private template: TemplateRef<any>) {}
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['appStructural']) {
//       this.viewContainer.clear();
//       for (let i = 0; i < this.appStructural; i++) {
//         this.viewContainer.createEmbeddedView(this.template);
//       }
//     }
//   }
// }



import { Directive, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStructural]',
  standalone: true
})
export class StructuralDirective implements OnInit {
  @Input() appStructural: number = 0;

  constructor(
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.viewContainer.clear();
    for (let i = 0; i < this.appStructural; i++) {
      const star = this.renderer.createElement('span');
      const text = this.renderer.createText('★');
      this.renderer.appendChild(star, text);
      this.renderer.setStyle(star, 'color', '#eeee1b');
      this.renderer.setStyle(star, 'fontSize', '30px');
      this.renderer.appendChild(this.viewContainer.element.nativeElement, star);
    }
  }
}
