# 探究Component

[[toc]]

## 什么是React 组件？

React组件是React框架中的基本构建块，用于构建用户界面。它们是**可重用的**、**独立的**和**可组合的**，可以接受输入（称为props）并返回描述UI的元素。

React组件可以是函数组件或类组件。

函数组件是一个仅接受props并返回React元素的JavaScript函数，而类组件是一个继承自React.Component类的JavaScript类，它可以包含状态和生命周期方法。

## 函数组件底层逻辑

在React 16.8及更高版本中，函数组件支持Hooks来管理内部状态和其他副作用，这使得函数组件能够完全取代类组件。那么函数组件与类组件相比，有什么优势呢？

1. 通常比类组件更简洁，语法更清晰易懂
2. 只接受props作为输入，没有内部状态或生命周期方法
3. 能够使用Hooks来管理内部状态和其他副作用
4. 性能比类组件好，因为函数组件不需要实例化组件类

那么React是如何调用函数组件的呢？其实主要分为以下几个步骤：

1. 定义函数组件：使用函数声明或函数表达式定义一个函数，函数名通常以大写字母开头，以便与普通函数区分开来。
2. 调用函数组件：将函数组件作为React元素来调用，传递props作为参数，例如`<MyComponent prop1="value1"/>` 
3. 创建虚拟DOM：React将函数组件转换为虚拟DOM，这个虚拟DOM是一个JavaScript对象，描述了组件的结构和属性。
4. 比较虚拟DOM：React将新的虚拟DOM与之前的虚拟DOM进行比较，以确定需要更新的部分。
5. 更新真实DOM：如果需要更新，React将虚拟DOM转换为真实DOM，并将其更新到浏览器中。

其实这个步骤与之前做讲的JSX渲染是相一致的。在函数组件中，React不需要实例化组件类，因为函数组件本身就是一个函数，所以React只需要调用这个函数即可。函数组件通常只接受props作为输入，并返回一个React元素来描述组件的外观，因此React可以很容易地将函数组件转换为虚拟DOM，并进行比较和更新。

## 组件通信方式

在函数式组件中，共有五种通信方式：

1. 使用props和callback函数
2. 使用ref引用
3. 借助全局状态管理库（如Redux或MobX）
4. 使用上下文（context）
5. 使用事件总线（Event Bus）

那么，让我们逐一介绍一下吧。

### 使用props和callback函数

在React中，使用props和callback函数时常见的组件通信方式，举个例子：

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <Child count={count} onClick={handleClick} />
    </div>
  );
}

function Child(props) {
  return (
    <button onClick={props.onClick}>
      Click me ({props.count})
    </button>
  );
}
```

在这个例子中，父组件通过props将count和handleClick方法传递给子组件，子组件通过props接受这些数据和方法，并在按钮被点击时调用handleClick方法来更新count的值。

### 使用ref引用

该通信方式能够让父组件访问子组件的属性和方法，从而实现更灵活的组件交互。

```jsx
function Parent() {
  const childRef = useRef(null);

  function handleClick() {
    childRef.current.focus();
  }

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>
        Focus child input
      </button>
    </div>
  );
}

const Child = forwardRef((props, ref) => {

  return (
    <div>
      <input ref={ref} {...props} />
    </div>
  )
})
```

在这个例子中，父组件创建了一个childRef对象，并将其传递给子组件，子组件使用forwardRef函数将ref对象转发给input元素。

使用ref引用组件可以让父组件访问子组件的属性和方法，但是需要注意的是，这种方式会破坏组件的封装性和可移植性，因此应该谨慎使用。

### 借助全局状态管理库（如Redux或MobX）

这里我们浅浅聊一下全局状态管理库，因为深入聊的话，就又是一篇博文。

全局状态管理库（例如Redux或Mobx）可以让多个组件共享状态，并提供了一些管理状态的工具和规范，从而实现组件之间的通信。具体来说，全局状态管理库的基本思想是将应用程序的状态集中存储在一个全局的store中，组件可以通过store来访问和修改状态，从而实现组件之间的通信。

### 使用上下文（context）

该通信方式可以让组件在不通过props层层传递的情况下共享数据。具体来说，上下文提供了一种在组件树中传递数据的方法，父组件可以通过上下文将数据传递给子组件，子组件可以通过useContext Hook来获取上下文中的数据，从而实现组件之间的通信。举个例子：

1. 创建上下文对象：

```jsx
import { createContext } from 'react';

