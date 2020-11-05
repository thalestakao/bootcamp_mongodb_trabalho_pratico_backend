import { accountModel } from '../models/accountModel.js';
export const index = async (_, res, next) => {
  try {
    const accounts = await accountModel.find({});
    logger.info(`GET /accounts ${JSON.stringify(accounts, null, 2)}`);
    res.send(accounts);
  } catch (err) {
    next(err);
  }
};
//Exercício 4
export const depositCash = async (req, res, next) => {
  try {
    const { conta, agencia, value } = req.body;
    const data = await accountModel.findOneAndUpdate(
      { conta, agencia },
      { $inc: { balance: value } },
      { new: true }
    );
    if (!data) {
      throw new Error(process.env.INVALID_AGENCY_OR_ACCOUNT_DEPOSIT);
    }
    logger.info(`PATCH /accounts/deposit ${JSON.stringify(data, null, 2)}`);
    res.send({ balance: data.balance });
  } catch (err) {
    next(err);
  }
};
//Exercício 5
export const withdrawCash = async (req, res, next) => {
  try {
    const { conta, agencia, value } = req.body;
    let withdawValue = value;
    if (withdawValue > 0) {
      withdawValue = -1 * withdawValue;
    }
    const account = await accountModel.findOne({
      agencia,
      conta,
    });
    if (!account) {
      throw new Error(process.env.INVALID_AGENCY_OR_ACCOUNT);
    }
    if (account.balance + withdawValue < 0) {
      throw new Error(process.env.INSUFICIENT_BALANCE);
    }
    const balance = account.balance + withdawValue -1;
    const response = await accountModel.findOneAndUpdate(
      {
        agencia,
        conta,
      },

      { $set: { balance: balance } },
      { new: true }
    );
    logger.info(
      `PATCH /accounts/withdraw ${JSON.stringify(response, null, 2)}`
    );
    res.send(response);
  } catch (err) {
    next(err);
  }
};
//Exercício 6
export const getBalance = async (req, res, next) => {
  try {
    const { agencia, conta } = req.query;
    const data = await accountModel.findOne({ agencia, conta });
    if (!data) {
      throw new Error(process.env.INVALID_AGENCY_OR_ACCOUNT);
    }
    logger.info(`GET /accounts/balance ${JSON.stringify(data, null, 2)}`);
    res.send({ balance: data.balance });
  } catch (err) {
    next(err);
  }
};
//Exercício 7
export const removeAccount = async (req, res, next) => {
  try {
    const { agencia, conta } = req.query;
    const data = await accountModel.deleteOne({ agencia, conta });
    if (!data.n) {
      throw new Error(process.env.INVALID_AGENCY_OR_ACCOUNT);
    }
    const accounts = await accountModel.find({agencia});
    const count = await accountModel.countDocuments({ agencia });
    logger.info(
      `DELETE /accounts/?agencia=${agencia}&conta=${conta} ${JSON.stringify(
        count,
        null,
        2
      )}`
    );
    res.send({ count: count, accounts: [...accounts] });
  } catch (err) {
    next(err);
  }
};
//Exercício 8
export const transferMoneyToAccount = async (req, res, next) => {
  try {
    const { contaDeOrigem, contaDeDestino, value } = req.body;
    const originAccount = await accountModel.findOne({
      conta: contaDeOrigem,
    });
    if (!originAccount) {
      throw new Error(process.env.INVALID_ORIGIN_ACCOUNT);
    }
    const destinateAccount = await accountModel.findOne({
      conta: contaDeDestino,
    });
    if (!destinateAccount) {
      throw new Error(process.env.INVALID_DESTINATE_ACCOUNT);
    }
    const balanceOriginAccountValidation = originAccount.balance - value;

    if (balanceOriginAccountValidation < 0) {
      throw new Error(process.env.INSUFICIENT_BALANCE);
    }

    let balanceOriginAccount = null;

    if (originAccount.agencia === destinateAccount.agencia) {
      balanceOriginAccount = originAccount.balance - value;
    } else {
      balanceOriginAccount = originAccount.balance - (value + 8);
    }
    const updatedOriginAccount = await accountModel.findOneAndUpdate(
      {
        conta: contaDeOrigem,
      },

      { $set: { balance: balanceOriginAccount } },
      { new: true }
    );
    const updatedDestinateAccount = await accountModel.findOneAndUpdate(
      {
        conta: contaDeDestino,
      },

      { $inc: { balance: value } },
      { new: true }
    );
    logger.info(
      `PATCH /accounts/transfer-money-to-account ${JSON.stringify(
        updatedDestinateAccount,
        null,
        2
      )}`
    );
    return res.send({ balance: updatedOriginAccount.balance });
  } catch (err) {
    next(err);
  }
};

