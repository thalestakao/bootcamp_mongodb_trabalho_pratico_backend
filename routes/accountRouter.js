import express from 'express';
import * as accountController from '../controllers/accountController.js';
const router = express.Router();

router.get('/', accountController.index);

router.patch('/deposit', accountController.depositCash);

router.patch('/withdraw', accountController.withdrawCash);

router.get('/balance', accountController.getBalance);

router.delete('/', accountController.removeAccount);

router.patch(
  '/transfer-money-to-account',
  accountController.transferMoneyToAccount
);

router.get(
  '/balance-avg-of-agency/:agencia',
  accountController.getBalanceAvgOfAgency
);

router.get(
  '/accounts-with-smallest-balance/:qty',
  accountController.getAccountsWithSmallestBalance
);

router.get(
  '/accounts-with-biggest-balance/:qty',
  accountController.getAccountWithBiggestBalance
);

router.get(
  '/transfer-client-to-private-agency',
  accountController.tranferClientToPrivateAgency
);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
