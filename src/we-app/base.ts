import { Resource, ResourceLoader } from '../resource-loader';
import { UsingHooksConfigs, HookScope, UsingScope } from '../hooks';
import { TPageContainer } from '../type';
import { Render } from './render';
import { RouterType } from '../routing/enum';

export interface BaseConfig {
  name?: string;
  type?: BaseType;
  parent?: BaseInstance;

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

export type BaseConstructor = new (config?: BaseConfig) => BaseInstance;

export interface BaseInstance {
  type: BaseType;

  name: string;

  parent: BaseInstance;

  hookName: string;

  // 执行
  start(): void;

  compoundScope(base: BaseInstance, scope?: HookScope|{}): HookScope;

  getInited(): Promise<BaseInstance>;

  requireChildrenInited(): Promise<(BaseInstance|BaseInstance[])[]>;

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

  getSandbox(pageScope?: HookScope): any;

  getRouterType(): RouterType;

  [prop: string]: any;
}
