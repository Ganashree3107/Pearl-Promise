import { useParams } from "react-router-dom";
import combos from "../../data/combos";
import ComboCard from "./ComboCard";

function ComboGrid() {

  const { type } = useParams();

  const filteredCombos = combos.filter(
    (combo) => combo.category === type
  );

  return (

    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {filteredCombos.map((combo) => (

          <ComboCard
            key={combo.id}
            combo={combo}
          />

        ))}

      </div>

    </section>

  );

}

export default ComboGrid;