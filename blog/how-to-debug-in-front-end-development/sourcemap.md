# 浅谈sourcemap

[[toc]]

## 什么是`sourcemap`？

`sourcemap` 是一种用于将编译后的代码映射回原始源代码的技术。

`sourcemap` 的格式如下：

```jsx
{
　　　　version : 3,
　　　　file: "out.js",
　　　　sourceRoot : "",
　　　　sources: ["foo.js", "bar.js"],
　　　　names: ["a", "b"],
　　　　mappings: "AAgBC,SAAQ,CAAEA;AAAEA",
      sourcesContent: ['const a = 1; console.log(a)', 'const b = 2; console.log(b)']
}

```

- `version`：`sourcemap` 的版本，一般为3.
- `file`：编译后代码的文件名。
- `sourceRoot`：源码根目录。
- `sources`：包含所有源码文件名的数组。
- `mappings`：源码与编译后代码的位置映射信息字符串，他将目标文件名中的每一行映射到原文件中的对应位置。
- `sourcesContent`：包含源代码文件到内容，帮助调试器在没有源代码文件的情况下仍然能够显示源代码。

其中，`mappings` 字段最为关键。其内容由`,` 和`;` 分隔。一个`;`表示一行，这样就免去了行的映射；一个`,` 表示一行中的多个位置。对于其中具体的每一个`mapping` 都是什么呢？

以`AAgBC` 举例，其一共有五位，分别有不同的含义：

- 生成代码中的列数
- 原始代码文件在`sourcemap`中的索引
- 原始代码中的行数
- 原始代码中的列数
- 可选的源代码中的函数名在`source-map` 中的索引

将其中每一条信息，通过`VLQ` 编码后，便生成了`AAgBC` 这种形式的字符串。

那么，什么是`VLQ`编码呢？

`VLQ`（Variable-length quantity）是一种可变长度的数字编码方式，用于将大整数编码为多个字节的序列，以便在有限的字节范围内表示大整数。例如，如果两个位置的列数相同，则第一个数字为0，第二个数字表示行数之差；如果两个位置的行数相同，则第一个数字表示列数之差，第二个数字表示源文件索引之差，以此类推。

## `sourcemap`使用场景

在了解了什么是`sourcemap`之后，我们需要了解它解决了哪些痛点问题。

- 调试：在开发过程中，当出现错误时，我们可以使用﻿`sourcemap`将编译后的代码映射回原始源代码，以便更容易地调试和修复错误。
- 性能分析：在优化应用程序性能时，开发人员可以使用﻿`sourcemap`将性能分析工具生成的代码映射回原始源代码，以便更好地理解性能问题并进行优化。
- 错误报告：在应用程序部署到生产环境后，如果出现错误，可以使用﻿`sourcemap`将编译后的代码映射回原始源代码，以便更容易地定位和修复错误。
- 代码保护：在将`JavaScript`代码发布到生产环境之前，可以使用﻿`sourcemap`将源代码映射到编译后的代码，以便在保护源代码的同时，仍然能够进行调试和错误报告。

## `sourcemap`生成原理

`sourcemap` 的生成原理可以简单地概括为以下几个步骤：

1. 将原始源代码和编译后的代码分别生成对应的抽象语法树（`AST`）。
2. 将编译后的代码的`AST`与原始源代码的`AST`进行匹配，以便确定它们之间的映射关系。这通常涉及到比较`AST`节点的类型、名称和位置等信息，以便找到它们之间的相似之处。
3. 将映射关系编码为﻿`sourcemap`格式，并将其保存到文件或内联到编译后的代码中。

当然，如果自己生成`sourcemap` 还是很麻烦的，我们通常会使用`source-map`这个库来生成`sourcemap`。

## `source-map`生成`sourcemap`原理

`source-map`包的生成`sourcemap`的原理可以简单概括为以下几个步骤：

1. 创建一个`sourcemap`生成器对象，该对象包含了`sourcemap`文件的基本信息，如文件名、源代码根目录等。
2. 通过调用`sourcemap`生成器对象的`addMapping()`方法，将每个位置在生成代码和源代码之间的映射信息添加到`sourcemap`中。这些映射信息包括了生成代码和源代码中的行号、列号、源代码文件名等信息，这些信息都将被编码并存储在`sourcemap`文件中。
3. 在生成完所有映射信息后，调用`sourcemap`生成器对象的`toString()`方法，将`sourcemap`对象转换为字符串表示。这个字符串包含了所有的映射信息，并且使用了`base64 VLQ`编码方式进行压缩，以便在有限的字节范围内表示大量的映射信息。
4. 将`sourcemap`字符串保存到文件中，或者内联到生成的代码中。在调试时，开发人员可以使用`sourcemap`文件或内联的`sourcemap`字符串将生成代码映射回源代码，以便更好地理解和调试代码。

## 总结

`sourcemap` 是一种用于将编译后的代码映射回原始源代码的技术。它可以用于调试、性能分析、错误报告和代码保护。在生成`sourcemap`时，我们通常会使用`source-map`这个库来生成。在使用`source-map`生成`sourcemap`时，我们需要先将原始代码和编译后的代码生成对应的抽象语法树，然后将它们之间的映射关系编码为`sourcemap`格式，并将其保存到文件或内联到编译后的代码中。