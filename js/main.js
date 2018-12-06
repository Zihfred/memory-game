let images = [
    'img/Amy.jpg',
    'img/Bender.png',
    'img/Fry.png',
    'img/Hubert.jpg',
    'img/Zapp.jpg',
    'img/Zoidberg.png',
];

function randomArr(arr) {
    arr.sort(function () {
        return 0.5 - Math.random();
    });
    return arr;
}

class Game {

    constructor(images) {
        this.form = document.querySelector('#Game');
        this.cardItems = document.getElementsByClassName('cardItem');
        this.cardsNumber = 6;
        this.imageArr = images;
        this.cards = [];
        this.canRotate = 2;
        this.collisionToWin = 6;
        this.initGame();
        this.moves = [];
        this.checkCollision = this.checkCollision.bind(this);
        this.rotateCard = this.rotateCard.bind(this);
        this.addEventListeners();
    }

    initGame() {
        this.render();
        console.log(this.cardItems);
    }

    render() {
        this.imageArr = this.imageArr.concat(this.imageArr);
        randomArr(this.imageArr);
        for (let i = 0; i < this.cardsNumber * 2; i++) {
            this.cards.push(new Card(this.imageArr[i]));
        }
        for (let i = 0; i < this.cardsNumber * 2; i++) {
            let cardItem = document.createElement('div');
            cardItem.classList.add('cardItem');
            let cardImage = document.createElement('img');
            cardImage.setAttribute('src', this.cards[i].img);
            cardItem.appendChild(cardImage);
            this.form.appendChild(cardItem);
        }
    }

    rotateCard(e) {

        let clickedItem = e.target.closest('div');
        this.moves.push(clickedItem);
        if (this.canRotate > 0) {
            this.canRotate--;
            clickedItem.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                this.rotateCardFront(clickedItem);
            }, 500);
        }
    }

    rotateCardFront(clickedItem) {
        clickedItem.children[0].style.visibility = 'visible';
        setTimeout(() => {
            this.rotateCardBack(clickedItem);
        }, 1500);
    }

    rotateCardBack(clickedItem) {
        clickedItem.style.transform = 'rotateY(0deg)';
        clickedItem.children[0].style.visibility = 'hidden';
        setTimeout(() => {
            this.canRotate++;
        }, 1000);
    }

    checkCollision() {
        let nowMoveImg = 'now';
        let prevMoveImg = 'prev';
        if (this.moves.length >= 2) {
            nowMoveImg = this.moves[this.moves.length - 1]
                .querySelector('img')
                .getAttribute('src');

            prevMoveImg = this.moves[this.moves.length - 2]
                .querySelector('img')
                .getAttribute('src');
        }
        if (nowMoveImg.toString() === prevMoveImg.toString() &&
            (this.moves[this.moves.length - 1] !== this.moves[this.moves.length - 2])) {
            this.rotateCardFront(this.moves[this.moves.length - 1]);
            this.moves[this.moves.length - 1].style.visibility = 'hidden';
            this.moves[this.moves.length - 2].style.visibility = 'hidden';
            this.collisionToWin--;
        }
        if (this.collisionToWin === 0) {
            setTimeout(function () {
                alert('You Win');
            }, 2000);
        }
    }

    addEventListeners() {
        for (let i = 0; i < this.cardItems.length; i++) {
            this.cardItems[i].addEventListener('click', this.rotateCard);
            this.cardItems[i].addEventListener('click', this.checkCollision);
        }
    }
}

class Card {
    constructor(img) {
        this.img = img;
    }
}


new Game(images);

