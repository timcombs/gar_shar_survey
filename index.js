// ************************** GLOBAL VARIABLES ******************
// ************************** GLOBAL VARIABLES ******************
// ************************** GLOBAL VARIABLES ******************
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

// get the body tag for background-color purposes
const body = document.getElementById('body');

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
const tiktokBucket = document.getElementById('youtube');

for (let i = 0; i < tiktokBtns.length; i++) {
  tiktokBtns[i].addEventListener('click', stopVid);
}

// this handles the radio buttons for step 3
// if other is clicked they must put an answer in the textarea
// textarea is disabled until other is clicked
function handleOthers(e) {
  let textbox = document.getElementById('step_3_textarea');

  if (e.target.id === 'step_3_other') {
    textbox.value = '';
    textbox.disabled = false;
    textbox.setAttribute('placeholder', 'Explain Yourself!');
  } else if (
    e.target.id === 'step_3_yesmayo' ||
    e.target.id === 'step_3_yesnotmayo' ||
    e.target.id === 'step_3_nomay'
  ) {
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

// grab the element that needs the first and last name on the last view
const thanks = document.getElementById('thanks');

// ************************* NAVIGATION *************************
// ************************* NAVIGATION *************************
// ************************* NAVIGATION *************************
// navigation buttons - Proceed, Go Back, SUBMIT, & lol/smh
// have value attribute which corresponds to one 'if' of the conditional
// which corresponds to specific functionality for each view
function handleNavigation(e) {
  let btnClicked = e.currentTarget;
  e.preventDefault(); // i don't think i need this.

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
    changeBkg(next);
    showThe(next);
  } else if (btnClicked.value === 'proceedMultTextAnswer') {
    const answerObj = {
      first: '',
      middle: '',
      last: '',
    };

    const answerArr = Object.keys(answerObj);

    let current = btnClicked.parentElement.parentElement;
    let name = btnClicked.parentElement.name;

    const questions = document.getElementsByName(name);

    // make sure questions are answered then push into answerObj
    for (let i = 1; i < questions.length; i++) {
      if (questions[i].value === '') {
        return;
      } else {
        answerObj[answerArr[i - 1]] = questions[i].value;
      }
    }
    // update surveyAnswers obj
    updateSurveyAnswers(answerObj);

    hideThe(current);

    let next = current.nextElementSibling;
    changeBkg(next);
    showThe(next);
  } else if (btnClicked.value === 'proceedSingleAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let question = btnClicked.parentElement.name;
    let answer = document.querySelector(`input[name="${question}"]:checked`);

    const answerObj = {};

    // if no answer, no proceeding to next view
    if (answer.value === '') {
      return;
    } else {
      answerObj[question] = answer.value;
    }

    // update surveyAnswers obj
    updateSurveyAnswers(answerObj);

    hideThe(current);

    let next = current.nextElementSibling;
    changeBkg(next);
    showThe(next);
  } else if (btnClicked.value === 'back') {
    let current = btnClicked.parentElement.parentElement;
    hideThe(current);

    let previous = current.previousElementSibling;
    changeBkg(previous);
    showThe(previous);
  } else if (btnClicked.value === 'bipoc') {
    let current = btnClicked.parentElement.parentElement;
    hideThe(current);

    let next = current.nextElementSibling;
    changeBkg(next);
    showThe(next);
  } else if (btnClicked.value === 'lol' || btnClicked.value === 'smh') {
    let current =
      btnClicked.parentElement.parentElement.parentElement.parentElement;
    let question = btnClicked.name;
    let answer = document.querySelector(`input[name="${question}"]:checked`);

    const answerObj = {};

    if (answer.value === '') {
      return;
    } else {
      answerObj[question] = answer.value;
    }

    // update surveyAnswers obj
    updateSurveyAnswers(answerObj);

    hideThe(current);

    let next = current.nextElementSibling;
    changeBkg(next);
    showThe(next);
  } else if (btnClicked.value === 'proceedOtherAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let question = btnClicked.parentElement.name;
    let answer = document.querySelector(`input[name="${question}"]:checked`);

    const answerObj = {};

    if (current.firstElementChild.nextElementSibling.name === 'step_3') {
      let textbox = document.getElementById('step_3_textarea');
      for (let i = 0; i < others.length; i++) {
        if (answer.value === '' || others[i].value === '') {
          return;
        } else {
          answerObj.step_3 = answer.value;
          answerObj.step_3_text = textbox.value;
        }
      }
    } else {
      let textbox = document.getElementById('step_4_textarea');
      for (let i = 0; i < noOthers.length; i++) {
        if (answer.value === '' || noOthers[i].value === '') {
          return;
        } else {
          answerObj.step_4 = answer.value;
          answerObj.step_4_text = textbox.value;
        }
      }
    }

    // update surveyAnswers obj
    updateSurveyAnswers(answerObj);

    hideThe(current);

    let next = current.nextElementSibling;
    changeBkg(next);
    showThe(next);
  } else if (btnClicked.value === 'proceedMultAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let name = btnClicked.parentElement.name;

    let answerObj = {};

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
      } else {
        answerObj[`${name}${letter}`] = answer.value;
      }
    }

    // update surveyAnswers obj
    updateSurveyAnswers(answerObj);

    // turn off the audio
    name === 'step_6' ? jayne6Audio.pause() : jayne7Audio.pause();

    hideThe(current);

    let next = current.nextElementSibling;
    changeBkg(next);
    showThe(next);
  } else if (btnClicked.value === 'proceedSingleTextAnswer') {
    let current = btnClicked.parentElement.parentElement;
    let question = btnClicked.parentElement.name;
    let answer = document.getElementById('step_8_textarea');

    let answerObj = {};

    if (answer.value === '') {
      return;
    } else {
      answerObj.step_8_text = answer.value;
    }

    // update surveyAnswers obj
    updateSurveyAnswers(answerObj);

    hideThe(current);

    // adds first and last name to thank you on the next page
    thanks.innerText = `Thank you ${surveyAnswers.first} / ${surveyAnswers.last}`;

    let next = current.nextElementSibling;
    changeBkg(next);
    showThe(next);

    // start playing audio for last view
    const audioElement = new Audio('assets/out-of-cntrl.mp3');
    audioElement.loop = true;
    audioElement.play();

    handleFormSubmit(surveyAnswers);
  } else {
    console.log('error!');
  }
}

