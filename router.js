
class Router{
  constructor(routes){
    this.routes = routes;
    this._loadInitialRoute();
  }

loadRoute(...urlSegs){
  const matchedRoute = this._matchUrlToRoute(urlSegs);

  const url = `/${urlSegs.join('/')}`;
  history.pushState({},'this works', url);

  const routerOutElm = document.querySelectorAll('[data-router]')[0];
  routerOutElm.innerHTML = matchedRoute.template;
}


_matchUrlToRoute(urlSegs){ //segs: segments
  const matchedRoute = this.routes.find(route => { // slice(1): hacemos el CORTE desde el indice 1
    // le sacamos la info de a partir del index 1 
    const routePathSegs = route.path.split('/').slice(1) // dividimos la ruta desde la parte desde el /
  
    // hacemos comparacion de largo , si es diferente del largo al largo de lo que le pasamos 
    if (routePathSegs.length !== urlSegs.length){
      return false;
    }
    
    return routePathSegs
      .every((routePathSegs, i ) => routePathSegs === urlSegs[i]); // [i] ira iterando desde el 0 hasta el ultimo elemento en el segmento 
  });
  return matchedRoute;
}

_loadInitialRoute() {
  const pathNameSplit = window.location.pathname.split('/'); // window save donde esta el navegador en el momento / .split(/): indica donde debemos comenzar
  const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1): '';
 
  this.loadRoute(...pathSegs); // vamos a tener nuestra ruta actual
  }
}