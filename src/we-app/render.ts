import { SafeHookScope } from '../hooks';
import { RouterType } from '../routing/enum';
import { TPageContainer } from '../type';

export interface ApplicationCustomProps {
  pageScope?: SafeHookScope;
  appBasename?: string;
  basename?: string;
  routerType?: RouterType;
}
export interface RenderCustomProps extends ApplicationCustomProps {
  // 通过setContext传入的上下文
  context?: any;
  [prop: string]: any;
}
export interface Render {
  mount: (element: any, container: TPageContainer, customProps?: RenderCustomProps) => any;
  unmount: (container: TPageContainer, element: any, customProps?: RenderCustomProps) => any;
}
