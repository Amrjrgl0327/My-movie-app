export const Footer = () => {
  return (
    <div className="w-screen h-[280] flex p-20 justify-between items-start gap-12 text-14 text-white bg-indigo-700 mt-[51]">
      <img className="flex items-start" src="/Info Section.png" />
      <div className="flex items-end"></div>

      <div className="flex gap-24">
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Contact Information</p>
          <div className="flex items-start gap-2 text-sm">
            <img
              src="/Wifi icon (1).png"
              className="w-4 h-4 mt-3 items-center"
            />
            <div>
              <p className="font-medium text-white">Email:</p>
              <p>support@movieZ.com</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <img src="/Wifi icon.png" className="w-4 h-4 mt-3 items-center" />
            <div>
              <p className="font-medium text-white">Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mr-[80]">
          <p className="font-semibold">Follow us </p>
          <div className="flex gap-4 text-sm text-white">
            <p>Facebook Instagram Twitter Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
};
