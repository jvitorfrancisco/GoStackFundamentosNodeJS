import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
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
    const { income, outcome } = this.transactions.reduce((a, b) => {
      switch (b.type) {
        case 'income':
          a.income += b.value;
          break;
        case 'outcome':
          a.outcome += b.value;
          break;
        default: 
          break;
      }
      return a;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    const total = income - outcome;

    return { income, outcome, total };
  };

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
