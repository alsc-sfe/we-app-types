import { RouterType } from './enum';
import { Route } from './route';

export type Locate = string | Location | AppLocation;

export type IAppLocation = new (loc: Locate) => AppLocation;

export interface AppLocation {
  routerType: RouterType;

  pathname: string;

  basename: string;

  appBasename: string;

  search: string;

  query: object;

  params: object;
}

export interface ParseLocationParams {
  locate: Locate;
  routerType: RouterType;
  basename: string;
  route?: Route;
  [prop: string]: any;
}

export interface GetGotoHrefParams {
  to: Route;
  routerType?: RouterType;
  basename?: string;
  appBasename?: string;
}
