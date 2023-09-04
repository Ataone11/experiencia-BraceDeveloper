import { text } from './text/users'
import ClientListElement from '../../../components/ItemList/itemListSucursal'
import { UserDataModel } from '../../../models/userDataModel'

interface TypeList {
  subtitle: string
  users: UserDataModel[] | null
  sucursales?: UserDataModel | null
}

const SucursalList = ({ users, sucursales }: TypeList) => {
  return (
    <>
      <div className="w-full overflow-auto">
        <table className="table lg:w-full w-[600px] p-8 lg:text-[16px] text-[13px]">
          <thead className="border-4 rounded-lg border-b-azulPrimary900 border-t-white border-r-white border-l-white">
            <tr className=" text-azulPrimary900 font-semibold h-[44px] ">
              <th>{text.clientColumn1.es}</th>
              <th>{text.clientColumn2.es}</th>
              <th>{text.clientColumn3.es}</th>
              <th>{text.clientColumn4.es}</th>
              <th>{text.clientColumn5.es}</th>
              <th>{text.column8.es}</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <ClientListElement
                    key={user.id}
                    users={user}
                    sucursales={sucursales}
                  ></ClientListElement>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SucursalList
