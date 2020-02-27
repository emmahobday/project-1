function loadGame() {
  const startButton = document.querySelector('.startbutton')
  const audio = document.querySelector('#audio')
  const ready = document.querySelector('#ready')
  startButton.addEventListener('click', () => {
    audio.src = 'sounds/jurassicpark.mp3'
    audio.play()
    ready.style.visibility = 'visible'
    setTimeout(() => {
      ready.innerHTML = 'Go!'
    }, 1000)
    setTimeout(() => {
      ready.style.visibility = 'hidden'
      setupGame()
    }, 2000)

  })
}

//list of tasty bugs

// what else blocks dinosaurs - barriers, but also...? Holding area SORTED but // make dinosaurs not walk on top of each other  - should dinosaurs go back if the next cell contains a dinosaur? OR pause for one step?
// dino 1 still tends to get stuck in corners, but maybe that's just his personality
// could add a play again button
// scoreboard logic
// refactoring this gigantic mess. MAYBE just have one (best) logic for all dinosaurs.... but how? BUT will that leave them all stuck in similar loops..?

// MAYBE SOLVED
// dino3 sometimes stops and I DONT KNOW WHY HE IS STUPID AND SO IS CODING - try adding fourth, return option, and DOUBLE CHECK CODE - issue seems to be when he goes right
// livesDisplay isn't updating with hearts - works with numbers, hearts update if I update line 23, but not sure yet why it isn't updating when the code runs
// catching a flashing dino logic 
// lives alert doesnt work
// getting caught is so frigging glitchy
// getting caught can be a little glitchy - try the forEach every millisecond maybe! DONE
// the magic tunnel - logic for dinos 2-4 I think
// start game logic - get the button working
// game over logic - 
// music!
// startbutton leads to countdown before game starts?

// IDEAS TO MAKE IT EXTRA NICE
// could make flashing dinosaurs flash white for last few seconds...
// eating multiple flashing dinos in succession could increase points
// if your score hits a certain amount, some green jelly could appear for an extra life?
// flashing dinos don't know about the tunnel


// ideas - an array to monitor being stuck in corners. if direction is changed twice back and forth, keep going until you can turn on the cross axis?
// another idea - calculate angle to determine priority of movement decision.
// another idea - put dinosaurs into an array (somehow lol), and do the logic forEach rather than writing it all out. 


