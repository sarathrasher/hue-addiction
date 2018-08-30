let playColors = document.querySelectorAll('.play-color');
let level = 1;
let score = 100;
let time;
let scoreDisplay = document.querySelector('.score');
let timeDisplay = document.querySelector('.time');
let scoreTimer;
let getLevelData = level => {
  let token = localStorage.getItem("token");
  fetch('/api/level_data/' + level, {
    headers: {
      "token": token
    }
  })
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(data => {
    console.log(data);
    let i;
    let iArr = [];
    // eventually we will want to create play-color elements in these while loops
    let j = 0;
    while (iArr.length < data.solutionColors.length + data.decoyColors.length){
      i = Math.floor(Math.random() * (data.solutionColors.length + data.decoyColors.length));
      if (j < data.solutionColors.length && !iArr.includes(i)) {
        playColors[i].setAttribute('data-target', true);
        playColors[i].style.backgroundColor = data.solutionColors[j];
        j++;
        iArr.push(i);
      } else if (!iArr.includes(i)) {
        playColors[i].style.backgroundColor = data.decoyColors[j - data.solutionColors.length];
        iArr.push(i);
        j++;
      }
    }
    let color_1 = $.Color(data.solutionColors[0]);
    let color_2 = $.Color(data.solutionColors[1]);
    document.querySelector('.mixed-color').style.backgroundColor = Color_mixer.mix(color_1, color_2).toHexString();
    // Starting score
    score = 100;
    scoreDisplay.textContent = score;
    scoreTimer = setInterval(() => {
      if (score > 0) {
        score--;
        scoreDisplay.textContent = score;
      }
    }, 200);
    // Starting time
    let startTime = Date.now();
    timeTimer = setInterval(() => {
      time = Date.now() - startTime;
      let date = new Date(time);
      timeDisplay.textContent = date.getSeconds();
    }, 200);
  });
}

// target elements with the "draggable" class
interact('.play-color')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    // onend: function (event) {
    //   // 
    // }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

// enable draggables to be dropped into this
interact('.play-color').dropzone({
  // only accept elements matching this CSS selector
  accept: '.play-color',
  // Require a 25% element overlap for a drop to be possible
  overlap: 0.25,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    // event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
  },
  ondrop: function (event) {
    let resetElement = (element => {
      element.style.transform = 'translate(0px, 0px)';
      element.setAttribute('data-x', 0);
      element.setAttribute('data-y', 0);
    })
    let feedbackDisplay = document.querySelector('.feedback');
    if (event.target.getAttribute('data-target') === 'true' &&
    event.relatedTarget.getAttribute('data-target') === 'true') {
      feedbackDisplay.textContent = "Correct!";
      // Insert Game logic for correct answer
      let color_1 = $.Color(event.relatedTarget.style.backgroundColor);
      let color_2 = $.Color(event.target.style.backgroundColor);
      let result_color = Color_mixer.mix(color_1,color_2);
      event.target.style.backgroundColor = result_color.toHexString();
      event.relatedTarget.classList.add('hidden');
      event.target.setAttribute('data-target', false)
      event.relatedTarget.setAttribute('data-target', false)
      clearInterval(scoreTimer);
      clearInterval(timeTimer);
      setTimeout(() => {
        level++;
        if (level > 4) {
          console.log('Game over.');
          return;
        }
        getLevelData(level);
        resetElement(event.relatedTarget);
        event.relatedTarget.classList.remove('hidden');
        feedbackDisplay.textContent = '';
      }, 1000);
    } else {
      // Insert Game logic for wrong answer
      if (score > 0) {
        feedbackDisplay.textContent = "Penalty, wrong answer: -10 points";
        score -= 10;
        scoreDisplay.textContent = score;
        setTimeout(() => {
          feedbackDisplay.textContent = '';
        }, 1000)
      }
      resetElement(event.relatedTarget);
    }
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});
