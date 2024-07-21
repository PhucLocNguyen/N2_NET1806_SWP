import Chat from "./Chat";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
function ChatCustomer() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" to="/">
          Home
        </Link>,
        <Typography key="2" color="text.primary">
          Chat
        </Typography>,
      ];
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 mt-6">
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>
      <Chat />
    </div>
  );
}

export default ChatCustomer;
