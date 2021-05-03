import { createContext, ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../connection/firebase'

export interface ICoreState {
  addNewPerson: (
    name: string,
    age: number,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  ) => void
  people: any
  deleteData: (doc: string) => void
}

const initialState: ICoreState = {
  addNewPerson: () => undefined,
  people: [],
  deleteData: () => undefined
}

export const CoreContext = createContext(initialState)

const CoreState = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<any[]>()

  const getData = async () => {
    const snapshot = await db.collection('people').get()
    return setPeople(snapshot.docs.map(doc => { return { data: doc.data(), uuid: doc.id } }))
  }

  useEffect(() => {
    getData()
  }, [])

  const addNewPerson = (
    name: string,
    age: number,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  ) => {
    db.collection('people').doc(identification).set({
      name,
      age,
      maritalStatus,
      identification,
      city,
      state
    }).then((r) => console.log(r)).catch(e => console.log(e))
  }

  const deleteData = (doc: string) => {
    db.collection('people').doc(doc).delete().then(() => {
      toast.success('Registro deletado com sucesso')
    })
  }

  const contextValue = {
    addNewPerson,
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
