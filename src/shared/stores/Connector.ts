import { Block, IProps } from '@shared/components';
import store, { StoreEvents } from './Store.ts';
import { isEqual } from '@shared/utils';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function connect(mapStateToProps: (state: TObject) => TObject) {
    return function <
        C extends new (args: P) => Block<P>,
        P extends IProps = any
    >(Component: C) {
        //@ts-expect-error some kind of known error that I have no idea of how to fix
        return class extends Component {
            constructor(props: P) {
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                });
            }
        };
    };
}
