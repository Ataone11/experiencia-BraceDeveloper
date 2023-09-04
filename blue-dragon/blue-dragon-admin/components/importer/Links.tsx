import BoxShadow from "../BoxShadow";
import ButtonPage from "../ButtonPage";

const Links = () => {
  return (
    <BoxShadow props={"p-4"}>
      <div className="flex flex-col gap-y-4">
        <span className="font-bold text-base">Vinculos</span>
        <div className="flex flex-col gap-y-3">
          <ButtonPage>
            <span>Ayudas solicitadas</span>
          </ButtonPage>
          <ButtonPage>
            <span>Pedidos</span>
          </ButtonPage>
          <ButtonPage>
            <span>Contratos realizados</span>
          </ButtonPage>
          <ButtonPage>
            <span>Muestras</span>
          </ButtonPage>
        </div>
      </div>
    </BoxShadow>
  );
};

export default Links;
