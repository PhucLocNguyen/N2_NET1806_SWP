import CancelIcon from '@mui/icons-material/Cancel';
function CustomerCanceled({
  title,
}) {
  return (
    <div className="col-span-2 flex flex-col justify-center items-center">
      <div className="min-h-[350px] w-[500px]">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="border px-6 py-6">
          <div className="text-center mb-2">
            <CancelIcon color="error" sx={{ fontSize: "36px" }} />
          </div>
          <h3 className="text-center text-lg">
              Your order has been canceled.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CustomerCanceled;
