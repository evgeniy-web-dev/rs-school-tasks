// События клавиатуры
window.addEventListener('DOMContentLoaded', startScript);

function startScript() {
  const btnContainer = document.querySelector('.btn-container'),
    fullScreenBtn = document.querySelector('.fullscreen'),
    piano = document.querySelector('.piano'),
    pianoKeys = document.querySelectorAll('.piano-key'),
    audioObj = {
      'c': new Audio('assets/audio/c.mp3'),
      'd': new Audio('assets/audio/d.mp3'),
      'e': new Audio('assets/audio/e.mp3'),
      'f': new Audio('assets/audio/f.mp3'),
      'g': new Audio('assets/audio/g.mp3'),
      'a': new Audio('assets/audio/a.mp3'),
      'b': new Audio('assets/audio/b.mp3'),
      'c♯': new Audio('assets/audio/c-sharp.mp3'),
      'd♯': new Audio('assets/audio/d-sharp.mp3'),
      'f♯': new Audio('assets/audio/f-sharp.mp3'),
      'g♯': new Audio('assets/audio/g-sharp.mp3'),
      'a♯': new Audio('assets/audio/a-sharp.mp3')
    },
    mappingNotesObj = {
      68: 'c',
      70: 'd',
      71: 'e',
      72: 'f',
      74: 'g',
      75: 'a',
      76: 'b',
      82: 'c♯',
      84: 'd♯',
      85: 'f♯',
      73: 'g♯',
      79: 'a♯'
    };

  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
  piano.addEventListener('mousedown', handleMouseDown);
  piano.addEventListener('mouseup', handleMouseUp);
  pianoKeys.forEach( item => {
    item.addEventListener('mouseenter', handleMouseenter);
    item.addEventListener('mouseleave', handleMouseleave);
  });
  fullScreenBtn.addEventListener('click', toggleFullScreen);
  btnContainer.addEventListener('click', toggleNotesType);

  function handleKeydown(event) {
    if (event.keyCode in mappingNotesObj && !event.repeat) {
      const currentNote = mappingNotesObj[event.keyCode],
      pianoKey = document.querySelector(`[data-note=${currentNote}]`);

      setStatus(pianoKey, true);
      playAudio(currentNote, audioObj);
    }
  }

  function handleKeyup(event) {
    if (event.keyCode in mappingNotesObj) {
      const currentNote = mappingNotesObj[event.keyCode],
      pianoKey = document.querySelector(`[data-note=${currentNote}]`);

      setStatus(pianoKey, false);
    }
  }

  function handleMouseDown(event) {
    const currentNote = event.target.dataset.note;

    setStatus(event.target, true);
    playAudio(currentNote, audioObj);
  }

  function handleMouseUp(event) {
    setStatus(event.target, false);
  }

  function handleMouseenter(event) {
    if (event.buttons === 1) {
      const currentNote = event.target.dataset.note;

      setStatus(event.target, true);
      playAudio(currentNote, audioObj);
    }
  }

  function handleMouseleave(event) {
    if (event.buttons === 1) {
      setStatus(event.target, false);
    }
  }

  function toggleNotesType(event) {
    const target = event.target,
    toggles = document.querySelectorAll('.btn'),
    pianoKeys = document.querySelectorAll('.piano-key');

    if (!target.classList.contains('btn-active')) {
      toggles.forEach( item => item.classList.toggle('btn-active'));
      pianoKeys.forEach( item => {
        item.classList.toggle('piano-key-note');
        item.classList.toggle('piano-key-letter');
      });
    }
  }

  function toggleFullScreen(event) {
    const target = event.currentTarget,
    html = document.querySelector('html');

    if (target.classList.contains('openfullscreen')) {
      if(html.requestFullScreen) {
        html.requestFullScreen();
      } else if(html.mozRequestFullScreen) {
        html.mozRequestFullScreen();
      } else if(html.webkitRequestFullScreen) {
        html.webkitRequestFullScreen();
      }

      target.classList.remove('openfullscreen');
    } else {
      if(document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }

      target.classList.add('openfullscreen');
    }
}

  // Рефакторинг функции playAudio
  function playAudio(note, collection) {
    collection[note].currentTime = 0;
    collection[note].play();
  }

  function setStatus(element, isActive) {
    if (isActive) {
      element.classList.add('piano-key-active');
    } else {
      element.classList.remove('piano-key-active');
    }
  }
}