// changes background color accordingly based on view
function changeBkg(viewElement) {
  if (viewElement.classList.contains('bipocnithity')) {
    body.style.backgroundColor = '#f71111';
  }

  if (viewElement.classList.contains('rebellion')) {
    body.style.backgroundColor = 'white';
  }
  if (
    viewElement.classList.contains('truth') ||
    viewElement.classList.contains('splash') ||
    viewElement.classList.contains('userinfo') ||
    viewElement.classList.contains('end') ||
    viewElement.classList.contains('ever')
  ) {
    body.style.backgroundColor = '#1a2f59';
  }
}

// adds questions to surveyAnswers when non-BACK navigation button pushed
function updateSurveyAnswers(obj) {
  const objKeys = Object.keys(obj);

  for (let i = 0; i < objKeys.length; i++) {
    surveyAnswers[objKeys[i]] = obj[objKeys[i]];
  }
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

// ********************** GOOGLE SPREADSHEET ****************************
// ********************** GOOGLE SPREADSHEET ****************************
// ********************** GOOGLE SPREADSHEET ****************************
// This function sumbits data to google spreadsheet
// solution uses sheet.best - form has to be a formData object
function handleFormSubmit(obj) {
  const form = new FormData();

  for (var key in obj) {
    form.append(key, obj[key]);
  }
  
  // ***************************************************
  // ***************************************************
  // ----- CONNECTING QUESTIONAIRE TO GOOGLE SHEET -----
  // the url in the fetch call to sheet.best https://sheet.best/ 
  // uses a FREE online service to connect the questionaire
  // to a google sheet -- easy to use
  // 
  // the last part of the url 'c30ef.....' 
  // is the code specific to the connection.
  //
  // blog post here shares the details: 
  // https://www.freecodecamp.org/news/react-and-googlesheets/
  // ***************************************************
  // ***************************************************
  fetch('https://sheet.best/api/sheets/c30ef0b5-3c9e-47be-a71a-38bd4a79f432', {
    method: 'POST',
    body: form,
  })
    .then((response) => console.log('Success!', response))
    .catch((error) => console.error('Error!', error));
}

// ****************************** VIDEO STUFF *************************
// ****************************** VIDEO STUFF *************************
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

// make embedded tiktok video play & loop & hide
var tiktokPlayer;

// stop tiktok video on radio button change
function stopVid() {
  tiktokPlayer.stopVideo();
}

// when tiktok video ends LOOP IT!
function onTikTokPlayerStateChange(e) {
  if (e.data === 0) {
    tiktokPlayer.playVideo();
  }
}

function onYouTubePlayerAPIReady() {
  const vidList = [
    {
      id: 'mayoPlayer',
      height: 390,
      width: 640,
      events: { onStateChange: onMayoStateChange },
      videoId: '3kDlFdUrOtk',
    },
    {
      id: 'tiktokPlayer',
      height: 200,
      width: 102,
      modestbranding: 1,
      events: { onStateChange: onTikTokPlayerStateChange },
      videoId: 'J9uIhKmzQvY',
    },
  ];

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
      playerVars: {
        playsinline: 1,
        cc_load_policy: 1,
        modestbranding: 1,
      },
    });
  }

  return tiktokPlayer;
}
