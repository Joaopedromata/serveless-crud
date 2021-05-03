import { Form, Table } from 'react-bootstrap'
import Header from '../components/Header'
import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { CoreContext } from '../states/CoreState'
import { IPerson } from '../types'
import { lowerCaseStringAndRemoveAccent } from '../utils/strings'
import { FiTrash, FiEdit } from 'react-icons/fi'
import swal from 'sweetalert2'

interface Props {
  className?: string
}

const Core = ({ className }: Props) => {
  const { addNewPerson, people, deleteData } = useContext(CoreContext)
  const [data, setData] = useState<IPerson[]>(people)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    addNewPerson('jpoo', 12, 'teste', '32131223', 'bh', 'mg')
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
                    <FiEdit />
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
            type="text"
          />
        </Form.Group>
        <Form.Row className="col-12">
          <Form.Group className="col-3">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              type="number"
            />
          </Form.Group>
          <Form.Group className="col-9">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control as="select">
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
            type="email"
          />
        </Form.Group>
        <Form.Row className="col-12">
          <Form.Group className="col-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control as="select">
              <option>Solteiro(a)</option>
              <option>Casado(a)</option>
              <option>Divorciado(a)</option>
              <option>Viuvo(a)</option>
              <option>Separado(a)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="col-9">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              type="email"
            />
          </Form.Group>
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

    .right-side {
      background: yellow;
      padding: 0;
    }
  }


  .left-side {
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .input__group {
      margin-top: 40px;
    }
  }

  .right-side {
    background: ${props => props.theme.white};
    height: 100%;
    width: 100%;
    box-shadow: -1px 0px 10px 1px #00000040;
    padding-top: 100px;
  }

  .table {
    color: ${props => props.theme.fontColor};
    max-width: 900px;
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
