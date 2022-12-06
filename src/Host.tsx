import type { ReactElement } from "react";
import type { Socket } from "socket.io-client";

import { StyleSheet, css } from "aphrodite";
import Button from "./common/Button";

type HostProps = Readonly<{
  socket: Socket;
  onClick: () => void;
}>;

function Host({ socket }: HostProps): ReactElement {
  function onHost(): void {
    socket.emit("join_lobby", { lobbyID: null });
  }

  return (
    <div className={css(hostStyles.row)}>
      <Button
        background="transparent"
        theme="blue"
        label="Create a new game"
        onClick={onHost}
        width={260}
      />
      <div>
        <Button
          background="transparent"
          theme="blue"
          label="picture"
          isLabelHidden={true}
          icon="arrow-blue"
          onClick={onHost}
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

export default Host;
