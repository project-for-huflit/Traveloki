
const partnerId = import.meta.env.VITE_PARTNERID_POINTER
const returnUrl = encodeURIComponent(import.meta.env.VITE_RETURNURL_POINTER)
const userId = JSON.parse(localStorage.getItem("user"))

function methodPayment(handleConnectWalletPoiter) {

  const handleConnectPoiter = () => {
    const navigateToConnect =
    `https://wallet.pointer.io.vn/connect-app?partnerId=${partnerId}&returnUrl=${returnUrl}&userId=${userId._id}`
    window.location.replace(navigateToConnect)
    console.log(navigateToConnect)
  }

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-full">
        <div className="w-full flex flex-row justify-between items-center text-xl">
          <div className="">Ví Pointer:</div>
          <div className="">
            <button onClick={handleConnectPoiter}
            className="bg-indigo-500 hover:opacity-90 rounded-full py-2 px-5 text-white ">Kết nối</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default methodPayment;
