import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import '@mantine/core/styles.css';

import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import TransactionEntry from './components/transactionEntry';
import InputModal from './components/inputModal';
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Flex } from '@mantine/core';
// import { getUrl } from 'aws-amplify/storage';

const client = generateClient<Schema>();

function App() {
  const [transactions, setTransactions] = useState<Array<Schema["Transaction"]["type"]>>([]);

  useEffect(() => {
    client.models.Transaction.observeQuery().subscribe({
      next: (data) => setTransactions([...data.items]),
    });
  }, []);

  function createTransaction( description: string, amount: number, category: string | null, type: "income" | "expense") {
    client.models.Transaction.create({ description: description, amount: amount, category: category, type: type });
  }

  function editTransaction(id: string, ) {
    client.models.Transaction.update({id: id, })
  }
    
  function deleteTransaction(id: string) {
    client.models.Transaction.delete({ id });
  }
  const [opened, { open, close }] = useDisclosure(false);

  return (
        
    <Authenticator>
      {({ signOut, user }) => (    
      <main>
      <Flex justify="center" align="center" direction="column"  >
      <h1>{user?.signInDetails?.loginId}'s transaction</h1>
      <h1>My Transactions</h1>

      <Modal opened={opened} onClose={close} title="Add a Transaction" centered>
        <InputModal createTransaction={createTransaction} close={close} />
      </Modal>

      <Button onClick={open}>Add Income or Expense</Button>
      
      {/* toggle by name, type , category */}
      <ul>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionEntry
          key={transaction.id}
          description={transaction.description!} 
          type={transaction.type === "income" ? "income" : "expense"}
          amount={transaction.amount!} 
          id={transaction.id}
          onDelete={() => deleteTransaction(transaction.id)}
        />
        ))
       ) : (
        <li>No transactions found. Create one to get started!</li>
          )}
      </ul>
      <Button onClick={signOut}>Sign out</Button>
      </Flex>
    </main>    
    )}
    </Authenticator>
  );
}

export default App;