const MyContext = createContext({count: 0});
```

1. 在父组件中提供上下文：

```jsx
import { useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <MyContext.Provider value={{count}}>
      <Child />
    </MyContext.Provider>
  );
}
```

1. 在子组件中消费上下文：

```jsx
import { useContext } from 'react';

function Child() {
  const store = useContext(MyContext);

  return (
    <p>Count: {store.count}</p>
  );
}
```

在这个例子中，我们使用useContext Hook来获取上下文中的count数据，并在组件中使用它。需要注意的是，上下文是一种全局的状态，因此应该谨慎使用，避免滥用上下文导致应用程序复杂度的提高。

### 使用事件总线（Event Bus）

该通信方式可以让任意组件向事件总线发送事件，并让其他组件监听这些事件，从而实现组件之间的通信。事件总线是一个中央事件处理器，它允许组件在不直接通信的情况下相互交互，组件可以向事件总线发送事件，事件总线会将这些事件广播给所有监听它的组件，从而实现组件之间的通信。举个例子：

1. 创建事件总线对象：

```jsx
import { EventEmitter } from 'events';

const eventBus = new EventEmitter();
```

1. 在发送事件的组件中发送事件：

```jsx
function Sender() {
  function handleClick() {
    eventBus.emit('myEvent', 'Hello, world!');
  }

  return (
    <button onClick={handleClick}>Send event</button>
  );
}
```

1. 在接收事件的组件中监听事件：

```jsx
import { useEffect, useState } from 'react';

function Receiver() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function handleEvent(data) {
      setMessage(data);
    }

    eventBus.on('myEvent', handleEvent);

    return () => {
      eventBus.off('myEvent', handleEvent);
    };
  }, []);

  return (
		<div>
			<Sender />
			<p>Received message: {message}</p>
		</div>
  );
}
```

通过事件总线，任意组件都可以向事件总线发送事件，并让其他组件监听这些事件，从而实现组件之间的通信。需要注意的是，事件总线是一种全局的状态，因此应该谨慎使用，避免滥用事件总线导致应用程序复杂度的提高。

## 浅谈组件强化方式

通过强化方式，可以让React函数组件具有更加丰富的功能和更高的性能，以满足不同的组件需求。当然，组件的强化方式有很多种，在这里，我们简单介绍一下两种比较重要的强化方式。

### 自定义Hooks

Hooks是React16.8版本引入的新特性，它可以让函数组件具有类组件的能力，例如状态管理、生命周期函数等。通过使用useState、useEffect、useContext等Hooks，函数组件可以更加方便地管理状态、处理副作用和访问上下文等功能。当然，对于自定义Hooks，我后续会详细介绍自定义Hooks原理和编写方式。

### 使用高阶组件（HOC）

高阶组件是一个函数，它接受一个组件作为参数，并返回一个新的组件。通过使用高阶组件，可以将一些通用的逻辑封装在高阶组件中，从而提高代码的复用性和可维护性。例如，可以使用withRouter高阶组件来将路由相关的props传递给组件，或使用connect高阶组件来连接Redux store。当然，这节也一样，我后续会详细介绍高阶组件的原理和编写方式。

## 小结

React函数组件可以通过使用Hooks来管理内部状态和其他副作用，也可以通过props、ref、全局状态管理库、上下文和事件总线等方式实现组件之间的通信。同时，自定义Hooks和高阶组件是常用的组件强化方式，可以提高代码的复用性和可维护性。
