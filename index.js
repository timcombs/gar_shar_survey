// this holds all the data from the survey
const surveyAnswers = {
  q01: '',
  q02: '',
  q03: '',
  q04: '',
  q05: '',
  q06: '',
  q07: '',
  q08: '',
  q09: '',
  q10: '',
  q11: '',
  q12: '',
  q13: '',
  q14: '',
  q15: '',
  q16: '',
  q17: '',
  code: '',
};

// first other - activate textbox
const other01 = document.getElementById('q03');
other01.addEventListener('change', handleOther);

// grab the heading for the bipocnithity text to toggle it
const bipocHeading = document.getElementById('bipoc-heading');

// this toggles the words in the bipocHeading
setInterval(function () {
  toggleWords(bipocHeading);
}, 1500);

function handleOther(e) {
  let textbox = document.getElementById('q03a05');

  if (e.target.id === 'q03a02') {
    textbox.removeAttribute('disabled');
    textbox.setAttribute('placeholder', 'Explain Yourself!');
  } else {
    textbox.setAttribute('disabled', true);
    textbox.removeAttribute('placeholder');
    textbox.value = '';
  }
}

// ------------handle the navigation buttons - every page
// ------------maybe make this into a switch statement later?

// grab all the navigation buttons & add event listener
const views = document.getElementsByClassName('nav');
for (let view = 0; view < views.length; view++) {
  views[view].addEventListener('click', handleNavigation);
}
console.log(views);

// TODO: HOWTO handle updating the object with the answers?
// not every view has a form
// proceed buttons should have a value to handle this!!!!
// value = proceedSingleAnswer
// value = proceedMultAnswer
// so more conditionals!!

function handleNavigation(e) {
  // add values to object

  let btnClicked = e.currentTarget;
  e.preventDefault();

  function hideThe(node) {
    node.classList.add('hide');
    node.classList.remove('show');
    console.log('hide the', node);
  }

  function showThe(node) {
    node.classList.remove('hide');
    node.classList.add('show');
    console.log('show the', node);
  }

  if (btnClicked.value === 'proceed') {
    let current = btnClicked.parentElement.parentElement;
    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceed');
  } else if (btnClicked.value === 'proceedSingleAnswer') {
    let current = btnClicked.parentElement.parentElement;
    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceedSingleAnswer');
  } else if (btnClicked.value === 'proceedMultAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let name = btnClicked.parentElement.name;

    const questions = document.getElementsByName(name);

    for (let i = 1; i < questions.length; i++) {
      // if (questions[i].value === '') {
      //   return;
      // }
    }

    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceedMultAnswer');
  } else if (btnClicked.value === 'proceedMultAnswerRebellion') {
    let current = btnClicked.parentElement.parentElement;
    let name = btnClicked.parentElement.name;

    const questions = document.getElementsByName(name);

    for (let i = 1; i < questions.length; i++) {
      // if (questions[i].value === '') {
      //   return;
      // }
    }

    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceedMultAnswerRebellion');
    sentenceFadeIn();
  } else if (btnClicked.value === 'back') {
    let current = btnClicked.parentElement.parentElement;
    hideThe(current);

    let previous = current.previousElementSibling;
    showThe(previous);
  } else if (btnClicked.value === 'bipoc') {
    let current = btnClicked.parentElement.parentElement;
    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
  } else if (btnClicked.value === 'end') {
    let current = btnClicked.parentElement.parentElement;
    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);

    // start playing audio
    const audioElement = new Audio('assets/out-of-cntrl.mp3');
    audioElement.loop = true;
    audioElement.play();
  } else {
    console.log('error!');
  }
}

// // get demographic button
// const demoBtn = document.getElementById('demographics');
// demoBtn.addEventListener('click', handleDemographicSubmit);

// button.addEventListener('click', handleAnswerSubmit);

function handleAnswerSubmit(e) {
  e.preventDefault();
  let answer;
  console.log('target', e.target.parentElement);

  const picked = `input[name = "${e.target.parentElement.name}"]`;

  const possible = document.querySelectorAll(picked);
  console.log('target', possible);

  for (let one of possible) {
    if (one.checked) {
      answer = one.nextSibling.innerText[0];
    }
  }

  surveyAnswers[e.target.parentElement.name] = answer;
  console.log(surveyAnswers, 'answers');
}

