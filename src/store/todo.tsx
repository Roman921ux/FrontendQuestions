import { makeAutoObservable } from 'mobx'

export interface TodoBody {
  title: string;
  toggle: boolean;
}
export interface TodoItem extends TodoBody {
  id: string;
}

class TodoStore {
  todos: TodoItem[] = [];
  loading: string = 'idle'

  constructor() {
    // makeAutoObservable(this)
    makeAutoObservable(this, {}, { deep: true })
    // deep для глубоко отслеживания изменений состояния 
  }

  addTodo(body: TodoBody) {
    const todo = { ...body, id: Math.random().toString(36).substr(2, 9) }
    this.todos.push(todo)
  }
  removeTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
  completedTodo(id: string) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, toggle: !todo.toggle }
      }
      return todo
    })
  }

  fetchTodos() {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(res => res.json())
      .then(data => {
        this.todos = [...this.todos, ...data]
      })
  }
}

export default new TodoStore