function setupGame() {
  const audio = document.querySelector('#audio')
  const growl = document.querySelector('#growl')
  const eggCollectSound = document.querySelector('#eggcollect')
  const sattler = document.querySelector('#sattler')
  const caughtdino = document.querySelector('#caughtdino')
  const width = 18
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let jeffPosition = 242
  let dinosaurOnePosition = 134
  let dinosaurTwoPosition = 135
  let dinosaurThreePosition = 153
  let dinosaurFourPosition = 152
  const dinoPositionsArray = [dinosaurOnePosition, dinosaurTwoPosition, dinosaurThreePosition, dinosaurFourPosition]
  const barriersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 27, 35, 36, 38, 39, 40, 41, 42, 44, 45, 47, 48, 49, 50, 51, 53, 54, 56, 57, 58, 59, 60, 62, 63, 65, 66, 67, 68, 69, 71, 72, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 114, 119, 125, 126, 127, 128, 129, 130, 132, 134, 135, 137, 139, 140, 141, 142, 143, 152, 153, 162, 163, 164, 165, 166, 168, 173, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 206, 207, 215, 216, 218, 219, 220, 222, 224, 225, 227, 229, 230, 231, 233, 234, 236, 237, 238, 240, 245, 247, 248, 249, 251, 252, 258, 259, 260, 261, 262, 263, 269, 270, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 287, 288, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323]
  const specialArray = [34, 115, 199, 214]
  const holdingArea = [134, 135, 152, 153]
  const scoreDisplay = document.querySelector('#score')
  const livesDisplay = document.querySelector('#lives')
  // const winAlert = document.querySelector('#winalert')
  // const loseAlert = document.querySelector('#losealert')
  const ready = document.querySelector('#ready')
  //livesDisplay is a span which contains just the hearts
  let score = 0
  let lives = 3
  // const livesHearts = '&hearts; '.repeat(parseInt(lives))
  // console.log(livesHearts)



  let randomSelector = 0
  let dinoTwoDirection
  let dinoThreeDirection
  let dinoFourDirection
  let pauseDinoMovement = false
  let resetFlashOne = false
  let resetFlashTwo = false
  let resetFlashThree = false
  let resetFlashFour = false
  let dinoOneCaught = false
  let dinoTwoCaught = false
  let dinoThreeCaught = false
  let dinoFourCaught = false
  let gameEnding = false
  let youWon = false

  let eggsRemaining = 133
  console.log(eggsRemaining)

  // const eggsRemainingArray = cells.filter((cell) => {
  //   return cell.classList.contains('food')
  // })

  // let eggsRemaining = eggsRemainingArray.length


  // cells.forEach((cell) => {
  //   if (cell.classList.contains('food')) {
  //     eggsRemaining += 1
  //   }
  // })



  function dinoMoveUp() {
    cells[dinosaurOnePosition].classList.remove('dinosaur1')
    dinosaurOnePosition -= width
    cells[dinosaurOnePosition].classList.add('dinosaur1')
  }
  function dinoMoveRight() {
    cells[dinosaurOnePosition].classList.remove('dinosaur1')
    dinosaurOnePosition += 1
    cells[dinosaurOnePosition].classList.add('dinosaur1')
  }
  function dinoMoveLeft() {
    cells[dinosaurOnePosition].classList.remove('dinosaur1')
    dinosaurOnePosition -= 1
    cells[dinosaurOnePosition].classList.add('dinosaur1')
  }
  function dinoMoveDown() {
    cells[dinosaurOnePosition].classList.remove('dinosaur1')
    dinosaurOnePosition += width
    cells[dinosaurOnePosition].classList.add('dinosaur1')
  }
  function dinoTwoMoveUp() {
    cells[dinosaurTwoPosition].classList.remove('dinosaur2')
    dinosaurTwoPosition -= width
    cells[dinosaurTwoPosition].classList.add('dinosaur2')
    dinoTwoDirection = 'up'
  }
  function dinoTwoMoveRight() {
    cells[dinosaurTwoPosition].classList.remove('dinosaur2')
    dinosaurTwoPosition += 1
    cells[dinosaurTwoPosition].classList.add('dinosaur2')
    dinoTwoDirection = 'right'
  }
  function dinoTwoMoveLeft() {
    cells[dinosaurTwoPosition].classList.remove('dinosaur2')
    dinosaurTwoPosition -= 1
    cells[dinosaurTwoPosition].classList.add('dinosaur2')
    dinoTwoDirection = 'left'
  }
  function dinoTwoMoveDown() {
    cells[dinosaurTwoPosition].classList.remove('dinosaur2')
    dinosaurTwoPosition += width
    cells[dinosaurTwoPosition].classList.add('dinosaur2')
    dinoTwoDirection = 'down'
  }
  function dinoThreeMoveUp() {
    cells[dinosaurThreePosition].classList.remove('dinosaur3')
    dinosaurThreePosition -= width
    cells[dinosaurThreePosition].classList.add('dinosaur3')
    dinoThreeDirection = 'up'
  }
  function dinoThreeMoveRight() {
    cells[dinosaurThreePosition].classList.remove('dinosaur3')
    dinosaurThreePosition += 1
    cells[dinosaurThreePosition].classList.add('dinosaur3')
    dinoThreeDirection = 'right'
  }
  function dinoThreeMoveLeft() {
    cells[dinosaurThreePosition].classList.remove('dinosaur3')
    dinosaurThreePosition -= 1
    cells[dinosaurThreePosition].classList.add('dinosaur3')
    dinoThreeDirection = 'left'
  }
  function dinoThreeMoveDown() {
    cells[dinosaurThreePosition].classList.remove('dinosaur3')
    dinosaurThreePosition += width
    cells[dinosaurThreePosition].classList.add('dinosaur3')
    dinoThreeDirection = 'down'
  }
  function dinoFourMoveUp() {
    cells[dinosaurFourPosition].classList.remove('dinosaur4')
    dinosaurFourPosition -= width
    cells[dinosaurFourPosition].classList.add('dinosaur4')
    dinoFourDirection = 'up'
  }
  function dinoFourMoveRight() {
    cells[dinosaurFourPosition].classList.remove('dinosaur4')
    dinosaurFourPosition += 1
    cells[dinosaurFourPosition].classList.add('dinosaur4')
    dinoFourDirection = 'right'
  }
  function dinoFourMoveLeft() {
    cells[dinosaurFourPosition].classList.remove('dinosaur4')
    dinosaurFourPosition -= 1
    cells[dinosaurFourPosition].classList.add('dinosaur4')
    dinoFourDirection = 'left'
  }
  function dinoFourMoveDown() {
    cells[dinosaurFourPosition].classList.remove('dinosaur4')
    dinosaurFourPosition += width
    cells[dinosaurFourPosition].classList.add('dinosaur4')
    dinoFourDirection = 'down'
  }

  // oh jeez NOW we need to get the flashing ones moving
  function flashMoveUp() {
    cells[dinosaurOnePosition].classList.remove('flashingDino')
    dinosaurOnePosition -= width
    cells[dinosaurOnePosition].classList.add('flashingDino')
    dinoOneDirection = 'up'
  }
  function flashMoveRight() {
    cells[dinosaurOnePosition].classList.remove('flashingDino')
    dinosaurOnePosition += 1
    cells[dinosaurOnePosition].classList.add('flashingDino')
    dinoOneDirection = 'right'
  }
  function flashMoveLeft() {
    cells[dinosaurOnePosition].classList.remove('flashingDino')
    dinosaurOnePosition -= 1
    cells[dinosaurOnePosition].classList.add('flashingDino')
    dinoOneDirection = 'left'
  }
  function flashMoveDown() {
    cells[dinosaurOnePosition].classList.remove('flashingDino')
    dinosaurOnePosition += width
    cells[dinosaurOnePosition].classList.add('flashingDino')
    dinoOneDirection = 'down'
  }
  function flashTwoMoveUp() {
    cells[dinosaurTwoPosition].classList.remove('flashingDino2')
    dinosaurTwoPosition -= width
    cells[dinosaurTwoPosition].classList.add('flashingDino2')
  }
  function flashTwoMoveRight() {
    cells[dinosaurTwoPosition].classList.remove('flashingDino2')
    dinosaurTwoPosition += 1
    cells[dinosaurTwoPosition].classList.add('flashingDino2')
  }
  function flashTwoMoveLeft() {
    cells[dinosaurTwoPosition].classList.remove('flashingDino2')
    dinosaurTwoPosition -= 1
    cells[dinosaurTwoPosition].classList.add('flashingDino2')
  }
  function flashTwoMoveDown() {
    cells[dinosaurTwoPosition].classList.remove('flashingDino2')
    dinosaurTwoPosition += width
    cells[dinosaurTwoPosition].classList.add('flashingDino2')
  }
  function flashThreeMoveUp() {
    cells[dinosaurThreePosition].classList.remove('flashingDino3')
    dinosaurThreePosition -= width
    cells[dinosaurThreePosition].classList.add('flashingDino3')
  }
  function flashThreeMoveRight() {
    cells[dinosaurThreePosition].classList.remove('flashingDino3')
    dinosaurThreePosition += 1
    cells[dinosaurThreePosition].classList.add('flashingDino3')
  }
  function flashThreeMoveLeft() {
    cells[dinosaurThreePosition].classList.remove('flashingDino3')
    dinosaurThreePosition -= 1
    cells[dinosaurThreePosition].classList.add('flashingDino3')
  }
  function flashThreeMoveDown() {
    cells[dinosaurThreePosition].classList.remove('flashingDino3')
    dinosaurThreePosition += width
    cells[dinosaurThreePosition].classList.add('flashingDino3')
  }
  function flashFourMoveUp() {
    cells[dinosaurFourPosition].classList.remove('flashingDino4')
    dinosaurFourPosition -= width
    cells[dinosaurFourPosition].classList.add('flashingDino4')
  }
  function flashFourMoveRight() {
    cells[dinosaurFourPosition].classList.remove('flashingDino4')
    dinosaurFourPosition += 1
    cells[dinosaurFourPosition].classList.add('flashingDino4')
  }
  function flashFourMoveLeft() {
    cells[dinosaurFourPosition].classList.remove('flashingDino4')
    dinosaurFourPosition -= 1
    cells[dinosaurFourPosition].classList.add('flashingDino4')
  }
  function flashFourMoveDown() {
    cells[dinosaurFourPosition].classList.remove('flashingDino4')
    dinosaurFourPosition += width
    cells[dinosaurFourPosition].classList.add('flashingDino4')
  }

  // Setting up the board


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === jeffPosition) {
      cell.classList.add('jeff')
    } else if (i === dinosaurOnePosition) {
      cell.classList.add('barrier')
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur1')
    } else if (i === dinosaurTwoPosition) {
      cell.classList.add('barrier')
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur2')
    } else if (i === dinosaurThreePosition) {
      cell.classList.add('barrier')
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur3')
    } else if (i === dinosaurFourPosition) {
      cell.classList.add('barrier')
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur4')
    } else if (barriersArray.includes(i)) {
      cell.classList.add('barrier')
    } else if (specialArray.includes(i)) {
      cell.classList.add('special')
    } else {
      cell.classList.add('food')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }

  // Controlling Jeff Goldblum
  document.addEventListener('keydown', (event) => {
    if (gameEnding) {
      return
    }
    if (event.key === 'ArrowRight') {
      if (jeffPosition === 161) {
        cells[jeffPosition].classList.remove('jeff')
        jeffPosition = 143
        cells[jeffPosition].classList.add('jeff')
      } else if (jeffPosition === cells.length - 1 || jeffPosition % width === width - 1 || cells[jeffPosition + 1].classList.contains('barrier') || cells[jeffPosition + 1].classList.contains('holdingarea')) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition += 1
      cells[jeffPosition].classList.add('jeff')

    } else if (event.key === 'ArrowLeft') {
      if (jeffPosition === 144) {
        cells[jeffPosition].classList.remove('jeff')
        jeffPosition = 162
        cells[jeffPosition].classList.add('jeff')
      } else if (jeffPosition === 0 || jeffPosition % width === 0 || cells[jeffPosition - 1].classList.contains('barrier') || cells[jeffPosition - 1].classList.contains('holdingarea')) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition -= 1
      cells[jeffPosition].classList.add('jeff')

    } else if (event.key === 'ArrowUp') {
      if (jeffPosition < width || cells[jeffPosition - width].classList.contains('barrier') || cells[jeffPosition - width].classList.contains('holdingarea')) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition -= width
      cells[jeffPosition].classList.add('jeff')

    } else if (event.key === 'ArrowDown') {
      if (jeffPosition > cells.length - width - 1 || cells[jeffPosition + width].classList.contains('barrier') || cells[jeffPosition + width].classList.contains('holdingarea')) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition += width
      cells[jeffPosition].classList.add('jeff')
    }

    // remove little eggs and increase the score
    if (cells[jeffPosition].classList.contains('food')) {
      cells[jeffPosition].classList.remove('food')
      score += 100
      eggsRemaining -= 1
      eggCollectSound.play()
      console.log(eggsRemaining)
      // if (eggsRemaining === 0) {
      //   youWin()
      // }
      scoreDisplay.innerHTML = `${score}`
    }
    // logic for hitting the special dr sattler!
    if (cells[jeffPosition].classList.contains('special') && !pauseDinoMovement) {
      runSpecial()
    }

    // logic for hitting a dinosaur and losing a life

    const intervalId = setInterval(() => {
      if (cells[jeffPosition].classList.contains('dinosaur1')) {
        caughtByDinosaur()
      }
      if (cells[jeffPosition].classList.contains('dinosaur2')) {
        caughtByDinosaur()
      }
      if (cells[jeffPosition].classList.contains('dinosaur3')) {
        caughtByDinosaur()
      }
      if (cells[jeffPosition].classList.contains('dinosaur4')) {
        caughtByDinosaur()
      }
    }, 1)

    if (eggsRemaining === 0) {
      console.log(eggsRemaining)
      youWin()
    }

    //end of setting up jeff goldblum  
  })

  function youWin() {
    console.log('you won!')
    youWon = true
    pauseDinoMovement = true
    resetFlashOne = true
    resetFlashTwo = true
    resetFlashThree = true
    resetFlashFour = true
    setTimeout(() => {
      ready.innerHTML = `<p class='winbox win'>You won!</p> <div class="winelement"><p class='winbox'>Score:</p> <p class='winbox'>${score}</p></div><div class="winelement"><p class='winbox'>${lives} remaining lives x 1000:</p> <p class='winbox'>${lives * 1000}</p></div><p class='winbox'>Final score:</p> <p class='winbox win'>${score + (lives * 1000)}</p><br> <button class="playagain">Play again?</button>`
      const playAgain = document.querySelector('.playagain')
      playAgain.addEventListener('click', () => {
        window.location.reload(true)
      })
      ready.style.height = '500px'
      // ready.style.background = 
      ready.style.width = '500px'
      ready.style.transform = 'translate(270px,-560px)'
      ready.style.visibility = 'visible'
      // alert(`You won! You scored ${score} and have ${lives} remaining lives for a grand total of ${score + (lives * 1000)}!`)
    }, 100)
  }

  function youLose() {
    pauseDinoMovement = true
    resetFlashOne = true
    resetFlashTwo = true
    resetFlashThree = true
    resetFlashFour = true
    ready.style.visibility = 'visible'
    ready.innerHTML = 'Game over! <br> <button class="playagain">Play again?</button>'
    const playAgain = document.querySelector('.playagain')
    playAgain.addEventListener('click', () => {
      window.location.reload(true)
    })
  }

  function caughtByDinosaur() {
    growl.play()
    gameEnding = true
    pauseDinoMovement = true
    cells[jeffPosition].classList.remove('jeff')
    cells[dinosaurOnePosition].classList.remove('dinosaur1')
    cells[dinosaurTwoPosition].classList.remove('dinosaur2')
    cells[dinosaurThreePosition].classList.remove('dinosaur3')
    cells[dinosaurFourPosition].classList.remove('dinosaur4')
    dinosaurOnePosition = null
    dinosaurThreePosition = null
    dinosaurTwoPosition = null
    dinosaurFourPosition = null
    lives -= 1
    livesDisplay.innerHTML = `${'&hearts; '.repeat(lives)}`
    if (lives === 0) {
      youLose()
    }
    if (lives > 0) {
      setTimeout(() => {
        jeffPosition = 242
        dinosaurOnePosition = 134
        dinosaurThreePosition = 153
        dinosaurTwoPosition = 135
        dinosaurFourPosition = 152
        cells[dinosaurOnePosition].classList.add('dinosaur1')
        cells[dinosaurTwoPosition].classList.add('dinosaur2')
        cells[dinosaurThreePosition].classList.add('dinosaur3')
        cells[dinosaurFourPosition].classList.add('dinosaur4')
        cells[jeffPosition].classList.add('jeff')
        pauseDinoMovement = false
        dinosaurMovement()
        dinoTwoMovement()
        dinoThreeMovement()
        dinoFourMovement()
        gameEnding = false
      }, 2000)
    }
  }

  //let's get these dinosaurs moving
  // let's try initially programming a few set steps so they dont all end up in exactly the same spot...
  let counter = 0
  const firstSteps = setInterval(() => {
    switch (counter) {
      case 0:
        dinoMoveUp()
        dinoTwoMoveRight()
        dinoFourMoveLeft()
        counter += 1
        break
      case 1:
        dinoMoveLeft()
        dinoTwoMoveDown()
        dinoThreeMoveDown()
        dinoFourMoveLeft()
        counter += 1
        break
      case 2:
        dinoMoveDown()
        dinoTwoMoveRight()
        dinoThreeMoveRight()
        dinoFourMoveLeft()
        counter += 1
        break
      case 3:
        dinoMoveDown()
        dinoTwoMoveRight()
        dinoThreeMoveUp()
        dinoFourMoveDown()
        counter += 1
        break
      case 4:
        dinoMoveLeft()
        dinoTwoMoveUp()
        dinoThreeMoveRight()
        dinoFourMoveDown()
        counter += 1
        break
      case 5:
        dinosaurMovement()
        dinoTwoMovement()
        dinoThreeMovement()
        dinoFourMovement()
        clearInterval(firstSteps)
        break
      default:
        break
    }
  }, 400)

  function runSpecial() {
    // and here we make the dinosaurs flash and retreat DONE
    // we need to include the change in class (and thus icon) DONE
    // also need each dinosaur separately DONE
    // also need escape logic (consider simplest way to do this) DONE
    // it should last for... 7 seconds? DONE
    // include the points scored
    // include the caught dinosaur disappearing and reappearing after a timeout in the holding area
    // AHA it is carrying on because we need to pause the moveDino() etc functions in a timeout for as long as the flashing timeout lasts!!
    // AHHH but they are defined within a function... think about how to access them.

    if (gameEnding || youWon) {
      return
    }

    cells[jeffPosition].classList.remove('special')
    score += 1000
    scoreDisplay.innerHTML = `${score}`
    pauseDinoMovement = true
    sattler.play()


    cells[dinosaurOnePosition].classList.remove('dinosaur1')
    cells[dinosaurOnePosition].classList.add('flashingDino')
    cells[dinosaurTwoPosition].classList.remove('dinosaur2')
    cells[dinosaurTwoPosition].classList.add('flashingDino2')
    cells[dinosaurThreePosition].classList.remove('dinosaur3')
    cells[dinosaurThreePosition].classList.add('flashingDino3')
    cells[dinosaurFourPosition].classList.remove('dinosaur4')
    cells[dinosaurFourPosition].classList.add('flashingDino4')

    fleeingDinosaur1()
    fleeingDinosaur2()
    fleeingDinosaur3()
    fleeingDinosaur4()
    catchFlashingDino()

    // WHAT HAPPENS AT THE END OF THE FLASHING SEQUENCE
    setTimeout(() => {
      if (!youWon) {
        if (dinoOneCaught) {
          dinosaurOnePosition = 134
        }
        if (dinoTwoCaught) {
          dinosaurTwoPosition = 135
        }
        if (dinoThreeCaught) {
          dinosaurThreePosition = 153
        }
        if (dinoFourCaught) {
          dinosaurFourPosition = 152
        }

        cells.forEach((cell) => {
          if (cell.classList.contains('flashingDino')) {
            cell.classList.remove('flashingDino')
          }
          if (cell.classList.contains('flashingDino2')) {
            cell.classList.remove('flashingDino2')
          }
          if (cell.classList.contains('flashingDino3')) {
            cell.classList.remove('flashingDino3')
          }
          if (cell.classList.contains('flashingDino4')) {
            cell.classList.remove('flashingDino4')
          }
        })

        cells[dinosaurOnePosition].classList.remove('flashingDino')
        cells[dinosaurOnePosition].classList.add('dinosaur1')
        cells[dinosaurTwoPosition].classList.remove('flashingDino2')
        cells[dinosaurTwoPosition].classList.add('dinosaur2')
        cells[dinosaurThreePosition].classList.remove('flashingDino3')
        cells[dinosaurThreePosition].classList.add('dinosaur3')
        cells[dinosaurFourPosition].classList.remove('flashingDino4')
        cells[dinosaurFourPosition].classList.add('dinosaur4')
        pauseDinoMovement = false
        dinosaurMovement()
        dinoTwoMovement()
        dinoThreeMovement()
        dinoFourMovement()
      }
    }, 4000)

    if (!pauseDinoMovement) {
      return
    }

    // cells.forEach((cell) => {
    //   if (cell.classList.contains('dinosaur1')) {
    //     cell.classList.remove('dinosaur1')
    //   }
    // })


    // setTimeout(() => {
    //   // if it's flashing replace with normal
    // })


    // cells.forEach((cell) => {
    //   if (cell.classList.contains('dinosaur1')) {
    //     cell.classList.remove('dinosaur1')
    //   }


    // cells.forEach((cell) => {
    //   if (cell.classList.contains('dinosaur1')) {
    //     cell.classList.remove('dinosaur1')
    //     cell.classList.add('flashingDino')
    //     setTimeout(() => {
    //       console.log('flashing dinosaur1 lol')
    //       cells.forEach((cell) => {
    //         if (cell.classList.contains('flashingDino')) {
    //           cell.classList.remove('flashingDino')
    //           cell.classList.add('dinosaur1')
    //           let pauseDinoMovement = false
    //         }
    //       })
    //     }, 5000)
    //   }

    //logic for what happens if you catch a dinosaur when it's flashing!
    // THIS NEEDS UPDATING ONCE THEY MOVE x4
    // if (cells[jeffPosition].classList.contains('flashingDino')) {
    //   cells[jeffPosition].classList.remove('flashingDino')
    //   lives += 1
    //   livesDisplay.innerHTML = `${livesHearts}`
    //   setTimeout(() => {
    //     //update this line below - where caught dino reappears (this is test cell)
    //     cells[304].classList.add('dinosaur')
    //   }, 3000)
    // }

  }

  function catchFlashingDino() {
    console.log('catching1 in theory')
    // maybe try putting in the one millisecond timer thing that might help
    // but also what am I looking for? the intersection of 'jeff' and 'flashingdino'? or jeffposition, dinosauroneposition? THINK THIS THROUGH.

    const intervalId = setInterval(() => {
      if (cells[jeffPosition].classList.contains('flashingDino')) {
        console.log('jeff caught a dinosaur!')
        caughtdino.play()
        cells[jeffPosition].classList.remove('flashingDino')
        score += 1000
        resetFlashOne = true
        dinosaurOnePosition = 134
        dinoOneCaught = true
      }
      if (cells[jeffPosition].classList.contains('flashingDino2')) {
        console.log('jeff caught a dinosaur2!')
        caughtdino.play()
        cells[jeffPosition].classList.remove('flashingDino2')
        score += 1000
        resetFlashTwo = true
        dinosaurTwoPosition = 135
        dinoTwoCaught = true
      }
      if (cells[jeffPosition].classList.contains('flashingDino3')) {
        console.log('jeff caught a dinosaur3!')
        caughtdino.play()
        cells[jeffPosition].classList.remove('flashingDino3')
        score += 1000
        resetFlashThree = true
        dinosaurThreePosition = 153
        dinoThreeCaught = true
      }
      if (cells[jeffPosition].classList.contains('flashingDino4')) {
        console.log('jeff caught a dinosaur4!')
        caughtdino.play()
        cells[jeffPosition].classList.remove('flashingDino4')
        score += 1000
        resetFlashFour = true
        dinosaurFourPosition = 152
        dinoFourCaught = true
      }
    }, 1)

    setTimeout(() => {
      clearInterval(intervalId)
    }, 5000)

    // if (cells[jeffPosition].classList.contains('flashingDino')) {
    //   console.log('caught from jeffpositioncell containing flashingdino')
    //   // cells[jeffPosition].classList.remove('flashingDino')
    //   // score += 1000
    //   // resetFlashOne = true
    //   // setTimeout(() => {
    //   //   dinosaurOnePosition = 134
    //   //   cells[dinosaurOnePosition].classList.add('dinosaur1')
    //   //   resetFlashOne = false
    //   // }, 3000)
    // }

    // if (cells[dinosaurOnePosition].classList.contains('jeff') && cells[dinosaurOnePosition].classList.contains('flashingDino')) {
    //   console.log('caught from dinooneposition containing jeff AND dinooneposition containing flashingdino')
    //   // cells[dinosaurOnePosition].classList.remove('flashingDino')
    //   // score += 1000
    //   // resetFlashOne = true
    //   // setTimeout(() => {
    //   //   dinosaurOnePosition = 134
    //   //   cells[dinosaurOnePosition].classList.add('dinosaur1')
    //   //   resetFlashOne = false
    //   // }, 3000)
    // }


    // if cell contains jeff and a flashing dinosaur...
    // remove flashing dinosaur
    // add 1000 points
    // set a timeout, and have it reappear as a normal dinosaur in the holding area (one at a time, so correct position), then restart movementlogic
    //
  }

  function fleeingDinosaur1() {
    const flashingOneIntervalId = setInterval(() => {
      if (resetFlashOne || !pauseDinoMovement || youWon) {
        clearInterval(flashingOneIntervalId)
        return
      } else {
        // DINOSAUR ONE
        // case: SAME ROW
        if ((Math.floor(dinosaurOnePosition / width)) === (Math.floor(jeffPosition / width))) {
          if (dinosaurOnePosition < jeffPosition) {
            if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
              flashMoveLeft()
            } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
              flashMoveUp()
            } else if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
              flashMoveDown()
            } else {
              flashMoveRight()
            }
          } else {
            if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
              flashMoveRight()
            } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
              flashMoveUp()
            } else if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
              flashMoveDown()
            } else {
              flashMoveLeft()
            }
          }

          // case: SAME COLUMN
        } else if (dinosaurOnePosition % width === jeffPosition % width) {
          if (jeffPosition > dinosaurOnePosition) {
            if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
              flashMoveUp()
            } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
              flashMoveRight()
            } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
              flashMoveLeft()
            } else {
              flashMoveDown()
            }
          } else {
            if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
              flashMoveDown()
            } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
              flashMoveRight()
            } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
              flashMoveLeft()
            } else {
              flashMoveUp()
            }
          }

          // case: jeff is in relative LOWER RIGHT QUADRANT
        } else if ((jeffPosition > dinosaurOnePosition) && (jeffPosition % width > dinosaurOnePosition % width)) {
          if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
            flashMoveUp()
          } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
            flashMoveLeft()
          } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
            flashMoveRight()
          } else {
            flashMoveDown()
          }

          // case: jeff is in relative LOWER LEFT QUADRANT
        } else if ((jeffPosition > dinosaurOnePosition) && (jeffPosition % width < dinosaurOnePosition % width)) {
          if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
            flashMoveUp()
          } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
            flashMoveRight()
          } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
            flashMoveLeft()
          } else {
            flashMoveDown()
          }

          // case: jeff is in relative UPPER LEFT QUADRANT
        } else if ((jeffPosition < dinosaurOnePosition) && (jeffPosition % width < dinosaurOnePosition % width)) {
          if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
            flashMoveDown()
          } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
            flashMoveRight()
          } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
            flashMoveLeft()
          } else {
            flashMoveUp()
          }

          // case: jeff is in relative UPPER RIGHT QUADRANT
        } else if ((jeffPosition < dinosaurOnePosition) && (jeffPosition % width > dinosaurOnePosition % width)) {
          if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
            flashMoveDown()
          } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
            flashMoveLeft()
          } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
            flashMoveRight()
          } else {
            flashMoveUp()
          }
        }
      }
    }, 400)
  }


  function fleeingDinosaur2() {
    const flashingTwoIntervalId = setInterval(() => {
      if (resetFlashTwo || !pauseDinoMovement || youWon) {
        clearInterval(flashingTwoIntervalId)
        return
      } else {
        // DINOSAUR TWO
        // case: SAME ROW
        if ((Math.floor(dinosaurTwoPosition / width)) === (Math.floor(jeffPosition / width))) {
          if (dinosaurTwoPosition < jeffPosition) {
            if (!cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
              flashTwoMoveLeft()
            } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
              flashTwoMoveUp()
            } else if (!cells[dinosaurTwoPosition + width].classList.contains('barrier')) {
              flashTwoMoveDown()
            } else {
              flashTwoMoveRight()
            }
          } else {
            if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
              flashTwoMoveRight()
            } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
              flashTwoMoveUp()
            } else if (!cells[dinosaurTwoPosition + width].classList.contains('barrier')) {
              flashTwoMoveDown()
            } else {
              flashTwoMoveLeft()
            }
          }

          // case: SAME COLUMN
        } else if (dinosaurTwoPosition % width === jeffPosition % width) {
          if (jeffPosition > dinosaurTwoPosition) {
            if (!cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
              flashTwoMoveUp()
            } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
              flashTwoMoveRight()
            } else if (!cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
              flashTwoMoveLeft()
            } else {
              flashTwoMoveDown()
            }
          } else {
            if (!cells[dinosaurTwoPosition + width].classList.contains('barrier')) {
              flashTwoMoveDown()
            } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
              flashTwoMoveRight()
            } else if (!cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
              flashTwoMoveLeft()
            } else {
              flashTwoMoveUp()
            }
          }

          // case: jeff is in relative LOWER RIGHT QUADRANT
        } else if ((jeffPosition > dinosaurTwoPosition) && (jeffPosition % width > dinosaurTwoPosition % width)) {
          if (!cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
            flashTwoMoveUp()
          } else if (!cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            flashTwoMoveLeft()
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            flashTwoMoveRight()
          } else {
            flashTwoMoveDown()
          }

          // case: jeff is in relative LOWER LEFT QUADRANT
        } else if ((jeffPosition > dinosaurTwoPosition) && (jeffPosition % width < dinosaurTwoPosition % width)) {
          if (!cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
            flashTwoMoveUp()
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            flashTwoMoveRight()
          } else if (!cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            flashTwoMoveLeft()
          } else {
            flashTwoMoveDown()
          }

          // case: jeff is in relative UPPER LEFT QUADRANT
        } else if ((jeffPosition < dinosaurTwoPosition) && (jeffPosition % width < dinosaurTwoPosition % width)) {
          if (!cells[dinosaurTwoPosition + width].classList.contains('barrier')) {
            flashTwoMoveDown()
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            flashTwoMoveRight()
          } else if (!cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            flashTwoMoveLeft()
          } else {
            flashTwoMoveUp()
          }

          // case: jeff is in relative UPPER RIGHT QUADRANT
        } else if ((jeffPosition < dinosaurTwoPosition) && (jeffPosition % width > dinosaurTwoPosition % width)) {
          if (!cells[dinosaurTwoPosition + width].classList.contains('barrier')) {
            flashTwoMoveDown()
          } else if (!cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            flashTwoMoveLeft()
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            flashTwoMoveRight()
          } else {
            flashTwoMoveUp()
          }
        }
      }
    }, 400)
  }

  function fleeingDinosaur3() {
    const flashingThreeIntervalId = setInterval(() => {
      if (resetFlashThree || !pauseDinoMovement || youWon) {
        clearInterval(flashingThreeIntervalId)
        return
      } else {
        // DINOSAUR Three
        // case: SAME ROW
        if ((Math.floor(dinosaurThreePosition / width)) === (Math.floor(jeffPosition / width))) {
          if (dinosaurThreePosition < jeffPosition) {
            if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
              flashThreeMoveLeft()
            } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
              flashThreeMoveUp()
            } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
              flashThreeMoveDown()
            } else {
              flashThreeMoveRight()
            }
          } else {
            if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
              flashThreeMoveRight()
            } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
              flashThreeMoveUp()
            } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
              flashThreeMoveDown()
            } else {
              flashThreeMoveLeft()
            }
          }

          // case: SAME COLUMN
        } else if (dinosaurThreePosition % width === jeffPosition % width) {
          if (jeffPosition > dinosaurThreePosition) {
            if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
              flashThreeMoveUp()
            } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
              flashThreeMoveRight()
            } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
              flashThreeMoveLeft()
            } else {
              flashThreeMoveDown()
            }
          } else {
            if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
              flashThreeMoveDown()
            } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
              flashThreeMoveRight()
            } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
              flashThreeMoveLeft()
            } else {
              flashThreeMoveUp()
            }
          }

          // case: jeff is in relative LOWER RIGHT QUADRANT
        } else if ((jeffPosition > dinosaurThreePosition) && (jeffPosition % width > dinosaurThreePosition % width)) {
          if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
            flashThreeMoveUp()
          } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
            flashThreeMoveLeft()
          } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
            flashThreeMoveRight()
          } else {
            flashThreeMoveDown()
          }

          // case: jeff is in relative LOWER LEFT QUADRANT
        } else if ((jeffPosition > dinosaurThreePosition) && (jeffPosition % width < dinosaurThreePosition % width)) {
          if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
            flashThreeMoveUp()
          } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
            flashThreeMoveRight()
          } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
            flashThreeMoveLeft()
          } else {
            flashThreeMoveDown()
          }

          // case: jeff is in relative UPPER LEFT QUADRANT
        } else if ((jeffPosition < dinosaurThreePosition) && (jeffPosition % width < dinosaurThreePosition % width)) {
          if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
            flashThreeMoveDown()
          } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
            flashThreeMoveRight()
          } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
            flashThreeMoveLeft()
          } else {
            flashThreeMoveUp()
          }

          // case: jeff is in relative UPPER RIGHT QUADRANT
        } else if ((jeffPosition < dinosaurThreePosition) && (jeffPosition % width > dinosaurThreePosition % width)) {
          if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
            flashThreeMoveDown()
          } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
            flashThreeMoveLeft()
          } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
            flashThreeMoveRight()
          } else {
            flashThreeMoveUp()
          }
        }
      }
    }, 400)
  }

  function fleeingDinosaur4() {
    const flashingFourIntervalId = setInterval(() => {
      if (resetFlashFour || !pauseDinoMovement || youWon) {
        clearInterval(flashingFourIntervalId)
        return
      } else {
        // DINOSAUR Four
        // case: SAME ROW
        if ((Math.floor(dinosaurFourPosition / width)) === (Math.floor(jeffPosition / width))) {
          if (dinosaurFourPosition < jeffPosition) {
            if (!cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
              flashFourMoveLeft()
            } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier')) {
              flashFourMoveUp()
            } else if (!cells[dinosaurFourPosition + width].classList.contains('barrier')) {
              flashFourMoveDown()
            } else {
              flashFourMoveRight()
            }
          } else {
            if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
              flashFourMoveRight()
            } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier')) {
              flashFourMoveUp()
            } else if (!cells[dinosaurFourPosition + width].classList.contains('barrier')) {
              flashFourMoveDown()
            } else {
              flashFourMoveLeft()
            }
          }

          // case: SAME COLUMN
        } else if (dinosaurFourPosition % width === jeffPosition % width) {
          if (jeffPosition > dinosaurFourPosition) {
            if (!cells[dinosaurFourPosition - width].classList.contains('barrier')) {
              flashFourMoveUp()
            } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
              flashFourMoveRight()
            } else if (!cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
              flashFourMoveLeft()
            } else {
              flashFourMoveDown()
            }
          } else {
            if (!cells[dinosaurFourPosition + width].classList.contains('barrier')) {
              flashFourMoveDown()
            } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
              flashFourMoveRight()
            } else if (!cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
              flashFourMoveLeft()
            } else {
              flashFourMoveUp()
            }
          }

          // case: jeff is in relative LOWER RIGHT QUADRANT
        } else if ((jeffPosition > dinosaurFourPosition) && (jeffPosition % width > dinosaurFourPosition % width)) {
          if (!cells[dinosaurFourPosition - width].classList.contains('barrier')) {
            flashFourMoveUp()
          } else if (!cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            flashFourMoveLeft()
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            flashFourMoveRight()
          } else {
            flashFourMoveDown()
          }

          // case: jeff is in relative LOWER LEFT QUADRANT
        } else if ((jeffPosition > dinosaurFourPosition) && (jeffPosition % width < dinosaurFourPosition % width)) {
          if (!cells[dinosaurFourPosition - width].classList.contains('barrier')) {
            flashFourMoveUp()
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            flashFourMoveRight()
          } else if (!cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            flashFourMoveLeft()
          } else {
            flashFourMoveDown()
          }

          // case: jeff is in relative UPPER LEFT QUADRANT
        } else if ((jeffPosition < dinosaurFourPosition) && (jeffPosition % width < dinosaurFourPosition % width)) {
          if (!cells[dinosaurFourPosition + width].classList.contains('barrier')) {
            flashFourMoveDown()
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            flashFourMoveRight()
          } else if (!cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            flashFourMoveLeft()
          } else {
            flashFourMoveUp()
          }

          // case: jeff is in relative UPPER RIGHT QUADRANT
        } else if ((jeffPosition < dinosaurFourPosition) && (jeffPosition % width > dinosaurFourPosition % width)) {
          if (!cells[dinosaurFourPosition + width].classList.contains('barrier')) {
            flashFourMoveDown()
          } else if (!cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            flashFourMoveLeft()
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            flashFourMoveRight()
          } else {
            flashFourMoveUp()
          }
        }
      }
    }, 400)
  }

  function dinosaurMovement() {
    // if (pauseDinoMovement === true) {
    //   return
    // }  
    const dinoIntervalId = setInterval(() => {
      if (pauseDinoMovement) {
        clearInterval(dinoIntervalId)
        return
      } else {
        //if Jeff is in the same row...
        if ((Math.floor(dinosaurOnePosition / width)) === (Math.floor(jeffPosition / width))) {

          // then if the dinosaur is before Jeff...
          if (dinosaurOnePosition < jeffPosition) {

            // then as long as there is no barrier...
            if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {

              // move right one step
              dinoMoveRight()

              // but if there is something in the way, check if you can go up OR down, and if both are available, choose a random one
            } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier') && (!cells[dinosaurOnePosition + width].classList.contains('barrier'))) {
              randomSelector = Math.floor(Math.random() * 2)
              if (randomSelector === 0) {
                dinoMoveUp()
              } else {
                dinoMoveDown()
              }
              // if both aren't free, then if the cell above is empty, move there
            } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
              dinoMoveUp()

              // otherwise, move down (def free, only available option)
            } else {
              dinoMoveDown()
            }
            // sooo if Jeff's position isn't greater...
          } else {

            // if you can, move left
            if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
              dinoMoveLeft()

              // but if you can't go left, check above and below, and if BOTH are free...
            } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier') && (!cells[dinosaurOnePosition + width].classList.contains('barrier'))) {
              // randomly select 0 or 1, and if it's 0 go up, otherwise go down
              randomSelector = Math.floor(Math.random() * 2)
              if (randomSelector === 0) {
                dinoMoveUp()
              } else {
                dinoMoveDown()
              }
              //else if you can go up, do
            } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
              dinoMoveUp()

              // then if you can go down, do
            } else if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
              dinoMoveDown()

              // then finally, just go right
            } else {
              dinoMoveRight()
            }
          }
          // otherwise if Jeff is NOT in the same row, check if he's in the same column, and if he IS....
        } else if (dinosaurOnePosition % width === jeffPosition % width) {

          // if Jeff's position is greater (i.e. he is further down the grid)
          if (jeffPosition > dinosaurOnePosition) {

            // AND if you can move down... do!
            if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
              dinoMoveDown()

              // otherwise if you can't move down BUT both left and right are available...
            } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier') && !cells[dinosaurOnePosition + 1].classList.contains('barrier')) {

              // randomly select 0 or 1, and if it's 0 go left, otherwise go right
              randomSelector = Math.floor(Math.random() * 2)
              if (randomSelector === 0) {
                dinoMoveLeft()
              } else {
                dinoMoveUp()
              }
              // otherwise, if you can go right, do
            } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
              dinoMoveRight()

              // otherwise, if you can go left, do
            } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
              dinoMoveLeft()

              //otherwise, just go up i guess
            } else {
              dinoMoveUp()
            }

            //anyway otherwise if Jeff's position is NOT greater (i.e. he is above you somewhere)
          } else {

            // if you can move up, do!!
            if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
              dinoMoveUp()

              //otherwise, see if you can go left or right and if you can...
            } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier') && !cells[dinosaurOnePosition + 1].classList.contains('barrier')) {

              // randomly select 0 or 1, and if it's 0 go left, otherwise go right
              randomSelector = Math.floor(Math.random() * 2)
              if (randomSelector === 0) {
                dinoMoveLeft()
              } else {
                dinoMoveRight()
              }
              // otherwise, if you can go right, do
            } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
              dinoMoveRight()

              // otherwise, if you can go left, do
            } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
              dinoMoveLeft()

              //otherwise, just go down i guess
            } else {
              dinoMoveDown()
            }
          }
          // otherwise if Jeff isn't in the same row OR column...
        } else {

          // if the dinosaur is above jeff (gotta be as he's not in the same row!!)...
          if (dinosaurOnePosition < jeffPosition) {

            // if you can move down, do
            if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
              dinoMoveDown()

              // but if you can't move down, check if Jeff's column is further to the right than yours (def isn't the same!)
            } else if (jeffPosition % width > dinosaurOnePosition % width) {

              //if you can move right, do
              if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
                dinoMoveRight()

                //but if you can't random-select either up or left
              } else {
                randomSelector = Math.floor(Math.random() * 2)
                if (randomSelector === 0) {
                  dinoMoveUp()
                } else {
                  dinoMoveLeft()
                }
              }
              // otherwise, Jeff's column must not be higher than yours (i.e. he is to the left of you)
            } else {

              // move left if you can!
              if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
                dinoMoveLeft()

                //otherwise, random-select either up or right
              } else {
                randomSelector = Math.floor(Math.random() * 2)
                if (randomSelector === 0) {
                  dinoMoveUp()
                } else {
                  dinoMoveRight()
                }
              }
            }

            // OTHERWISE if the dinosaur position is greater than Jeff's (i.e. is below him)
          } else {

            // move up if you can
            if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
              dinoMoveUp()

              // otherwise, check if Jeff is generally to the right of you
            } else if (jeffPosition % width > dinosaurOnePosition % width) {

              // and if he is, move right if you can
              if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
                dinoMoveRight()

                //but if you can't, random-select either down or left
              } else {
                randomSelector = Math.floor(Math.random() * 2)

                if (randomSelector === 0) {
                  // if you can, go left, otherwise go down
                  if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
                    dinoMoveLeft()
                  } else {
                    dinoMoveDown()
                  }
                } else {
                  //if you can go down, do, otherwise, go left
                  if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
                    dinoMoveDown()
                  } else {
                    dinoMoveLeft()
                  }

                }
              }

              // if Jeff's column is NOT higher than your current column (i.e. he is to the left of you)
              // see if you can move left, and do it if you can
            } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
              dinoMoveLeft()

              // otherwise (can't move left), generate rando number
            } else {
              randomSelector = Math.floor(Math.random() * 2)

              if (randomSelector === 0) {
                // if you can, go right, otherwise go down
                if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
                  dinoMoveRight()
                } else {
                  dinoMoveDown()
                }
              } else {
                //if you can go down, do, otherwise, go right
                if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
                  dinoMoveDown()
                } else {
                  dinoMoveRight()
                }
              }
            }
          }
        }
      } if (cells[dinosaurOnePosition].classList.contains('jeff')) {
        caughtByDinosaur()
      }
    }, 400)
  }
  // this marks the end of dinosaurMovement()

  function dinoTwoMovement() {
    // IDEAS
    // sense availability in all four directions, and... proceed?
    // set the variable for currentdirection and disallow turning back
    // start general - move either right or left
    // make long journeys - choose a direction and continue until you can't go any further
    // create nodes - if jeff hits a spot, have specific routes planned from areas (ie if dinotwoposition === 132 || etcetcetc), head this way until dinotwoposition===whatever, then head xdirection.
    // the tricky part is combining these specific steps within a more general time loop.
    // create array of location history - push location value each time.
    // create variable dinotwodirection and log to it the name of the function just called (updownleftright). then if that variable is called 'up', options are 'up, left, right' (check dirctions and randoselect/lookat jeff)
    const dinoTwoIntervalId = setInterval(() => {
      if (pauseDinoMovement) {
        clearInterval(dinoTwoIntervalId)
        return
      } else {
        let randomTwo
        // console.log(dinoTwoDirection)
        if (dinoTwoDirection === 'up') {

          // if up, right and left are all free...
          if (!cells[dinosaurTwoPosition - width].classList.contains('barrier') && !cells[dinosaurTwoPosition + 1].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            if (dinosaurTwoPosition % width === jeffPosition % width) {
              dinoTwoMoveUp()
            } else if (jeffPosition % width < dinosaurTwoPosition % width) {
              dinoTwoMoveLeft()
            } else {
              dinoTwoMoveRight()
            }
            // else, if just left and right are free..
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            if (jeffPosition % width < dinosaurTwoPosition % width) {
              dinoTwoMoveLeft()
            } else {
              dinoTwoMoveRight()
            }
            // else, if just up and right are free...   or up and left...
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier') && !cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            randomTwo = Math.floor(Math.random() * 2)
            if (randomTwo === 0) {
              dinoTwoMoveUp()
            } else {
              dinoTwoMoveRight()
            }
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            randomTwo = Math.floor(Math.random() * 2)
            if (randomTwo === 0) {
              dinoTwoMoveUp()
            } else {
              dinoTwoMoveLeft()
            }
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
            dinoTwoMoveUp()
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            dinoTwoMoveRight()
          } else {
            dinoTwoMoveLeft()
          }
        } else if (dinoTwoDirection === 'down') {
          // if down, right and left are all free...
          if (!cells[dinosaurTwoPosition + width].classList.contains('barrier') && !cells[dinosaurTwoPosition + 1].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            if (dinosaurTwoPosition % width === jeffPosition % width) {
              dinoTwoMoveDown()
            } else if (jeffPosition % width < dinosaurTwoPosition % width) {
              dinoTwoMoveLeft()
            } else {
              dinoTwoMoveRight()
            }
            // else, if just left and right are free..
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            if (jeffPosition % width < dinosaurTwoPosition % width) {
              dinoTwoMoveLeft()
            } else {
              dinoTwoMoveRight()
            }
            // else, if just down and right are free...   or up and left...
          } else if (!cells[dinosaurTwoPosition + width].classList.contains('barrier') && !cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            randomTwo = Math.floor(Math.random() * 2)
            if (randomTwo === 0) {
              dinoTwoMoveDown()
            } else {
              dinoTwoMoveRight()
            }
          } else if (!cells[dinosaurTwoPosition + width].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            randomTwo = Math.floor(Math.random() * 2)
            if (randomTwo === 0) {
              dinoTwoMoveDown()
            } else {
              dinoTwoMoveLeft()
            }
          } else if (!cells[dinosaurTwoPosition + width].classList.contains('barrier')) {
            dinoTwoMoveDown()
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            dinoTwoMoveRight()
          } else {
            dinoTwoMoveLeft()
          }

        } else if (dinoTwoDirection === 'left') {
          if (dinosaurTwoPosition === 144) {
            cells[dinosaurTwoPosition].classList.remove('dinosaur2')
            dinosaurTwoPosition = 161
            cells[dinosaurTwoPosition].classList.add('dinosaur2')
            dinoTwoDirection = 'left'
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier') && !cells[dinosaurTwoPosition + width].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            if (Math.floor(dinosaurTwoPosition / width) === Math.floor(jeffPosition / width)) {
              dinoTwoMoveLeft()
            } else if (Math.floor(jeffPosition / width) < Math.floor(dinosaurTwoPosition / width)) {
              dinoTwoMoveUp()
            } else {
              dinoTwoMoveDown()
            }
            // else, if just up and down are free..
          } else if (!cells[dinosaurTwoPosition + width].classList.contains('barrier') && !cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
            if (Math.floor(jeffPosition / width) < Math.floor(dinosaurTwoPosition / width)) {
              dinoTwoMoveUp()
            } else {
              dinoTwoMoveDown()
            }
            // else, if just up and LEFT are free...   or DOWN and left...
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            randomTwo = Math.floor(Math.random() * 2)
            if (randomTwo === 0) {
              dinoTwoMoveUp()
            } else {
              dinoTwoMoveLeft()
            }
          } else if (!cells[dinosaurTwoPosition + width].classList.contains('barrier') && !cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            randomTwo = Math.floor(Math.random() * 2)
            if (randomTwo === 0) {
              dinoTwoMoveDown()
            } else {
              dinoTwoMoveLeft()
            }
          } else if (!cells[dinosaurTwoPosition - 1].classList.contains('barrier')) {
            dinoTwoMoveLeft()
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
            dinoTwoMoveUp()
          } else {
            dinoTwoMoveDown()
          }
        } else if (dinoTwoDirection === 'right') {
          if (dinosaurTwoPosition === 161) {
            cells[dinosaurTwoPosition].classList.remove('dinosaur2')
            dinosaurTwoPosition = 144
            cells[dinosaurTwoPosition].classList.add('dinosaur2')
            dinoTwoDirection = 'right'
            // if up, RIGHT and down are all free...
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier') && !cells[dinosaurTwoPosition + width].classList.contains('barrier') && !cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            if (Math.floor(dinosaurTwoPosition / width) === Math.floor(jeffPosition / width)) {
              dinoTwoMoveRight()
            } else if (Math.floor(jeffPosition / width) < Math.floor(dinosaurTwoPosition / width)) {
              dinoTwoMoveUp()
            } else {
              dinoTwoMoveDown()
            }
            // else, if just up and down are free..
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier') && !cells[dinosaurTwoPosition + width].classList.contains('barrier')) {
            if (Math.floor(jeffPosition / width) < Math.floor(dinosaurTwoPosition / width)) {
              dinoTwoMoveUp()
            } else {
              dinoTwoMoveDown()
            }
            // else, if just up and RIGHT are free...   or down and RIGHT...
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier') && !cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            randomTwo = Math.floor(Math.random() * 2)
            if (randomTwo === 0) {
              dinoTwoMoveUp()
            } else {
              dinoTwoMoveRight()
            }
          } else if (!cells[dinosaurTwoPosition + width].classList.contains('barrier') && !cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            randomTwo = Math.floor(Math.random() * 2)
            if (randomTwo === 0) {
              dinoTwoMoveDown()
            } else {
              dinoTwoMoveRight()
            }
          } else if (!cells[dinosaurTwoPosition + 1].classList.contains('barrier')) {
            dinoTwoMoveRight()
          } else if (!cells[dinosaurTwoPosition - width].classList.contains('barrier')) {
            dinoTwoMoveUp()
          } else {
            dinoTwoMoveDown()
          }
        }
      } if (cells[dinosaurTwoPosition].classList.contains('jeff')) {
        caughtByDinosaur()
      }
    }, 400)
  }
  function dinoThreeMovement() {
    const dinoThreeIntervalId = setInterval(() => {
      if (pauseDinoMovement) {
        clearInterval(dinoThreeIntervalId)
        return
      } else {
        let randomThree
        // console.log(dinoThreeDirection)
        if (dinoThreeDirection === 'up') {
          //options are up--left-right

          // if jeff is in the same row, move towards him (depending on cell number comparison)
          if (Math.floor(dinosaurThreePosition / width) === Math.floor(jeffPosition / width)) {

            //if jeff is to the right of the dinosaur
            if (jeffPosition < dinosaurThreePosition) {
              if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else {
                dinoThreeMoveDown()
              }

              // else if jeff is to the LEFT
            } else {
              if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveDown()
              }
            }

            // if you're not in the same row and jeff is ABOVE...
          } else if (jeffPosition < dinosaurThreePosition) {

            // if he's in the column above you...
            if (dinosaurThreePosition % width === jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveLeft()
                } else {
                  dinoThreeMoveRight()
                }
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition + 1].classList) {
                dinoThreeMoveRight()
              } else {
                dinoThreeMoveDown()
              }

              // else if jeff is to your right....
            } else if (dinosaurThreePosition % width < jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveRight()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveDown()
              }
              // else if jeff is to your left...
            } else if (dinosaurThreePosition % width > jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else {
                dinoThreeMoveDown()
              }
            }

            // this is else if jeff is BELOW you, but you just moved up
          } else {
            if (dinosaurThreePosition % width === jeffPosition % width) {
              // if he's in the column directly below you...
              if (!cells[dinosaurThreePosition + 1].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveRight()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else {
                dinoThreeMoveDown()
              }
              // if he's to the left of you...
            } else if (dinosaurThreePosition % width > jeffPosition % width) {
              if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveRight()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else {
                dinoThreeMoveDown()
              }
              // if he's to the right of you...
            } else if (dinosaurThreePosition % width < jeffPosition % width) {
              if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveDown()
              }
            }
          }
        } else if (dinoThreeDirection === 'down') {
          // options are DOWN, RIGHT, and LEFT
          console.log(dinoThreeDirection)
          if (Math.floor(dinosaurThreePosition / width) === Math.floor(jeffPosition / width)) {
            if (jeffPosition < dinosaurThreePosition) {
              if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else {
                dinoThreeMoveRight()
              }
            } else {
              if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveUp()
              }
            }
            // UP TO HERE HAVE ADDED IN THE OPTION TO GO BACK ON YOURSELF
            // if you're not in the same row and jeff is ABOVE...
          } else if (jeffPosition < dinosaurThreePosition) {
            // if he's in the column above you...
            if (dinosaurThreePosition % width === jeffPosition % width) {
              if (!cells[dinosaurThreePosition - 1].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveLeft()
                } else {
                  dinoThreeMoveRight()
                }
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveDown()
              }
              // else if jeff is to your right....
            } else if (dinosaurThreePosition % width < jeffPosition % width) {
              if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveDown()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else {
                dinoThreeMoveLeft()
              }
              // else if jeff is to your left...
            } else if (dinosaurThreePosition % width > jeffPosition % width) {
              if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveDown()
                } else {
                  dinoThreeMoveRight()
                }
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else {
                dinoThreeMoveRight()
              }
            }

            // this is else if jeff is BELOW you, and you just moved DOWN
          } else {
            if (dinosaurThreePosition % width === jeffPosition % width) {
              // if he's in the column directly below you...
              if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveRight()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else {
                dinoThreeMoveLeft()
              }
              // if he's to the left of you...
            } else if (dinosaurThreePosition % width > jeffPosition % width) {
              if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveDown()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveRight()
              }
              // if he's to the right of you...
            } else if (dinosaurThreePosition % width < jeffPosition % width) {
              if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveDown()
                } else {
                  dinoThreeMoveRight()
                }
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else {
                dinoThreeMoveLeft()
              }
            }
          }


        } else if (dinoThreeDirection === 'left') {
          if (dinosaurThreePosition === 144) {
            cells[dinosaurThreePosition].classList.remove('dinosaur3')
            dinosaurThreePosition = 161
            cells[dinosaurThreePosition].classList.add('dinosaur3')
            dinoThreeDirection = 'left'
            // options are LEFT, UP and DOWN
            // if in the same row...
          } else if (Math.floor(dinosaurThreePosition / width) === Math.floor(jeffPosition / width)) {
            if (jeffPosition < dinosaurThreePosition) {
              if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveDown()
                }
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else {
                dinoThreeMoveUp()
              }
            } else {
              if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveDown()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else {
                dinoThreeMoveLeft()
              }
            }

            // if you're not in the same row and jeff is ABOVE...
          } else if (jeffPosition < dinosaurThreePosition) {
            // if he's in the column above you...
            if (dinosaurThreePosition % width === jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier') && !cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveLeft()
                } else {
                  dinoThreeMoveDown()
                }
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveDown()
              }
              // else if jeff is to your right....
            } else if (dinosaurThreePosition % width < jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveLeft()
                } else {
                  dinoThreeMoveDown()
                }
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveDown()
              }
              // else if jeff is to your left...
            } else if (dinosaurThreePosition % width > jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveDown()
              }
            }

            // this is else if jeff is BELOW you, and you just moved left
          } else {
            if (dinosaurThreePosition % width === jeffPosition % width) {
              // if he's in the column directly below you...
              if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else {
                dinoThreeMoveUp()
              }
              // if he's to the left of you...
            } else if (dinosaurThreePosition % width > jeffPosition % width) {
              if (!cells[dinosaurThreePosition - 1].classList.contains('barrier') && !cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveDown()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else {
                dinoThreeMoveUp()
              }
              // if he's to the right of you...
            } else if (dinosaurThreePosition % width < jeffPosition % width) {
              if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveLeft()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else {
                dinoThreeMoveLeft()
              }
            }
          }

        } else if (dinoThreeDirection === 'right') {
          if (dinosaurThreePosition === 161) {
            cells[dinosaurThreePosition].classList.remove('dinosaur3')
            dinosaurThreePosition = 144
            cells[dinosaurThreePosition].classList.add('dinosaur3')
            dinoThreeDirection = 'right'
          } else if (Math.floor(dinosaurThreePosition / width) === Math.floor(jeffPosition / width)) {
            if (jeffPosition > dinosaurThreePosition) {
              if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveDown()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else {
                dinoThreeMoveLeft()
              }
              //else if in the same row but jeff is on the left...
            } else {
              if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
                dinoThreeMoveLeft()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveDown()
                }
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else {
                dinoThreeMoveRight()
              }
            }
            // if you're not in the same row and jeff is ABOVE...
          } else if (jeffPosition < dinosaurThreePosition) {
            // if he's in the column above you...
            if (dinosaurThreePosition % width === jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                dinoThreeMoveDown()
              } else {
                dinoThreeMoveLeft()
              }

              // else if jeff is to your right....
            } else if (dinosaurThreePosition % width < jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveRight()
                } else {
                  dinoThreeMoveUp()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else {
                dinoThreeMoveDown()
              }
              // else if jeff is to your left...
            } else if (dinosaurThreePosition % width > jeffPosition % width) {
              if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveUp()
              } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                randomThree = Math.floor(Math.random() * 2)
                if (randomThree === 0) {
                  dinoThreeMoveRight()
                } else {
                  dinoThreeMoveDown()
                }
              } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                dinoThreeMoveRight()
              } else {
                dinoThreeMoveDown()
              }

              // this is else if jeff is BELOW you, and you just moved RIGHT
            } else {
              if (dinosaurThreePosition % width === jeffPosition % width) {
                // if he's in the column directly below you...
                if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                  dinoThreeMoveDown()
                } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                  dinoThreeMoveRight()
                } else {
                  dinoThreeMoveUp()
                }
                // if he's to the left of you...
              } else if (dinosaurThreePosition % width > jeffPosition % width) {
                if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                  dinoThreeMoveDown()
                } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier') && !cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                  randomThree = Math.floor(Math.random() * 2)
                  if (randomThree === 0) {
                    dinoThreeMoveRight()
                  } else {
                    dinoThreeMoveUp()
                  }
                } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
                  dinoThreeMoveUp()
                } else {
                  dinoThreeMoveRight()
                }
                // if he's to the right of you...
              } else if (dinosaurThreePosition % width < jeffPosition % width) {
                if (!cells[dinosaurThreePosition + width].classList.contains('barrier') && !cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                  randomThree = Math.floor(Math.random() * 2)
                  if (randomThree === 0) {
                    dinoThreeMoveDown()
                  } else {
                    dinoThreeMoveRight()
                  }
                } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
                  dinoThreeMoveDown()
                } else if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
                  dinoThreeMoveRight()
                } else {
                  dinoThreeMoveUp()
                }
              }
            }
          } else {
            if (!cells[dinosaurThreePosition + 1].classList.contains('barrier')) {
              dinoThreeMoveRight()
            } else if (!cells[dinosaurThreePosition - 1].classList.contains('barrier')) {
              dinoThreeMoveLeft()
            } else if (!cells[dinosaurThreePosition + width].classList.contains('barrier')) {
              dinoThreeMoveDown()
            } else if (!cells[dinosaurThreePosition - width].classList.contains('barrier')) {
              dinoThreeMoveUp()
            }
          }
        }
      } if (cells[dinosaurThreePosition].classList.contains('jeff')) {
        caughtByDinosaur()
      }
    }, 400)
  }
  function dinoFourMovement() {
    const dinoFourIntervalId = setInterval(() => {
      if (pauseDinoMovement) {
        clearInterval(dinoFourIntervalId)
        return
      } else {
        let randomFour
        // console.log(dinoFourDirection)
        if (dinoFourDirection === 'up') {

          // if up, right and left are all free...
          if (!cells[dinosaurFourPosition - width].classList.contains('barrier') && !cells[dinosaurFourPosition + 1].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            if (dinosaurFourPosition % width === jeffPosition % width) {
              dinoFourMoveUp()
            } else if (jeffPosition % width < dinosaurFourPosition % width) {
              dinoFourMoveLeft()
            } else {
              dinoFourMoveRight()
            }
            // else, if just left and right are free..
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            if (jeffPosition % width < dinosaurFourPosition % width) {
              dinoFourMoveLeft()
            } else {
              dinoFourMoveRight()
            }
            // else, if just up and right are free...   or up and left...
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier') && !cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            randomFour = Math.floor(Math.random() * 2)
            if (randomFour === 0) {
              dinoFourMoveUp()
            } else {
              dinoFourMoveRight()
            }
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            randomFour = Math.floor(Math.random() * 2)
            if (randomFour === 0) {
              dinoFourMoveUp()
            } else {
              dinoFourMoveLeft()
            }
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier')) {
            dinoFourMoveUp()
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            dinoFourMoveRight()
          } else {
            dinoFourMoveLeft()
          }
        } else if (dinoFourDirection === 'down') {
          // if down, right and left are all free...
          if (!cells[dinosaurFourPosition + width].classList.contains('barrier') && !cells[dinosaurFourPosition + 1].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            if (dinosaurFourPosition % width === jeffPosition % width) {
              dinoFourMoveDown()
            } else if (jeffPosition % width < dinosaurFourPosition % width) {
              dinoFourMoveLeft()
            } else {
              dinoFourMoveRight()
            }
            // else, if just left and right are free..
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            if (jeffPosition % width < dinosaurFourPosition % width) {
              dinoFourMoveLeft()
            } else {
              dinoFourMoveRight()
            }
            // else, if just down and right are free...   or up and left...
          } else if (!cells[dinosaurFourPosition + width].classList.contains('barrier') && !cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            randomFour = Math.floor(Math.random() * 2)
            if (randomFour === 0) {
              dinoFourMoveDown()
            } else {
              dinoFourMoveRight()
            }
          } else if (!cells[dinosaurFourPosition + width].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            randomFour = Math.floor(Math.random() * 2)
            if (randomFour === 0) {
              dinoFourMoveDown()
            } else {
              dinoFourMoveLeft()
            }
          } else if (!cells[dinosaurFourPosition + width].classList.contains('barrier')) {
            dinoFourMoveDown()
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            dinoFourMoveRight()
          } else {
            dinoFourMoveLeft()
          }

        } else if (dinoFourDirection === 'left') {
          if (dinosaurFourPosition === 144) {
            cells[dinosaurFourPosition].classList.remove('dinosaur4')
            dinosaurFourPosition = 161
            cells[dinosaurFourPosition].classList.add('dinosaur4')
            dinoFourDirection = 'left'
            // if up, left and down are all free...
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier') && !cells[dinosaurFourPosition + width].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            if (Math.floor(dinosaurFourPosition / width) === Math.floor(jeffPosition / width)) {
              dinoFourMoveLeft()
            } else if (Math.floor(jeffPosition / width) < Math.floor(dinosaurFourPosition / width)) {
              dinoFourMoveUp()
            } else {
              dinoFourMoveDown()
            }
            // else, if just up and down are free..
          } else if (!cells[dinosaurFourPosition + width].classList.contains('barrier') && !cells[dinosaurFourPosition - width].classList.contains('barrier')) {
            if (Math.floor(jeffPosition / width) < Math.floor(dinosaurFourPosition / width)) {
              dinoFourMoveUp()
            } else {
              dinoFourMoveDown()
            }
            // else, if just up and LEFT are free...   or DOWN and left...
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            randomFour = Math.floor(Math.random() * 2)
            if (randomFour === 0) {
              dinoFourMoveUp()
            } else {
              dinoFourMoveLeft()
            }
          } else if (!cells[dinosaurFourPosition + width].classList.contains('barrier') && !cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            randomFour = Math.floor(Math.random() * 2)
            if (randomFour === 0) {
              dinoFourMoveDown()
            } else {
              dinoFourMoveLeft()
            }
          } else if (!cells[dinosaurFourPosition - 1].classList.contains('barrier')) {
            dinoFourMoveLeft()
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier')) {
            dinoFourMoveUp()
          } else {
            dinoFourMoveDown()
          }
        } else if (dinoFourDirection === 'right') {
          if (dinosaurFourPosition === 161) {
            cells[dinosaurFourPosition].classList.remove('dinosaur4')
            dinosaurFourPosition = 144
            cells[dinosaurFourPosition].classList.add('dinosaur4')
            dinoFourDirection = 'right'
            // if up, RIGHT and down are all free..
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier') && !cells[dinosaurFourPosition + width].classList.contains('barrier') && !cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            if (Math.floor(dinosaurFourPosition / width) === Math.floor(jeffPosition / width)) {
              dinoFourMoveRight()
            } else if (Math.floor(jeffPosition / width) < Math.floor(dinosaurFourPosition / width)) {
              dinoFourMoveUp()
            } else {
              dinoFourMoveDown()
            }
            // else, if just up and down are free..
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier') && !cells[dinosaurFourPosition + width].classList.contains('barrier')) {
            if (Math.floor(jeffPosition / width) < Math.floor(dinosaurFourPosition / width)) {
              dinoFourMoveUp()
            } else {
              dinoFourMoveDown()
            }
            // else, if just up and RIGHT are free...   or down and RIGHT...
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier') && !cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            randomFour = Math.floor(Math.random() * 2)
            if (randomFour === 0) {
              dinoFourMoveUp()
            } else {
              dinoFourMoveRight()
            }
          } else if (!cells[dinosaurFourPosition + width].classList.contains('barrier') && !cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            randomFour = Math.floor(Math.random() * 2)
            if (randomFour === 0) {
              dinoFourMoveDown()
            } else {
              dinoFourMoveRight()
            }
          } else if (!cells[dinosaurFourPosition + 1].classList.contains('barrier')) {
            dinoFourMoveRight()
          } else if (!cells[dinosaurFourPosition - width].classList.contains('barrier')) {
            dinoFourMoveUp()
          } else {
            dinoFourMoveDown()
          }
        }
      } if (cells[dinosaurFourPosition].classList.contains('jeff')) {
        caughtByDinosaur()
      }
    }, 400)
  }
}





window.addEventListener('DOMContentLoaded', loadGame)
window.addEventListener('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)