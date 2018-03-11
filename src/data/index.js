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

const getVideoById = id =>
  new Promise(resolve => {
    const [video] = videos.filter(video => video.id === id);
    resolve(video);
  });

exports.getVideoById = getVideoById;
