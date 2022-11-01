# 探究基于RxJS的前端状态管理及接口防腐策略
[[toc]]
## 前言

从开发者角度来看，对于任何一项技术而言，我们经常去谈论的，莫过于几点：

1. 是什么？
2. 为什么需要它？
3. 它解决了什么问题？

针对以上问题，我们可以由浅入深的来刨析一下RxJS的相关理念。

## RxJS是什么？

RxJS是将开发过程中遇到的异步或同步操作看成一个事件流，RxJS内部封装了对一个事件流的操作符（比如创建、转换、组合、错误异常处理等），组合使用这些操作符来以更便利的方式管理事件。简言之，RxJS是一个用于处理事件（多为异步，同步也可以）流的库。

:::tip
也可以将RxJS当作处理事件的loadsh库。
:::

## 为什么用RxJS？

异步的本质是什么？异步操作和同步操作最大的区别就是异步是有时序的。因此，

- 同步操作：数据+函数
- 异步操作：数据+函数+时序
  
RxJS就是把时序抽离成一根时间轴，在这根时间轴上进行同步操作，而异步相关的时序处理就交给RxJS提供的各种operator操作符。因此，对于时序复杂的应用，使用RxJS会有意想不到的便利。

## 函数响应式编程

RxJS常常被称为是函数响应式编程。

### 函数式编程

函数式编程具有两个特点：

1. 函数的执行过程完全由输入参数决定，不会受除参数之外的任何数据的影响。
2. 函数不会修改任何外部状态，比如修改全局变量或传入的参数对象。

### 响应式编程

响应式编程是一种面向数据流和变化传播的声明式编程范式。优点即是可以在编程语言中很方便地表达数据流，且会自动地将变化的值通过数据流进行传播。

:::info
【数据流】：表示在一定事件范围内发生的一系列事件。任何东西都可以是一个steam：变量、用户输入、网络响应等。

【变化传播】：在数据流传播过程中，可能会有一些事件将一个旧的stream映射成一个新的stream。我们不需要轮询变化，而是对事件进行监听，在执行一个事件后，会自动做出相应的响应，这就是变化传播。
:::

## RxJS中事件流管理的基本概念

### observable（可观察对象）

将一个数据流看作一个可观察对象，表示这个数据变化传播过程中发生的一些事件的集合。 举个🌰：

observable 就像一个function函数:

```ts
//Function
function foo(){
  console.log('hello')
  return 'world'
}

const x = foo()
console.log(x)

const y = foo()
console.log(y)
```

```ts
//Observable
const foo = Observable.create(function(observer){
  console.log('hello')
  observer.next('world')
})

// .subscribe()类似于调用函数
foo.subscribe(function(x){
  console.log(x)
})
foo.subscribe(function(y){
  console.log(y)
})
```

```shell
// 控制台输出结果
'hello'
'world'
'hello'
'world'
```

那么，observable和function的区别是什么？
observable可以随着时间的推移返回多个值，这一点是函数做不到的。


```ts
// Function
function foo() {
    return 'Hello';
    return 'world'; // 永远不会执行
}

const a = foo();
console.log(a);

//控制台输出
'Hello'
```

```ts
// Observable
const foo = Observable.create(function (observer) {
    observer.next('Hello');
    observer.next('world');
});

foo.subscribe(function (x) {
    console.log(x);
});

// 控制台输出
'Hello'
'world'
```

```ts
// 也可以异步推送一些值
const foo = Observable.create(function (observer) {
    observer.next('Hello')；
    setTimeout(() => {
        observer.next('rxjs');
    },0)
    observer.next('world');
});

// 控制台输出
'Hello'
'world'
'rxjs'
```

**创建observable**
observable可以使用observable.create来创建，但通常我们使用创建操作符来创建observable。

**订阅observable**
订阅observable像是调用函数，并提供接收数据的回调函数。


```ts
observable.subscribe(value=>{
  //do something
})
```

不同观察者通过subscribe调用同一observable数据不共享。 每一次调用，等于重新执行一遍函数。

**执行observable**
observable执行可以传递三种类型的值

1. Next：返回一个值
2. Error：返回一个异常
3. Complete：返回一个【已完成】的消息，表明不会再发送任何值

