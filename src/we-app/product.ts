import { App, AppConfig } from './app';
import { CBase, Base, BaseConfig, BaseType } from './base';

export interface ProductConfig extends BaseConfig {
  parent?: Product;
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

export interface CProduct extends CBase {
  new (config: ProductConfig): Product;
}

export interface Product extends Base {
  type: BaseType.product;

  parent: Product;

  registerApps(cfgs: string|AppConfig[]|any, parser?: Parser|AppListParser): Promise<App[]>;

  getApp(appName: string): App;

  registerApp(config: AppConfig, parser?: AppConfigParser): Promise<App>;
}
