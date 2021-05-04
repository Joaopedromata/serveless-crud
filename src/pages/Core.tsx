import { Button, Form, Table } from 'react-bootstrap'
import Header from '../components/Header'
import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { CoreContext } from '../states/CoreState'
import { IPerson, IState, ICity } from '../types'
import { lowerCaseStringAndRemoveAccent } from '../utils/strings'
import { FiTrash, FiEdit } from 'react-icons/fi'
import swal from 'sweetalert2'
import axios from 'axios'
import Space from '../components/Space'

interface Props {
  className?: string
}

const Core = ({ className }: Props) => {
  const { addNewPerson, people, deleteData } = useContext(CoreContext)
  const [data, setData] = useState<IPerson[]>(people)
  const [search, setSearch] = useState<string>('')
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])

  const [inputName, setInputName] = useState<string>('')
  const [inputAge, setInputAge] = useState<number>()
  const [inputMaritalStatus, setInputMaritalStatus] = useState<string>('')
  const [inputIdentification, setInputIdentification] = useState<string>('')
  const [inputState, setInputState] = useState<string>('')
  const [inputCity, setInputCity] = useState<string>('')
  const [action, setAction] = useState<'UPDATE' | 'CREATE'>('CREATE')

  useEffect(() => {
    addNewPerson('jpoo', 12, 'teste', '32131223', 'bh', 'mg')
  }, [])

  const setInputFields = (
    name: string,
    age: number,
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
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar'
    }).then(() => {
      deleteData(id)
      setData(data.filter(person => person.uuid !== id))
    })
  }

  return (
    <>
      <Header />
      <div className={className}>
        <div className="left-side">
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
              {filterPeople().map((person: IPerson) => (
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
                    <FiTrash onClick={() => handleDelete(person.uuid)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="right-side">
        <Form.Group className="col-12">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={inputName}
            type="text"
          />
        </Form.Group>
        <Form.Row className="col-12">
          <Form.Group className="col-3">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              value={inputAge}
              type="number"
            />
          </Form.Group>
          <Form.Group className="col-9">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control
              as="select"
              value={inputMaritalStatus}
            >
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
            value={inputIdentification}
            type="email"
          />
        </Form.Group>
        <Form.Row className="col-12">
          <Form.Group className="col-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              onChange={e => loadCities(e.target.value)}
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
            >
              {cities && cities.map(city => (
                <option key={city.id}>{city.nome}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Space height="100px"/>
          {action === 'CREATE'
            ? (
            <Button type="submit" className="btn-block">Adicionar</Button>
              )
            : (
            <Button type="submit" className="btn-block btn-success">Editar</Button>
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
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .input__group {
      margin: 40px 0;
    }
  }

  .right-side {
    background: ${props => props.theme.white};
    height: 100%;
    width: 100%;
    box-shadow: -1px 0px 10px 1px #00000040;
    padding-top: 120px;

    @media(max-width: 1000px) {
      padding: 30px 0;
    }
  }

  .table {
    color: ${props => props.theme.fontColor};
    max-width: 100%;
    box-shadow: 4px 4px 20px 2px #00000040;

    @media(max-width: 1000px) {
      background: yellow;
    }

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
