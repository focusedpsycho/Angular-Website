(function(){

var app= angular.module('PuchoModule', ['ui.bootstrap','ui.router','hl.css.ui.router','ui.carousel']);
app.config(RoutesConfig);


app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix(''); // by default '!'
  
}]);

app.run(function($trace) {
  $trace.enable('TRANSITION');
})

app.run(function($transitions,$rootScope,$timeout) {
  $transitions.onStart({ }, function(trans) {
    $rootScope.stateIsLoading=true;

    trans.promise.finally($rootScope.stateIsLoading=false);
  });
})

app.run(['Carousel', (Carousel) => {
  Carousel.setOptions({
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease',
    dots: false,
 
    easing: 'linear',
    fade: false,
    infinite: true,
    initialSlide: 1,
 
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  });
}]);


function SlideCtrl($scope) {
  var ctrl=this;

 ctrl.myInterval = 3000;
 ctrl.slides = [];
  ctrl.addSlide = function(i) {
    
    ctrl.slides.push({
     index:(i+1),
      productName: 'product '+(i+1),
      description:  'good product',
        id:i 
    });
  };
  for (var i=0; i<3; i++) {
    ctrl.addSlide(i);
  }


}


RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  
$urlRouterProvider.otherwise('/');
  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('/home', {
    url: '/',
    views:{ "top":{
    templateUrl: 'views/home1.html'

   
  },

    "center":{
    templateUrl: 'views/home.html'}

  },
     data: {
          css: 
            'PartialStyles/index2.css'
           
          
        }
        ,
        resolve:{
          promiseObj:  function($http){
          
            // $http returns a promise for the url data
         return   $http({method: 'GET', url: '/'}).then(function(response){
                   return response.data;
            },
            function(response)
            {
              return "error";
            });


         }
        }
    
  })

  // Premade list page
  .state('/Products', {
    url: '/Products',
       views:{ "top":{
    templateUrl: 'views/product1.html',
   controller: SlideCtrl,
   controllerAs: 'ctrl',
  },

    "center":{
    templateUrl: 'views/products.html'}

  },
        data: {
    css: 'PartialStyles/products.css'
  }
  ,
     resolve:{
          promiseObj:  function($http){
          
            // $http returns a promise for the url data
         return   $http({method: 'GET', url: '#/Products'}).then(function(response){
                   return response.data;
            },
            function(response)
            {
              return "error";
            });


         }
        }
  })
   .state('/Solutions', {
    url: '/Solutions',
       views:{ "top":{
    templateUrl: 'views/solutions1.html'},

    "center":{
    templateUrl: 'views/solutions.html'},
    controller: SolutionCtrl,
    controllerAs: 'Sctrl'

  },
        data: {
    css: 'PartialStyles/solutions.css'
  }
  ,
    resolve:{
          promiseObj:  function($http,$timeout){
          
            // $http returns a promise for the url data
         return  {view1: $http({method: 'GET', url: '/Angular-shift/views/solutions.html'}).then(function(response){
          console.log(response.data);
                   return response.data;
            },
            function(response)
            {
              return "error";
            })
         ,
            view2: $http({method: 'GET', url: '/Angular-shift/views/solutions1.html'}).then(function(response){
          console.log(response.data);
                   return response.data;
            },
            function(response)
            {
              return "error";
            })
         ,



         }
        }
      }
  })

  // Item detail
  .state('/Careers', {
    url: '/Careers',
       views:{ "top":{
    templateUrl: 'views/career1.html'},

    "center":{
    templateUrl: 'views/careers.html'}

  },
        data: {
    css: 'PartialStyles/careers.css'
  }
  ,

  })


    .state('/About', {
    url: '/About',
       views:{ "top":{
    templateUrl: 'views/about1.html'},

    "center":{
    templateUrl: 'views/about.html'}

  },
        data: {
    css: 'PartialStyles/about.css'
  }
  ,
  resolve:{
    promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '#/About'});
         }
  }
  })

      .state('/Contact', {
    url: '/Contact',
       views:{ "top":{
    templateUrl: 'views/contact1.html'},

    "center":{
    templateUrl: 'views/contact.html'}

  },
        data: {
    css: 'PartialStyles/contact.css'
  }
  ,
  resolve:{
    promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '#/Contact'});
         }
  }
  })


           .state('/Services/Agriculture', {
    url: '/Services/Agriculture',
       views:{ "top":{
    templateUrl: 'views/Services/Agriculture1.html'},

    "center":{
    templateUrl: 'views/Services/Agriculture.html'}

  },
        data: {
    css: 'PartialStyles/ServicePartialStyles/Agriculture.css'
  }
  ,
  resolve:{
    promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '#/Services/Agriculture'});
         }
  }
  })

    .state('/Services/AutonomousDriving', {
    url: '/Services/AutonomousDriving',
       views:{ "top":{
    templateUrl: 'views/Services/AutonomousDriving1.html'},

    "center":{
    templateUrl: 'views/Services/AutonomousDriving.html'}

  },
        data: {
    css: 'PartialStyles/ServicePartialStyles/AutonomousDriving.css'
  }
  ,
  resolve:{
    promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '#/Services/AutonomousDriving'});
         }
  }
  })

        .state('/Services/Banking', {
    url: '/Services/Banking',
       views:{ "top":{
    templateUrl: 'views/Services/Banking1.html'},

    "center":{
    templateUrl: 'views/Services/Banking.html'}

  },
        data: {
    css: 'PartialStyles/ServicePartialStyles/Banking.css'
  }
  ,
  resolve:{
    promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '#/Services/Banking'});
         }
  }
  })

            .state('/Services/Blockchain', {
    url: '/Services/Blockchain',
       views:{ "top":{
    templateUrl: 'views/Services/Blockchain1.html'},

    "center":{
    templateUrl: 'views/Services/Blockchain.html'}

  },
        data: {
    css: 'PartialStyles/ServicePartialStyles/Blockchain.css'
  }
  ,
  resolve:{
    promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '#/Services/Blockchain'});
         }
  }
  })

                .state('/Services/FMCG', {
    url: '/Services/FMCG',
       views:{ "top":{
    templateUrl: 'views/Services/FMCG1.html'},

    "center":{
    templateUrl: 'views/Services/FMCG.html'}

  },
        data: {
    css: 'PartialStyles/ServicePartialStyles/FMCG.css'
  }
  ,
  resolve:{
    promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '#/Services/FMCG'});
         }
  }
  })

      .state('/Services/Travel', {
    url: '/Services/Travel',
       views:{ "top":{
    templateUrl: 'views/Services/travel1.html'},

    "center":{
    templateUrl: 'views/Services/travel.html'}

  },
        data: {
    css: 'PartialStyles/ServicePartialStyles/Travel.css'
  }
  ,
  resolve:{
    promiseObj:  function($http){
            // $http returns a promise for the url data
            return $http({method: 'GET', url: '#/Services/Travel'});
         }
  }
  })

}


