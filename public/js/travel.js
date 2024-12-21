document.addEventListener('DOMContentLoaded', function() {
    const items = JSON.parse(document.getElementById('items-data').textContent);
    let currentIndex = 0;
  
    const itmeBox = document.createElement('div');
    itmeBox.className = 'itmeBox';
    document.body.appendChild(itmeBox);
  
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.className = 'start-button';
    itmeBox.appendChild(startButton);
  
    startButton.addEventListener('click', function() {
      startButton.style.display = 'none';
      showNextItem();
    });
  
    function showNextItem() {
      if (currentIndex >= items.length) {
        alert('You have everything for the trip!');
        return;
      }
  
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item-question';
      itemDiv.innerHTML = `
        <p>Have you packed your ${items[currentIndex]}?</p>
        <button class="yes-button">Yes</button>
        <button class="no-button">No</button>
      `;
      itmeBox.appendChild(itemDiv);
  
      itemDiv.querySelector('.yes-button').addEventListener('click', function() {
        itmeBox.removeChild(itemDiv);
        currentIndex++;
        showNextItem();
      });
  
      itemDiv.querySelector('.no-button').addEventListener('click', function() {
        alert('Please pack your ' + items[currentIndex] + ' before moving on.');
      });
    }
  
    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
      .itmeBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 40vh;
      }
      .start-button, .yes-button, .no-button {
        background-color: #ff69b4;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 10px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
      }
      .start-button:hover, .yes-button:hover, .no-button:hover {
        background-color: #ff1493;
      }
      .item-question {
        text-align: center;
        background-color: #ffe4e1;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .item-question p {
        font-size: 18px;
        color: #ff69b4;
      }
    `;
    document.head.appendChild(style);
  });