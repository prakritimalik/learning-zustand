import useStore from './stores/counterStore';

function Counter() {
    const { count, increment, decrement, reset } = useStore();

    return (
        <>
            <h1>Counter: {count}</h1>
            <button onClick={increment}>➕ Increment</button>
            <button onClick={decrement}>➖ Decrement</button>
            <button onClick={reset}>Reset</button>
        </>
    )
}

export default Counter
