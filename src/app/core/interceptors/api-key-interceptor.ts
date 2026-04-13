import { HttpInterceptorFn } from '@angular/common/http';
import { API_KEY } from '../../../enviroments/environment';


export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('➡️ OUTGOING:', req.url, req.params);

  // attach current api_key to coingecko or pass!
  if (req.url.includes('api.coingecko.com')) {
    
    const modifyReq = req.clone({
      setHeaders: {
        'x-cg-demo-api-key': API_KEY
      }
    });
    
    return next(modifyReq);
  }

  return next(req);

};

