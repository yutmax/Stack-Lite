import AppRouter from "./app/providers/router/AppRouter";
import { useAuth } from "./features/authentication/model/useAuth";
import FullPageSpinner from "./shared/ui/FullPageSpinner/FullPageSpinner";
import FullPageError from "./shared/ui/FullPageError/FullPageError";

function App() {
  const { isLoading, error } = useAuth();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (error) {
    return <FullPageError message={error} />;
  }

  return <AppRouter />;
}

export default App;
