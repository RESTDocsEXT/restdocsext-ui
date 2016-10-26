
import { Injectable } from '@angular/core';

const METHOD_MAP = {
  'GET': 'success',
  'PUT': 'primary',
  'POST': 'info',
  'DELETE': 'danger',
  'default': 'warning'
};

@Injectable()
export class StylesService {

  getMethodColor(httpMethod: string): string {
    let upper = httpMethod.toUpperCase();
    return METHOD_MAP[upper] ? METHOD_MAP[upper] : METHOD_MAP['default'];
  }

  getStatusColor(status: number): string {
    if (status >= 200 && status < 400) {
      return 'success';
    } else if (status >= 400 && status < 600) {
      return 'danger';
    } else {
      return 'info';
    }
  }
}
