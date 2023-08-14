import { useEffect } from "react";

import { getCabins } from "../../services/apiCabins";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function Cabins() {
  useEffect(() => {
    getCabins()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://tjfplbwsoorynsirqihu.supabase.co/storage/v1/object/public/Cabins/cabin-001.jpg"
        alt="nothing"
      />
    </Row>
  );
}

export default Cabins;
