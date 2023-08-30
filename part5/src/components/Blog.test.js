import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const testBlog = {
    title: "Component testing is done with react-testing-library",
    author: "test author",
    url: "test url",
  };

  render(<Blog blog={testBlog} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});
