import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";

import DeleteApiBlog from "../../../api/blog/DeleteApiBlog";

function BlogRow({
  data,
  setIsOpenUpdatePopup,
  setItemUpdate,
  isDelete,
  setIsDelete,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const CallApi = async () => {
    let id = data?.blogId;
    const respone = await DeleteApiBlog(id);
  };

  const handleDeleteBlog = () => {
    CallApi();
    handleCloseMenu();
    setIsDelete(!isDelete);
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-x-20 py-4 px-16 border-t border-solid border-gray-300 cursor-pointer my-4">
        <div className="flex items-center col-span-2">
          <p className="text-sm font-medium tracking-wide leading-snug">
            {data?.title}
          </p>
        </div>
        <div className="flex items-center col-span-3">
          <p className="text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
            {data?.description}
          </p>
        </div>
        <div className="flex items-center col-span-1">
          <div>
            <img src={data?.image} className="w-16 h-16 object-cover"/>
          </div>
        </div>
        <div className="flex items-center col-span-1">
          <p className="text-sm font-medium tracking-wide leading-snug">
            {data?.manager?.username}
          </p>
        </div>
        <div className="flex items-center justify-center col-span-1">
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() => {
            setIsOpenUpdatePopup(true);
            setItemUpdate(data);
            handleCloseMenu();
          }}
        >
          Update Blog
        </MenuItem>

        <MenuItem onClick={handleDeleteBlog} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

export default BlogRow;
