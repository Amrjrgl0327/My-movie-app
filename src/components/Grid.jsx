// export const Grid = () => {
//   return (
//     <div className="flex justify-between py-12 px-20">
//       <h1 className="w-[114] h-[32] font-bold size-24">Upcoming</h1>
//       <img src="/Button (1).png" />
//     </div>
//   );
// };

const data = [
  {
    text: "Upcoming",
    icon: "/Button(1).png",
  },

  {
    text: "Popular",
    icon: "/Button(1).png",
  },
  {
    text: "TopRated",
    icon: "/Button(1).png",
  },
];

const GridItem = (props) => {
  return (
    <div className="flex justify-between py-12 px-20">
      {props.text}
      <img className="w-[114] h-[32] font-bold size-24" src={props.img} />
    </div>
  );
};

export const Grid = () => {
  return (
    <div>
      {data.map((item) => {
        return <GridItem key={item.text} text={item.text} img={item.icon} />;
      })}
    </div>
  );
};
