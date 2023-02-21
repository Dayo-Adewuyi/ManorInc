import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import NotificationPage from "./pages/NotificationPage";
import SinglePostPage from "./pages/SinglePostPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import { AppContextProvider } from "./context/AppContext";

import { WagmiConfig, createClient } from "wagmi";
import { filecoinHyperspace } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

function App() {
  const client = createClient(
    getDefaultClient({
      appName: "Manor inc",
      //infuraId: process.env.REACT_APP_INFURA_ID,
      //alchemyId:  process.env.REACT_APP_ALCHEMY_ID,
      chains: [filecoinHyperspace],
    })
  );

  return (
    <>
      <AppContextProvider>
        <WagmiConfig client={client}>
          <ConnectKitProvider theme="auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/post/:postId" element={<SinglePostPage />} />
              <Route path="/subscriptions" element={<SubscriptionPage />} />
            </Routes>
          </ConnectKitProvider>
        </WagmiConfig>
      </AppContextProvider>
    </>
  );
}

export default App;
