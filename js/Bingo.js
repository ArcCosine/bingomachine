(function(){
  'use strict';
    function Bingo(num){
        this.init(num);
    }

    Bingo.prototype = {
        init: function(num){
            // create bingo array
            this.bingoArray = Array.from(Array(num+1).keys()).slice(1);

            // initialize value
            this.timer = null;
            this.isPlaying = false;
            // selected bingonumber
            this.bingoNum  = 0;

            // get elements
            this.leftPanel = document.getElementById("left-panel");
            this.rightPanel = document.getElementById("right-panel");
            this.stopButton = document.getElementById("stop-btn");
            this.spinButton = document.getElementById("spinButton");

            // sound manager
            this.soundManager = this.getSoundObject();

            // do event
            this.renderBingo();
            this.bindEvent();
        },
        renderBingo: function(){
            var fragment= document.createDocumentFragment();
            var _self = this;
            var divWrapper;
            this.bingoArray.forEach(function(elem, index){
                if( index % 15 === 0 ){
                    divWrapper = fragment.appendChild(document.createElement("div"));
                }
                var numDiv = divWrapper.appendChild(document.createElement("div"));
                numDiv.className = "bingo";
                numDiv.textContent = _self.showNumber(elem);
            });
            document.getElementById("result").appendChild(fragment);
        },
        bindEvent: function(){
            var _self = this;
            this.spinButton.addEventListener("click", function(){ _self.clickSpin(); }, false );
            this.stopButton.addEventListener("click", function(){ _self.stopSlot(); }, false );
        },
        clickSpin: function(){
            if (this.isPlaying || this.bingoArray.length === 0){
                return;
            }
            this.soundManager.playDrum();

            this.isPlaying = true;
            this.spinButton.className = "inactive";
            this.stopButton.className = "btn";

            var _self = this;
            this.timer = setInterval( function(){ _self.showRandom(); } , 25 );
        },
        showRandom: function(){
            this.bingoNum = Math.floor(Math.random() * this.bingoArray.length);
            var showText = this.showNumber(this.bingoArray[this.bingoNum]);
            this.leftPanel.textContent = showText.substr(0,1);
            this.rightPanel.textContent = showText.substr(1,2);
        },
        showNumber: function(number){
            return (number < 10 ? "0" : "") + number;
        },
        stopSlot: function(){
            if (!this.isPlaying){
                return;
            }
            this.stopButton.className = "btn inactive";

            this.soundManager.stopDrum();
            this.soundManager.playCymbal();

            clearInterval(this.timer);

            // change color
            var bingoDiv = document.querySelectorAll(".bingo");
            var tBingo = this.bingoArray[this.bingoNum]-1;
            bingoDiv[tBingo].textContent = this.showNumber(this.bingoArray[this.bingoNum]);
            bingoDiv[tBingo].className = "bingo unmatched";

            // delete selected number
            this.bingoArray.splice(this.bingoNum,1);

            // init
            this.isPlaying = false;
            this.timer = null;
            this.spinButton.className = "";

        },
        getSoundObject: function(){
            var drum = document.getElementById("audio_drum");
            var cymbal = document.getElementById("audio_cymbal");
            return {
                playDrum    : playDrum,
                stopDrum    : stopDrum,
                playCymbal  : playCymbal
            };


            function playDrum(){
                if(drum === null){
                    return;
                }
                drum.currentTime = 0;
                drum.play();
            }

            function stopDrum(){
                if(drum === null){
                    return;
                }
                drum.pause();
            }

            function playCymbal(){
                if(cymbal === null){
                    return;
                }
                cymbal.currentTime = 0;
                cymbal.play();
            }
        }
    }

    // start 75
    new Bingo(75);

})();
