import { TranslateLoader } from "ng2-translate/ng2-translate";
import { Observable } from "rxjs/Observable";

import * as fs from 'fs';

export class TranslateUniversalLoader implements TranslateLoader {

  constructor(private prefix: string = 'i18n', private suffix: string = '.json') {

  }

  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      console.log(`${this.prefix}/${lang}${this.suffix}`);
      observer.next(JSON.parse(fs.readFileSync(`${this.prefix}/${lang}${this.suffix}`, 'utf8')));
      observer.complete();
    });
  }

}
