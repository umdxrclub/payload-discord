import React from "react";
import { useDiscordClient } from "./DiscordContext";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";

const DiscordClient: React.FC = ({}) => {
  let client = useDiscordClient().data;
  if (!client) return <h1>No client found.</h1>;

  return (
    <Card>
      <Stack direction={"row"}>
        <CardMedia image={client.user?.avatarUrl ?? undefined} sx={{ width: 128, aspectRatio: 1}} />
        <CardContent>
          <Stack direction={"column"}>
            <Typography variant="h5" fontWeight={"bold"}>{client.user?.displayName}</Typography>
            <Typography variant="subtitle1">{client.user?.username}</Typography>
            <Typography>{client.user?.id}</Typography>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default DiscordClient;
