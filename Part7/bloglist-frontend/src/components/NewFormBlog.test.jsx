import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

test("<NewFormBlog /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<NewBlogForm handleNewBlog={createBlog} />);

  const input = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("create");

  await user.type(input[0], "testing a form...");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
});
