const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");
const Book = require("../models/book");
const Author = require("../models/author");
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    // authorCount: () => unique(books.map((book) => book.author)).length,
    allBooks: async (root, args) => {
      return await Book.find({});
    },
    allBooksOfAuthor: async (root, arg) =>
      await Book.find({ author: arg.author }).exec(),
    booksByGenre: async (root, args) => await Book.find({ genres: args.genre }),
    booksByAuthorByGenre: async (root, arg) => {
      if (arg.author && arg.genre)
        return await Book.find({ author: arg.author, genres: arg.genre });
      if (arg.author && !arg.genre)
        return await Book.find({ author: arg.author });
      if (!arg.author && arg.genre)
        return await Book.find({ genres: arg.genre });
      if (!arg.author && !arg.genre) return await Book.find({});
    },

    allAuthors: async () => {
      // const authors = unique(books.map((book) => book.author));
      const authors = await Author.find({});

      const result = authors.map(async (author) => {
        const bookCount = await Book.find({
          author: author.name,
        }).countDocuments();
        return {
          name: author.name,
          bookCount: bookCount,
          born: author.born,
        };
      });
      return result;
    },
  },

  //Mutations
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      const isAuthorInList = await Author.findOne({ name: args.author });
      if (!isAuthorInList) {
        const author = new Author({ name: args.author });
        author.save();
      }
      return book.save();
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        return author.save();
      } else {
        throw new GraphQLError("Author is not in the list", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
    },
  },
};

module.exports = { resolvers };
