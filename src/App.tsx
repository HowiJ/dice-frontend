import React, { useEffect, useState } from "react";
import { css, StyleSheet } from "aphrodite";
import io from "socket.io-client";
import LobbyForm from "LobbyForm";
import Profile from "Profile";
import Game from "Game";
import Lobby from "Lobby";

const socket = io();

type LobbyDetails = {
  lobbyID: string | null;
  hostID: string | null;
  players: Array<Object>;
};

type Props = Readonly<{}>;

function App(_: Props): React.ReactElement {
  const [{ lobbyID, hostID, players }, setLobbyDetails] =
    useState<LobbyDetails>({
      lobbyID: null,
      hostID: null,
      players: [],
    });
  const [viewerID, setViewerID] = useState<string | null>(null);

  useEffect(() => {
    console.log("listening to sockets");
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("dcs");
    });

    socket.on("update_lobby", (lobby) => {
      setLobbyDetails(lobby);
    });

    socket.on("update_viewer", ({ id }) => {
      setViewerID(id);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update_lobby");
      socket.off("reset_game");
    };
  }, []);
  return (
    <div className={css(styles.main)}>
      <div>
        <Profile socket={socket} />
      </div>
      {lobbyID == null && <Lobby socket={socket} />}
      {lobbyID != null && (
        <Game
          socket={socket}
          viewerID={viewerID ?? ""}
          players={players}
          lobbyID={lobbyID}
          hostID={hostID ?? ""}
        />
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1D1E33",
  },
});

export default App;
