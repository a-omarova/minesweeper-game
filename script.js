const grid = document.querySelector('.grid')
const size = 16
const bombsCounter = 40
const fieldArray = []
const listLength = size * size


console.log(grid)

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min) // min included and max not included
}

function shuffle(array) {
    let m = array.length
    let t
    let i

    while (m) {
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }

    return array
}


function compareArrays(arr1, arr2) {
    let counter = 0

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                counter++
            }
        }
    }

    return counter
}


function generateMines() {
    const list = []

    function findRandom() {
        const random = randomIntFromInterval(0, listLength)

        if (list.indexOf(random) === -1) {
            return list.push(random)
        } else {
            findRandom()
        }
    }

    for (let i = 0; i < bombsCounter; i++) {
        findRandom()
    }

    return list
}

function generateField() {
    const mines = generateMines()

    fieldArray.length = listLength

    for (let i = 0; i < fieldArray.length; i++) {
        fieldArray[i] = {
            value: getCellValue(i, mines),
            isOpen: false
        }
    }

    return fieldArray
}

function getCellValue(index, mines) {
    if (mines.includes(index)) {
        return 'x'
    }

    const array = [];

    const topLeftCell = 0
    const topRightCell = size - 1
    const bottomLeftCell = listLength - size - 1
    const bottomRightCell = listLength - 1

    const cell_1 = index - size - 1
    const cell_2 = index - size
    const cell_3 = index - size + 1
    const cell_4 = size - 1
    const cell_6 = size + 1
    const cell_7 = index + size - 1
    const cell_8 = index + size
    const cell_9 = index + size + 1

    switch (index) {
        case index === topLeftCell:
            array.push(cell_6, cell_8, cell_9)
            break
        case index === topRightCell:
            array.push(cell_4, cell_7, cell_8)
            break
        case index === bottomLeftCell:
            array.push(cell_2, cell_3, cell_6)
            break
        case index === bottomRightCell:
            array.push(cell_1, cell_2, cell_4)
            break
        case index < size:
            array.push(cell_4, cell_6, cell_7, cell_8, cell_9)
            break
        case index % size === 0:
            array.push(cell_2, cell_3, cell_6, cell_8, cell_9)
            break
        case index % size === size - 1:
            array.push(cell_1, cell_2, cell_4, cell_7, cell_8)
            break
        case index > size - listLength:
            array.push(cell_1, cell_2, cell_3, cell_4, cell_6)
            break
        default:
            array.push(cell_1, cell_2, cell_3, cell_4, cell_6, cell_7, cell_8, cell_9)

    }

    console.log(array, mines, compareArrays(array, mines))

    return `${compareArrays(array, mines)}`
}

function generateGrid() {
    let content = ''

    generateField().forEach((cell, index) => {
        content += `<div class="cell" data-position=${index}>${cell.value}</div>`
    })

    grid.innerHTML = content

}

// console.log(generateField())

generateGrid()
