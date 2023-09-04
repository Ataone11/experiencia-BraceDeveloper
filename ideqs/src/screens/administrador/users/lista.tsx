import { text } from './text/users'
import ListElement from '../../../components/ItemList/ItemList'
import { UserDataModel } from '../../../models/userDataModel'

interface TypeList {
  subtitle: string
  rols: number[]
  users: UserDataModel[] | null
}

const List = ({ users }: TypeList) => {
  return (
    <>
      <div className="w-full overflow-auto">
        <table className="table lg:w-full w-[600px] p-8 lg:text-[16px] text-[13px] overflow-x-auto">
          <thead className="border-4 rounded-lg border-b-azulPrimary900 border-t-white border-r-white border-l-white">
            <tr className=" text-azulPrimary900 font-semibold h-[44px] ">
              <th>{text.column1.es}</th>
              <th>{text.column2.es}</th>
              <th>{text.column3.es}</th>
              <th>{text.column4.es}</th>
              <th>{text.column5.es}</th>
              <th>{text.column6.es}</th>
              <th>{text.column7.es}</th>
              <th>{text.column8.es}</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return <ListElement key={user?.id} users={user}></ListElement>
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List