next()方法中的值代表要返回给观察者的实际数据，可以执行多次。 error()和complete()会在observable执行期间至多执行一次，并且只会执行其中一个。

**销毁observable执行**
observable的执行可能会是无限的，通常观察者希望在一个有限的时间里终止observable执行，以避免浪费计算资源和内存消耗。


```ts
// 调用subscribe时，观察者会被附加到新创建的Observable执行中，
// 会返回一个对象，即Subscription（订阅）
var subscription = observable.subscribe();
// Subscription表示正在进行中的执行，调用unsubscribe()来取消observable执行；
subscription.unsubscribe();
```

## observer（观察者）
observer（观察者）是一组回调函数的集合，每一个回调函数对应observable发送通知的类型：next、error、complete。


```ts
const observer = {
    next: () => {}, // 观察者接收到next()消息执行的回调函数
    error: () => {}, // 观察者接收到error()消息执行的回调函数
    complete: () => {}, // 接收到complete()消息执行的回调函数
}
// observer中的观察者可能是部分的，没有提供某个回调，observable还是可以执行的。
// 方法1：将observer观察者传入subscribe
observable.subscribe(observer)
// 方法2：subscribe按顺序（next，error，complete)传入三个回调函数
observable.subscribe((value) => {},(error) => {}, () => {})
```

### subscription（订阅）
subscription是一个可清理资源的对象，代表observable的执行。 基本用处就是使用unsubscribe来释放资源或取消observable的执行。

### subject（主体）
subject是一种特殊类型的observable，允许将值多播（每个已订阅的观察者从订阅时间点开始接收当前observable推送的值，非独立）给多个观察者，而普通的observable是单播（每个已订阅的观察者是独立执行observable的）的。 举个🌰： 两个observer观察者A和B订阅同一个Observable对象，但他们不是同时订阅，第一个观察者A订阅N秒后，第二个观察者B才订阅这个Observable对象。并且在这N秒期间,Observable已经推送了一些数据，那么第二个观察者B应不应该收到已经被推送给第一个观察者A的那些数据呢？ Selection 1 ：已经推送给观察者A的值就不给B了，B只从订阅那一时间点接收Observable推送的数据就行了。 Selection 2：已经推送给观察者A的值还是要给B，B订阅时从头开始获取Observable推送的数据。 针对于selection 1，可以采用subject。针对于selection 2，可以采用observable。

### operators（操作符）
操作符是用于操作事件流的基础函数单元。

### marble diagrams（弹珠图）
为了能够解释流是如何变化的，文字通常不足以能够描述清楚，我们常常使用弹珠图来对流的时序变化进行描述。

## 实现前端接口防腐层
### RxJS与前端框架
前端框架的职责：数据与UI视图的绑定，数据发生更新时，视图随之更新。 UI = f(data); 响应式编程的职责：聚焦于数据，从数据的源头开始，到数据的处理变化，再到数据流的订阅，数据的消费。 data = g(origin data); 两者并不冲突，并且在某些场景下结合可能会为我们带来便捷，前端框架可以作为响应式编程数据的一个消费者。 UI = f(g(origin data));

### 前端接口业务几种典型场景
无论是MVC还是MVVM，其实我们前端主要的期待是View的稳定，即用户能够顺畅的跑通整套业务流程。我们就会得到如下结论：

:::details
写厚service层，写薄View层，然后对service层进行高覆盖、大规模单测。
:::

对于前端开发工程而言，最复杂多变的模块主要是来自接口的处理。我们来总结一下接口影响到前端业务层面的几种典型情况：

接口从v1变更到v2，返回的数据结构变了，那么组件层面拿到的数据也就变了，而我们也要随之修改杂件层面的使用方式。
随着版本迭代，我们调用方式也可能发生改变。比如之前需要调用两个接口，但是服务端优化之后变成一个接口可以解决问题。
有时候需要维护旧版本的接口，比如v1和v2需要同时保证可用。
当我们维护 一个平台型toB应用时，可能需要对接各个平台的api，也可能存在调用方式改变、多版本共存等情况的出现。

### RxJS实现
那如果引入service层的概念，使用RxJS作为接口防腐层这部分的角色，可以这样实现：


