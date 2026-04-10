import { HttpInterceptorFn } from '@angular/common/http';
import { API_KEY } from '../../../enviroments/environment';


export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {

  const modifyReq = req.clone({
    setParams: {
      'x-cg-demo-api-key': API_KEY
    }
  })

  return next(modifyReq);
};
