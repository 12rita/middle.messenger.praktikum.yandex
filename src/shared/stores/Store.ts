import { set } from '@shared/utils';
import { EventBus } from '@shared/components';

export enum StoreEvents {
    Updated = 'updated',
    chatsUpdated = 'chatsUpdated'
}

class Store extends EventBus {
    state: TObject = {};

    public getState() {
        return this.state;
    }
    public set(path: string, value: unknown) {
        this.state = set(this.state, path, value) as TObject;
        try {
            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.error(e);
        }
    }
}

export default new Store();
