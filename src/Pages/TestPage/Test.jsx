import { RWebShare } from "react-web-share";
import { useLocation } from "react-router-dom";

function useQuery(){
  return new URLSearchParams(useLocation().pathname)
}

const Example = () => {
  const query = useQuery().get('t');
  console.log(query);
  return (
    <div>
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button>Share 🔗</button>
      </RWebShare>
    </div>
  );
};

export default Example;