```ts
// view层
import React, { useEffect, useState } from "react";
import { lastValueFrom } from "rxjs";
import { getMemoryUsagePercent } from "./service";

function MemoryUsagePercent() {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await lastValueFrom(getMemoryUsagePercent());
      setPercent(result);
    })();
  }, []);
  return <div>Usage Percent: {percent} %</div>;
}

export default MemoryUsagePercent;
```

```ts
// service层
import {
  catchError,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  race,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function getMemoryLegacy(): Observable<{ free: number; usage: number }> {
  const legacyUsage = fromFetch("/api/v2/memory/usage").pipe(
    mergeMap((res) => res.json())
  );
  const legacyFree = fromFetch("/api/v2/memory/free").pipe(
    mergeMap((res) => res.json())
  );
  return forkJoin([legacyUsage, legacyFree], (usage, free) => ({
    free: free.data.free,
    usage: usage.data.usage,
  }));
}

export function getMemory(): Observable<{ free: number; usage: number }> {
  const current = fromFetch("/api/v3/memory").pipe(
    mergeMap((res) => res.json()),
    map((data) => data.data)
  );
  return current.pipe(
    catchError(() => getMemoryLegacy()),
    catchError(() => of({ usage: 0.0, free: 10.0 }))
  );
}

export function getMemoryUsagePercent(): Observable<number> {
  return getMemory().pipe(
    map(({ usage, free }) => +((usage / (usage + free)) * 100).toFixed(2) || 0)
  );
}
```

在service层里面我们使用RxJS来进行逻辑实现。如下：

声明了getMemoryLegacy和getMemory两个方法，一个是v2版本的获取方式，一个是v3版本的获取方式，v3将之前需要的两个接口合并了一个接口
在getMemoryLegacy中我们使用forkJoin将两个接口的返回结果合并并返回，getMemory则是首先声明一个获取v3接口的stream，然后通过race让v3和v2的结果进行“赛跑”，那个先成功返回则使用哪个，如果两个都失败来，那么提供一个兜底数据{ usage: 0.0, free: 10.0 }
最后getMemoryUsagePercent则是拿最后的结果进行计算，然后给到view层去使用 可以看到我们在service层做了大量的合并、兜底等操作，并且处理来多版本共存等问题，其中数据兜底其实相当于我们前端直接实现了数据的mock，后面无论是接口如何变化，无论是返回字段、调用方式、多版本共存等问题，我们都可以在service层去进行修改、适应，通过RxJS将这些内容简洁地表达，保证了view层干净漂亮。
## 实现前端状态管理
我们先看一下代码实现：


```ts
// app.tsx
import React from 'react';
import Child from './child';
import { ITEM_ID_CHANGE, useObservable } from './event-manage';

export default function App() {
  const [getItemIdObservable, getItemIdObserver] = useObservable(ITEM_ID_CHANGE);

  const items = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' },
  ];

  const handleClick = (itemId: number) => {
    // @ts-ignore
    getItemIdObservable(itemId).subscribe(getItemIdObserver());
  };

  return (
    <div>
      {items.map((item) => {
        return (
          <button
            onClick={() => {
              handleClick(item.id);
            }}
          >
            {item.id}
          </button>
        );
      })}
      <Child />
    </div>
  );
}
```

```ts
// chlid
import React, { useState } from 'react';
import { ITEM_ID_CHANGE, useObserver } from '../event-manage';

export default function Child() {
  const [itemId, setItemId] = useState(0);

  useObserver(ITEM_ID_CHANGE, (itemId: React.SetStateAction<number>) => {
    setItemId(itemId);
  });

  return <div>{itemId}</div>;
}
```

