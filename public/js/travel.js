document.addEventListener('DOMContentLoaded', function() {
  const items = JSON.parse(document.getElementById('items-data').textContent);
  let currentIndex = 0;

  const container = document.createElement('div');
  container.className = 'container';
  document.body.appendChild(container);

  const welcomeMessage = document.createElement('div');
  welcomeMessage.className = 'welcome-message';
  welcomeMessage.innerHTML = `
      <h1>Welcome to Your Trip Planner!</h1>
      <p>Are you ready for your trip?</p>
  `;
  container.appendChild(welcomeMessage);

  const startButton = document.createElement('button');
  startButton.textContent = 'Start Packing';
  startButton.className = 'start-button';
  container.appendChild(startButton);

  startButton.addEventListener('click', function() {
      welcomeMessage.style.display = 'none';
      startButton.style.display = 'none';
      showNextItem();
  });

  function showNextItem() {
      if (currentIndex >= items.length) {
          showModal('You have everything for the trip!', resetToDefault);
          return;
      }

      const itemDiv = document.createElement('div');
      itemDiv.className = 'item-question';
      itemDiv.innerHTML = `
          <p>Have you packed your ${items[currentIndex]}?</p>
          <button class="yes-button">Yes</button>
          <button class="no-button">No</button>
      `;
      container.appendChild(itemDiv);

      itemDiv.querySelector('.yes-button').addEventListener('click', function() {
          container.removeChild(itemDiv);
          currentIndex++;
          showNextItem();
      });

      itemDiv.querySelector('.no-button').addEventListener('click', function() {
          showModal('Please pack your ' + items[currentIndex] + ' before moving on.');
      });
  }

  function showModal(message, callback) {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
          <div class="modal-content">
              <span class="close-button">&times;</span>
              <p>${message}</p>
          </div>
      `;
      document.body.appendChild(modal);

      const closeButton = modal.querySelector('.close-button');
      closeButton.addEventListener('click', function() {
          document.body.removeChild(modal);
          if (callback) callback();
      });

      modal.style.display = 'block';
  }

  function resetToDefault() {
      welcomeMessage.style.display = 'block';
      startButton.style.display = 'block';
      currentIndex = 0;
  }

  // Add CSS styles
  const style = document.createElement('style');
  style.textContent = `
      .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #fce4ec;
          font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      .welcome-message {
          text-align: center;
          animation: fadeIn 2s ease-in-out;
      }
      .welcome-message h1 {
          font-size: 36px;
          color: #ff69b4;
      }
      .welcome-message p {
          font-size: 24px;
          color: #ff1493;
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
          background-color: #fff0f5;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
      }
      .item-question p {
          font-size: 18px;
          color: #ff69b4;
      }
      @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
      }
      .new-item-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #ff69b4;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
          font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      .new-item-button:hover {
          background-color: #ff1493;
      }
      .modal {
          display: none;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
          padding-top: 60px;
      }
      .modal-content {
          background-color: #fefefe;
          margin: 5% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          border-radius: 10px;
          text-align: center;
      }
      .close-button {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
      }
      .close-button:hover,
      .close-button:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
      }
  `;
  document.head.appendChild(style);

  // Create and append the new item button
  const newItemButton = document.createElement('a');
  newItemButton.href = '/travel/create';
  newItemButton.textContent = 'New Item';
  newItemButton.className = 'new-item-button';
  document.body.appendChild(newItemButton);
});