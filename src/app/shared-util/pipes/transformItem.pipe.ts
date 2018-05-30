import { Pipe, PipeTransform } from '@angular/core';

import { DishProfile } from './../model/dishProfile';
import { SelectItem } from 'primeng/api';

@Pipe({ name: 'toSelectItem' })
export class TransformToSelectItemPipe implements PipeTransform {

  public transform(item: DishProfile[]): SelectItem[] {
    if (!item) return undefined;

    // Create an object that has all of the Person properties AND the SelectItem properties.
    return item.map(item => Object.assign({ }, item, { label: item.name, value: item.name + ',' + item._id }));
  }
}
