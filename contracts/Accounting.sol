pragma solidity ^0.4.15;

contract Accounting {

  mapping (uint32 => Financial) journalMap;
  uint32 public journalLength = 0;

  struct Statement {
    uint32 cash;
    uint32 receivables;
    uint32 payables;
    uint32 share_capital;
    uint32 retained_earnings;
    uint32 revenue;
    uint32 expense;
  }

  Statement public statements;

  struct Financial {
    uint8 amount;
    bytes assetClass;
  }

  event StatementUpdated(address admin, uint8 StatementStatus);
  uint8 StatementStatus = 1; // Statement updated

  event LedgerUpdated(address admin, uint8 LedgerStatus);
  uint8 LedgerStatus = 1; // Ledger updated

  function initStatement(
    uint32 _cash,
    uint32 _receivables,
    uint32 _payables,
    uint32 _share_capital,
    uint32 _retained_earnings,
    uint32 _revenue,
    uint32 _expense
    ) {
    statements.cash = _cash;
    statements.receivables = _receivables;
    statements.payables = _payables;
    statements.share_capital = _share_capital;
    statements.retained_earnings = _retained_earnings;
    statements.revenue = _revenue;
    statements.expense = _expense;
    StatementUpdated(msg.sender,StatementStatus);
  }

  function updateLedger(uint8 _amount, bytes _assetClass){
      Financial memory newFinancial = Financial(_amount,_assetClass);

      journalMap[journalLength] = newFinancial;
      journalLength += 1;
      LedgerUpdated(msg.sender, LedgerStatus);
  }

  function getLedger(uint32 _index) constant returns (uint8, bytes) {
    Financial storage indiJournal = journalMap[_index];
    return (indiJournal.amount,indiJournal.assetClass);
  }

  function getStatementBalance () constant returns (uint32, uint32, uint32, uint32, uint32, uint32, uint32) {
    return (statements.cash, statements.receivables,statements.payables, statements.share_capital, statements.retained_earnings, statements.revenue, statements.expense);
  }

  function getJournalLength() constant returns (uint32){
    return journalLength;
  }
}
