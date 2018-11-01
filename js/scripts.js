
let errString;    // will be used to hold error string
let subGrade;     // will hold subject grade after calculation
let flag;         // if error input is entered, flag will be false else true



// Math input and Math label  actionListener
document.getElementById("mathInput").oninput = function () {
  main(
    errString,      // passing the error String
    subGrade,       // passing the subject Grade
    flag,           // passing the flag
    document.getElementById("mathInput").name,    // passing the subject name
    document.getElementById("mathInput").value    // passing the subject value
  )
}




// main method
function main( errMsg, grade, flag, subName, value ){

  // check if the value is empty or contains any alphabet
  markAuth( value );

  // set subject grade or errString ( Error String )
  setGradeLabel(errMsg, grade, flag, subName )
}







/*
 * this helps to check if a value is an empty string
 * or if the value is an alphabet or any character
 * which will help to set our flag and also our errString
*/

function markAuth( v ){



  // if a user leaves the field empty
  // if the user enters an alphabet
  if ( isNaN( v ) || v === "" ||  v.match(/^[a-z]$/) || v.match(/^[A-Z]$/) ){
    console.log("enter mark **");
    errString = "** enter mark **";
    flag = false;
  }



  // if a user enters numeric value
  if ( v.match(/[0-9]+/) ){
    console.log("correct input ");
    flag = true;
    setSubGrade( v );
  }
}




// receives the mark value inserted as a parameter and helps
// to calculate grade

// Marks              Points                  Grades
// 75 - 100             5                       A
// 65 - 74              4                       B
// 55 - 64              3                       C
// 45 - 54              2                       D
// 40 - 44              1                       E
//  0 - 39              0                       F

function setSubGrade( v ) {

      if ( v >= 75 && v <= 100 ){
        console.log( v );
        subGrade = "A";
      }

      else if ( v >= 65 && v <= 74 ){
        console.log( v );
        subGrade = "B";
      }

      else if ( v >= 55 && v <= 64 ){
        console.log( v );
        subGrade = "C";
      }

      else if ( v >= 45 && v <= 54 ){
        console.log( v );
        subGrade = "D";
      }

      else if ( v >= 40 && v <= 44 ){
        console.log( v );
        subGrade = "E";
      }

      else if ( v >= 0 && v <= 39 ){
        console.log( v );
        subGrade = "F";
      }

}



// sets grade label based on the subject that mark is entered on
// sets errString in grade field if incorrect input is passed as mark
//
function setGradeLabel( errMsg, grade, flg, subName ){
    if (subName.toLocaleLowerCase( ) === "math") {
      if ( flg === true ){
          document.getElementById("mathGrade").innerHTML = grade
      }
      else if ( flg === false ){
        document.getElementById("mathGrade").innerHTML = errMsg;
      }
    }


    if (subName.toLocaleLowerCase( ) === "english") {

    }


    if (subName.toLocaleLowerCase( ) === "geography") {

    }


    if (subName.toLocaleLowerCase( ) === "science") {

    }


    if (subName.toLocaleLowerCase( ) === "economics") {

    }
}
