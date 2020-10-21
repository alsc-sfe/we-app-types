import { AppInstance, AppConfig } from './app';
import { BaseConstructor, BaseInstance, BaseConfig, BaseType } from './base';

export interface ProductConfig extends BaseConfig {
  parent?: ProductInstance;
  // 微应用列表
  url?: string; // 支持远程获取
  apps?: AppConfig[];
}

export interface ParserOpts {
  context?: any;
  [props: string]: any;
}
export type AppListParser = (appList: any, opts?: ParserOpts) => Promise<AppConfig[]>;
export type AppConfigParser = (appConfig: any, opts?: ParserOpts) => Promise<AppConfig>;

export interface Parser {
  appListParser: AppListParser;
  appConfigParser: AppConfigParser;
}

export interface ProductConstructor extends BaseConstructor {
  new (config: ProductConfig): ProductInstance;
}

export interface ProductInstance extends BaseInstance {
  type: BaseType.product|BaseType.root;

  parent: ProductInstance;

  registerApps(cfgs: string|AppConfig[]|any, parser?: Parser|AppListParser): Promise<AppInstance[]>;

  getApp(appName: string): AppInstance;

  registerApp(config: AppConfig, parser?: AppConfigParser): Promise<AppInstance>;
}
