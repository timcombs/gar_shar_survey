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

// grab elements that say FAKE
const fakes = document.getElementsByClassName('fake');
// this toggles the words in the bipocHeading
setInterval(function () {
  toggleFakes(fakes);
}, 1250);

// first textarea are the userinfo textareas
// second textarea - activate textbox if other radio button is clicked
const others = document.getElementsByClassName('step_3');
for (let i = 0; i < others.length; i++) {
  others[i].addEventListener('change', handleOthers);
}

// third textarea - activate textbox if other radio button is clicked
const noOthers = document.getElementsByClassName('step_4');
let thirdTextbox = document.getElementById('step_4_textarea');
thirdTextbox.value = ''; // to make sure textarea is empty

// fourth textarea
let fourthTextbox = document.getElementById('step_8_textarea');
fourthTextbox.value = ''; // to make sure textarea is empty

// grab the heading for the bipocnithity text to toggle it
const bipocHeading = document.getElementById('bipoc-heading');

// this toggles the words in the bipocHeading
setInterval(function () {
  toggleWords(bipocHeading);
}, 1500);

// first Jayne Cortez audio - for step6
const jayne6 = document.getElementsByClassName('jayne6');
for (let i = 0; i < jayne6.length; i++) {
  jayne6[i].addEventListener('click', playAudio);
}
let jayne6Audio;

// first Jayne Cortez audio - for step6
const jayne7 = document.getElementsByClassName('jayne7');
for (let i = 0; i < jayne7.length; i++) {
  jayne7[i].addEventListener('click', playAudio);
}
let jayne7Audio;

// get the radio buttons so you can play the video & container that holds vid
const mayoBtns = document.getElementsByClassName('mayovid');
const mayoBucket = document.getElementById('youtube');

for (let i = 0; i < mayoBtns.length; i++) {
  mayoBtns[i].addEventListener('click', startVid);
}

// get the radio buttons so you can stop the tik tok video
const tiktokBtns = document.getElementsByClassName('tiktokvid');
console.log(tiktokBtns);
const tiktokBucket = document.getElementById('youtube');

for (let i = 0; i < tiktokBtns.length; i++) {
  tiktokBtns[i].addEventListener('click', stopVid);
}

function handleOthers(e) {
  console.log('in handleOthers');
  let textbox = document.getElementById('step_3_textarea');

  if (e.target.id === 'step_3_other') {
    textbox.value = '';
    textbox.disabled = false;
    textbox.setAttribute('placeholder', 'Explain Yourself!');
  } else {
    textbox.disabled = true;
    textbox.removeAttribute('placeholder');
    textbox.value = 'n/a';
  }
}

// grab all the back/proceed/submit buttons & add event listener
const views = document.getElementsByClassName('nav');
for (let view = 0; view < views.length; view++) {
  views[view].addEventListener('click', handleNavigation);
}

// grab all the LOL/SMH buttons & add event listeners
const lolViews = document.getElementsByClassName('lol');
for (let lolView = 0; lolView < lolViews.length; lolView++) {
  lolViews[lolView].addEventListener('click', handleNavigation);
}

// ********************** NAVIGATION *******************
// proceed buttons & lol/smh buttons have a value that
// corresponds to specific functionality for each view
function handleNavigation(e) {
  // add values to object

  let btnClicked = e.currentTarget;
  e.preventDefault();

  function hideThe(node) {
    node.classList.add('hide');
    node.classList.remove('show');
  }

  function showThe(node) {
    node.classList.remove('hide');
    node.classList.add('show');
  }

  if (btnClicked.value === 'proceed') {
    let current = btnClicked.parentElement.parentElement;
    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceed');
  } else if (btnClicked.value === 'proceedMultTextAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let name = btnClicked.parentElement.name;

    const questions = document.getElementsByName(name);

    for (let i = 1; i < questions.length; i++) {
      if (questions[i].value === '') {
        return;
      }
    }

    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceedMultTextAnswer');
  } else if (btnClicked.value === 'proceedSingleAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let question = btnClicked.parentElement.name;
    let answer = document.querySelector(`input[name="${question}"]:checked`);

    // if no answer, no proceeding to next view
    if (answer.value === '') {
      return;
    }

    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceedSingleAnswer');
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
  } else if (btnClicked.value === 'lol' || btnClicked.value === 'smh') {
    let current =
      btnClicked.parentElement.parentElement.parentElement.parentElement;
    let question = btnClicked.name;
    let answer = document.querySelector(`input[name="${question}"]:checked`);

    if (answer.value === '') {
      return;
    }

    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceedLOLAnswer');
  } else if (btnClicked.value === 'proceedOtherAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let question = btnClicked.parentElement.name;
    let answer = document.querySelector(`input[name="${question}"]:checked`);

    if (current.firstElementChild.nextElementSibling.name === 'step_3') {
      for (let i = 0; i < others.length; i++) {
        if (answer.value === '' || others[i].value === '') {
          return;
        }
      }
    } else {
      console.log('noOthers', noOthers);
      for (let i = 0; i < noOthers.length; i++) {
        if (answer.value === '' || noOthers[i].value === '') {
          return;
        }
      }
    }

    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceedOtherAnswer');
  } else if (btnClicked.value === 'proceedMultAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let name = btnClicked.parentElement.name;

    for (let i = 0; i < 4; i++) {
      let letter;

      // getting the letter for each radio button group
      // (each question a, b, c, d) to be able to check that each was answered
      switch (i) {
        case 0:
          letter = 'a';
          break;
        case 1:
          letter = 'b';
          break;
        case 2:
          letter = 'c';
          break;
        case 3:
          letter = 'd';
          break;
        default:
          console.log('uhhhhhh you broke something');
      }

      let answer = document.querySelector(
        `input[name="${name}${letter}"]:checked`
      );

      // check each radio button pair, if not checked then return
      if (answer.value === '') {
        return;
      }
    }

    // turn off the audio
    name === 'step_6' ? jayne6Audio.pause() : jayne7Audio.pause();

    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);
    console.log('proceedMultAnswer');
  } else if (btnClicked.value === 'proceedSingleTextAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let question = btnClicked.parentElement.name;
    let answer = document.getElementById('step_8_textarea');

    if (answer.value === '') {
      return;
    }

    hideThe(current);

    let next = current.nextElementSibling;
    showThe(next);

    // start playing audio for last view
    const audioElement = new Audio('assets/out-of-cntrl.mp3');
    audioElement.loop = true;
    audioElement.play();
    console.log('proceedSingleTextAnswer');
  } else {
    console.log('error!');
  }
}

