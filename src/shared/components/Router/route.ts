import { IBlock } from '../Block';
import { Router } from './router.ts';
import { TPageBlock } from './types';

function render(query: string, block: IBlock) {
    const root = document.querySelector(query);
    root && root.appendChild(block.getContent());
    return root;
}

const deleteChild = (query: string, block: IBlock) => {
    const root = document.querySelector(query);
    root && root.removeChild(block.getContent());
};

export class Route {
    _pathname: string;
    _blockClass;
    _block: IBlock | null;
    _props;
    constructor(
        pathname: string,
        view: TPageBlock,
        props: { rootQuery: string }
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            deleteChild(this._props.rootQuery, this._block);
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            const router = new Router(this._props.rootQuery);
            this._block = new this._blockClass({
                history: router
            }) as IBlock;

            render(this._props.rootQuery, this._block);
            return;
        }

        render(this._props.rootQuery, this._block);
    }
}
