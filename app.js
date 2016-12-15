
angular.module("CalApp",['ngMaterial']).controller('ctrl',function($scope){
    $scope.result;
    $scope.scientificresult='';
    $scope.input='';
    $scope.buttons=['1','2','3','4','5','6','7','8','9','0','+','*','-','/','.'];
    $scope.operator=['*','-','/'];
    $scope.otheroperatar=['^','(',')'];
    $scope.scientific=['log','In','tan','cos','sin','√','π','e'];
    $scope.isnotsymbol=isnotsymbol;
    
//  service worker code start........
    
    if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/seviceWorker.js', { scope: '/' })
          .then(function(registration) {
                console.log('Service Worker Registered');
          });

        navigator.serviceWorker.ready.then(function(registration) {
           console.log('Service Worker Ready');
        });
  }
    
// service worker code end ..........
    
    
//check symbol is number or operator.....
    
    function isnotsymbol(item){
        if(item==='+'|| item==='-'|| item==='*'|| item==='/' || item==='.' ) return 1
        else return 0;
    }
    
    function isscientific(item){
        if(item==='log'|| item==='In'|| item==='tan'|| item==='cos' || item==='sin' ) return 1
        else return 0;
    }
    
//main calculator code .........
    
    $scope.takeinput=function(button){
        if(button==='='){

            if($scope.scientifictrue){
                $scope.scientific.forEach(function(symbol){
                    if($scope.input.indexOf(symbol)!== -1){
                        
                        if(symbol==='√')  $scope.input=$scope.input.replace(new RegExp(symbol, 'g'), "Math.sqrt");
                        else if(symbol==='π') $scope.input=$scope.input.replace(new RegExp(symbol, 'g'), "Math.PI");
                        else if(symbol==='e') $scope.input=$scope.input.replace(new RegExp(symbol, 'g'), "Math.exp");
                        else if(symbol==='!') $scope.input=$scope.input.replace(new RegExp(symbol, 'g'), "Math.exp");
                        else $scope.input=$scope.input.replace(new RegExp(symbol, 'g'), "Math."+symbol)
                    }
                });
            }
            try{var result=eval($scope.input);}
            catch (e) { if (e) {$scope.input='Invalid Expression';return;} }
            
          $scope.input=result;
        }
        else {
                
                
            if(isnotsymbol(button)){
                if(isnotsymbol($scope.input[$scope.input.length-1])){
                    $scope.input=$scope.input.replace($scope.input[$scope.input.length-1],button);
                    return;
                }
            }
            
            $scope.input+=button;
        }
            
    }
});

