import { ParseLocationParams, Locate } from './locate';
import { RouterType } from './enum';

export interface RouteObj {
  path?: string;
  // 兼容老的版本
  pathname?: string;
  absolute?: boolean;

  query?: object|string;
  exact?: boolean;
  strict?: boolean;
  [prop: string]: any;
}

// true, 始终匹配
// /home/:id, 匹配 /home/123
// /home/:id, 当前微应用内路由
// ~/user/home/:id, 当前产品内路由，在basename为空的情况下，微应用名称为user
export type SimpleRoute = true | string | RouteObj;
export type Route = SimpleRoute | SimpleRoute[];

export interface ParseRoute {
  route: Route;
  basename?: string;
  appBasename?: string;
}

export interface ParseRouteParams extends ParseLocationParams {
  route: Route;
}

export interface RouteMatchParams {
  route?: Route;
  routeIgnore?: Route;
  locate?: Locate;
  exact?: boolean;
  strict?: boolean;
  basename?: string;
  appBasename?: string;
  routerType?: RouterType;
  [prop: string]: any;
}

export type RouteMatch = (params: RouteMatchParams) => boolean;
