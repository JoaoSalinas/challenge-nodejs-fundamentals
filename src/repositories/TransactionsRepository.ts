import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    let input = 0;
    let output = 0;

    this.transactions.forEach(transaction => {
      if(transaction.type === 'income'){
        input += transaction.value
      } else if (transaction.type === 'outcome') {
        output += transaction.value
      }
    })

    const balance: Balance = {
      income: input,
      outcome: output,
      total: input - output
    }

    return balance
  }

  public create({title, value, type}: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;

  }
}

export default TransactionsRepository;