```ts
// event-manmage/index
import { useEffect } from 'react';
import { Observable, Observer, Subject } from 'rxjs';
export * from './event-name-constants';

const eventMap: any = {};
const commonObserverError = (eventName: any) => {
  return function (err: any) {
    console.error(`事件 ${eventName} 的 observer 执行错误`);
    console.error(`错误详情：${err}`);
  };
};

const useObserver = function (eventName: string | number, subscriberFn: any) {
  // 为了避免组件在重新渲染时重复执行 useObserver 造成 subscriber 冗余
  // 需要确保每个 useObserver 在组件内部只会执行一次，通过 useEffect 来实现
  useEffect(() => {
    let subscriberQueue = eventMap[eventName] || [];
    const registerSubscriber = {
      next: subscriberFn,
      error: commonObserverError(eventName),
    };
    if (subscriberQueue.indexOf(registerSubscriber) < 0) {
      subscriberQueue = subscriberQueue.concat(registerSubscriber);
    }
    eventMap[eventName] = subscriberQueue;
    return () => {
      // 在组件销毁时需要删除订阅，以避免内存泄露
      const subscriberIndex = eventMap[eventName].indexOf(registerSubscriber);
      eventMap[eventName].splice(subscriberIndex, 1);
    };
  }, []);
};

const useObservable = function (eventName: string | number) {
  // 新建一个空 observable
  const getObservable = function (initValue?: any) {
    return new Observable((subscriber) => {
      subscriber.next(initValue);
    });
  };

  // 新建一个空的
  const getObserver = function () {
    const subject = new Subject();
    const theEventQueue = eventMap[eventName];
    if (!theEventQueue) {
      console.error(`事件 ${eventName} 的 observer 当前还未注册，请检查`);
      return;
    }
    theEventQueue.forEach((subscriber: Partial<Observer<unknown>> | undefined) => {
      subject.subscribe(subscriber);
    });
    return subject;
  };
  return [getObservable, getObserver];
};

export { useObservable, useObserver };
```

```ts
// event-name-constants
export const ITEM_ID_CHANGE = 'item_id_change';
```

可以看到这样的实现状态管理有如下好处：

当其他组件需要使用到这个状态时，直接通过useObservable导入使用
使用非常简单，没有中间层，如果组件部分出错来，可以更直接debug
RxJS中observable天然就是immutable的，所以也无需immer之类的库来保证数据的不可变
借助RxJS，可以在处理接口涉及时有很大的优势，可以直接使用async/await来处理异步逻辑
### Redux与RxJS状态管理的区别
Redux是典型的单向数据流体现，特点如下：

1. 单一store，类似于前端数据库
2. 每次state更改一定要有对应的action
3. 操作数据时必须返回新的数据，而不能对元数据进行改变
4. 某个组件的状态是store这个全局状态的一个切片
而RxJS则是一份UI对应一份service的架构，特点如下：

1. 组件与数据流融为整体，与外部数据流隔离。
2. 便于组件复用，不具有传染性。
3. 可以挂载到全局store，也可以挂载到组件store。
## 如何debug RxJS
其实RxJS也是有一些缺点的，其中痛点之一就是debug RxJS。


```ts
const inputSearch = document.querySelector(".search");
    fromEvent(inputSearch, "input")
      .pipe(
        map((e) => e.target.value),
        filter((val) => val),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((val) => searchWikiPedia(val))
      )
      .subscribe((data) => {
        setItems(data[1] || []);
      });
```

比如这段代码该如何debug呢？

### 使用tap操作符
tap操作符的引入不会对后续stream产生影响，所以经常用它来进行debug操作。举个🌰


```ts
import { interval, tap } from 'rxjs';

const example = interval(1000)
                  .tap(x => console.log(`tap log: ${x}`)
                  .map(x => x + 1)
                  .subscribe(x => {
                    console.log(`subscription log: ${x}`);
                  });

// tap log: 0 
// subscription log: 1
// tap log: 1
// subscription log: 2
```

### 画出弹珠图
当我们遇到复杂的RxJS代码时，如果通过tap无法轻易的看出程序是如何执行的，因为tap只能拿到某个中间的执行结果，但是无法可视化中间的执行过程。 所以，RxJS的成员开发来一个专为RxJS而生的调试库：rxjs-spy，它主要有如下特点：

无手动触发，不会打印log。
可以录制整个stream的过程，打印一个集合的结果
每个结果有对应的执行时间
可以暂停、修改、回滚stream

## 个人思考
个人觉得在适合 RxJS 的地方用 RxJS，但是不强求 RxJS for everything。比较合适的例子就是比如多个服务端的接口请求，通过 RxJS 进行处理，最后到 view 层就是很清晰的一个 Observable，但是 view 层本身处理用户事件依然可以沿用现有的标准。