declare module 'html2canvas' {
  interface Html2CanvasOptions {
    allowTaint?: boolean;
    backgroundColor?: string | null;
    canvas?: HTMLCanvasElement;
    foreignObjectRendering?: boolean;
    imageTimeout?: number;
    ignoreElements?: (element: HTMLElement) => boolean;
    logging?: boolean;
    onclone?: (clonedDoc: Document, element: HTMLElement) => void;
    proxy?: string;
    removeContainer?: boolean;
    scale?: number;
    useCORS?: boolean;
    width?: number;
    height?: number;
    windowWidth?: number;
    windowHeight?: number;
    x?: number;
    y?: number;
    scrollX?: number;
    scrollY?: number;
  }

  function html2canvas(
    element: HTMLElement,
    options?: Html2CanvasOptions
  ): Promise<HTMLCanvasElement>;

  export default html2canvas;
}

