'use strict';

export default class HomeController {
  constructor() {
    this.question = {
      question: 'What is your favorite color?',
      answers: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Other'
      ]
    };
  }
}

HomeController.$inject = [];
