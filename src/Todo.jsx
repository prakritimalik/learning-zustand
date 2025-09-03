import useTodoStore from './stores/todoStore'
import { useState } from 'react'

const Todo = () => {
    const [text, setText] = useState('')
    const { todos, addTodo, deleteTodo, toggleTodo, clearCompleted, clearTodo } = useTodoStore()


    return (
        <div className="todo-container">
            <h1>Todos</h1>
            
            <form className="todo-form" onSubmit={(e) => { e.preventDefault(); addTodo(text); setText('') }}>
                <input 
                    className="todo-input"
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new todo..."
                />
                <button type="submit">Add Todo</button>
            </form>

            <div className="todo-list">
                {todos.map((t) => (
                    <div key={t.id} className={`todo-item ${t.completed ? 'completed' : ''}`}>
                        <div className="todo-content">
                            <h3 className={`todo-title ${t.completed ? 'completed' : ''}`}>
                                {t.title}
                            </h3>
                        </div>
                        <div className="todo-actions">
                            <button 
                                className="btn-toggle" 
                                onClick={() => toggleTodo(t.id)}
                            >
                                {t.completed ? '✓' : '○'}
                            </button>
                            <button 
                                className="btn-delete" 
                                onClick={() => deleteTodo(t.id)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="todo-actions">
                <button className="btn-clear" onClick={() => clearTodo()}>
                    Clear All
                </button>
                <button className="btn-clear" onClick={() => clearCompleted()}>
                    Clear Completed
                </button>
            </div>
        </div>
    )
}

export default Todo;
