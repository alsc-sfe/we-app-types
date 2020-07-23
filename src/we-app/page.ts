import { CBase, Base, BaseConfig, BaseType } from './base';
import { HookScope } from '../hooks';
import { App } from './app';
import { Resource } from '../resource-loader';
import { Route } from '../routing';

export interface PageConfig extends BaseConfig {
  parent?: App;

  activityFunction?: ActivityFunction;

  // 页面标题
  // 规范：https://yuque.antfin-inc.com/ele-fe/zgm9ar/lmk4t9
  title?: string;
  // 路由的定义，始终显示 true, 微应用内相对路径 /page, 绝对路径 ~/product/weapp/page
  path?: Route;
  route?: Route;
  routeIgnore?: Route;

  // 一般为一个js、一个css
  url?: Resource|Resource[];

  customProps?: object;
}

export type ActivityFunction = (location?: Location) => boolean;

export interface LifecycleParams {
  customProps?: object;
  scope?: HookScope;
  component?: any;
  [prop: string]: any;
}

export interface CPage extends CBase {
  new (config?: PageConfig): Page;
}

export interface Page extends Base {
  type: BaseType.page;

  parent: App;

  getAppBasename(): string;

  getBasename(): string;

  makeActivityFunction(): ActivityFunction;

  setCustomProps(customProps: any): void;
}
