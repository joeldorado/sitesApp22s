import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToJson'
})
export class StringToJsonPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return JSON.parse(value);
  }

}
