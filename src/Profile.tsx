import type { Socket } from "socket.io-client";
import type { FormEvent } from "react";

import React, { useEffect, useState } from "react";
import { css, StyleSheet } from "aphrodite";

import { ReactComponent as ProfileIcon } from "./static/profile.svg";

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
    socket.on("update_viewer", (userDetails) => {
      setUserDetails(userDetails);
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

  function onCopyClick(e: FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (lobbyName == null) {
      return;
    }
    navigator.clipboard.writeText(lobbyName);
  }

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.details)}>
        <div className={css(styles.picture)}>
          <ProfileIcon />
        </div>
        {name}
      </div>
      <div>
        <button
          onClick={onCopyClick}
          className={css(
            styles.details,
            styles.copyButton,
            isConnected ? styles.isConnected : styles.notConnected
          )}
        >
          <div>
            <span>{isConnected ? `Connected to ` : "Not Connected"}</span>
            <div> {lobbyName}</div>
          </div>
        </button>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: "16px",
    background: "#EEEEEE",
    gap: "4px",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
    fontSize: "16px",
  },
  picture: {
    width: 32,
    height: 32,
  },
  isConnected: {
    borderRight: "4px solid green",
    borderLeft: "4px solid green",
  },
  notConnected: {
    borderRight: "4px solid red",
    borderLeft: "4px solid red",
  },
  copyButton: {
    fontSize: "12px",
    border: "none",
    ":hover": {
      background: "#DDDDDD",
    },
    ":active": {
      background: "#CCCCCC",
    },
  },
});

export default Profile;
