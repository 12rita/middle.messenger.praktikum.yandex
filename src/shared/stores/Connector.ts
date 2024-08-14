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
                // сохраняем начальное состояние

                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние

                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        };
    };
}