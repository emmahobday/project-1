function loadGame() {
  startButton.addEventListener('click', () => {
    setupGame()
  })
}


function setupGame() {
  const width = 18
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let jeffPosition = 242
  const barriersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 27, 35, 36, 38, 39, 40, 41, 42, 44, 45, 47, 48, 49, 50, 51, 53, 54, 56, 57, 58, 59, 60, 62, 63, 65, 66, 67, 68, 69, 71, 72, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 114, 119, 125, 126, 127, 128, 129, 130, 132, 134, 135, 137, 139, 140, 141, 142, 143, 152, 153, 162, 163, 164, 165, 166, 168, 173, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 206, 207, 215, 216, 218, 219, 220, 222, 224, 225, 227, 229, 230, 231, 233, 234, 236, 237, 238, 240, 245, 247, 248, 249, 251, 252, 258, 259, 260, 261, 262, 263, 269, 270, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 287, 288, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323]
  const specialArray = [34, 115, 199, 214]
  const holdingArea = [134, 135, 152, 153]
  const scoreDisplay = document.querySelector('#score')
  const livesDisplay = document.querySelector('#lives')
  let score = 0
  let lives = 3
  // write some logic to link hearts and numbers - look at asterisk work!
  const startButton = document.querySelector('startbutton')

  // Setting up the board

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === jeffPosition) {
      cell.classList.add('jeff')
    } else if (holdingArea.includes(i)) {
      cell.classList.add('barrier')
      cell.classList.add('dinosaur')
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

  // TEST DINOSAUR
  cells[199].classList.add('dinosaur')

  // Controlling Jeff Goldblum
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (jeffPosition === 161) {
        cells[jeffPosition].classList.remove('jeff')
        jeffPosition = 143
        cells[jeffPosition].classList.add('jeff')
      } else if (jeffPosition === cells.length - 1 || jeffPosition % width === width - 1 || cells[jeffPosition + 1].classList.contains('barrier')) {
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
      } else if (jeffPosition === 0 || jeffPosition % width === 0 || cells[jeffPosition - 1].classList.contains('barrier')) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition -= 1
      cells[jeffPosition].classList.add('jeff')

    } else if (event.key === 'ArrowUp') {
      if (jeffPosition < width || cells[jeffPosition - width].classList.contains('barrier')) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition -= width
      cells[jeffPosition].classList.add('jeff')

    } else if (event.key === 'ArrowDown') {
      if (jeffPosition > cells.length - width - 1 || cells[jeffPosition + width].classList.contains('barrier')) {
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
      scoreDisplay.innerHTML = `Score: ${score}`
    }
    // logic for hitting the special egg!
    if (cells[jeffPosition].classList.contains('special')) {
      cells[jeffPosition].classList.remove('special')
      score += 1000
      scoreDisplay.innerHTML = `Score: ${score}`
      // and here we make the dinosaurs flash and retreat
      cells.forEach((cell) => {
        if (cell.classList.contains('dinosaur')) {
          cell.classList.remove('dinosaur')
          cell.classList.add('flashingDino')
          setTimeout(() => {
            console.log('flashing dinosaurs lol')
            cells.forEach((cell) => {
              if (cell.classList.contains('flashingDino')) {
                cell.classList.remove('flashingDino')
                cell.classList.add('dinosaur')
              }
            })
          }, 5000)
        }
      })
      //now we should write some logic for what happens if you catch a dinosaur!
      if (cells[jeffPosition].classList.contains('flashingDino')) {
        cells[jeffPosition].classList.remove('flashingDino')
        setTimeout(() => {
          //update this line below - where caught dino reappears (this is test cell)
          cells[304].classList.add('dinosaur')
        }, 3000)
        
        lives += 1
      }

    }
    // logic for hitting a dinosaur
    if (cells[jeffPosition].classList.contains('dinosaur')) {
      cells[jeffPosition].classList.remove('jeff')
      cells[jeffPosition].classList.remove('dinosaur')
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




  //end of setupGame
}




window.addEventListener('DOMContentLoaded', setupGame)