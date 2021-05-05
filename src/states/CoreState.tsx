import { createContext, ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../connection/firebase'

export interface ICoreState {
  addOrSetNewPerson: (
    name: string,
    age: number | string,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  ) => void
  people: any
  deleteData: (doc: string) => void
}

const initialState: ICoreState = {
  addOrSetNewPerson: () => undefined,
  people: [],
  deleteData: () => undefined
}

export const CoreContext = createContext(initialState)

const CoreState = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<any[]>()
  const user = localStorage.getItem('user')

  const getData = async (user: string) => {
    const snapshot = await db.collection(user).get()
    return setPeople(snapshot.docs.map(doc => { return { data: doc.data(), uuid: doc.id } }))
  }

  useEffect(() => {
    if (user) {
      getData(user)
    }
  }, [user])

  const addOrSetNewPerson = (
    name: string,
    age: number | string,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  ) => {
    if (user) {
      db.collection(user).doc(identification).set({
        name,
        age,
        maritalStatus,
        identification,
        city,
        state
      })
    }
  }

  const deleteData = (doc: string) => {
    if (user) {
      db.collection(user).doc(doc).delete().then(() => {
        toast.success('Registro deletado com sucesso')
      })
    }
  }

  const contextValue = {
    addOrSetNewPerson,
    people,
    deleteData
  }

  return (
    <CoreContext.Provider value={contextValue}>
      {children}
    </CoreContext.Provider>
  )
}

export default CoreState
