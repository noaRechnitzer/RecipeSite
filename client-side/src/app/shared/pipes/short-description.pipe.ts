import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
  standalone: true
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string | ""): string {
    if (value.length>300) {
      const newS= value.slice(0,200)+"..."
      return newS
    }
    return value;
  }
}
