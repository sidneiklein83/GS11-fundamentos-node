import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (typeof value !== 'number') {
      throw Error('The Value is not a Number!');
    }

    if (type === 'outcome' && total < value) {
      throw Error('Insufficient balance for the transaction!');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Transaction Type are Inválid!');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    //
    return transaction;
  }
}

export default CreateTransactionService;
