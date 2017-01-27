
function average(scores){
    var sum = 0;
    scores.forEach(function(score){
        sum += score;
    });
    
    var average = Math.round(sum / scores.length);
    return average;
    
};



var scores = [34,45,67,78,53,35];
average(scores);

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));