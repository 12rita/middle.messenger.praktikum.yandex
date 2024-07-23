declare module '*.svg' {
    const content: string;
    export default content;
}

declare type TFormKey = keyof typeof document.forms;

declare type TInputType = 'password' | 'text';

declare type TVoid = () => void;

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
