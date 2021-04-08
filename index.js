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

let qNum = 1;

// get demographic button
const demoBtn = document.getElementById('demographics');
demoBtn.addEventListener('click', handleDemographicSubmit);

buildSurvey(questions);

function buildSurvey(arr) {
  let survey = document.getElementById('survey');

  for (q = 0; q < arr.length; q++) {
    const question = buildQuestion(arr[q]);
    question.setAttribute(
      'name',
      `q${qNum.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`
    );
    // console.log(survey);
    survey.appendChild(question);

    qNum += 1;
  }
}

function buildQuestion(obj) {
  const form = document.createElement('form');
  form.classList.add('question');
  const question = document.createElement('h3');
  question.innerText = obj.question;

  form.appendChild(question);

  for (let a = 0; a < 4; a++) {
    const holder = document.createElement('p');
    const answer = document.createElement('input');

    answer.classList.add('answer');
    answer.setAttribute('type', 'radio');
    answer.setAttribute(
      'name',
      `q${qNum.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`
    );
    answer.setAttribute('value', `a${a + 1}`);
    answer.setAttribute('id', `a${a + 1}`);

    const label = document.createElement('label');
    label.setAttribute('for', `a${a + 1}`);

    label.innerText = `${a + 1} ${obj['a' + (a + 1)]}`;

    holder.appendChild(answer);
    holder.appendChild(label);

    form.appendChild(holder);
  }

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.innerText = 'submit answer';
  button.addEventListener('click', handleAnswerSubmit);

  form.appendChild(button);

  return form;
}

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

function handleDemographicSubmit(e) {
  e.preventDefault();

  console.log(e.target.parentElement.firstElementChild.value);

  surveyAnswers.first = e.target.parentElement.firstElementChild.value;
  surveyAnswers.first = e.target.parentElement.firstElementChild.value;
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
