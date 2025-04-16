import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'splitPath'
})
export class SplitPathPipe implements PipeTransform {

  transform(value: string): string[] {
    const splitValue = value?.split('/')
    if (splitValue?.length === 1) {
      return splitValue
    }

    const startWord = splitValue[0] + '/'
    const endWord = splitValue.slice(1, value.length-1)[0]


    return [startWord, endWord]
  }

}
