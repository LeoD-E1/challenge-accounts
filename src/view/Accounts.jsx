import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { getData } from '../api/getData';
import '../style/index.css';

const Accounts = () => {
  const ITEMS_PER_PAGE = 5;
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const [visibleAccount, setVisibleAccount] = useState(
    [...accounts].splice(0, ITEMS_PER_PAGE)
  );

  const getAccounts = async () => {
    try {
      const data = await getData();
      const { cuentas } = data;
      const filteredAccounts = cuentas.filter((account) => {
        return (
          (account.moneda === '$' || account.moneda === 'u$s') &&
          (account.tipo_letras === 'CC' || account.tipo_letras === 'CA')
        );
      });
      setAccounts(filteredAccounts);
      setVisibleAccount([...filteredAccounts].splice(0, ITEMS_PER_PAGE));
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    const prevPage = currentPage - 1;
    const toIndex = prevPage * ITEMS_PER_PAGE;
    setVisibleAccount([...accounts].splice(toIndex, ITEMS_PER_PAGE));
    setCurrentPage(prevPage);
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    const toIndex = nextPage * ITEMS_PER_PAGE;
    setVisibleAccount([...accounts].splice(toIndex, ITEMS_PER_PAGE));
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    (async () => await getAccounts())();
  }, []);

  return (
    <>
      {loading && (
        <div className='loading-error'>
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div className='loading-error'>
          <h2>An error has ocurred</h2>
        </div>
      )}

      <div className='container'>
        <div className='accounts-container'>
          {currentPage !== 0 && (
            <div className='account-card' onClick={handlePrev}>
              <h4></h4>
              <h4>Previous page</h4>
              <h3></h3>
            </div>
          )}
          {visibleAccount.map((account, i) => (
            <Link key={i} href={`/accounts/${account.n}`}>
              <div className='account-card'>
                <h4>{account.n}</h4>
                <h4>({account.tipo_letras})</h4>
                <h3>${account.saldo}</h3>
              </div>
            </Link>
          ))}

          {accounts.length > currentPage * ITEMS_PER_PAGE && (
            <div className='account-card' onClick={handleNext}>
              <h4></h4>
              <h4>Next page</h4>
              <h3></h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accounts;
