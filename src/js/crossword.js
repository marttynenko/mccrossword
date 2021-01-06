const Words = [
  {id:1,direction:"vertical",word:"терияки",question:"Японский соус для курочки",cross_origin:"2,6",cross_siblings:"2_1,3_1"},
  {id:2,direction:"horizontal",word:"крылышки",question:"У курицы их двое, а у нас в коробке 3 или 5 штук",cross_origin:"1",cross_siblings:"1_2"},
  {id:3,direction:"horizontal",word:"чикенбургер",question:"Что за бургер?<br/>Куриная котлета в панировке, булочка, свежий салат и специальный соус!",cross_origin:"1,4,7,9",cross_siblings:"1_6,5_2,7_2,6_7"},
  {id:4,direction:"horizontal",word:"чиккер",question:"Новый куриный бургер необычной формы",cross_origin:"5",cross_siblings:"5_4"},
  {id:5,direction:"vertical",word:"панировка",question:"Хрустящая «одежка» наших куриных продуктов",cross_origin:"2,4",cross_siblings:"3_4,4_5"},
  {id:6,direction:"vertical",word:"макнаггетс",question:"Эти кусочки бывают четырех форм: кружочек, колокольчик, сапожок и косточка. Угадаете, что это?",cross_origin:"7",cross_siblings:"3_9"},
  {id:7,direction:"vertical",word:"стрипсы",question:"Как по-другому назвать наши «куриные полосочки»?",cross_origin:"2",cross_siblings:"3_7"}
];

const CW = new Vue({
  el: '#crossword',
  data: {
    // urlToWords: './data/words.json',
    words: Words,
    current: {
      id: '1',
      word: ''
    },
    isWin: false,
    isHint: false,
    isSended: false
  },
  methods: {
    keyDown(e) {
      const input = e.target

      if (e.keyCode == 8 || e.which == 8 && input.value == '') {
        if (input.previousElementSibling) {
          input.previousElementSibling.focus()
        }
      }
      if (e.code === 'Enter' && input.value != '') {
        if (input.nextElementSibling) {
          input.nextElementSibling.focus()
        }
      }
    },
    fillWord(e) {
      const input = e.target
      const parent = input.parentNode

      // console.log(e, e.inputType == "deleteContentBackward");

      parent.classList.add('active')

      if (this.current.id !== input.dataset.parent) {
        document.querySelector(`#cw-word-${this.current.id}`).classList.remove('active');
      }

      this.current.id = input.dataset.parent

      if (input.value != '') {
        this.nextLetter(input,parent);
      }

      this.checkWord(this.current.id);
      this.cross(parent);
    },
    //следующая свободная ячейка
    nextLetter(current,parent) {
      let letters = parent.querySelectorAll('input');
      let index = +current.dataset.index;

      for (var i=index; i<letters.length; i++) {
        if (letters[i].value == '') {
          letters[i].focus();
          break;
        }
      }
    },
    //заполняем пересечения слов
    cross(wordNode) {
      const origin = wordNode.dataset.co.split(',')
      const siblings = wordNode.dataset.cs.split(',');
      origin.forEach((el,index) => {
        let input = wordNode.querySelector(`[data-index="${el}"]`);
        let sibling = document.querySelector(`.cw-letter[data-id="${siblings[index]}"]`)
        if (input.value != '') {
          sibling.value = input.value;
        }
      })
    },
    checkWord(wordId) {
      const parent = document.querySelector(`#cw-word-${wordId}`);
      let word = '';
      //перебираем все инпуты, формируем слово
      document.querySelectorAll(`#cw-word-${wordId} input`)
        .forEach((el) => {
          word += el.value.trim().toLowerCase();
        })
      
      this.current.word = word

      //проверяем совпадают ли слова
      const answerArr = this.words.filter(function(item){
        return item.id == wordId;
      });
      const answer = answerArr[0].word.trim().toLowerCase();

      if (this.current.word === answer) {
        this.isHint = false;
        parent.classList.add('correct');
        parent.classList.remove('incorrect');

        if (this.words.length === document.querySelectorAll('.cw-word.correct').length) {
          this.isWin = true
        } else {
          this.isWin = false
        }
      } else {
        parent.classList.remove('correct');
        if (this.current.word.length === answer.length) {
          parent.classList.add('incorrect');
        } else {
          parent.classList.remove('incorrect');
        }
        
      }
    },
    showHint(e) {
      this.current.id = e.target.dataset.parent
      //отображаем подсказку
      this.isHint = true
    },
    currentQuestion() {
      return this.words.filter((el) => 
        el.id === +this.current.id
      )
    },
    /* getWords() {
      fetch(this.urlToWords)
        .then(response => response.json())
        .then(item => {
          this.words = item
        })
        .catch(error => {
          console.log(error)
        });
    } */
  },
  computed: {
    horizontalQuestions() {
      if (this.words) {
        return this.words.filter(function(item){
          return item.direction === 'horizontal'
        })
      }
    },
    verticalQuestions() {
      if (this.words) {
        return this.words.filter(function(item){
          return item.direction === 'vertical'
        })
      }
    }
  },
  mounted () {
    //this.getWords();
    if (document.querySelector('.cw-hidden.hidden')) {
      document.querySelectorAll('.cw-hidden.hidden').forEach(el=>{
        el.classList.remove('hidden')
      })
    }
    
  }
})