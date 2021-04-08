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

// handle starting from the splash page
const splash = document.getElementById('start');
splash.addEventListener('click', startSurvey);

function startSurvey(e) {
  let begin = e.currentTarget;
  begin.parentElement.classList.add('hide');

  let next = begin.parentElement.nextElementSibling;
  next.classList.remove('hide');
  next.classList.add('show');
}

// handle the navigation buttons
const views = document.getElementsByClassName('nav');
console.log(views);

for (let view = 0; view < views.length; view++) {
  views[view].addEventListener('click', handleNavigation);
}

function handleNavigation(e) {
  // add values to object

  let btnClicked = e.currentTarget;
  console.log('the button clicked', btnClicked);

  if (btnClicked.value === 'proceed') {
    // hide this view
    let parent = btnClicked.parentElement.parentElement;
    console.log('parent', parent);
    parent.classList.add('hide');
    parent.classList.remove('show');

    // show the next view
    let next = parent.nextElementSibling;
    console.log('the next view', next);
    next.classList.remove('hide');
    next.classList.add('show');
  } else if (btnClicked.value === 'back') {
    // hide this view
    let parent = btnClicked.parentElement.parentElement;
    console.log('parent', parent);
    parent.classList.add('hide');
    parent.classList.remove('show');

    // show previous view
    let next = parent.previousElementSibling;
    console.log('the next view', next);
    next.classList.remove('hide');
    next.classList.add('show');
  } else if (btnClicked.value === 'end') {
    // hide this view
    let parent = btnClicked.parentElement.parentElement;
    console.log('parent', parent);
    parent.classList.add('hide');
    parent.classList.remove('show');

    // show the next view
    let next = parent.nextElementSibling;
    console.log('the next view', next);
    next.classList.remove('hide');
    next.classList.add('show');

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
