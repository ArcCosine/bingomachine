(function(){
  'use strict';

    //ビンゴの数字の数 5×5 = 75
    var Bingo = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                   '11','12', '13', '14', '15', '16', '17', '18', '19', '20',
                   '21','22', '23', '24', '25', '26', '27', '28', '29', '30',
                   '31','32', '33', '34', '35', '36', '37', '38', '39', '40',
                   '41','42', '43', '44', '45', '46', '47', '48', '49', '50',
                   '51','52', '53', '54', '55', '56', '57', '58', '59', '60',
                   '61','62', '63', '64', '65', '66', '67', '68', '69', '70',
                   '71','72', '73', '74', '75'];

    var timer = null;
    var isPlaying = false;

    //乱数によってセレクトされた数字
    var bingoNum = 0;

    //bingoNumでセレクトされた数字をBingo配列から削除する変数
    var delBingoNum = 0;

    var panel1 = document.getElementById('panel1');
    var panel10 = document.getElementById('panel10');

    var btn0 = document.getElementById('btn0');

    var spinButton = document.getElementById('spinButton');

    var soundManager = SoundManager();


    // ビンゴの結果エリアのレンダリング
    var renderBingo = function(){
        var fragment= document.createDocumentFragment();
        var divWrapper;
        Bingo.forEach(function(elem, index){
            if( index % 15 === 0 ){
                divWrapper = fragment.appendChild(document.createElement("div"));
            }
            var numDiv = divWrapper.appendChild(document.createElement("div"));
            numDiv.className = "bingo";
            numDiv.innerHTML = elem;
        });
        var result = document.getElementById("result");
        result.appendChild(fragment);
    };
    renderBingo();



    //『SPIN』ボタン押下
    spinButton.addEventListener('click', function() {
        if (isPlaying) return;

        soundManager.playDrum();

        isPlaying = true;
        spinButton.className = 'inactive';
        btn0.className = 'btn';

        timer = setInterval(function(){
            //『SPIN』ボタン押下後の処理
            // ランダム表示
            var num = Math.floor(Math.random() * Bingo.length);
            bingoNum = num;
            panel1.innerHTML = Bingo[num].substr(0,1);
            panel10.innerHTML = Bingo[num].substr(1,2);
        } , 25 );

    });

    btn0.addEventListener('click', function() {
        stopSlot(0, this);
    });

    //『STOP』ボタン押下後の処理
    function stopSlot(n, btn) {
        if (!isPlaying) return;
        btn.className = 'btn inactive';

        soundManager.stopDrum();
        soundManager.playCymbal();

        clearInterval(timer);

        delBingoNum = Bingo.indexOf(bingoNum);
        Bingo.splice(delBingoNum,1);

        var bingoDiv = document.querySelectorAll(".bingo");

        // change color
        var tBingo = Number(Bingo[bingoNum]);
        bingoDiv[tBingo-1].innerHTML = Bingo[bingoNum];
        bingoDiv[tBingo-1].className = 'bingo unmatched';

        // init
        isPlaying = false;
        timer = null;
        spinButton.className = '';
    }

    function SoundManager(){
        var drum = document.getElementById('audio_drum');
        var cymbal = document.getElementById('audio_cymbal');
        return {
          playDrum    : playDrum,
          stopDrum    : stopDrum,
          playCymbal  : playCymbal
        }

        function playDrum(){
          if(drum == null){
            return;
          }
          drum.currentTime = 0;
          drum.play();
        }

        function stopDrum(){
          if(drum == null){
            return;
          }
          drum.pause();
        }

        function playCymbal(){
          if(cymbal == null){
            return;
          }
          cymbal.currentTime = 0;
          cymbal.play();
        }
    }

})();
