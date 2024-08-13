import { set } from '@shared/utils';
import { EventBus } from '@shared/components';

export enum StoreEvents {
    Updated = 'updated',
    chatsUpdated = 'chatsUpdated'
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
    state: TObject = {};
    // user;
    // chatsPreview;
    // chat:{
    //     id: {
    //         lastMessage,
    //         messages,
    //         users
    //     }
    // }

    public getState() {
        return this.state;
    }
    public set(path: string, value: unknown) {
        this.state = set(this.state, path, value) as TObject;

        // метод EventBus
        this.emit(StoreEvents.Updated);
    }
}

export default new Store();
