import { ProductInstance } from '../we-app/product';
import { AppInstance } from '../we-app/app';
import { PageInstance, PageConfig } from '../we-app/page';
import { BaseType } from '../we-app/base';
import { Render } from '../we-app/render';
import { ResourceLoader } from '../resource-loader';
import { RouterType } from '../routing/enum';
import { TPageContainer } from '../type';

export enum LifecycleHookEnum {
  page = 'page',
  beforeRouting = 'beforeRouting',
  beforeLoad = 'beforeLoad',
  afterLoad = 'afterLoad',
  beforeMount = 'beforeMount',
  onMountPrevented = 'onMountPrevented',
  afterMount = 'afterMount',
  beforeUnmount = 'beforeUnmount',
  afterUnmount = 'afterUnmount',
  onError = 'onError'
}

export interface HookDescRunnerParam<HookOpts> {
  // 当前页面对应范围
  pageScope: SafeHookScope;
  // 当前匹配扩展对应工作范文
  hookScope: SafeHookScope;
  // 当前匹配扩展的页面对应范围
  hookPageScope?: SafeHookScope;
  opts?: HookOpts;
  matched?: boolean;

  hookPages?: string[];

  nextHookDescRunnerParam?: HookDescRunnerParam<HookOpts>;

  errorHandler?: (error: Event) => Promise<any>;

  context?: any;

  // 错误信息
  error?: Error;

  [prop: string]: any;
}

export type HookDescEntity<HookOpts> = (lifecycleHook: LifecycleHookEnum) => HookDescRunner<HookOpts>|PageConfig;

export type LifecycleHookRunner<HookOpts> = (props: HookDescRunnerParam<HookOpts>) => Promise<undefined|boolean|any>;

export interface HookDescRunner<HookOpts> {
  // 上一个匹配scope需要做的清理
  clear?: LifecycleHookRunner<HookOpts>;
  // 当前匹配scope需要执行的逻辑
  exec?: LifecycleHookRunner<HookOpts>;
}

export interface HookOpts {
  page?: PageConfig;
}

type LifecycleHookName = Exclude<keyof typeof LifecycleHookEnum, 'page' | 'beforeRouting'>;

export type HookDesc<HookOpts> = {
  [hook in LifecycleHookName]?: LifecycleHookRunner<HookOpts>;
} & {
  hookName?: string;
  // 定义页面
  page?: PageConfig;
  // 路由跳转
  beforeRouting?: LifecycleHookRunner<HookOpts> | HookDescRunner<HookOpts>;
};

export type UsingScope = string|HookScope;
export interface UsingHookOpts<HookOpts> {
  hookName: string;
  // 自定义插件
  hookDesc?: HookDesc<HookOpts>;
  // 配置
  config?: HookOpts;
  // 工作范围
  scopes?: UsingScope[];
}

export interface HookScope {
  scopeName?: string;

  productName?: string;
  appName?: string;
  pageName?: string;

  hookName?: string;

  product?: ProductInstance;
  app?: AppInstance;
  page?: PageInstance;

  root?: Window;
  sandbox?: any;

  [prop: string]: any;
}

export type UsingHooksConfigs = (UsingHookOpts<any>|string)[]|null;

export interface SafeHookScope {
  scopeName?: string;

  productName?: string;
  appName?: string;
  pageName?: string;

  hookName?: string;

  productType?: BaseType;

  getConfig?: (pathname?: string) => any;
  getData?: (pathname?: string, traced?: boolean) => any;
  getResourceLoader?: () => ResourceLoader<any>;
  getRender?: () => Render;
  getPageContainer?: () => TPageContainer;
  getRouterType?: () => RouterType;

  setData?: (pathname: string|object, value?: any) => void;
  setPageContainer?: (pageContainer: TPageContainer) => void;
  setCustomProps?: (customProps: object) => void;

  root?: Window;
  sandbox?: any;

  [prop: string]: any;
}
