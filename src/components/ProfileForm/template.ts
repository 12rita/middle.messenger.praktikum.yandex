import styles from './styles.module.css';

export const template = `

 <form  class=${styles.form} id="{{id}}" name="{{name}}">
    {{#each inputs}}
    {{{this}}}
    {{/each}}
    
     
    </form>  

`;
