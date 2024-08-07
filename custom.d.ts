declare module '*.svg' {
    const content: string;
    export default content;
}

declare type TInputType = 'password' | 'text' | 'email' | 'phone';

declare type TVoid = () => void;

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare type TObject<T = unknown> = {
    [key in string]: T;
};
