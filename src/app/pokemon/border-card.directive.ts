import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 200;


  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  @Input('pkmnBorderCard') borderColor: string;

  @HostListener('mouseenter') onmouseenter = () => {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onmouseleave = () => {
    this.setBorder(this.initialColor);
  }

    private setBorder(color: string): void {
    let border = 'solid 4px ' + color;
    this.el.nativeElement.style.border = border;
  }

  private setHeight(height: number): void {
    
    this.el.nativeElement.style.height = height + 'px';
  }



}
