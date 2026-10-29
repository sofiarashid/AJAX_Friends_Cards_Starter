// =============================================================
// 2.02 AJAX + JSON: Friends Cards
// Your job: load friends.json with an XMLHttpRequest and turn
// every person in it into a card.
// =============================================================

// Supplied page connections. Keep these IDs unchanged.
const loadButton = document.getElementById("loadFriends");
const cardsContainer = document.getElementById("cards");
const statusMessage = document.getElementById("status");

// CHECKPOINT 2: When the Load Friends button is clicked, run loadFriends.
loadButton.addEventListener("click", loadFriends);


// -------------------------------------------------------------
// loadFriends: request the file, check the response, parse it.
// -------------------------------------------------------------
function loadFriends() {
  // Supplied: shows the user that the page is waiting for a response.
  statusMessage.classList.remove("error");
  statusMessage.textContent = "Loading friends...";

  // CHECKPOINT 2: Write the request.
  //   - Create the request and open a GET request for friends.json.
  //   - Write the onload handler:
  //       status 200    -> turn the response text into an array,
  //                        then pass the array to renderFriends()
  //       other status  -> call showLoadError()
  //   - Connect onerror to showLoadError.
  //   - Send the request LAST, after the handlers are set up.
  //
  //   Supplied safety net: put your JSON.parse line and your
  //   renderFriends call inside a try block like this one, so a
  //   typo in friends.json shows a message instead of a blank page.
  //
  //     try {
  //       // parse the response text and call renderFriends here
  //     } catch (error) {
  //       showDataError(error);
  //     }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "friends.json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        const friends = JSON.parse(xhr.responseText)
        renderFriends(friends);
      } catch (error) {
        showDataError(error);
      }
    } else {
      showLoadError();
    }
  };
  xhr.onerror = showLoadError;
  xhr.send();
}

// -------------------------------------------------------------
// renderFriends: turn the array into cards on the page.
// -------------------------------------------------------------
function renderFriends(friends) {
  // CHECKPOINT 3: Build every card in one string, then put the
  // finished string on the page. One person = one card.
  // Use this supplied markup inside a template literal. Replace each
  // [PLACEHOLDER] with an expression that reads the current person.
  // Hobbies is an array: show it as readable, comma-separated text.
  /*
  <div class="col-12 col-md-6 col-lg-4">
    <article class="card h-100">
      <div class="card-body">
        <h2 class="card-title h4">[NAME]</h2>
        <p class="relationship">[RELATIONSHIP]</p>
        <p>[DETAIL]</p>
        <p class="hobbies"><strong>Hobbies:</strong> [HOBBIES]</p>
      </div>
    </article>
  </div>
  */

  let cardsHTML = "";
  for (const friend of friends) {
    cardsHTML += `
  <div class="col-12 col-md-6 col-lg-4">
    <article class="card h-100">
      <div class="card-body">
        <h2 class="card-title h4">${friend.name}</h2>
        <p class="relationship">${friend.relationship}</p>
        <p>${friend.detail}</p>
        <p class="hobbies"><strong>Hobbies:</strong> ${friend.hobbies.join(", ")}</p>
      </div>
    </article>
  </div>`;
  }
  cardsContainer.innerHTML = cardsHTML;

  // Supplied success message. Keep this after the cards are updated.
  statusMessage.classList.remove("error");
  statusMessage.textContent = `${friends.length} friends loaded.`;
}


// =============================================================
// Supplied helpers. Do not change these.
// =============================================================

// Call this when the request fails (wrong file name, server error).
function showLoadError() {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "Could not load friends.";
}

// Call this from your catch block. The file arrived, but its data
// could not be used: usually a JSON typo or a misspelled key.
function showDataError(error) {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "Data could not be used.";
  console.error("Data problem:", error.message);
}
