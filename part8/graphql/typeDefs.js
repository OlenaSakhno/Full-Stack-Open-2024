const typeDefs = `
type Author {
    name: String!
    bookCount:Int
    born:Int
    
} 
type Book {
  title: String! 
  author: String!
  published:String! 
  genres:[String!]!
}
type User {
  username: String!
  favoriteGenre: String
  id: ID!
}
type Token {
  value: String!
}


type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks:[Book!]
    allBooksOfAuthor(author:String!):[Book!]
    booksByGenre(genre:String!):[Book!]
    allAuthors:[Author!]
    booksByAuthorByGenre(author:String, genre:String):[Book!]
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    
  }


  
`;

module.exports = { typeDefs };