//Exercício 9
export const getBalanceAvgOfAgency = async (req, res, next) => {
  try {
    const { agencia } = req.params;
    const result = await accountModel.aggregate([
      {
        $match: { agencia: +agencia },
      },
      {
        $group: {
          _id: null,
          balanceAvg: { $avg: '$balance' },
        },
      },
    ]);
    if (result.length === 0) {
      throw new Error(process.env.INVALID_AGENCY);
    }
    const balanceAvg = result[0].balanceAvg;
    logger.info(
      `GET /accounts/balance-avg-of-agency/${agencia} ${JSON.stringify(
        balanceAvg,
        null,
        2
      )}`
    );
    res.send({ avg: balanceAvg });
  } catch (err) {
    next(err);
  }
};

//Exercício 10
export const getAccountsWithSmallestBalance = async (req, res, next) => {
  try {
    const { qty } = req.params;
    if (!qty) {
      throw new Error(process.env.INVALID_QTY);
    }
    const accounts = await accountModel
      .find({}, { _id: 0, name: 0, lastModified: 0 })
      .sort({ balance: 1 })
      .limit(+qty);
    if (accounts.length === 0 || !accounts) {
      throw new Error(process.env.NOT_DATA);
    }
    logger.info(
      `GET /accounts/accounts-with-smallest-balance/${qty} ${JSON.stringify(
        accounts,
        null,
        2
      )}`
    );
    res.send(accounts);
  } catch (err) {
    next(err);
  }
};

//Exercício 11
export const getAccountWithBiggestBalance = async (req, res, next) => {
  try {
    const { qty } = req.params;
    if (!qty) {
      throw new Error(process.env.INVALID_QTY);
    }
    const accounts = await accountModel
      .find({}, { _id: 0, name: 0, lastModified: 0 })
      .sort({ balance: -1 })
      .limit(+qty);
    if (accounts.length === 0 || !accounts) {
      throw new Error(process.env.NOT_DATA);
    }
    logger.info(
      `GET /accounts/accounts-with-biggest-balance/${qty} ${JSON.stringify(
        accounts,
        null,
        2
      )}`
    );
    res.send(accounts);
  } catch (err) {
    next(err);
  }
};

//Exercício 12
export const tranferClientToPrivateAgency = async (req, res, next) => {
  try {
    const accounts = await accountModel.aggregate([
      {
        $sort: { balance: -1 },
      },

      {
        $group: {
          _id: '$agencia',
          id: { $first: '$_id' },
          name: { $first: '$name' },
          agencia: { $first: '$agencia' },
          conta: { $first: '$conta' },
          balance: { $first: '$balance' },
        },
      },
    ]);

    accounts.forEach(async (account) => {
      await accountModel.findOneAndUpdate(
        { _id: account.id },
        {
          $set: {
            agencia: 99,
          },
        }
      );
    });
    const accountsOfPrivateAggency = await accountModel.find({ agencia: 99 });
    logger.info(
      `GET /grade ${JSON.stringify(accountsOfPrivateAggency, null, 2)}`
    );
    res.send(accountsOfPrivateAggency);
  } catch (err) {
    next(err);
  }
};
