declare module '*.svg' {
    const content: string;
    export default content;
}

declare type TFormKey = keyof typeof document.forms;
