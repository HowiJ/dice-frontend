import type { ReactElement } from "react";
import type { Socket } from "socket.io-client";

import { StyleSheet, css } from "aphrodite";
import useFormActions from "useFormActions";
import Button from "./common/Button";
import TextInput from "./common/TextInput";

type JoinProps = Readonly<{
  socket: Socket;
  onClick: () => void;
  onChange: () => void;
}>;

function Join({ socket }: JoinProps): ReactElement {
  const [lobbyID, onChangeLobbyID] = useFormActions();

  function onJoinLobby(): void {
    if (lobbyID.length < 3) {
      console.warn("lobby id is probably more than 3 characters");
      return;
    }
    socket.emit("join_lobby", { lobbyID });
  }

  return (
    <div className={css(hostStyles.row)}>
      <div>
        <TextInput
          width={223}
          placeholder="Join a lobby"
          theme="purple"
          onChange={onChangeLobbyID}
          value={lobbyID}
        />
      </div>
      <div>
        <Button
          background="transparent"
          theme="purple"
          label="picture"
          isLabelHidden={true}
          icon="arrow-purple"
          onClick={onJoinLobby}
        />
      </div>
    </div>
  );
}

const hostStyles = StyleSheet.create({
  button: {
    padding: "0px",
    boxSizing: "border-box",
    height: "100%",
    border: "none",
    borderRadius: "60px",
    minWidth: "32px",
    backgroundColor: "#1D1E33",
  },
  row: {
    flex: "1 1 auto",
    display: "flex",
    gap: "4px",
  },
});

export default Join;
