import { Button, Form, Pagination, Table } from 'react-bootstrap'
import Header from '../components/Header'
import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { CoreContext } from '../states/CoreState'
import { IPerson, IState, ICity } from '../types'
import { lowerCaseStringAndRemoveAccent } from '../utils/strings'
import { FiTrash, FiEdit, FiPlus } from 'react-icons/fi'
import swal from 'sweetalert2'
import axios from 'axios'
import Space from '../components/Space'
import { toast } from 'react-toastify'

interface Props {
  className?: string
}

const Core = ({ className }: Props) => {
  const {
    addOrSetNewPerson,
    people,
    deleteData,
    getNextPage,
    getPreviousPage,
    pages,
    updateData
  } = useContext(CoreContext)
  const [data, setData] = useState<IPerson[]>()
  const [search, setSearch] = useState<string>('')
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])

  const [inputName, setInputName] = useState<string>('')
  const [inputAge, setInputAge] = useState<number | string>('')
  const [inputMaritalStatus, setInputMaritalStatus] = useState<string>('')
  const [inputIdentification, setInputIdentification] = useState<string>('')
  const [inputState, setInputState] = useState<string>('')
  const [inputCity, setInputCity] = useState<string>('')
  const [action, setAction] = useState<'UPDATE' | 'CREATE'>('CREATE')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setData(people)
  }, [people])

  const handleCreate = () => {
    try {
      if (data && data.find(x => x.uuid === inputIdentification)) {
        toast.error('Essa pessoa já existe em nosso banco de dados')
      } else {
        if (inputName && inputAge && inputMaritalStatus && inputIdentification && inputCity && inputState) {
          addOrSetNewPerson(
            inputName,
            inputAge,
            inputMaritalStatus,
            inputIdentification,
            inputCity,
            inputState
          )
          if (data) {
            setData([{
              data: {
                name: inputName,
                age: inputAge,
                maritalStatus: inputMaritalStatus,
                identification: inputIdentification,
                city: inputCity,
                state: inputState
              },
              uuid: inputIdentification
            }, ...data].filter((x, i) => i !== data.length - 1))
          }
        } else {
          toast.error('Preencha todos os campos')
        }
      }
    } catch {
      toast.error('Ocorreu um erro ao registrar o dado')
    }
  }

  const setInputFields = (
    name: string,
    age: number | string,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  ) => {
    setInputName(name)
    setInputAge(age)
    setInputMaritalStatus(maritalStatus)
    setInputIdentification(identification)
    setInputState(state)
    setInputCity(city)
    setAction('UPDATE')
  }

  const fetchStates = () => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
      setStates(response.data)
    })
  }

  const loadCities = (state: string) => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos?orderBy=nome`).then(response => {
      setCities(response.data)
    })
  }

  useEffect(() => {
    fetchStates()
    loadCities('AC')
  }, [])

  const filterPeople = () => {
    return data?.filter(
      (person: IPerson) => lowerCaseStringAndRemoveAccent(person.data.name)?.includes(lowerCaseStringAndRemoveAccent(search)))
  }

  const handleDelete = (id: string) => {
    swal.fire({
      title: 'Deseja deletar esse cadastro permanentemente?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelars',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar'
    }).then((e) => {
      if (e.isConfirmed) {
        deleteData(id)
        if (data) {
          setData(data.filter(person => person.uuid !== id))
        }
      }
    })
  }

  const paginationNext = () => {
    if (page < pages) {
      getNextPage()
      setPage(page + 1)
    }
  }

  const paginationPrevious = () => {
    if (page >= pages) {
      getPreviousPage()
      setPage(page - 1)
    }
  }

  const handleUpdate = () => {
    try {
      if (inputName && inputAge && inputMaritalStatus && inputIdentification && inputCity && inputState) {
        updateData(
          inputName,
          inputAge,
          inputMaritalStatus,
          inputIdentification,
          inputCity,
          inputState
        )

        setData(data?.map(x => {
          if (x.uuid === inputIdentification) {
            return {
              data: {
                name: inputName,
                age: inputAge,
                maritalStatus: inputMaritalStatus,
                identification: inputIdentification,
                city: inputCity,
                state: inputState
              },
              uuid: inputIdentification
            }
          }
          return x
        }))
      }
    } catch {
      toast.error('Ocorreu um erro ao editar este item')
    }
  }

  return (
    <>
      <Header />
      <div className={className}>
        <div className="left-side">
          {action === 'UPDATE' && <Button className="add__button" onClick={() => setAction('CREATE')}><FiPlus /></Button>}
          <Form.Group className="w-50 input__group" >
            <Form.Label>Pesquisar</Form.Label>
            <Form.Control
              placeholder="Pesquisar por nome..."
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Form.Group>
          <Table striped hover size="md" borderless={true} className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Estado Civil</th>
                <th>CPF</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filterPeople()?.map((person: IPerson) => (
                <tr key={person.uuid}>
                  <td>{person.data.name}</td>
                  <td>{person.data.age}</td>
                  <td>{person.data.maritalStatus}</td>
                  <td>{person.data.identification}</td>
                  <td>{person.data.city}</td>
                  <td>{person.data.state}</td>
                  <td className="actions">
                    <FiEdit onClick={() => {
                      setInputFields(
                        person.data.name,
                        person.data.age,
                        person.data.maritalStatus,
                        person.data.identification,
                        person.data.city,
                        person.data.state
                      )
                    }}/>
                    <FiTrash onClick={() => handleDelete(person?.uuid)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev disabled={!(page >= pages)} onClick={() => paginationPrevious()}/>
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next disabled={!(page < pages)}onClick={() => paginationNext()}/>
          </Pagination>
        </div>
        <div className="right-side">
        <Form.Group className="col-12">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={inputName}
            type="text"
            onChange={e => setInputName(e.target.value)}
          />
        </Form.Group>
        <Form.Row className="col-12">
          <Form.Group className="col-3">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              value={inputAge}
              type="number"
              onChange={e => setInputAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-9">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control
              as="select"
              value={inputMaritalStatus}
              onChange={e => setInputMaritalStatus(e.target.value)}
              defaultValue="default"
            >
              <option value="default">Estado Civil</option>
              <option>Solteiro(a)</option>
              <option>Casado(a)</option>
              <option>Divorciado(a)</option>
              <option>Viuvo(a)</option>
              <option>Separado(a)</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group className="col-12">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            disabled={action === 'UPDATE'}
            value={inputIdentification}
            type="email"
            onChange={e => setInputIdentification(e.target.value)}
          />
        </Form.Group>
        <Form.Row className="col-12">
          <Form.Group className="col-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              onChange={e => {
                loadCities(e.target.value)
                setInputState(e.target.value)
              }}
              value={inputState}
            >
              {states.map(state => (
                <option key={state.id}>{state.sigla}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="col-9">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              as="select"
              value={inputCity}
              onChange={e => setInputCity(e.target.value)}
              defaultValue="default"
            >
              <option value="default">Cidade</option>
              {cities && cities.map(city => (
                <option key={city.id}>{city.nome}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Space height="100px"/>
          {action === 'CREATE'
            ? (
              <Button type="submit" className="btn-block" onClick={handleCreate}>Adicionar</Button>
              )
            : (
            <Button type="submit" className="btn-block btn-success" onClick={handleUpdate}>Editar</Button>
              )}
        </Form.Row>
        </div>
      </div>
    </>
  )
}

export default styled(Core)`
  display: grid;
  grid-template-columns: 5fr 2fr;
  height: 100%;
  width: 100%;
  color: ${props => props.theme.fontColor};

  @media(max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 2fr;
  }

  .left-side {
    height: calc(100vh - 90px);
    margin-top: 90px;
    display: flex;
    overflow-y: scroll;

    @media(max-width: 1000px){
     height: 70%;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.secondaryColor};
        border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    flex-direction: column;
    align-items: center;
    position: relative;

    .add__button {

      position: absolute;
      right: 15px;
      top: 15px;

      svg {
        height: 30px;
        width: 30px;
      }
    }

    .input__group {
      margin: 40px 0;
    }
  }

  .right-side {
    background: ${props => props.theme.white};
    width: 100%;
    box-shadow: -1px 0px 10px 1px #00000040;
    height: 100%;

    padding-top: 120px;
    .form-control:valid {
      background:  ${props => props.theme.lightGray} !important;
    }

    @media(max-width: 1000px) {
      padding: 30px 0;
    }
  }

  .table {
    color: ${props => props.theme.fontColor};
    max-width: 100%;

    box-shadow: 4px 4px 20px 2px #00000040;

    thead {
      background: ${props => props.theme.primaryColor};
      color: ${props => props.theme.white};
    }  

    .actions {
      display: flex;

       svg {
        cursor: pointer;
        margin: 6px;
        transition: color 300ms;

        &:hover {
          color: ${props => props.theme.fontColor};
        }
      }
    }

    & > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
      background-color: #D7ECFF;
    }
  }

  
`
