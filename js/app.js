function loadGame() {
  startButton.addEventListener('click', () => {
    setupGame()
  })
}

//list of tasty bugs
// livesDisplay isn't updating with hearts - works with numbers, hearts update if I update line 23, but not sure yet why it isn't updating when the code runs
// Need to now repeat flashing dino logic x4 -- search doc for dinosaur1 and find places to update. consider using switch statements???



function setupGame() {
  const width = 18
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let jeffPosition = 242
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

  // Setting up the board


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === jeffPosition) {
      cell.classList.add('jeff')
    } else if (i === 134) {
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur1')
    } else if (i === 135) {
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur2')
    } else if (i === 152) {
      cell.classList.add('holdingarea')
      cell.classList.add('dinosaur3')
    } else if (i === 153) {
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
      })
      //logic for what happens if you catch a dinosaur when it's flashing!
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
  const intervalId = setInterval(() => {
    cells.forEach((cell) => {
      if (cell.classList.contains('dinosaur')) {
        // let currentDinosaurCell = cells[cell]
        console.log(cell)
        // cell.classList.remove('dinosaur')
        // cells[cell + 1].classList.add('dinosaur')
      }
    })
  }, 500)


  //end of setupGame
}




window.addEventListener('DOMContentLoaded', setupGame)