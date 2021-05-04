import { observer } from 'mobx-react-lite'
import { values } from 'mobx'
import './App.css';

const randomId = () => Math.floor(Math.random() * 2**32)

const App = observer(props => (
  <div>
    <button onClick={e => props.store.addTodo(randomId(), "New Task")}>Add Task</button>
    {values(props.store.todos).map(todo => (
      <div key={todo.id}>
        <input type="checkbox" checked={todo.done} onChange={e => todo.toggle()} />
        <input type="text" value={todo.name} onChange={e => todo.setName(e.target.value)} />
      </div>
    ))}
  </div>
))

export default App;
