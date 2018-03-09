"use strict";

const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }
  type Query {
    video: Video,
    videos: [Video]
  }
  type Schema {
    query: Query
  }
`);

const videos = [
  {
    id: "a",
    title: "Create a GraphQL Schema",
    duration: 120,
    watched: true
  },
  {
    id: "b",
    title: "Ember.js CLI",
    duration: 240,
    watched: false
  }
];
const resolvers = {
  video: () => ({
    id: "1",
    title: "bar",
    duration: 180,
    watched: true
  }),
  videos: () => videos
};

const query = `
query myFirstQuery {
  videos {
    id,
    title,
    duration,
    watched
  }
}
`;

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(err => console.error(err));

// output:
// { data: { videos: [ [Object], [Object] ] } }
