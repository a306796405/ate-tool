export type AppRouteRecordRaws = {
  // [key: string]: Pick<RouteRecordRaw, 'path' | 'name' | 'meta'>
  [key: string]: {
    path: string;
    name: string;
    meta: {
      title: string;
    };
  };
};
