import { useState } from "react";
import {
  Button,
  DialogContent,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import gun from "../gun";
import { useHistory } from "react-router-dom";

const OnboardingView = () => {
  const [imageUrl, setImageUrl] = useState("");
  const history = useHistory();

  return (
    <Paper>
      <Typography variant="h1">welcome to fluidi</Typography>
      <DialogContent>
        Hello! paste an image url below to use as your avatar
      </DialogContent>
      <TextField
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="image url"
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          const user = gun.user().recall({ sessionStorage: true });
          user.get("fluidi").get("profile").get("avatarUrl").put(imageUrl);
          history.push("/");
        }}
      >
        Save avatar image
      </Button>
    </Paper>
  );
};

export default OnboardingView;