// TODO: refactor this to add questions to surveyAnswers object
// plan is to update when navigation button pushed
// may need additional code in the conditional
function updateSurveyAnswers(e) {
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

function toggleFakes(fakes) {
  for (let i = 0; i < fakes.length; i++) {
    if (fakes[i].classList.contains('spice')) {
      fakes[i].classList.remove('spice');
      fakes[i].classList.add('mayo');

      let idx = i + 1;
      idx > 2 ? (idx = 0) : (idx = idx);

      fakes[idx].classList.add('spice');
      fakes[idx].classList.remove('mayo');
      return;
    }
  }
}

// randomized
// function toggleFakes(fakes) {
//   for (let i = 0; i < fakes.length; i++) {
//     if (
//       fakes[i].classList.contains('spice') &&
//       Math.floor(Math.random() < 0.5)
//     ) {
//       fakes[i].classList.remove('spice');
//       fakes[i].classList.add('mayo');
//     } else if (fakes[i].classList.contains('mayo')) {
//       fakes[i].classList.add('spice');
//       fakes[i].classList.remove('mayo');
//     }
//   }
// }

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

function playAudio(e) {
  const vidId = e.target.classList[1];

  if (vidId === 'jayne6') {
    if (jayne6Audio) {
      return;
    }
    jayne6Audio = new Audio(`assets/${vidId}.mp3`);
    jayne6Audio.loop = true;
    jayne6Audio.play();
  } else {
    if (jayne7Audio) {
      return;
    }
    jayne7Audio = new Audio(`assets/${vidId}.mp3`);
    jayne7Audio.loop = true;
    jayne7Audio.play();
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

// ****************************** VIDEO STUFF *************************
// make embedded mayo video play then hide
var mayoPlayer;
let once = false;

// play mayoVideo on radio button change
function startVid() {
  if (once) {
    return;
  }
  mayoBucket.classList.remove('hideVid');
  mayoBucket.classList.add('showVid');

  mayoPlayer.playVideo();
}

// when mayo video ends
function onMayoStateChange(e) {
  if (e.data === 0) {
    mayoBucket.classList.add('hideVid');
    mayoBucket.classList.remove('showVid');
    once = true;
  }
}

// // make embedded tiktok video play & loop & hide
var tiktokPlayer;
const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

// stop tiktok video on radio button change
function stopVid() {
  console.log('in stop vid');
  tiktokPlayer.stopVideo();
}

// when tiktok video ends LOOP IT!
function onTikTokPlayerStateChange(e) {
  if (e.data === 0) {
    tiktokPlayer.playVideo();
  }
}

function onYouTubePlayerAPIReady() {
  const tiktokVidWidth = vw * 0.3;
  const tiktokVidHeight = tiktokVidWidth / 0.61;

  const vidList = [
    {
      id: 'mayoPlayer',
      height: '390',
      width: '640',
      events: { onStateChange: onMayoStateChange },
      videoId: '3kDlFdUrOtk',
    },
    {
      id: 'tiktokPlayer',
      height: tiktokVidWidth,
      width: tiktokVidHeight,
      modestbranding: 1,
      events: { onStateChange: onTikTokPlayerStateChange },
      videoId: 'J9uIhKmzQvY',
    },
  ];
  console.log('in IframeAPIReady');
  // if (typeof vidList === 'undefined') return;

  for (var i = 0; i < vidList.length; i++) {
    var currPlayer = createPlayer(vidList[i]);
  }
}

function createPlayer(playerInfo) {
  if (playerInfo.id === 'mayoPlayer') {
    mayoPlayer = new YT.Player(playerInfo.id, {
      height: playerInfo.height,
      width: playerInfo.width,
      videoId: playerInfo.videoId,
      events: playerInfo.events,
    });

    return mayoPlayer;
  } else {
    tiktokPlayer = new YT.Player(playerInfo.id, {
      height: playerInfo.height,
      width: playerInfo.width,
      videoId: playerInfo.videoId,
      events: playerInfo.events,
    });
  }

  return tiktokPlayer;
}
