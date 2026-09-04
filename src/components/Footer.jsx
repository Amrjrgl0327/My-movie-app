export const Footer = () => {
  return (
    <div className="w-screen h-[280] flex p-20 justify-between items-start gap-12 bg-indigo-700 mt-[51]">
      <img className="flex items-start" src="/Info Section.png" />
      <div className="flex items-end">
        <div className="flex flex-col">
          <p>Contact Information</p>
          <div>
            <img src="/Wifi icon (1).png" />
            <p>Email:</p>
            <p>support@movieZ.com</p>
            <img src="/Wifi icon.png" />
            <p>Phone:</p>
            <p>+976 (11) 123-4567</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p>Follow us </p>
          <p>Facebook Instagram Twitter Youtube</p>
        </div>
      </div>
    </div>
  );
};