function handleViewSwitch(e) {
  e.preventDefault();

  if (true) {
    // put values into object
    // hide current view
    // show next view
  } else if (false) {
    // put values into object
    // hide current view
    // show previous view
  }
}

function toggleWords(bipocHeading) {
  if (
    bipocHeading.lastElementChild.firstElementChild.classList[0] === 'words'
  ) {
    // remove the bland words - 1st and 3rd span
    bipocHeading.lastElementChild.firstElementChild.classList.add('words-gone');
    bipocHeading.lastElementChild.firstElementChild.classList.remove('words');
    bipocHeading.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.classList.add(
      'words-gone'
    );
    bipocHeading.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.classList.remove(
      'words'
    );

    // add the spicy words - 2nd & 4th span
    bipocHeading.lastElementChild.lastElementChild.classList.add('words');
    bipocHeading.lastElementChild.lastElementChild.classList.remove(
      'words-gone'
    );
    bipocHeading.lastElementChild.lastElementChild.previousElementSibling.previousElementSibling.classList.add(
      'words'
    );
    bipocHeading.lastElementChild.lastElementChild.previousElementSibling.previousElementSibling.classList.remove(
      'words-gone'
    );
  } else {
    // add the bland words - 1st and 3rd span
    bipocHeading.lastElementChild.firstElementChild.classList.add('words');
    bipocHeading.lastElementChild.firstElementChild.classList.remove(
      'words-gone'
    );
    bipocHeading.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.classList.add(
      'words'
    );
    bipocHeading.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.classList.remove(
      'words-gone'
    );

    // remove the spicy words - 2nd & 4th span
    bipocHeading.lastElementChild.lastElementChild.classList.add('words-gone');
    bipocHeading.lastElementChild.lastElementChild.classList.remove('words');
    bipocHeading.lastElementChild.lastElementChild.previousElementSibling.previousElementSibling.classList.add(
      'words-gone'
    );
    bipocHeading.lastElementChild.lastElementChild.previousElementSibling.previousElementSibling.classList.remove(
      'words'
    );
  }
}

function sentenceFadeIn() {
  let str1 = 'carried on the felt tip of an evening sunset';
  let str2 = 'Images slashing between the language of reality';
  let count = 0;
  let bucketContent = '';
  let bucket1 = document.getElementById('rebellion-phrase-1');
  let bucket2 = document.getElementById('rebellion-phrase-2');
  let curr = 1;
  let currStr;

  let nIntervId = window.setInterval(addLetter, 125, str1, str2, currStr, curr);

  function addLetter(str1, str2, currStr, curr) {
    if (curr == 1) {
      currStr = str1;
    } else if (count > currStr.length - 2) {
      count = 0;
      bucketContent = '';
      bucket1 = bucket2;
      curr = 2;
      currStr = str2;
    } else if (curr === 2 && count > currStr.length - 2) {
      clearInterval(nIntervId);
    }

    console.log(currStr);
    console.log(count);
    bucket1.innerHTML = bucketContent + currStr[count];

    bucketContent = bucket1.innerHTML;
    count += 1;
  }
}

// function handleFormSubmit(e) {
//   e.preventDefault();

//   const form = JSON.stringify

//   fetch(
//       'https://sheet.best/api/sheets/d48f685c-1e18-4a21-8193-1732e82292f8',
//       { method: 'POST', body: form }
//     )
//       .then((response) => console.log('Success!', response))
//       .catch((error) => console.error('Error!', error));
//   });
// }

/* <div>
    <input type="radio" id="contactChoice1"
     name="contact" value="email">
    <label for="contactChoice1">Email</label>

    <input type="radio" id="contactChoice2"
     name="contact" value="phone">
    <label for="contactChoice2">Phone</label>

    <input type="radio" id="contactChoice3"
     name="contact" value="mail">
    <label for="contactChoice3">Mail</label>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div> */
