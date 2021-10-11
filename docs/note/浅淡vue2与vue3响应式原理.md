# 浅淡vue2与vue3响应式原理

其实在vue官方文档中已经讲得十分明晰，我简单将其进行概括一下。

## 什么是响应式？

响应性是一种允许我们以声明式的方式去适应变化的编程范例。举例，A映射为B，A发生变化时，B根据映射关系产生相应的改变；同时，B发生变化时，A也会发生变化。

成为响应式需要解决三个问题：

1. **当一个值被读取时进行追踪**。
2. **当某个值改变时进行检测**。
3. **重新运行代码来读取原始值**。

##  Vue 如何知道哪些代码在执行

Vue 通过一个*副作用 (effect)* 来跟踪当前正在运行的函数。副作用是一个函数的包裹器，在函数被调用之前就启动跟踪。Vue 知道哪个副作用在何时运行，并能在需要时再次执行它。

```js
// 维持一个执行副作用的栈
const runningEffects = []

const createEffect = fn => {
  // 将传来的 fn 包裹在一个副作用函数中
  const effect = () => {
    runningEffects.push(effect)
    fn()
    runningEffects.pop()
  }

  // 立即自动执行副作用
  effect()
}
```

## Vue 如何跟踪变化

### vue2（Object.defineProperty）

2.0的双向绑定首先要深克隆一份data数据，通过Object.defineProperty监听data里面的每个属性，通过get/set方法达到双向绑定数据。

```js
let obj = {
  name:''
}

let virtualDom = JSON.parse(JSON.stringify(obj))

Object.defineProperty(obj,"name",{
  get(){
    return virtualDom.name
  },
  set(val){
    virtualDom.name = val
    observer()
  }
})
function observer(){
  spanName.innerHTML = obj.name
  inputName.value = obj.name
}
observer()

inputName.oninput = function(){
  obj.name = this.value
}

setTimeout(() => {
  obj.name = "chad"
}, 1000);
```

缺点：需要深度克隆数据、无法实现深度监听，例如监听值为对象时子属性或数组的成员。

**解决方法**

1. 对于对象。Vue 无法检测到 property 的添加或删除。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property：

   ```js
   Vue.set(vm.someObject, 'b', 2)
   ```

   还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

   ```js
   this.$set(this.someObject, 'b', 2)
   ```

2. 对于数组。Vue 不能检测以下数组的变动：

   1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
   2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

   为了解决第一种问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也会触发响应性系统的状态更新：

   ```js
   // Vue.set
   Vue.set(vm.items, indexOfItem, newValue)
   ```

   ```js
   // Array.prototype.splice
   vm.items.splice(indexOfItem, 1, newValue)
   ```

   你也可以使用 [`vm.$set`](https://cn.vuejs.org/v2/api/#vm-set) 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

   ```js
   vm.$set(vm.items, indexOfItem, newValue)
   ```

   为了解决第二种问题，你可以使用 `splice`：

   ```js
   vm.items.splice(newLength)
   ```

### vue3（Proxy）

3.0通过Proxy监听整个对象，现实无须克隆数据，且能够深度监听的效果。

```js
let obj = {}

obj = new Proxy(obj,{
  get(targer,prop){
    return targer[prop]
  },
  set(targer,prop,value){
    targer[prop] = value
    observer()
  }
})

function observer(){
  spanName.innerHTML = obj.name
  inputName.value = obj.name
}
observer()

setTimeout(() => {
  obj.name = "chad"
}, 1000);

inputName.oninput = function(){
  obj.name = this.value
}

```

##  如何让渲染响应变化

一个组件的模板被编译成一个 [`render`](https://v3.cn.vuejs.org/guide/render-function.html)创建 [VNodes](https://v3.cn.vuejs.org/guide/render-function.html#虚拟-dom-树)，描述该组件应该如何被渲染。它被包裹在一个副作用中，允许 Vue 在运行时跟踪被“触达”的 property。