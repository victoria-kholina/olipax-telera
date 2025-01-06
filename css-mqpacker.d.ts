declare module 'css-mqpacker' {
    import { Plugin } from 'postcss';

    interface MQPackerOptions {
        sort?: boolean | ((a: string, b: string) => number);
    }

    const mqpacker: (options?: MQPackerOptions) => Plugin;
    export default mqpacker;
}