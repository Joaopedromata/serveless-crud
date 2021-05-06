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
  getNextPage: () => void
  getPreviousPage: () => void
  pages: number
  updateData: (
    name: string,
    age: number | string,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  ) => void
}

const initialState: ICoreState = {
  addOrSetNewPerson: () => undefined,
  people: [],
  deleteData: () => undefined,
  getNextPage: () => undefined,
  getPreviousPage: () => undefined,
  pages: 1,
  updateData: () => undefined
}

export const CoreContext = createContext(initialState)

const CoreState = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<any[]>()
  const [next, setNext] = useState<any>()
  const [previous, setPrevious] = useState<any>()
  const [pages, setPages] = useState<number>(1)

  const user = localStorage.getItem('user')

  const getData = async (user: string) => {
    const pages = await db.collection(user).get()

    setPages(pages.size / 3)

    const snapshot = await db.collection(user).limit(3).get()

    setNext(snapshot.docs[snapshot.docs.length - 1])

    return setPeople(snapshot.docs.map(doc => { return { data: doc.data(), uuid: doc.id } }))
  }

  const updateData = (
    name: string,
    age: number | string,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  ) => {
    if (user) {
      db.collection(user).doc(identification).update({
        name,
        age,
        maritalStatus,
        identification,
        city,
        state
      })
    }
  }

  const getNextPage = () => {
    if (user && next) {
      db.collection(user).limit(3).startAfter(next).get().then(snapshot => {
        setPeople(snapshot.docs.map(doc => { return { data: doc.data(), uuid: doc.id } }))
        setNext(snapshot.docs[snapshot.docs.length - 1])
        setPrevious(snapshot.docs[0])
      })
    }
  }

  const getPreviousPage = () => {
    if (user && previous) {
      db.collection(user).limit(3).endBefore(previous).get().then(snapshot => {
        setPeople(snapshot.docs.map(doc => { return { data: doc.data(), uuid: doc.id } }))
        setNext(snapshot.docs[snapshot.docs.length - 1])
        setPrevious(snapshot.docs[0])
      })
    }
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

      setPages(((pages + 1) / 3))
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
    deleteData,
    getNextPage,
    getPreviousPage,
    pages,
    updateData
  }

  return (
    <CoreContext.Provider value={contextValue}>
      {children}
    </CoreContext.Provider>
  )
}

export default CoreState
