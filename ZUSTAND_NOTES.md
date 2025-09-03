# Zustand Learning Notes

## What is Zustand?

**Problem it solves:** React's `useState` and Context become cumbersome for sharing state across many components. Prop drilling gets messy, and Context re-renders everything when any value changes.

**Zustand's solution:** A tiny (2kb) store that any component can subscribe to, with fine-grained reactivity.

**Key benefits:**
- Zero boilerplate
- No providers needed
- Components only re-render when their specific data changes
- TypeScript support built-in
- Middleware ecosystem

## Core Concepts We Learned

### 1. Basic Store Creation

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  // State
  count: 0,
  
  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }) // Direct assignment when not using previous state
}))
```

**Key patterns:**
- `set((state) => ({ newState }))` - When you need current state
- `set({ newState })` - When setting absolute values
- Actions are just functions that call `set()`

### 2. Using Stores in Components

```javascript
function Counter() {
  const { count, increment, decrement, reset } = useStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

**No providers needed!** Just import and use like any custom hook.

### 3. Complex State (Arrays & Objects)

**Todo Store Example:**
```javascript
const useTodoStore = create((set) => ({
  todos: [],
  
  // Adding to arrays
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), title: text, completed: false }]
  })),
  
  // Updating arrays with .map()
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((t) => 
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  })),
  
  // Filtering arrays
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((t) => t.id !== id)
  })),
  
  // Complex filtering
  clearCompleted: () => set((state) => ({
    todos: state.todos.filter((t) => !t.completed)
  }))
}))
```

**Patterns for complex state:**
- Use spread operator for immutable updates
- `.map()` for updating items in arrays
- `.filter()` for removing items
- Object spread for updating nested objects

### 4. Persistence (Automatic localStorage)

```javascript
import { persist } from 'zustand/middleware'

const useTodoStore = create(persist(
  (set) => ({
    // Your normal store
    todos: [],
    addTodo: (text) => set(/* ... */)
  }),
  {
    name: 'todo-storage' // localStorage key
  }
))
```

**What happens:**
- Automatically saves to localStorage after every `set()` call
- Automatically loads from localStorage when store initializes
- Handles JSON serialization/deserialization
- Zero extra code needed in your actions

### 5. Selective Persistence (partialize)

```javascript
const useStore = create(persist(
  (set) => ({
    // Data to persist
    todos: [],
    user: { name: 'John' },
    
    // UI state that shouldn't persist
    isLoading: false,
    currentFilter: 'all',
    showModal: false,
    
    // Actions...
  }),
  {
    name: 'app-storage',
    // Only save specific parts
    partialize: (state) => ({ 
      todos: state.todos,
      user: state.user 
    })
    // isLoading, currentFilter, showModal will reset on page refresh
  }
))
```

**Use cases:**
- Save: User data, app data, preferences
- Don't save: Loading states, temporary UI state, form data

## Zustand vs Alternatives

### vs Redux
| Zustand | Redux |
|---------|--------|
| 2kb bundle | ~20kb with dependencies |
| No boilerplate | Actions, reducers, dispatchers |
| Direct state updates | Immutable updates required |
| No provider | Provider required |
| Learning curve: 1 hour | Learning curve: weeks |

### vs Context API
| Zustand | Context |
|---------|---------|
| Selective re-renders | All consumers re-render |
| No provider hell | Nested providers |
| Built-in persistence | Manual localStorage |
| Performance optimized | Can cause performance issues |

### When to use Zustand
- ✅ Small to medium apps
- ✅ Need simple state management
- ✅ Want minimal boilerplate
- ✅ Team values simplicity
- ✅ Rapid prototyping

### When NOT to use Zustand
- ❌ Need time-travel debugging
- ❌ Complex middleware requirements
- ❌ Team already invested in Redux
- ❌ Need strict patterns/structure

## Best Practices Learned

### 1. Store Structure
- Keep actions close to related state
- Use descriptive action names
- Group related functionality

### 2. State Updates
- Always return new objects/arrays (immutability)
- Use spread operator for updates
- Don't mutate existing state

### 3. Component Usage
- Destructure only what you need from the store
- Components auto-subscribe to used state properties
- No manual subscription management needed

## Interview Questions & Answers

**Q: What is Zustand and why would you use it?**
**A:** Zustand is a lightweight (2kb) state management library for React. It solves prop drilling and Context re-render issues with minimal boilerplate. You create stores with `create()`, use them like custom hooks, and get automatic persistence and middleware support.

**Q: How do you update state in Zustand?**
**A:** Use the `set()` function. For new state: `set({ count: 5 })`. For updates based on current state: `set((state) => ({ count: state.count + 1 }))`. Always return new objects for immutability.

**Q: How does persistence work?**
**A:** Import `persist` from `zustand/middleware` and wrap your store. It automatically saves to localStorage after every state change and loads on app startup. Use `partialize` to choose which parts of state to persist.

**Q: When would you choose Zustand over Redux?**
**A:** For small-medium apps where you want simplicity over structure. When you need quick setup, minimal learning curve, and don't require complex debugging tools. Redux is better for large apps with complex state logic and team standards.

---

**Status:** Fundamentals mastered ✅ Ready for Styled Components!