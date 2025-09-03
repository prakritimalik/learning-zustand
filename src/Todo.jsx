import useTodoStore from './stores/todoStore'
import { useState } from 'react'

const Todo = () => {
    const [text, setText] = useState('')
    const { todos, addTodo, deleteTodo, toggleTodo, clearCompleted, clearTodo } = useTodoStore()


    return <>
        <h1>Todos</h1>
        {todos.map((t) => {
            return <div key={t.id}>
                <div>
                    <h3 style={{
                        textDecoration: t.completed ?
                            'line-through' : 'none'
                    }}> {t.title}</h3>
                    <button onClick={() => toggleTodo(t.id)}>Toggle todo</button>
                    <button onClick={() => deleteTodo(t.id)}> Delete todo</button>


                </div>
            </div>
        })}
        <form onSubmit={((e) => { e.preventDefault(); addTodo(text); setText('') })}>
            <input type="text" value={text} onChange={((e) => setText(e.target.value))} />
            <button type="submit">Add todo</button>
        </form>

        <button onClick={() => clearTodo()}> Reset todos</button>
        <button onClick={() => clearCompleted()}>Clear completed</button>

    </>
}

export default Todo;
