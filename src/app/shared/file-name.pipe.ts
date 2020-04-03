import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  transform(name: string, length?: number): string {

    length = length ? length : 50;
    return name.length < length ? name :
            name.slice(0, length - 15) + '...' + name.slice(name.length - 6, name.length);
  }

}

@Pipe({
  name: 'fileStatus'
})
export class FileStatusPipe implements PipeTransform {

  transform(name: string): string {
    let formattedName = name.split('_').join(' ');
    return formattedName.slice(0, 1).toUpperCase() + formattedName.slice(1);
  }

}