const POKEMON = {
    eevee: {
        weight: 2,
        probability:0.1
    },
    mew: {
        weight: 2,
        probability:0.1
    },
    pikachu: {
        weight: 2,
        probability:0.1
    },
    bullbasaur: {
        weight: 2,
        probability:0.1
    },
    squirtle: {
        weight: 2,
        probability:0.1
    },
    charmander: {
        weight: 2,
        probability:0.1
    },
    snorlax: {
        weight: 2,
        probability:0.1
    },
    meowth: {
        weight: 2,
        probability:0.1
    },
    psyduck: {
        weight: 2,
        probability:0.1
    },
}

const POKEMON_LIST = Object.keys( POKEMON );

const spin_button = document.querySelector('[data-spin-button]');
const slot_items = document.querySelector('[data-slot-list]').children;
const vault_value = document.querySelector('[data-vault-value]');
const spin_value = document.querySelector('[data-spin-value]');
const popup_profile = document.querySelector('[data-profile-popup]');
const popup_transfer = document.querySelector('[data-transfer-popup]');
const blur = document.querySelector('[data-main-blur]');

const button_profile = document.querySelector('[data-button-profile]');
const button_transfer = document.querySelector('[data-button-transfer]');

const FADE_OUT_CLASS = 'fade_out';
const FADE_IN_CLASS = 'fade_in';
var SCORE_COUNTER = 1;
const SCORE_COUNTER_MAX = slot_items.length;
const SPIN_COST = 2;

var is_spinning = false;


blur.addEventListener('click', e => {
    if(e.target == blur) {
        blur.classList.remove('visible');
    }
});

spin_button.addEventListener('click', spin);
for(var i=0; i<slot_items.length; i++) {
    addTransitionEndListener(slot_items[i].firstElementChild);
}

button_profile.addEventListener('click', function(event) {
    popup_profile.classList.add('visible');
    popup_transfer.classList.remove('visible');
    blur.classList.add('visible');
})

button_transfer.addEventListener('click', function(event) {
    popup_transfer.classList.add('visible');
    popup_profile.classList.remove('visible');
    blur.classList.add('visible');
});

function addTransitionEndListener(item) {
    item.addEventListener('transitionend', transitionEndHandler);
}

function calculateScore() {
    var temp_src = slot_items[0].firstElementChild.src;
    let temp_score = 2;
    let temp_total = 0;

    for(var i=1; i<slot_items.length; i++) {
        if(temp_src === slot_items[i].firstElementChild.src) {
            temp_score = temp_score * 2;
        } else if(temp_score > 2) {
            temp_total = temp_total + temp_score; //TODO: * pokemon_weight
            temp_score = 2;
        }
        temp_src = slot_items[i].firstElementChild.src
    }
    return temp_score > 2 ? temp_score + temp_total : temp_total;
}

function canSpin() {
    return !is_spinning;
}

function clearPopup() {
    popup.innerHTML = "";
}

function getPokemonImage() {
    let index = Math.floor(Math.random()*(POKEMON_LIST.length));
    return POKEMON_LIST[index];
}

function notifySpinEnd() {
    if(SCORE_COUNTER===SCORE_COUNTER_MAX) {
        spinEnd();
    } else {
        SCORE_COUNTER = SCORE_COUNTER+1;
    }
}

function spin(event) {
    if(canSpin()) {
        is_spinning = true;
        for(var i=0; i<slot_items.length; i++) {
            slot_items[i].firstElementChild.counter = 10 - Math.floor(Math.random()*8);
            slot_items[i].firstElementChild.classList.add('fade_out');
        }
    }
}

function spinEnd() {
    let score = calculateScore();
    spin_value.textContent = score;
    vault_value.textContent = score;
    SCORE_COUNTER = 1;
    is_spinning = false;
}

function transitionEndHandler(event) {
    let el = event.target;

    if(el.classList.contains('fade_out')) {
        el.classList.remove('fade_out');
        setImage(el);
        el.classList.add('fade_in');
    } else if(el.classList.contains('fade_in')) {
        el.classList.remove('fade_in');
        if(el.counter) {
            el.counter--;
            el.classList.add('fade_out');
        } else {
            notifySpinEnd();
        }
    }
}

function setImage(element) {
    element.src = '/images/pokemons/' + getPokemonImage() +'.svg';
}
