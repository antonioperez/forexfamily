(function () {

  angular
    .module('app')
    .controller('GSPCtrl', Ctrl);
    
    function Ctrl () {
      var vm = this;

      vm.faqIndex = 0;
      vm.questionIndex = 0;


      vm.questions = [
        {
          title: 'Decision To Become A GSP',
          info: 'What was your groundwater usage?',
          template: function () {
            return 'components/gsp/start-gsa.html';
          }
        }
      ];

      vm.faqs = [
        {
          question: 'What is GSP?',
          answer: '"Local agency" means a local public agency that has water supply, water management, or land use responsibilities within a groundwater basin.'
        }
      ]
    }

})();