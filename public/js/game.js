let playColors = document.querySelectorAll('.play-color');
let colors = ['red', 'green', 'blue', 'orange']
playColors.forEach((playColor, i) => {
  playColor.style.backgroundColor = colors[i];
});

color_1 = $.Color('red');
color_2 = $.Color('blue');

document.querySelector('.mixed-color').style.backgroundColor = Color_mixer.mix(color_1,color_2).toHexString();

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
    draggableElement.textContent = 'Dragged in';
    console.log('dragged in');
  },
  ondrop: function (event) {
    let color_1 = $.Color(event.relatedTarget.style.backgroundColor);
    let color_2 = $.Color(event.target.style.backgroundColor);
    let result_color = Color_mixer.mix(color_1,color_2);
    event.target.style.backgroundColor = result_color.toHexString();
    event.relatedTarget.classList.add('hidden');
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});
