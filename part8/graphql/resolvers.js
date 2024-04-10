const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { v1: uuid } = require("uuid");
const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");
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
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  //Mutations
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      const isAuthorInList = await Author.findOne({ name: args.author });
      if (!isAuthorInList) {
        const author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      return book.save().catch((error) => {
        throw new GraphQLError("Add book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      });
    },

    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        return author.save().catch((error) => {
          throw new GraphQLError("Edit Author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.username,
              error,
            },
          });
        });
      } else {
        throw new GraphQLError("Author is not in the list", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

module.exports = { resolvers };
