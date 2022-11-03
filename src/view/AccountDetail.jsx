import React from 'react';
import { useRoute } from 'wouter';

const AccountDetail = () => {
  const { accountNumber } = useRoute();
  console.log(
    '🚀 ~ file: AccountDetail.jsx ~ line 7 ~ AccountDetail ~ accountNumber',
    accountNumber
  );
  return <div>AccountDetail</div>;
};

export default AccountDetail;
