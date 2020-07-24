import { PageInstance, PageConfig } from './page';
import { ProductInstance } from './product';
import { BaseConstructor, BaseInstance, BaseConfig, BaseType } from './base';

export interface AppConfig extends BaseConfig {
  parent?: ProductInstance;

  url?: string;
  // 子应用标题
  // 规范：https://yuque.antfin-inc.com/ele-fe/zgm9ar/lmk4t9
  title?: string;
  // 子应用描述
  description?: string;
  // 页面路由前缀，默认为/${name}，可以通过basename覆盖
  basename?: string;

  pages?: PageConfig[];

  filterPages?: (cfgs: PageConfig|PageConfig[]) => PageConfig|PageConfig[]|undefined;

  [prop: string]: any;
}

export interface AppConstructor extends BaseConstructor {
  new (config: AppConfig): AppInstance;
}

export interface AppInstance extends BaseInstance {
  type: BaseType.app;

  parent: ProductInstance;

  registerPages(configs: PageConfig[]|[]): Promise<PageInstance[]>;

  registerPage(cfg: PageConfig): Promise<PageInstance>;

  filterPageConfigs(cfgs: PageConfig|PageConfig[]): PageConfig[];

  getPage(pageName: string): PageInstance;
}