app.directive('changeClassOnScroll', function ($window) {
  return {
    restrict: 'A',
    scope: {
        offset: "@",
        scrollClass: "@"
    },
    link: function(scope, element) {
         console.log(scope.navCollapsed);
          angular.element($window).bind('resize', function(){
           scope.windowWidth = $window.innerWidth;


          
});
        angular.element($window).bind("scroll", function() {


            if (this.pageYOffset >= parseInt(scope.offset)) {
                element.addClass(scope.scrollClass);
            } else {
                element.removeClass(scope.scrollClass);
            }

            scope.$digest();
        });
    }
  };
});


app.controller('NavItemsController', NavitemObject);

function NavitemObject()
{

  var navs=this;

  navs.hover=[false,false,false,false,false];

  navs.products=[];

  for(var i=0;i<5;i++)
    navs.products[i]='product '+(i+1);

  navs.solutions=['Agriculture',
'Blockchain',
'AutonomousDriving',
'FMCG',
'Banking',
'Travel',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--',
'--will be up--']



}

app.controller('footerController', footerFunction);

function footerFunction(){

  var footer=this;

  footer.tabs=['Products', 'Solutions', 'Careers', 'About', 'Contact', 'Blog'];

  footer.icons=[['Facebook', 'facebook'],['Twitter','twitter'],['Google','google'],['Instagram','instagram']];
}
app.controller('switchDiv', switcherfunc);

switcherfunc.$inject=['$interval'];

function switcherfunc($interval){

var switch1=this;


switch1.shower=true;

$interval(function(){
  switch1.shower =!switch1.shower;

},3000);


}



function SolutionCtrl()
{
  var Sctrl=this;
  var list=[[{heading:''}]]
}
})()



