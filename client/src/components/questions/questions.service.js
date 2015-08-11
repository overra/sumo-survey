'use strict';

export default function QuestionsService($http, jwtHelper, $resource) {
  return $resource('/api/questions', {}, {
    random: {
      method: 'GET',
      url: '/api/questions/random'
    },
    list: {
      method: 'GET',
      url: '/api/questions',
      isArray: true
    },
    answer: {
      method: 'POST',
      url: '/api/questions/answer'
    }
  });
}

QuestionsService.$inject = ['$http', 'jwtHelper', '$resource'];
