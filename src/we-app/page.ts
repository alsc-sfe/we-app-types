import { BaseConstructor, BaseInstance, BaseConfig, BaseType } from './base';
import { HookScope } from '../hooks';
import { AppInstance } from './app';
import { Resource } from '../resource-loader';
import { Route } from '../routing';

export interface PageConfig extends BaseConfig {
  parent?: AppInstance;

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

export interface PageConstructor extends BaseConstructor {
  new (config?: PageConfig): PageInstance;
}

export interface PageInstance extends BaseInstance {
  type: BaseType.page;

  parent: AppInstance;

  getAppBasename(): string;

  getBasename(): string;

  makeActivityFunction(): ActivityFunction;

  setCustomProps(customProps: any): void;
}
