import './styles.css';

export const template = `<div class="formWrapper">
    <h1 class="title">{{title}}</h1>
    <form  class="form" id="{{id}}" name="{{name}}">
    {{#each inputs}}
    {{{this}}}
    {{/each}}
    </form>
    <div class="signInFooter">
    {{{submitButton}}}
    {{{textButton}}}
    </div>`;
