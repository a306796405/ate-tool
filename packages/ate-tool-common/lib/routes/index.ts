import panel from './dynamic/panel'
import sidebar from './dynamic/sidebar'

// const modules = import.meta.glob('./dynamic/**/*.{json,ts,js}', { eager: true });

// export function getRoutes() {
//     const route = {}
//     Object.keys(modules).forEach((key) => {
//     const mod = (modules as Record<string, TRouteItem>)[key].default || {};
//         console.log(key, mod)
//        Object.assign(route, mod)
//     });

//     return route
// }

export default {
  sidebar,
  panel
}

// type TRouteItem = {
//     name: string;
//     path: string;
//     [key: string]: string | TRouteItem | undefined;
// }
