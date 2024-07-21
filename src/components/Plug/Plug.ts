import Handlebars from 'handlebars';
import './styles.css';
import { Block } from '../Block';
export class Plug extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super('div', props);
    }

    render() {
        return Handlebars.compile(
            `<div type="submit" class="plug body2 grayText"> Выберите чат, чтобы отправить сообщение </div>`
        );
    }
}

// function render(query, block) {
//     const root = document.querySelector(query);
//     root.appendChild(block.getContent());
//     return root;
// }
//
// const button = new Plug({
//     text: 'Click me'
// });

// app — это class дива в корне DOM
// render('.app', button);

export default Handlebars.compile(
    `<div type="submit" class="plug body2 grayText"> Выберите чат, чтобы отправить сообщение </div>`
);
