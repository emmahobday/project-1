function setupGame() {
  const width = 18
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let jeffPosition = 3

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === jeffPosition) {
      cell.classList.add('jeff')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }

  document.addEventListener('keydown', (event) => {
    console.log(event.key)
    if (event.key === 'ArrowRight') {
      if (jeffPosition === cells.length - 1 || jeffPosition % width === width - 1) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition += 1
      cells[jeffPosition].classList.add('jeff')
    } else if (event.key === 'ArrowLeft') {
      if (jeffPosition === 0 || jeffPosition % width === 0) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition -= 1
      cells[jeffPosition].classList.add('jeff')
    } else if (event.key === 'ArrowUp') {
      if (jeffPosition < width) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition -= width
      cells[jeffPosition].classList.add('jeff')
    } else if (event.key === 'ArrowDown') {
      if (jeffPosition > cells.length - width - 1) {
        return
      }
      cells[jeffPosition].classList.remove('jeff')
      jeffPosition += width
      cells[jeffPosition].classList.add('jeff')
    }


  })








}

window.addEventListener('DOMContentLoaded', setupGame)