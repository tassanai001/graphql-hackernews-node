const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link);
      return link;
    },
    deleteLink: (root, args) => {
      links.filter((o) => o.id !== args.id);
      let newValue = [];
      links.forEach((o) => {
        if (o.id !== args.id) {
        } else {
          newValue.push(o);
        }
      });
      return newValue[0];
    },
    updateLink: (root, args) => {
      links.filter((o) => o.id !== args.id);
      let newValue = [];
      links.forEach((o, i) => {
        if (o.id === args.id) {
          links[i] = {
            id: args.id,
            description: args.description,
            url: args.url,
          }
          newValue.push(links[i]);
        }
      });
      return newValue[0];
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`));
