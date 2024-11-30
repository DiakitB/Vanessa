

/// create a function that will take an arry of questons and return one question at a time when clicked


// create a function that will take an array of questions and return one question at a time when clicked
let currentIndex = 0;

const testing = (questions) => {
  if (currentIndex >= questions.length) {
    currentIndex = 0; // Reset to the first question if we reach the end
  }
  return questions[currentIndex++];
};

// button(onclick="displayitem()") 

//   ul#travel-item-list

//   script.
//     function displayitem() {
//       var item = !{JSON.stringify(item)};
//       var list = document.getElementById('travel-item-list');
//       list.innerHTML = '';
//       item.forEach(function(it) {
//         var li = document.createElement('li');
//         li.textContent = it;
//         list.appendChild(li);
//       });
//     }

// block content
  
//   h1#travel-items Travel Items
//   h1= item[1]
//   script.
//     let currentIndex = 0;
//     const items = !{JSON.stringify(item)};
//     function showNextItem() {
//       if (currentIndex < items.length) {
//         document.getElementById('item-display').innerText = items[currentIndex];
//         currentIndex++;
//       } else {
//         currentIndex = 0;
//         document.getElementById('item-display').innerText = items[currentIndex];
//       }
//     }
//   h3 have you packed these items
//   button(onclick="showNextItem()") Yes
//   p#item-display




// good one so far
// block content
  
//   h1#travel-items Travel Items
//   p This is a list of items that you should bring with you  for your trip.
//   script.
//     let currentIndex = 0;
//     const items = !{JSON.stringify(item)};
    
//     function showNextItem() {
      
//       if (currentIndex < items.length) {
//         document.getElementById('travel-item').innerText = items[currentIndex];
//         currentIndex++;
//       } else {
//         document.getElementById('travel-item').innerText = 'No more items to display';
//       }
//     }
  
//   button(onclick="showNextItem()") Next Item
//   p#travel-item
 
// item.length > 1 ? 'Next Item' : 'Start'
// module.exports = { testing};


// button(onclick="showNextItem()")= item.length > 1 ? 'Next Item' : 'Start'


// FINAL RESULT OR SEMI FINAL

// block content
//   .container-item
//     h1#travel-items Welcome to your item list
//     p#p1 This is a list of items that you should bring with you for your trip.
//     p#p2 You can click the button below to see the  items.
//   script.
//     let items = ['Passport', 'Tickets', 'Sunglasses', 'Camera'];
//     let currentIndex = 0;

//     function showNextItem() {
//       const button = document.getElementById('next-button');
//       const itemDisplay = document.getElementById('item-display');
//       const p1 = document.getElementById('p1');
//       const p2 = document.getElementById('p2');

//       if (currentIndex < items.length) {
//         p2.textContent = `${items[currentIndex]} ?`;
//         currentIndex++;
//         button.textContent = 'NEXT ITEM';
//         p1.textContent = 'Have you packed this item';
        
//       } else {
//         itemDisplay.textContent = 'You got everything you need for this trip!';
//         button.disabled = true;
//       }
//     }
//   .container-item 
//     button#next-button(onclick="showNextItem()") START
//     p#item-display