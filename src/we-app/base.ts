import { Resource, ResourceLoader } from '../resource-loader';
import { UsingHooksConfigs, HookScope, UsingScope } from '../hooks';
import { TPageContainer } from '../type';
import { Render } from './render';
import { RouterType } from '../routing/enum';

export interface BaseConfig {
  name?: string;
  type?: BaseType;
  parent?: Base;

  url?: Resource|Resource[];

  hooks?: UsingHooksConfigs;

  [prop: string]: any;
}

export enum BaseType {
  root = 'root',
  product = 'product',
  app = 'app',
  page = 'page'
}

export type CBase = new (config?: BaseConfig) => Base;

export interface Base {
  type: BaseType;

  name: string;

  parent: Base;

  hookName: string;

  // 执行
  start(): void;

  compoundScope(base: Base, scope?: HookScope|{}): HookScope;

  getInited(): void;

  requireChildrenInited(): Promise<boolean>;

  getConfig(pathname?: string): any;

  setConfig(config: BaseConfig|string, value?: any): void;

  getData(pathname: string, traced?: boolean|false): any;

  setData(pathname: string|symbol|object, data?: any): void;

  usingHooks(params: UsingHooksConfigs, scopes?: HookScope[]): void;

  configHooks(params: UsingHooksConfigs, scopes?: HookScope[]): void;

  getResourceLoader<T>(): ResourceLoader<T>;

  setResourceLoader(resourceLoader: ResourceLoader<any>, scopes?: UsingScope[]): void;

  getPageContainer(): TPageContainer;

  setPageContainer(pageContainer: TPageContainer, scopes?: UsingScope[]): void;

  getRender(): Render;

  setRender(render: Render, scopes?: UsingScope[]): void;

  setSandbox(sandbox: any, scopes?: UsingScope[]): void;

  getSandbox(): any;

  getRouterType(): RouterType;
}
