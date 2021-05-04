import { types, getSnapshot } from "mobx-state-tree"
import './App.css';

const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setName(newName) {
      self.name = newName
    },

    toggle() {
      self.done = !self.done
    }
  }))

const User = types.model({
  name: types.optional(types.string, "")
})

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
  })
  .actions(self => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }))
    }
  }))

const store = RootStore.create({
  users: {}
})

store.addTodo(1, "Cook a cake!")
store.todos.get(1).toggle()

console.log(getSnapshot(store))

// const john = User.create();
// const eat = Todo.create({ name: "eat", done: true})

// console.log("John:", getSnapshot(john))
// console.log("Eat Todo:", getSnapshot(eat))

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
