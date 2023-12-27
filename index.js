import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
//prettier-ignore
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://realtime-database-43dc9-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

const inputFieldEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');
const shoppingListEl = document.querySelector('#shopping-list');

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.textContent = 'No item showed...';
  }
});

addButtonEl.addEventListener('click', function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  clearInputFieldEl();
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = '';
}

function clearInputFieldEl() {
  inputFieldEl.value = '';
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let listItem = document.createElement('li');
  listItem.textContent = itemValue;
  listItem.addEventListener('dblclick', () => {
    let exactLocationOfShoppingList = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfShoppingList);
  });
  shoppingListEl.appendChild(listItem);
}
