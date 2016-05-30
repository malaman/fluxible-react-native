import {createReducerStore} from 'fluxible-reducer-store';

export const handlers = {
    INCREMENT_EVENT: 'INCREMENT_EVENT',
    DECREMENT_EVENT: 'DECREMENT_EVENT'
};

export default createReducerStore({
    
    storeName: 'IncrementStore',

    initialState: {
        count: 0
    },

    reducers: {
        [handlers.INCREMENT_EVENT]: (state) => ({...state, count: state.count + 1}),
        [handlers.DECREMENT_EVENT]: (state) => ({...state, count: state.count - 1})
    }
});
