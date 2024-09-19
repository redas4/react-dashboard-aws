// import { useEffect, useState } from "react";
import { Button, Space, Flex } from '@mantine/core';

function TransactionEntry(
    transaction: {
        description: string, 
        type: "income" | "expense",
        amount: number, 
        id: string, 
        onDelete: (id: string) => void
    }) {

    return (
        <li>
            <Flex align="center"  justify="center" gap="md">
                <span style={{color: transaction.type==="income" ? 'green' : 'red', fontWeight: 'bold' }}>
                    {transaction.amount}
                </span>
                <Space w="md" />
                <span>
                    {transaction.description}
                </span> 
                <Space w="xl" />
                <Button >
                    Edit
                </Button>   
                < Button color="red" onClick={() => transaction.onDelete(transaction.id)}>
                    Delete
                </Button>
            </Flex>
        </li>
    );
}
export default TransactionEntry