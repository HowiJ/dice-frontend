import type { ReactElement } from "react";
import type { Socket } from "socket.io-client";

import { StyleSheet, css } from "aphrodite";
import Button from "./common/Button";

type Props = Readonly<{
  socket: Socket;
}>;

function Host({ socket }: Props): ReactElement {
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
      <Button
        background="transparent"
        theme="blue"
        label="picture"
        isLabelHidden={true}
        icon="arrow-blue"
        onClick={onHost}
      />
    </div>
  );
}

const hostStyles = StyleSheet.create({
  row: {
    flex: "1 1 auto",
    display: "flex",
    gap: "4px",
  },
});

export default Host;
