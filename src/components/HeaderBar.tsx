import { PhotoLibrary } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";

const HeaderBar = () => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <PhotoLibrary sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ROI Hunter Image Gallery
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
