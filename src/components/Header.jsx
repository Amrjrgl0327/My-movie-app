export const Header = () => {
  return (
    <div>
      <img
        className="w-screen h-fit relative object-cover"
        src="/Feature.png"
      />
      <div className="flex flex-col items-start absolute -translate-10 top-48 mt-[178] ml-[140] mb-[158] gap-4  w-[404]  text-white">
        <div>Now Playing:</div>
        <h1 className="font-bold">Wicked</h1>
        <div className="flex">
          <img src="/star.png" />
          <img src="10.png" />
        </div>
        <p className="w-[320] h-[80] size-[8]]">
          Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.
        </p>
        <img className="w-[89] h-[20] rounded-md mb-[120]" src="/button.png" />
      </div>
    </div>
  );
};
