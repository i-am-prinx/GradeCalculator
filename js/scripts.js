
let errMsg;       // will be used to hold error string
let subGrade;     // will hold subject grade after calculation
let flag;         // if error input is entered, flag will be false else true
let value;        // value retrieved from within a textbox ( main / old value)
let tmpValue;     // value retrieved from within a textbox ( changing / new value)



// computation will begin only if the text box is focused & blurred
// whenever the text box is focused

document.getElementById("mathInput").onfocus = function( ) {

      // get whatever value that's in the text box
      value = getBoxValue("mathInput");

      // whenever there is an insertion
      document.getElementById("mathInput").oninput = function( ){

          // compare the value extracted from the text box with the old value
          tmpValue = getBoxValue("mathInput");
          value = compareValue(value, tmpValue);
          console.log( "new value: " + value);      // testing ( test print )


          // validate new value ( letters, alphabets, punctuations, symbols
          // not allowed )
          validateValue( value );
          console.log( "grade is : " + subGrade );  // testing ( test print )



          // set label based on the value of flag
          // when flag is false, there is a error message
          // when flag is true, there is no error message
          setGradeLabel( "mathGrade" ) ;

      }

}

// when the text box is blurred( no longer focused)
document.getElementById("mathInput").onblur = function( ){

      // get whatever value that's in the text box

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
    flag = true;
    calcForGrade(mainValue);
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
