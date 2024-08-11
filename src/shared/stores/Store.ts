import { set } from '@shared/utils';
import { EventBus } from '@shared/components';

export enum StoreEvents {
    Updated = 'updated',
    chatsUpdated = 'chatsUpdated'
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
    state: TObject = {};

    public getState() {
        return this.state;
    }
    public set(path: string, value: unknown) {
        set(this.state, path, value);
        console.log(JSON.stringify(this.state));

        // метод EventBus
        this.emit(StoreEvents.Updated);
    }
}

export default new Store();
