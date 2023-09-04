interface Params {
  name: string ;
  action?: any;
  value?: boolean
}
const Switch = ({
  name,
  action,
  value
}: Params) => {
  return (
    <div className="flex mx-auto">
      <label className="inline-flex relative items-center cursor-pointer">
        <input name={name} type="checkbox" checked={value} className="sr-only peer" title={name} onChange={action}/>
        <div className="w-11 h-6 bg-gray-200 rounded-full peer  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-azulPrimary700"></div>
      </label>
    </div>
  );
};

export default Switch;
