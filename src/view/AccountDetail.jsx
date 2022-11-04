import React from 'react';
import { useLocation } from 'wouter';

const AccountDetail = () => {
  const [location] = useLocation();
  const account = location.split('/')[2];
  console.log(
    '🚀 ~ file: AccountDetail.jsx ~ line 7 ~ AccountDetail ~ location',
    location.split('/')[2]
  );
  return <div>{account}</div>;
};

export default AccountDetail;
