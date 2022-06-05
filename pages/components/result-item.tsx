import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import ResultFile from "../models/result-file";

type ResultItemProps = {
  item: ResultFile
};

const ResultItem = ({ item }: ResultItemProps) => {
  return (
    <Card style={{width: "400px", marginBottom: "10px"}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { item.name }
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          <b>Path:</b> { item.path }
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          <b>Type:</b> { item.type }
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          <b>Size:</b> { item.size } bytes
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Download</Button>
      </CardActions>
    </Card>
  );
};

export default ResultItem;