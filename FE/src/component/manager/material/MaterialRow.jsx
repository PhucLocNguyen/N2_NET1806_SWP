import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";

import DeleteApiMaterial from "../../../api/material/DeleteApiMaterial";
import { FetchApiMaterial } from "../../../api/Requirements/FetchApiMaterial";

function MaterialRow({
  data,
  setIsOpenUpdatePopup,
  setItemUpdate,
  isDelete,
  setIsDelete,
}) {
  const [open, setOpen] = useState(null);
  const [material, setMaterial] = useState();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const CallApi = async () => {
    let id = data?.materialId;
    const respone = await DeleteApiMaterial(id);
    if(!respone){
        toast.error("Exists Design")
    }
  };

  const getMaterial = async () => {
    const respone = await FetchApiMaterial();
    setMaterial(respone);
  }

  useEffect (() => {
    getMaterial()
  },[])

  const handleDeleteBlog = () => {
    CallApi();
    handleCloseMenu();
    setIsDelete(!isDelete);
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-x-10 py-4 px-16 border-t border-solid border-gray-300 cursor-pointer my-4">
        <div className="flex items-center col-span-1">
          <h2 className="text-sm font-medium tracking-wide leading-snug">
            {data?.materialId}
          </h2>
        </div>
        <div className="flex items-center col-span-1">
          <h2 className="text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
            {data?.name}
          </h2>
        </div>
        <div className="flex items-center col-span-1">
          <h2 className="text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
            {data?.price}
          </h2>
        </div>
        <div className="flex items-center col-span-3">
          <h2 className="text-sm font-medium tracking-wide leading-snug overflow-hidden text-ellipsis line-clamp-2">
            {data?.image}
          </h2>
        </div>
        <div className="flex items-center col-span-1">
          <h2 className="text-sm font-medium tracking-wide leading-snug">
            {data?.managerId}
          </h2>
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
          Update Material
        </MenuItem>

        <MenuItem onClick={handleDeleteBlog} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

export default MaterialRow;