import TransactionsRepository from '../repositories/TransactionsRepository';
import { response } from 'express';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request){

    const transactionBalance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && (transactionBalance.total - value < 0)) {
      return response.status(400).json({error: "you don't have money for this transaction"});
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })

    return transaction;
  }
}

export default CreateTransactionService;
