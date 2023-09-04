import Close from '../../assets/general/Close'
import MenuHambuguer from '../../assets/general/MenuHambuguer'

export default function Header({
  isOpen,
  onClick
}: {
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <header className="w-screen z-50 bg-azulPrimary100 h-[60px] lg:hidden flex items-center justify-between pr-[24px] pl-[3px] shadow-sm">
      <span
        onClick={onClick}
        className="w-[56px] h-[56px] text-azulPrimary900 grid place-content-center"
      >
        {isOpen ? <Close /> : <MenuHambuguer />}
      </span>
    </header>
  )
}
