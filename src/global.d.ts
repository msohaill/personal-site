/// <reference types="@sveltejs/kit" />
declare module '$static/data/images.yaml' {
  const t: {
    [key: string]: {
      caption: string;
      location: string;
      date: Date;
    };
  };
  export default t;
}

declare module "macy" {
  export default class Macy {
    constructor(options: Options);
    on(event: string, callback: () => void): void;
    off(event: string, callback: () => void): void;
    remove(): void;
    reInit(): void;
    runOnImageLoad(func: () => void, everyLoad?: boolean): void;
    recalculate(refresh?: boolean, loaded?: boolean): void;
    recalculateOnImageLoad(waitUntilImageFinish?: boolean): void;
  }

  export interface Options {
    container: string;
    trueOrder?: boolean;
    waitForImages?: boolean;
    useOwnImageLoader?: boolean;
    debug?: boolean;
    mobileFirst?: boolean;
    columns?: number;
    margin?: Margin;
    breakAt?: Breakpoints;
    cancelLegacy?: boolean;
    useContainerForBreakpoints?: boolean;
  }

  export interface Breakpoints {
    [key: number]: { margin?: Margin; columns?: number } | number;
  }

  export type Margin =
    | {
        x: number;
        y: number;
      }
    | number;
}
