const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
type Book {
  title: String! 
  author:String!
  published:String! 
  genres:[String!]!
}
type Author {
  name: String!
  bookCount:Int!
  born:Int
  
} 
type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks:[Book!]
    allBooksOfAuthor(author:String!):[Book!]
    booksByGenre(genre:String!):[Book!]
    allAuthors:[Author!]
    booksByAuthorByGenre(author:String, genre:String):[Book!]
  }

  type Mutation {
    addBook(
      title: String! 
      author:String!
      published:Int! 
      genres:[String!]!
    ): Book!
    editAuthor(
      name: String! 
      setBornTo: Int!
    ):Author
  }


  
`;

const unique = (arr) => {
  let outputArray = Array.from(new Set(arr));
  return outputArray;
};

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => unique(books.map((book) => book.author)).length,
    allBooks: () => books,
    allBooksOfAuthor: (root, arg) =>
      books.filter((book) => book.author === arg.author),
    booksByGenre: (root, arg) =>
      books.filter((book) => book.genres.includes(arg.genre)),
    booksByAuthorByGenre: (root, arg) => {
      const filteredByAuthor = arg.author
        ? books.filter((book) => book.author === arg.author)
        : books;
      const filteredByGenre = arg.genre
        ? filteredByAuthor.filter((book) => book.genres.includes(arg.genre))
        : filteredByAuthor;
      return filteredByGenre;
    },
    allAuthors: () => {
      // const authors = unique(books.map((book) => book.author));
      const result = authors.map((author) => {
        bookCount = books.filter((book) => book.author === author.name).length;
        return { name: author.name, bookCount: bookCount, born: author.born };
      });
      return result;
    },
  },

  //Mutations
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      const isAuthorExists = authors.find(
        (author) => author.name === args.author
      );
      if (!isAuthorExists)
        authors = authors.concat({
          name: args.author,
          id: uuid(),
          born: null,
        });
      return book;
    },
    editAuthor: (root, args) => {
      let auth = authors.find((author) => author.name === args.name);
      if (auth) {
        auth.born = args.setBornTo;
        return auth;
      } else {
        throw new GraphQLError("Author is not in the list", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
        return null;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
