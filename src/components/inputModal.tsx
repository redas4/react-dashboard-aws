import { useState } from 'react';
import { NumberInput, Button, Textarea, Radio, Combobox, Input, InputBase, useCombobox, FileButton } from "@mantine/core";


const categories: string[] = ["Utilities", "Groceries", "Insurance", "Tax", "Housing", "Car", "Entertainment", "Miscellaneous"];

function InputModal({
    createTransaction, close
}: {
    createTransaction: (
        description: string,
        amount: number,
        category: string | null,
        type: "income" | "expense"
    ) => void;
    close: () => void;
}) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
      });

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string | null>(null);
    const [type, setType] = useState<"income" | "expense">('expense');
    const [file, setFile] = useState<File | null>(null);
  
    const catOptions = categories.map((category) => (
        <Combobox.Option value={category} key={category}>
          {category}
        </Combobox.Option>
      ));
  
    const handleSubmit = () => {
        console.log("Here is the description:  " + description)
        console.log("Here is the type:  " + type)
        console.log("Here is the amount:  " + amount)
      if (description && amount && type) {
        createTransaction(description, amount, category, type);
        close(); 
      }
    };


    return (
      <>
          <form onSubmit={(e) => e.preventDefault()}>
            <Textarea
              label="Description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              required
            />
  
            <NumberInput
              label="Amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(value) => {
                if (typeof value === 'number') {
                  setAmount(value);
              }}}
              required
              prefix='$'
              min={0}
              decimalScale={2}
            />
  
            <Radio.Group
              label="Transaction Type"
              value={type}
              onChange={(value: string ) => {value === "expense" ? setType("expense") : setType("income")}}
              required
            >
              <Radio value="income" label="Income" />
              <Radio value="expense" label="Expense" />
            </Radio.Group>

            {type=="expense" && (
            <div>
              <label htmlFor="categories">Categories</label>
              <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                    setCategory(val);
                    combobox.closeDropdown();
                }}
                withinPortal={true} 
                >
                <Combobox.Target>
                    <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    >
                    {category || <Input.Placeholder>Pick value</Input.Placeholder>}
                    </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{catOptions}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
            </div>
            )}

            <FileButton onChange={setFile} accept=".pdf,.docximage/png,image/jpeg">
            {(props) => <Button {...props}>Attach Files</Button>}
            </FileButton>   
            {file && <p>Selected file: {file.name}</p>}


            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              mt="md"
            >
              Submit
            </Button>
          </form>
      </>
    );
  };
  
  export default InputModal;