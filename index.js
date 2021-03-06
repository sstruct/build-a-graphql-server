"use strict";

const express = require("express");
const graphqlHTTP = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString
} = require("graphql");

const { getVideoById, getVideos, createVideo } = require("./src/data");
const nodeInterface = require("./src/node");

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: "Video",
  description: "A video on Egghead.io",
  fields: {
    id: {
      type: GraphQLID,
      description: "The id of the video."
    },
    title: {
      type: GraphQLString,
      description: "The title of the video."
    },
    duration: {
      type: GraphQLInt,
      description: "The duration of the video (in seconds)."
    },
    watched: {
      type: GraphQLBoolean,
      description: "Whether or not the viewer has watched the video."
    }
  }
});

const videoInputType = new GraphQLInputObjectType({
  name: "VideoInput",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "The id of the video."
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The title of the video."
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The duration of the video (in seconds)."
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Whether or not the video is released."
    }
  },
  interfaces: [nodeInterface]
});

module.exports = videoInputType;

const mutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType)
        }
      },
      resolve: (_, args) => createVideo(args.video)
    }
  }
});

const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type.",
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The id of the video"
        }
      },
      resolve: (_, args) => getVideoById(args.id)
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

server.use(
  "/graphiql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
