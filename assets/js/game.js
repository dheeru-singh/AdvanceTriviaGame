$.fn.trivia = function() {
    var _t = this;
    _t.userPick = null;
    _t.answers = {
        correct: 0,
        incorrect: 0
    };
    _t.images = null;
    _t.count = 30;
    _t.current = 0;
    _t.questions = [{
        question: "In Aladdin, what is the name of Jasmine's pet tiger?",
        choices: ["Rajah", "Bo", "Iago", "Jack"],
        images: ["assets/images/Aladdin-tiger-rajah.gif"],
        correct: 0
    }, {
        question: "In Peter Pan, Captain Hook had a hook on which part of his body?",
        choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
        images: ["assets/images/peter-pan-hook.gif"],
        correct: 1
 
    }, {
        question: "In the Lion King, where does Mufasa and his family live?",
        choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
        images: ["assets/images/lion-king-musafa.gif"],
        correct: 3
 
    }, {
        question: "In Beauty and the Beast, how many eggs does Gaston eat for breakfast?",
        choices: ["2 Dozen", "5 Dozen", "5000", "0"],
        images: ["assets/images/Beauty-and-Beast.gif"],
        correct: 1
 
    }, {
        question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
        choices: ["Dinah", "Sammie", "Kat", "Luna"],
        images: ["assets/images/Alice’s-kitten-dinah.gif"],
        correct: 0
 
    }, {
        question: "After being on earth, where did Hercules first meet his father Zeus?",
        choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
        images: ["assets/images/Zeus-Hercules.gif"],
        correct: 2
 
    }, {
        question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
        choices: ["Yellow", "Blue", "Gold", "White"],
        images: ["assets/images/ballroom-scene-Beauty-&-Beast.gif"],
        correct: 2
 
    }, {
        question: "In Bambi, what word does the owl use to describe falling in love?",
        choices: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
        images: ["assets/images/Bambi-owl.gif"],
        correct: 3
    }];
    _t.ask = function() {
        if (_t.questions[_t.current]) {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
            $("#question_div").html(_t.questions[_t.current].question);
            var choicesArr = _t.questions[_t.current].choices;
            var buttonsArr = [];
 
            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button ">');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000);
        } else {
            $('.final-result').append($('<div />', {
                text: 'Unanswered: ' + (
                    _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('.final-result').show();
        }
    };
    _t.timer = function() {
        _t.count--;
        if (_t.count <= 0) {
            setTimeout(function() {
                _t.nextQ();
            });
 
        } else {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
        }
    };
    _t.nextQ = function() {
        _t.current++;
        clearInterval(window.triviaCounter);
        _t.count = 30;
        $('#timer').html("");
        $('#choices_div').html("");
       var correct = _t.questions[_t.current-1].choices[_t.questions[_t.current-1].correct];
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        $('.img-section').html("<img src='"+_t.questions[_t.current-1].images+"' />"); 
   
       
        setTimeout(function() {
            _t.cleanUp();
            _t.ask();
            
        }, 1000*3)
    };
    _t.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.img-section').html("");
        $('.correct').html('Correct answers: ' + _t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
    };
    _t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _t.answers[string]);
    };
    return _t;
 };
 
 $("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    Trivia = new $(window).trivia();
    Trivia.ask();
 });
 
 $('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        index = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].choices[index];
 
    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
  
    _t.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
     
        _t.answer(true);
    }
    $('.img-section').html("<img src='"+_t.questions[_t.current].images+"' />"); 
   
    
    _t.nextQ();
 });
 
  