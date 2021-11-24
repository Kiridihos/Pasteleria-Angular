export class ValidationHelper {
  static empty(object:any):boolean {
    let values = Object.values(object);
    for (let value in values) {
      if (value === null || value === '') {
        return true;
      }
    }
    return false;
  }

  static spaceValidate(value: any):boolean {
    if (typeof value === 'string') {
      if (
        value.slice(-1)[0].match(/[\s]/) ||
        value.slice(0)[0].match(/[\s]/)
      ) {
        return true;
      }
    }
    return false;
  }

  static spaces(object: any): boolean {
    let values = Object.values(object);
    for (let value of values) {
      if (ValidationHelper.spaceValidate(value)) {
        return true;
      }
    }
    return false;
  }

  static numbers(object: any): boolean {
    if (!object.toString().match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)) {
      return true;
    }
    return false;
  }
}
