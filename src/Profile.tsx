import type { Socket } from "socket.io-client";
import type { FormEvent } from "react";

import React, { useEffect, useState } from "react";
import { css, StyleSheet } from "aphrodite";

import { ReactComponent as ProfileIcon } from "./static/profile.svg";
import { ReactComponent as CopyIcon } from "./static/copy.svg";

type UserDetails = {
  name: string;
  id: string;
  lobbyName: string | null;
};

const defaultUser = {
  name: "-",
  id: "-",
  lobbyName: null,
};

function useProfile(socket: Socket): UserDetails {
  const [userDetails, setUserDetails] = useState<UserDetails>(defaultUser);
  useEffect(() => {
    console.log("tracking update_viewer");
    socket.on("update_viewer", (userDetails) => {
      setUserDetails(userDetails);
      console.log(userDetails);
    });
  }, [socket]);
  return userDetails;
}

type Props = Readonly<{
  socket: Socket;
}>;

function Profile({ socket }: Props): React.ReactElement {
  const { name, lobbyName } = useProfile(socket);
  const isConnected = lobbyName != null;

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.details)}>
        <div className={css(styles.picture)}>
          <ProfileIcon />
        </div>
        {name}
      </div>
      <div className={css(styles.details)}>
        <div>
          <ConnectionStatus isConnected={isConnected} />
        </div>
        <div>
          <span>{isConnected ? `Connected to ` : "Not Connected"}</span>
          {isConnected && <CopyButton lobbyID={lobbyName} />}
          <div> {lobbyName}</div>
        </div>
      </div>
    </div>
  );
}

type CopyButtonProps = Readonly<{
  lobbyID: string;
}>;

function CopyButton({ lobbyID }: CopyButtonProps): React.ReactElement {
  function onCopyClick(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (lobbyID == null) {
      return;
    }
    navigator.clipboard.writeText(lobbyID);
  }

  return (
    <button className={css(styles.copyButton)} onClick={onCopyClick}>
      <div className={css(styles.picture)}>
        <CopyIcon />
      </div>
    </button>
  );
}

type ConnectionStatusProps = Readonly<{
  isConnected: boolean;
}>;

function ConnectionStatus({
  isConnected,
}: ConnectionStatusProps): React.ReactElement {
  return (
    <div
      className={css(
        styles.connectionStatus,
        isConnected ? styles.isConnected : styles.notConnected
      )}
    />
  );
}

const styles = StyleSheet.create({
  main: {
    // borderRadius: "100px",
    padding: "16px",
    background: "#EEEEEE",
    // position: "absolute",
    // right: "0px",
    fontSize: "12px",
    // justifyContent: 'space-between',
    // display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
  },
  picture: {
    width: 16,
    height: 16,
  },
  connectionStatus: {
    border: "1px solid black",
    display: "inline-block",
    verticalAlign: "middle",
    // borderRadius: 100,
    // height: 4,
    // width: 4,
    width: "16px",
  },
  isConnected: {
    background: "green",
  },
  notConnected: {
    background: "red",
  },
  copyButton: {
    fontSize: "12px",
    background: "#DDDDDD",
    border: "none",
    borderRadius: "4px",
    ":hover": {
      background: "#AAAAAA",
    },
    ":active": {
      background: "#777777",
    },
  },
});

export default Profile;
