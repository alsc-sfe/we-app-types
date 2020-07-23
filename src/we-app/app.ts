import { Page, PageConfig } from './page';
import { Product } from './product';
import { CBase, Base, BaseConfig, BaseType } from './base';

export interface AppConfig extends BaseConfig {
  parent?: Product;

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

export interface CApp extends CBase {
  new (config: AppConfig): App;
}

export interface App extends Base {
  type: BaseType.app;

  parent: Product;

  registerPages(configs: PageConfig[]|[]): Promise<Page[]>;

  registerPage(cfg: PageConfig): Promise<Page>;

  filterPageConfigs(cfgs: PageConfig|PageConfig[]): PageConfig[];

  getPage(pageName: string): Page;
}
