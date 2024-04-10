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

module.exports = { typeDefs };
