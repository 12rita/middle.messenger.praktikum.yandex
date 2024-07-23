import styles from './styles.module.css';

export const template = `<div class=${styles.formWrapper}>
    <h1 class=${styles.title}>{{title}}</h1>
    <form  class=${styles.form} id="{{id}}" name="{{name}}">
    {{#each inputs}}
    {{{this}}}
    {{/each}}
    </form>
    <div class=${styles.signInFooter}>
    {{{submitButton}}}
    {{{textButton}}}
    </div>`;
