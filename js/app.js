function loadGame() {
  startButton.addEventListener('click', () => {
    setupGame()
  })
}

//list of tasty bugs
// livesDisplay isn't updating with hearts - works with numbers, hearts update if I update line 23, but not sure yet why it isn't updating when the code runs
// Need to now repeat flashing dino logic x4 -- search doc for dinosaur1 and find places to update. consider using switch statements???
// what else blocks dinosaurs - barriers, but also...?


function setupGame() {
  const width = 18
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let jeffPosition = 242
  let dinosaurOnePosition = 134
  let dinosaurTwoPosition = 135
  let dinosaurThreePosition = 152
  let dinosaurFourPosition = 153
  const barriersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 27, 35, 36, 38, 39, 40, 41, 42, 44, 45, 47, 48, 49, 50, 51, 53, 54, 56, 57, 58, 59, 60, 62, 63, 65, 66, 67, 68, 69, 71, 72, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 114, 119, 125, 126, 127, 128, 129, 130, 132, 137, 139, 140, 141, 142, 143, 162, 163, 164, 165, 166, 168, 173, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 206, 207, 215, 216, 218, 219, 220, 222, 224, 225, 227, 229, 230, 231, 233, 234, 236, 237, 238, 240, 245, 247, 248, 249, 251, 252, 258, 259, 260, 261, 262, 263, 269, 270, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 287, 288, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323]
  const specialArray = [34, 115, 199, 214]
  // const holdingArea = [134, 135, 152, 153]
  const scoreDisplay = document.querySelector('#score')
  const livesDisplay = document.querySelector('#lives')
  //livesDisplay is a span which contains just the hearts
  let score = 0
  let lives = 3
  let livesHearts = '&hearts; '.repeat(lives)
  console.log(livesHearts)
  livesDisplay.innerHTML = `${livesHearts}`
  const startButton = document.querySelector('startbutton')
  let randomSelector = 0

  // Setting up the board


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === jeffPosition) {
      cell.classList.add('jeff')
    } else if (i === dinosaurOnePosition) {
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur1')
    } else if (i === dinosaurTwoPosition) {
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur2')
    } else if (i === dinosaurThreePosition) {
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur3')
    } else if (i === dinosaurFourPosition) {
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

  // TEST DINOSAURS
  // cells[201].classList.add('dinosaur1')
  // cells[289].classList.add('red')
  // cells[290].classList.add('orange')
  // cells[291].classList.add('purple')
  // cells[292].classList.add('green')


  // Controlling Jeff Goldblum
  document.addEventListener('keydown', (event) => {
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
    // remove the egg and increase the score
    if (cells[jeffPosition].classList.contains('food')) {
      cells[jeffPosition].classList.remove('food')
      score += 100
      scoreDisplay.innerHTML = `${score}`
    }
    // logic for hitting the special egg!
    if (cells[jeffPosition].classList.contains('special')) {
      cells[jeffPosition].classList.remove('special')
      score += 1000
      scoreDisplay.innerHTML = `${score}`
      // and here we make the dinosaurs flash and retreat
      // NEED TO REPEAT THIS TIMES FOUR!!
      cells.forEach((cell) => {
        if (cell.classList.contains('dinosaur1')) {
          cell.classList.remove('dinosaur1')
          cell.classList.add('flashingDino1')
          setTimeout(() => {
            console.log('flashing dinosaurs lol')
            cells.forEach((cell) => {
              if (cell.classList.contains('flashingDino1')) {
                cell.classList.remove('flashingDino1')
                cell.classList.add('dinosaur1')
              }
            })
          }, 5000)
        }

        if (cell.classList.contains('dinosaur2')) {
          cell.classList.remove('dinosaur2')
          cell.classList.add('flashingDino2')
          setTimeout(() => {
            console.log('flashing dinosaurs lol')
            cells.forEach((cell) => {
              if (cell.classList.contains('flashingDino2')) {
                cell.classList.remove('flashingDino2')
                cell.classList.add('dinosaur2')
              }
            })
          }, 5000)
        }

        if (cell.classList.contains('dinosaur3')) {
          cell.classList.remove('dinosaur3')
          cell.classList.add('flashingDino3')
          setTimeout(() => {
            console.log('flashing dinosaurs lol')
            cells.forEach((cell) => {
              if (cell.classList.contains('flashingDino3')) {
                cell.classList.remove('flashingDino3')
                cell.classList.add('dinosaur3')
              }
            })
          }, 5000)
        }

        if (cell.classList.contains('dinosaur4')) {
          cell.classList.remove('dinosaur4')
          cell.classList.add('flashingDino4')
          setTimeout(() => {
            console.log('flashing dinosaurs lol')
            cells.forEach((cell) => {
              if (cell.classList.contains('flashingDino4')) {
                cell.classList.remove('flashingDino4')
                cell.classList.add('dinosaur4')
              }
            })
          }, 5000)
        }

      })
      //logic for what happens if you catch a dinosaur when it's flashing!
      // THIS NEEDS UPDATING ONCE THEY MOVE x4
      if (cells[jeffPosition].classList.contains('flashingDino')) {
        cells[jeffPosition].classList.remove('flashingDino')
        lives += 1
        livesDisplay.innerHTML = `${livesHearts}`
        setTimeout(() => {
          //update this line below - where caught dino reappears (this is test cell)
          cells[304].classList.add('dinosaur')
        }, 3000)

      }

    }
    // logic for hitting a dinosaur and losing a life
    // THIS NEEDS UPDATING x 4
    if (cells[jeffPosition].classList.contains('dinosaur')) {
      cells[jeffPosition].classList.remove('jeff')
      cells[jeffPosition].classList.remove('dinosaur')
      lives -= 1
      console.log(lives)
      livesDisplay.innerHTML = `${livesHearts}`
      //unsure why livesDisplay isn't updating...
      jeffPosition = 241
      cells.forEach((cell) => {
        if (cell.classList.contains('dinosaur')) {
          cell.classList.remove('dinosaur')
        }
      })
      cells[134].classList.add('dinosaur')
      cells[135].classList.add('dinosaur')
      cells[152].classList.add('dinosaur')
      cells[153].classList.add('dinosaur')
      cells[jeffPosition].classList.add('jeff')
    }

    //end of setting up jeff goldblum  
  })


  //let's get these dinosaurs moving
  const dinoIntervalId = setInterval(() => {
    //if Jeff is in the same row...
    if ((Math.floor(dinosaurOnePosition / width)) === (Math.floor(jeffPosition / width))) {

      // then if the dinosaur is before Jeff...
      if (dinosaurOnePosition < jeffPosition) {

        // then as long as there is no barrier...
        if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {

          // move right one step
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += 1
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // but if there is something in the way, check if you can go up OR down, and if both are available, choose a random one
        } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier') && (!cells[dinosaurOnePosition + width].classList.contains('barrier'))) {
          randomSelector = Math.floor(Math.random() * 2)
          console.log(randomSelector)
          if (randomSelector === 0) {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition -= width
            cells[dinosaurOnePosition].classList.add('dinosaur1')
          } else {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition += width
            cells[dinosaurOnePosition].classList.add('dinosaur1')
          }
          // if both aren't free, then if the cell above is empty, move there
        } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= width
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // otherwise, move down (def free, only available option)
        } else {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += width
          cells[dinosaurOnePosition].classList.add('dinosaur1')
        }
        // sooo if Jeff's position isn't greater...
      } else {

        // if you can, move left
        if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= 1
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // but if you can't go left, check above and below, and if BOTH are free...
        } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier') && (!cells[dinosaurOnePosition + width].classList.contains('barrier'))) {
          // randomly select 0 or 1, and if it's 0 go up, otherwise go down
          randomSelector = Math.floor(Math.random() * 2)
          console.log(randomSelector)
          if (randomSelector === 0) {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition -= width
            cells[dinosaurOnePosition].classList.add('dinosaur1')
          } else {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition += width
            cells[dinosaurOnePosition].classList.add('dinosaur1')
          }
          //else if you can go up, do
        } else if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= width
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // then if you can go down, do
        } else if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += width
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // then finally, just go right
        } else {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += 1
          cells[dinosaurOnePosition].classList.add('dinosaur1')
        }
      }
      // otherwise if Jeff is NOT in the same row, check if he's in the same column, and if he IS....
    } else if (dinosaurOnePosition % width === jeffPosition % width) {

      // if Jeff's position is greater (i.e. he is further down the grid)
      if (jeffPosition > dinosaurOnePosition) {

        // AND if you can move down... do!
        if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += width
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // otherwise if you can't move down BUT both left and right are available...
        } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier') && !cells[dinosaurOnePosition + 1].classList.contains('barrier')) {

          // randomly select 0 or 1, and if it's 0 go left, otherwise go right
          randomSelector = Math.floor(Math.random() * 2)
          console.log(randomSelector)
          if (randomSelector === 0) {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition -= 1
            cells[dinosaurOnePosition].classList.add('dinosaur1')
          } else {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition += 1
            cells[dinosaurOnePosition].classList.add('dinosaur1')
          }
          // otherwise, if you can go right, do
        } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += 1
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // otherwise, if you can go left, do
        } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= 1
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          //otherwise, just go up i guess
        } else {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= width
          cells[dinosaurOnePosition].classList.add('dinosaur1')
        }

        //anyway otherwise if Jeff's position is NOT greater (i.e. he is above you somewhere)
      } else {

        // if you can move up, do!!
        if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= width
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          //otherwise, see if you can go left or right and if you can...
        } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier') && !cells[dinosaurOnePosition + 1].classList.contains('barrier')) {

          // randomly select 0 or 1, and if it's 0 go left, otherwise go right
          randomSelector = Math.floor(Math.random() * 2)
          console.log(randomSelector)
          if (randomSelector === 0) {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition -= 1
            cells[dinosaurOnePosition].classList.add('dinosaur1')
          } else {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition += 1
            cells[dinosaurOnePosition].classList.add('dinosaur1')
          }
          // otherwise, if you can go right, do
        } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += 1
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // otherwise, if you can go left, do
        } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= 1
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          //otherwise, just go down i guess
        } else {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += width
          cells[dinosaurOnePosition].classList.add('dinosaur1')
        }
      }
      // otherwise if Jeff isn't in the same row OR column...
    } else {

      // if the dinosaur is above jeff (gotta be as he's not in the same row!!)...
      if (dinosaurOnePosition < jeffPosition) {

        // if you can move down, do
        if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition += width
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // but if you can't move down, check if Jeff's column is further to the right than yours (def isn't the same!)
        } else if (jeffPosition % width > dinosaurOnePosition % width) {

          //if you can move right, do
          if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition += 1
            cells[dinosaurOnePosition].classList.add('dinosaur1')

            //but if you can't random-select either up or left
          } else {
            randomSelector = Math.floor(Math.random() * 2)
            console.log(randomSelector)
            if (randomSelector === 0) {
              cells[dinosaurOnePosition].classList.remove('dinosaur1')
              dinosaurOnePosition -= width
              cells[dinosaurOnePosition].classList.add('dinosaur1')
            } else {
              cells[dinosaurOnePosition].classList.remove('dinosaur1')
              dinosaurOnePosition -= 1
              cells[dinosaurOnePosition].classList.add('dinosaur1')
            }
          }
          // otherwise, Jeff's column must not be higher than yours (i.e. he is to the left of you)
        } else {

          // move left if you can!
          if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition -= 1
            cells[dinosaurOnePosition].classList.add('dinosaur1')

            //otherwise, random-select either up or right
          } else {
            randomSelector = Math.floor(Math.random() * 2)
            console.log(randomSelector)
            if (randomSelector === 0) {
              cells[dinosaurOnePosition].classList.remove('dinosaur1')
              dinosaurOnePosition -= width
              cells[dinosaurOnePosition].classList.add('dinosaur1')
            } else {
              cells[dinosaurOnePosition].classList.remove('dinosaur1')
              dinosaurOnePosition += 1
              cells[dinosaurOnePosition].classList.add('dinosaur1')
            }
          }
        }

        // OTHERWISE if the dinosaur position is greater than Jeff's (i.e. is below him)
      } else {

        // move up if you can
        if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= width
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // otherwise, check if Jeff is generally to the right of you
        } else if (jeffPosition % width > dinosaurOnePosition % width) {

          // and if he is, move right if you can
          if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
            cells[dinosaurOnePosition].classList.remove('dinosaur1')
            dinosaurOnePosition += 1
            cells[dinosaurOnePosition].classList.add('dinosaur1')

            //but if you can't, random-select either down or left
          } else {
            randomSelector = Math.floor(Math.random() * 2)
            console.log(randomSelector)

            if (randomSelector === 0) {
              // if you can, go left, otherwise go down
              if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
                cells[dinosaurOnePosition].classList.remove('dinosaur1')
                dinosaurOnePosition -= 1
                cells[dinosaurOnePosition].classList.add('dinosaur1')
              } else {
                cells[dinosaurOnePosition].classList.remove('dinosaur1')
                dinosaurOnePosition += width
                cells[dinosaurOnePosition].classList.add('dinosaur1')
              }
            } else {
              //if you can go down, do, otherwise, go left
              if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
                cells[dinosaurOnePosition].classList.remove('dinosaur1')
                dinosaurOnePosition += width
                cells[dinosaurOnePosition].classList.add('dinosaur1')
              } else {
                cells[dinosaurOnePosition].classList.remove('dinosaur1')
                dinosaurOnePosition -= 1
                cells[dinosaurOnePosition].classList.add('dinosaur1')
              }

            }
          }

          // if Jeff's column is NOT higher than your current column (i.e. he is to the left of you)
          // see if you can move left, and do it if you can
        } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
          cells[dinosaurOnePosition].classList.remove('dinosaur1')
          dinosaurOnePosition -= 1
          cells[dinosaurOnePosition].classList.add('dinosaur1')

          // otherwise (can't move left), generate rando number
        } else {
          randomSelector = Math.floor(Math.random() * 2)
          console.log(randomSelector)

          if (randomSelector === 0) {
            // if you can, go right, otherwise go down
            if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
              cells[dinosaurOnePosition].classList.remove('dinosaur1')
              dinosaurOnePosition += 1
              cells[dinosaurOnePosition].classList.add('dinosaur1')
            } else {
              cells[dinosaurOnePosition].classList.remove('dinosaur1')
              dinosaurOnePosition += width
              cells[dinosaurOnePosition].classList.add('dinosaur1')
            }
          } else {
            //if you can go down, do, otherwise, go right
            if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
              cells[dinosaurOnePosition].classList.remove('dinosaur1')
              dinosaurOnePosition += width
              cells[dinosaurOnePosition].classList.add('dinosaur1')
            } else {
              cells[dinosaurOnePosition].classList.remove('dinosaur1')
              dinosaurOnePosition += 1
              cells[dinosaurOnePosition].classList.add('dinosaur1')
            }

          }
        }
      }
    }
  }, 300)

  // // if the cell ABOVE doesn't have a barrier...
  // if (!cells[dinosaurOnePosition - width].classList.contains('barrier')) {
  //   // move up
  //   cells[dinosaurOnePosition].classList.remove('dinosaur1')
  //   dinosaurOnePosition -= width
  //   cells[dinosaurOnePosition].classList.add('dinosaur1')

  //   // but if it does, then if the one to the RIGHT doesn't, move there
  // } else if (!cells[dinosaurOnePosition + 1].classList.contains('barrier')) {
  //   cells[dinosaurOnePosition].classList.remove('dinosaur1')
  //   dinosaurOnePosition += 1
  //   cells[dinosaurOnePosition].classList.add('dinosaur1')

  //   // but if THAT isn't free, move DOWN if that one is free
  // } else if (!cells[dinosaurOnePosition + width].classList.contains('barrier')) {
  //   cells[dinosaurOnePosition].classList.remove('dinosaur1')
  //   dinosaurOnePosition += width
  //   cells[dinosaurOnePosition].classList.add('dinosaur1')

  //   // finally otherwise, check the one to the LEFT (should always be free tbh)
  // } else if (!cells[dinosaurOnePosition - 1].classList.contains('barrier')) {
  //   cells[dinosaurOnePosition].classList.remove('dinosaur1')
  //   dinosaurOnePosition -= 1
  //   cells[dinosaurOnePosition].classList.add('dinosaur1')
  // }



  //end of setupGame
}




window.addEventListener('DOMContentLoaded', setupGame)