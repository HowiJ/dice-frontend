import type { FormEvent } from "react";
import type { Socket } from "socket.io-client";

import React from "react";
import useFormActions from "useFormActions";

type Props = Readonly<{
  socket: Socket;
}>;

function LobbyForm({ socket }: Props): React.ReactElement | null {
  const [name, onChangeName] = useFormActions();
  const [lobbyID, onChangeLobbyID] = useFormActions();

  function onHost(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (name.length < 3) {
      console.warn("name needs to be minimum 3 characters");
      return;
    }
    socket.emit("join_lobby", { playerName: name, lobbyID: null });
  }

  function onJoin(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (lobbyID.length < 3) {
      console.warn("lobby id is probably more than 3 characters");
      return;
    }
    if (name.length < 3) {
      console.warn("name needs to be minimum 3 characters");
      return;
    }
    socket.emit("join_lobby", { playerName: name, lobbyID });
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <label>Name</label>
          </td>
          <td>
            <input placeholder="Name" onChange={onChangeName} value={name} />
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={onHost}>Host</button>
          </td>
          <td>
            <input
              placeholder="Lobby ID"
              onChange={onChangeLobbyID}
              value={lobbyID}
            />
            <button onClick={onJoin}>Join</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default LobbyForm;
