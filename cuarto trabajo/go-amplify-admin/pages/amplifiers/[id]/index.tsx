
import type { NextPage } from "next";
import BasePage from "../../../src/screens/general/base/BasePage";
import Usuario from "../../../src/components/Usuario";
import { useRouter } from "next/router";

const User: NextPage = () => {
  const router = useRouter();
  const usuarioId = router.query.id;
  return (
    <BasePage >    
      <div>
      <Usuario  id={usuarioId}/>
      </div>
    </BasePage>
  );
};
export default User;
