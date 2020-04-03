import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'uploadDate'
})
export class UploadDatePipe implements PipeTransform {
  transform(dateString: string): string {
    if (dateString !== 'None') {
      const dateValue = new Date(dateString);
      const currentDate = new Date();

      // Calculate date difference in days
      const diff = Math.abs(currentDate.getTime() - dateValue.getTime());
      const diffDays = diff / (1000 * 3600 * 24);

      if (diffDays < 1) {
        return 't';
      }

      if (diffDays >= 1 && diffDays <= 2) {
        return 'y';
      }

      return 'o';
    }
  }

}
