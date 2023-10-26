# jsx/no-missing-key

💼 This rule is enabled in the following configs: 🎨 `jsx-legacy`, 👍 `recommended-legacy`.

<!-- end auto-generated rule header -->

## Rule details

This rule aims to prevent missing key props on any element in an array. It will warn when an element in an array is missing a key prop.

### ❌ Incorrect

```tsx
const TodoList = ({ todos }) => (
    <ul>
        {todos.map((todo) => <Todo {...todo} />)}
    </ul>
);
```

### ✅ Correct

```tsx
const TodoList = ({ todos }) => (
    <ul>
        {todos.map((todo) => <Todo {...todo} key={todo.id} />)}
    </ul>
);
```

## Further reading

[react.dev why-does-react-need-keys](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
