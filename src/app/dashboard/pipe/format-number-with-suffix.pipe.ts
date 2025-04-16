import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatNumberWithSuffix'
})
export class FormatNumberWithSuffixPipe implements PipeTransform {

  transform(value: number ): string | number {
    let result = value.toString().split('')

    if (result.length > 4 && result.length < 7) {
      result.splice(result.length-3, 3)
      return result.join('') + "K"
    }

    if (result.length >= 7) {
      result.splice(result.length-6, 6)
      return result.join('') + 'M'
    }

    return value
  }

}
