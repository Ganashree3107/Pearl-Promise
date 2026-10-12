import { useParams } from "react-router-dom";
import ComboGrid from "../../components/combos/ComboGrid";
import ComboHeader from "../../components/combos/ComboHeader";  
import combos from "../../data/combos";
function Combos() {

  const { type } = useParams();
  const filtered = combos.filter(   
    (combo) => combo.category === type
  );
  const title =
    type === "duos"
      ? "Pearl Promise Duo Collection"
      : type === "trios"
      ? "Pearl Promise Trio Collection"
      : "Pearl Promise Complete Kits";

  return (

    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">

      <ComboHeader title={title} total={filtered.length} />

      <ComboGrid />

    </main>

  );

}

export default Combos;