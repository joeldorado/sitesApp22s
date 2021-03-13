import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routerPath'
})
export class RouterPathPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let path = location.pathname.split('/')[1];

    if (path === 'members') {
      path = '';
    } else {
      path = path + '/';
    }
    console.log(path);
    return '/' + path + 'members/' + value;
  }

}
