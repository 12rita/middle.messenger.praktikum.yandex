import styles from './styles.module.css';

export const template = `<div class="${styles.layoutError}">
  <h1 class="bigText ${styles.errorCode}">{{errorCode}}</h1>
  <h2 class="bigSubtext ${styles.errorText}">{{errorText}}</h2>

  {{{textButton}}}
</div>`;
