import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import Button from "./Button";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ["anecdotes"] });
      queryClient.setQueryData(
        { queryKey: ["anecdotes"] },
        anecdotes.concat(newAnecdote)
      );
      // queryClient.invalidateQueries("anecdotes");
    },
  });

  const dispatch = useNotificationDispatch();
  const onCreate = (event) => {
    console.log("event.target", event.target);
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: "submit", payload: `New anecdote "${content}" created!` });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <Button type="submit" label="Add Anecdote" />
      </form>
    </div>
  );
};

export default AnecdoteForm;
