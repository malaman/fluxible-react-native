import {handlers} from '../stores/incrementStore';

export function increment(context) {
    return context.dispatch(handlers.INCREMENT_EVENT);
}

export function decrement(context) {
    return context.dispatch(handlers.DECREMENT_EVENT);
}
