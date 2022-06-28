const keyboard = document.getElementById('keyboard');
const gridColors = document.getElementById('gridColors');
const keyboardLetters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
];
const word = ['t', 'e', 's', 't'];
const ROW_LIMIT = 6;
let answer = [];
let positions = [];
let attempts = 0;


word.map((letters, index) => {
    const list = document.createElement('ul');
    list.classList.add('column');
    for (let row = 0; row < ROW_LIMIT; row++) {
        const li = document.createElement('li');
        li.classList.add('row');
        li.id = `${index}-${row}`;
        list.appendChild(li);     
    } 
    gridColors.appendChild(list);
})

keyboardLetters.map(letters => {
    const list = document.createElement('ul');
    letters.map(letter => {
        const li = document.createElement('li');
        switch(letter) {
            case 'ENTER':
                li.innerHTML = `<button onclick="checkButton()" id="${letter}">${letter}</button>`;
                break;
            case 'DELETE':
                li.innerHTML = `<button onclick="deleteButton()" id="${letter}">${letter}</button>`;
                break;
            default:
                li.innerHTML = `<button onclick="pressButton()" id="${letter}">${letter}</button>`;
                break;
        };
        list.appendChild(li);
    })
    keyboard.appendChild(list);
});


const reset = (arr) => {
    arr.map(letters => {
        letters.map(letter => {
            const button = document.getElementById(letter);
            button.disabled = true;
        }
        )
    });
    setTimeout(() => {
        word.map((letters, column) => {
            arr.map(letters => {
                letters.map(letter => {
                    const button = document.getElementById(letter);
                    button.disabled = false;
                }
                )
            });
            for (let row = 0; row < ROW_LIMIT; row++) {
                const cell = document.getElementById(`${column}-${row}`);
                cell.textContent = ' ';
                cell.classList.remove('correct', 'close', 'wrong');    
            } 
        })
        answer = [];
        positions = [];
        attempts = 0;
    }
    , 1500);
}

const pressButtonClass = (button) => {    
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 150);
};

const pressButton = () => {
    const button = document.getElementById(event.target.id);
    const cell = document.getElementById(`${answer.length}-${attempts}`);
    pressButtonClass(button);
    if (answer.length < word.length) {
        cell.textContent = button.textContent;
        answer.push(button.id);
    } else {
        alert('You have already finished the word');
    }
};

const checkButton = () => {  
    if (answer.length === word.length) {
        const button = document.getElementById(event.target.id);           
        pressButtonClass(button);
        answer.map((letter, index) => {
            if (letter === word[index].toUpperCase()) {
                positions.push('correct');
            } else if (word.includes(letter.toLowerCase())) {
                positions.push('close');
            } else {
                positions.push('wrong');
            }
        }
        );
        positions.map((color, id) => {
            const cell = document.getElementById(`${id}-${attempts}`);
            cell.classList.add(color);
        });

        if (answer.join('') === word.join('').toUpperCase()) {
            alert('You have won');
            return reset(keyboardLetters);
        };

        attempts++;   
        if (attempts === ROW_LIMIT) {
            alert('You have used all your attempts D:');  
            return reset(keyboardLetters);
        } 
        answer = [];
        positions = [];
    } else {
        alert(`You need to finish the word, ${word.length - answer.length} letters missing`);
    };
};

const deleteButton = () => {
    const button = document.getElementById(event.target.id);
    const cell = document.getElementById(`${answer.length-1}-${attempts}`);
    pressButtonClass(button);
    if (answer.length === 0) return alert('Please press a letter first');
    cell.textContent = ' ';
    answer.pop();
}