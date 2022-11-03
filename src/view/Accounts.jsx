import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import '../style/index.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  const getData = async () => {
    const response = await fetch('https://api.npoint.io/97d89162575a9d816661');
    const { cuentas } = await response.json();

    setAccounts(
      cuentas.filter((account) => {
        return (
          (account.moneda === '$' || account.moneda === 'u$s') &&
          (account.tipo_letras === 'CC' || account.tipo_letras === 'CA')
        );
      })
    );
  };

  useEffect(() => {
    (async () => await getData())();
  }, []);

  return (
    <div className='container'>
      <div className='accounts-container'>
        {accounts.slice(0, 5).map((account, i) => (
          <Link key={i} href={`/accounts/${account.n}`}>
            <div className='account-card'>
              <h4>{account.n}</h4>
              <h4>({account.tipo_letras})</h4>
              <h3>${account.saldo}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
