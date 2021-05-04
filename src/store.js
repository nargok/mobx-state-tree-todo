import { types, getSnapshot } from "mobx-state-tree"

const Todo = types
  .model({
    id: types.identifierNumber,
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false)
  })
  .actions(self => {
    function setName(newName) {
      self.name = newName
    }

    function toggle() {
      self.done = !self.done
    }

    return { setName, toggle }
  })

const User = types.model({
  name: types.optional(types.string, "")
})

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
  })
  .actions(self => {
    function addTodo(id, name) {
      self.todos.set(id, Todo.create({ id, name }))
    }

    return { addTodo }
  })

let id = 1;

export const store = RootStore.create({
  users: {},
  todos: {
    "1": {
      id: id,
      name: "cook a cake",
      done: true
    }
  }
})