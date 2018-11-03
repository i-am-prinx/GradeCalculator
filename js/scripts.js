
let errMsg;       // will be used to hold error string
let subGrade;     // will hold subject grade after calculation
let flag;         // if error input is entered, flag will be false else true
let value;        // value retrieved from within a textbox ( main / old value)
let tmpValue;     // value retrieved from within a textbox ( changing / new value)
let points = []   // points gotten for each subject grade will be inserted into this list

// all grade id
let graderId = [
      "mathGrade", "engGrade", "geoGrade", "sciGrade", "ecoGrade"
]


// this will be used to trigger if points should be calculated or not
let pointFlag;


/***** computation will begin only if the text box is focused & blurred *****/

// InputBox Event for Math Subject
document.getElementById("mathInput").onfocus = function( ){ main( "mathInput", "mathGrade"); }
document.getElementById("mathInput").onblur = function( ){ main("mathInput", "mathGrade");}


// InputBox Event for Geography Subject
document.getElementById("geoInput").onfocus = function( ){ main( "geoInput", "geoGrade"); }
document.getElementById("geoInput").onblur = function( ){  main("geoInput", "geoGrade");  }


// InputBox Event for Economics Subject
document.getElementById("ecoInput").onfocus = function( ){ main( "ecoInput", "ecoGrade"); }
document.getElementById("ecoInput").onblur = function( ){  main( "ecoInput", "ecoGrade"); }


// InputBox Event for Science Subject
document.getElementById("sciInput").onfocus = function( ){ main( "sciInput", "sciGrade"); }
document.getElementById("sciInput").onblur = function( ){  main( "sciInput", "sciGrade"); }


// InputBox Event for English Subject
document.getElementById("engInput").onfocus = function( ){ main( "engInput", "engGrade"); }
document.getElementById("engInput").onblur = function( ){  main( "engInput", "engGrade"); }









// main function that handles all computation
// requires subject input id, and subject grade label
// required id should be present or available within DOM

function main( subInputId, subGradeId){

      // get whatever value that's in the text box
      value = getBoxValue(subInputId);


      // whenever there is an insertion
      document.getElementById(subInputId).oninput = function( ){

          // compare the value extracted from the text box with the old value
          tmpValue = getBoxValue(subInputId);
          value = compareValue(value, tmpValue);
          console.log( "new value: " + value);      // testing ( test print )


          // validate new value ( letters, alphabets, punctuations, symbols
          // not allowed )
          validateValue( value );
          console.log( "grade is : " + subGrade );  // testing ( test print )



          // set label based on the value of flag
          // when flag is false, there is a error message
          // when flag is true, there is no error message
          setGradeLabel( subGradeId ) ;
          pointScored( graderId );
      }
}






// get the value within the text box & return it.
// Takes text box id as an argument

function getBoxValue( boxId ) {
  return document.getElementById(boxId).value;
}




// reassign main value to every current insertion
// and returns the value assigned
function compareValue( oldValue, newValue ){
  if ( oldValue !== newValue ){
    oldValue = newValue
  }

  return oldValue;
}




// sets error message if the main value contains any alphabet and also sets flag
// to false, if the main value contains numeric type it sets the flag to true
// and based on the value gotten, grade will be calculated

function validateValue( mainValue ){

  if ( mainValue.match(/[\a-z]/) || mainValue.match(/[\A-Z]/) || mainValue === ""){
    flag = false;
    errMsg = "* invalid mark *"
  }


  if ( mainValue.match(/\d+/)){

        // only if value is a number, then calculate grade
        if ( !(isNaN(mainValue)) ) {
          flag = true;
          calcForGrade(mainValue);
        }

        else {
          flag = false;
          errMsg = "* invalid mark *"
        }
  }
}



// receives the validated value inserted as a parameter and helps
// to calculate grade

// Marks              Points                  Grades
// 75 - 100             5                       A
// 65 - 74              4                       B
// 55 - 64              3                       C
// 45 - 54              2                       D
// 40 - 44              1                       E
//  0 - 39              0                       F

function calcForGrade( value ) {
      if ( value >= 75 && value <= 100 ){
        subGrade = "A";
      }

      else if ( value >= 65 && value <= 74 ){
        subGrade = "B";
      }

      else if ( value >= 55 && value <= 64 ){
        subGrade = "C";
      }


      else if ( value >= 45 && value <= 54 ){
        subGrade = "D";
      }

      else if ( value >= 40 && value <= 44 ){
        subGrade = "E";
      }

      else if (value >= 0 &&  value <= 39 ){
        subGrade = "F";
      }
}



// set label based on flag value ( flag value is set when we checked if the
// value inserted into text box is an alphabet or numerics )
// takes the labelId to be set, which also needs to be present within the
// DOM. color stylings is also applied based on the condition

function setGradeLabel( labelId ){

  if ( !flag ){
    document.getElementById(labelId).innerHTML = errMsg;
    document.getElementById(labelId).style.color = "red";
  }
  else {
    document.getElementById(labelId).innerHTML = subGrade;
    document.getElementById(labelId).style.color = "black";
  }

}




// This triggers whether or not points will be calculated as it sets the
// pointFlag to true or false... if one false is found then there will be
// no calculation for points.
// takes a list as an argument... the list taken represent the ids of all the
// field that grade can be outputted on.

function pointTrigger( graderId ) {

      // this will be set to be true each time an input box is focused or blurred
      // this needs to be so bcux of the computation below
      pointFlag = true;

      graderId.forEach(( id ) => {
          let graderContent = document.getElementById(id).innerHTML;

          // computation will only be handled only if the condition is true
          if (pointFlag === true ){
              if (graderContent !== "* invalid mark *" && graderContent !== ""){
                pointFlag = true
              }

              else {
                console.log("trigger is false");
                pointFlag = false;
                points = [ ];
                f = false;
              }
          }
     });
}



// adds point to list based on the grade gotten. it takes the list of grader id
// from which computations will be done on the grade gotten

function getPoint( graderId ){

    // remove all items in list before inserting points if excluded this
    // new points will be added to list each time a user focuses or blur an
    // input box.
    points = [ ];

    // compute for grade based on the mark gotten
    if ( pointFlag ){
        graderId.forEach(( id ) => {
            let grade = document.getElementById(id).innerHTML;
            if ( grade === "A") points.unshift(5);
            if ( grade === "B") points.unshift(4);
            if ( grade === "C") points.unshift(3);
            if ( grade === "D") points.unshift(2);
            if ( grade === "E") points.unshift(1);
            if ( grade === "F") points.unshift(0);
        });
    }

    // sets total points in DOM
    setTotalPoints( );
}



// main method for point calculation. takes gradeid list as a parameter
function pointScored( graderId ){
  pointTrigger(graderId);
  getPoint(graderId);
}

// helps to sum all the values in the points gotten this will be used as a
// callback with the builtin reduce function
const sumPointsGotten = (accumulator, newValue) => accumulator + newValue;



// sets the total points gotten to DOM only if there are points

function setTotalPoints (  ){
      console.log("setting points to DOM");     // testing ( log testing )
      if (points.length > 0 ){
          document.getElementById("totalPoints").innerHTML = points.reduce(
            sumPointsGotten
          );
      }
      else {
        document.getElementById("totalPoints").innerHTML = "";
      }
}
