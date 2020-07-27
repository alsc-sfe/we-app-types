import { SafeHookScope, UsingScope } from './hooks';

declare global {
  interface Window {
    System: {
      import: (id: string) => Promise<any>;
      delete: (id: string) => boolean;
      [prop: string]: any;
    };
  }
}

export type ResourceFunction = () => Promise<any>;
// 参照tc39 proposal-import-attributes
export enum ResourceType {
  'jsfile' = 'jsfile',
  'jstext' = 'jstext',
  'cssfile' = 'cssfile',
  'csstext' = 'csstext',
  'html' = 'html',
  'htmltext' = 'htmltext'
}
export type ResourceWithType = [string, { with: { type: ResourceType } }];
export type Resource = string | Promise<any> | ResourceFunction | ResourceWithType;

export interface ResourceLoaderDesc<ResourceLoaderDescOpts> {
  mount: (
    resource: Resource|Resource[],
    // 沙箱从scope上获取，由Base创建
    activeScope?: SafeHookScope,
    opts?: ResourceLoaderDescOpts
  ) => Promise<any>;
  unmount: (
    resource: Resource|Resource[],
    activeScope?: SafeHookScope,
    opts?: ResourceLoaderDescOpts
  ) => Promise<any>;
}

export interface ResourceLoader<ResourceLoaderDescOpts> {
  desc?: ResourceLoaderDesc<ResourceLoaderDescOpts>;
  config?: ResourceLoaderDescOpts;
  scopes?: UsingScope[];
}
