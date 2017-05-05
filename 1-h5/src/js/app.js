var timer;
var countOnComplete;
var clickArr = [true,true,true]

function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var app = new Vue({
    el: '#el',
    data: {
        totalClick: 0,
        counter: 0,
        stage: [
            false,
            false,
            false
        ],
        playStatus: false
    },
    methods: {
        countDown:function(secs,callback){
            var vm = this
            vm.counter = secs;
            vm.counter--;
            if(vm.counter == 0) {
                clearTimeout(vm.timer);
                vm.timer = null;
            }
            else {
                vm.timer = setTimeout(function(){
                    vm.countDown(vm.counter,countOnComplete)
                }, 1000);
            }
            if (callback && typeof(callback) === "function") {
                callback();
            }
        },
        play:function(stageNum){
            var vm = this;
            if (!vm.playStatus) {
                vm.playStatus=true
                countOnComplete = null;
                countOnComplete = function(){
                    if(vm.counter==0){
                        vm.stage[0] = !vm.stage[0];
                        vm.playing();
                    }
                }
                vm.countDown(4,countOnComplete);
            }
            
        },
        playing:function(){
            var vm = this;
            countOnComplete = null;

            countOnComplete = function(){
                var dClickArea = $('.click__area');
                var hasChange = getRandomInt(0,1);
                var indexChange = getRandomInt(0,2);

                if(vm.counter==0){
                    vm.stage[0] = !vm.stage[0];
                    vm.playStatus=false;
                    clickArr = [true,true,true];
                    $(dClickArea).show();
                    alert('本次總點擊數'+vm.totalClick)
                    vm.totalClick=0
                }
                else {
                    if(hasChange) {
                        if(clickArr[indexChange]) {
                            $(dClickArea[indexChange]).hide();
                        }
                        else {
                            $(dClickArea[indexChange]).show();
                        }
                        clickArr[indexChange]=!clickArr[indexChange];
                    }
                }
                
            }
            vm.countDown(16,countOnComplete);
        }
    },
    mounted: function () {
    }
});
