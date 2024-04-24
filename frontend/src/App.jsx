import "./App.css";
import MoviesList from "./pages/MoviesList";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <MoviesList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
