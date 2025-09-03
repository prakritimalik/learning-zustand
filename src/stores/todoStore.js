
import { create } from 'zustand'
import { persist} from 'zustand/middleware'

const useTodoStore = create(persist(
    (set) => ({
    todos: [],
    addTodo: (text) => set((state) => ({
        todos: [...state.todos, { id: Date.now(), title: text, completed: false }]
    })),
    toggleTodo: (id) => set((state) => ({
        todos: state.todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    })),
    deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((t) => t.id !== id)
    })),
    clearCompleted: () => set((state) => ({ todos: state.todos.filter((t) => !t.completed) })),
    clearTodo: () => set(state => ({ todos: [] }))


}),
{name: 'todo-storage'}

))
export default useTodoStore