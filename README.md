# build-a-graphql-server

notes for https://egghead.io/courses/build-a-graphql-server

## Create a GraphQL Schema

```bash
# init project
yarn init -y

# l is short for ls -a
l
```

## Serve a GraphQL Schema as Middleware in Express

```bash
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#
```

## 06 Write a GraphQL Schema in JavaScript

remove the rootValue❓

GraphQLSchema 内部究竟发生了什么呢？

```js
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
```
