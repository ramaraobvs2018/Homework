var Neckbone = {};

(function (ns, win) {
    /**
     * a routing library, not in the least bit similar to Backbone
     */
    function Router() {
        var me = this,
            routes = [],
            defaultResolve;

        me.when = registerRoute;
        me.otherwise = registerDefault;

        activate();

        function noop() {}

        // highly sophisticated route-to-path matching algorithm
        function evaluateRoute(route, path) {
            return route.parts.some(function (i) {
                return path.indexOf(i) === 0;
            });
        }

        // equally complex parameter parsing algorithm
        function parseRouteParams(route, path) {
            return path.substr(route.path.indexOf(':'));
        }

        // identify appropriate route definition 
        function resolveRoute(path) {
            var resolve = defaultResolve,
                params;

            routes.forEach(function (route) {
                if(evaluateRoute(route, path)) {
                    resolve = route.resolve;
                    params = parseRouteParams(route, path);
                }
            });

            (resolve || noop)(params);
        }

        // handle route or route definition change
        function onRoutingChange() {
            resolveRoute(window.location.hash.substr(1));
        }

        // start listening for changes in location hash
        function activate() {
            win.addEventListener('hashchange', onRoutingChange);
        }

        // add the specified route defintion 
        function registerRoute(path, callback) {
            routes.push({
                path: path,
                resolve: callback,
                parts: path.split(':')
            });

            return me;
        }

        // add default route definition and handle routing definition change
        function registerDefault(callback) {
            defaultResolve = callback;
            onRoutingChange();
        }
    }

    ns.Router = Router;
})(Neckbone, window);