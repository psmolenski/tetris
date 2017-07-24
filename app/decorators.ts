import * as _ from "lodash";

function throttle(wait: number) : Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = _.throttle(descriptor.value, wait);
  }
}

export {throttle};