const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const listOfOtherSix = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0);
};

const favoriteBlog = (array) => {
  let returnValue;
  if (array.length === 0) returnValue = "No blogs yet";
  else {
    const favorite = array.reduce(function (prev, current) {
      return prev.likes > current.likes ? prev : current;
    });
    returnValue = {
      author: favorite.author,
      likes: favorite.likes,
      title: favorite.title,
    };
  }
  console.log("returnValue====", returnValue);
  return returnValue;
};

const mostBlogs = (array) => {
  const countByAuthor = _.countBy(array, "author");
  const value = Object.entries(countByAuthor).reduce(
    (max, entry) => (entry[1] >= max[1] ? entry : max),
    [0, -Infinity]
  );
  const returnValue = { author: value[0], blogs: value[1] };

  console.log("Most Blogs =====>", returnValue);
  return returnValue;
};

const mostLikes = (array) => {
  let authorLikes = array.reduce((op, { author, likes }) => {
    op[author] = op[author] || 0;
    op[author] += likes;
    return op;
  }, {});
  const maxValue = Object.entries(authorLikes).reduce(
    (max, entry) => (entry[1] >= max[1] ? entry : max),
    [0, -Infinity]
  );
  const returnValue = { author: maxValue[0], likes: maxValue[1] };
  return returnValue;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
