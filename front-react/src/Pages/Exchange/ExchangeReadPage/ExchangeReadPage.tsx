import { Col, Row } from 'react-bootstrap';
import './exchangeReadPage.css';
import ExchangeInfo from '../../../Components/Exchanges/ExchangeInfo/ExchangeInfo';
import { useState } from 'react';

export default function ExchangeReadPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  return (
    <>
    <div className="container">
    <Row>
      <Col sm={12}>
        <Row>
        <div>
          <h2 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Liste des Messages</h2>
        <div className="searchBar">
          <div>
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              className='searchBars'
              placeholder="Rechercher par date , statut ..."
              onChange={handleSearchTerm}
          />
        </div>
      </div>      
        </div>
          <ExchangeInfo/>
        </Row>
      </Col>
    </Row>
    </div>
    </>
  )
}
