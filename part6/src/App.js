import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";
import Button from "./components/Button";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });
  console.log(result);

  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  if (result.isError) {
    return (
      <div>Anecdote service is not available due to problems in server...</div>
    );
  }
  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    const votes = anecdote.votes;
    updateAnecdoteMutation.mutate({ ...anecdote, votes: votes + 1 });
    dispatch({
      type: "vote",
      payload: `Anecdote "${anecdote.content}" voted and has ${
        anecdote.votes + 1
      } votes`,
    });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
