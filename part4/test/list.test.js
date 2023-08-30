const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithSixBlog = [
  {
    title: "Mrs",
    author: "Olena",
    url: "https://fly.io/apps/falling-meadow-5720",
    likes: 4,
    _id: "643eaa247f38c1eea500e439",
    __v: 0,
  },
  {
    title: "Ms",
    author: "Mariia",
    url: "https://google.co.uk",
    likes: 120,
    _id: "643eaa697f38c1eea500e43b",
    __v: 0,
  },
  {
    title: "Ms",
    author: "Mariia",
    url: "https://google.co.uk",
    likes: 120,
    _id: "643eaecbf51a8c4eb06faaae",
    __v: 0,
  },
  {
    title: "Mr",
    author: "Goerge",
    url: "https://www.roblox.com/",
    likes: 100,
    _id: "643eb7ecc7317574f69cc9ed",
    __v: 0,
  },
  {
    title: "Mr",
    author: "Vova",
    url: "https://www.skysports.com/football-results",
    likes: 150,
    _id: "643ebaff5a5a7d251d7e6f35",
    __v: 0,
  },
  {
    title: "Ms",
    author: "Uliana",
    url: "https://www.tiktok.com/en/",
    likes: 160,
    _id: "643f9c620b1f62d8c1c8ba4b",
    __v: 0,
  },
];

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

describe("dummy:", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes:", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("of a bigger list calculate right (list of 6 blogs has 654 likes total)", () => {
    const result = listHelper.totalLikes(listWithSixBlog);
    expect(result).toBe(654);
  });
  test("of a bigger list calculate right (list of 6 other blogs has 36 likes total)", () => {
    const result = listHelper.totalLikes(listOfOtherSix);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("empty list return 'No blogs yet'", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe("No blogs yet");
  });
  test('favorite blog of 6 is \n{ title: "Mr",\n author: "Uliana",\n likes: 160}', () => {
    const result = listHelper.favoriteBlog(listWithSixBlog);
    expect(result).toEqual({ author: "Uliana", likes: 160, title: "Ms" });
  });
});

describe("\n most blogs ", () => {
  test("most blogs from listWithSixBlog", () => {
    const result = listHelper.mostBlogs(listWithSixBlog);
    expect(result).toEqual({ author: "Mariia", blogs: 2 });
  });

  test("most blogs from listOfOtherSix", () => {
    const result = listHelper.mostBlogs(listOfOtherSix);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});

describe("\n most likes ", () => {
  test("most blogs from listWithSixBlog", () => {
    const result = listHelper.mostLikes(listWithSixBlog);
    expect(result).toEqual({ author: "Mariia", likes: 240 });
  });

  test("most blogs from listOfOtherSix", () => {
    const result = listHelper.mostLikes(listOfOtherSix);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
});
