document.addEventListener('DOMContentLoaded', function() {
    const file = window.file; // Use the file object passed from the controller
  
    function calculateBalance(file) {
      const totalPayments = file.payments.reduce((acc, payment) => acc + Number(payment.payment), 0);
      return Number(file.totalAmount) - totalPayments;
    }
  
    function updateBalanceDisplay(balance) {
      const balanceElement = document.querySelector('.file-title h1');
      if (balance <= 0) {
        balanceElement.textContent = 'You are done with your payments';
        balanceElement.classList.add('girly-elegant');
      } else {
        balanceElement.textContent = `Balance: $${balance}`;
        balanceElement.classList.remove('girly-elegant');
      }
    }
  
    const balance = calculateBalance(file);
    updateBalanceDisplay(balance);
  });