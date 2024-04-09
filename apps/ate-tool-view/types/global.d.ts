export {};

declare global {
  const __webview_opts__: {
    publicPath: string;
    routePath: string;
  };

  interface VsCodeApi {
    postMessage(message: any): void;
    setState(state: any): void;
    getState(): any;
  }

  function acquireVsCodeApi(): VsCodeApi;
}
