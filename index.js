// this holds all the data from the survey
const surveyAnswers = {
  first: '',
  middle: '',
  last: '',
  declaration: '',
  step_1: '',
  step_2: '',
  step_3: '',
  step_3_text: '',
  step_4: '',
  step_4_text: '',
  step_5a: '',
  step_5b: '',
  step_5c: '',
  step_6a: '',
  step_6b: '',
  step_6c: '',
  step_6d: '',
  step_7a: '',
  step_7b: '',
  step_7c: '',
  step_7d: '',
  step_8_text: '',
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

// get the radio buttons so you can play the video & container that holds vid
const mayoBtns = document.getElementsByClassName('mayovid');
const mayoBucket = document.getElementById('youtube');

for (let i = 0; i < mayoBtns.length; i++) {
  mayoBtns[i].addEventListener('click', startVid);
}

// // get the radio buttons so you can stop the tik tok video
// const tiktokBtns = document.getElementsByClassName('tiktokvid');
// console.log(tiktokBtns);
// const tiktokBucket = document.getElementById('youtube');

// for (let i = 0; i < tiktokBtns.length; i++) {
//   tiktokBtns[i].addEventListener('click', stopVid);
// }

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

// grab all the back/proceed/submit buttons & add event listener
const views = document.getElementsByClassName('nav');
for (let view = 0; view < views.length; view++) {
  views[view].addEventListener('click', handleNavigation);
}

// grab all the LOL/SMH buttons & add event listeners
const lolViews = document.getElementsByClassName('nav');
for (let lolView = 0; lolView < lolViews.length; lolView++) {
  lolViews[lolView].addEventListener('click', handleNavigation);
}

// console.log(views);

// TODO: HOWTO handle updating the object with the answers?
// not every view has a form
// proceed buttons should have a value to handle this!!!!
// value = proceedSingleAnswer
// value = proceedMultAnswer
// so bigger handleNavigation conditional!!

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

// make embedded youtube video play then hide for mayo video
var mayoPlayer;
let once = false;

function onYouTubePlayerAPIReady() {
  mayoPlayer = new YT.Player('mayoPlayer', {
    videoId: '3kDlFdUrOtk',
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

// play mayoVideo on radio button change
function startVid() {
  alert('hello!');
  if (once) {
    return;
  }
  mayoBucket.classList.remove('hideVid');
  mayoBucket.classList.add('showVid');

  mayoPlayer.playVideo();
}

// when mayo video ends
function onPlayerStateChange(e) {
  if (e.data === 0) {
    mayoBucket.classList.add('hideVid');
    mayoBucket.classList.remove('showVid');
    once = true;
  }
}

// // make embedded youtube video play & loop hide for tiktok video
// var tiktokPlayer;
// const vw = Math.max(
//   document.documentElement.clientWidth || 0,
//   window.innerWidth || 0
// );
// const vh = Math.max(
//   document.documentElement.clientHeight || 0,
//   window.innerHeight || 0
// );

// const vidWidth = vw * 0.3;
// const vidHeight = vidWidth / 0.61;

// console.log(vidWidth, vidHeight, 'wid ht');

// function onYouTubePlayerAPIReady() {
//   tiktokPlayer = new YT.Player('tiktokPlayer', {
//     videoId: 'J9uIhKmzQvY',
//     height: vidHeight,
//     width: vidWidth,
//     events: {
//       onStateChange: onTikTokPlayerStateChange,
//     },
//   });
// }

// // stop tiktok video on radio button change
// function stopVid() {
//   console.log('in stop vid');
//   tiktokPlayer.stopVideo();
// }

// // when tiktok video ends
// function onTikTokPlayerStateChange(e) {
//   if (e.data === 0) {
//     tiktokPlayer.playVideo();
//   }
// }

// https://www.youtube.com/watch?v=J9uIhKmzQvY
