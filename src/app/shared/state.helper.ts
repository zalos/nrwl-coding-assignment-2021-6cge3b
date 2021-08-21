export function newState(state: any, newData: any): any {
    return Object.assign({}, state, newData);
}

/* don't think this is needed, this was in a tutorial but this can be done this way:

    return newState(state, {prop: 'new state value});

    vs

    return {...state, prop: 'new state value'}
*/