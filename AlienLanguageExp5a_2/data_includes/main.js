//define the randomization function to avoid two trials in a row
function RandomizeNoSeries(predicate,pattern) {
    this.args = [predicate];

    this.run = function(arrays) {
        let tryrandomize = true;
        while (tryrandomize){
            fisherYates(arrays[0]);
            tryrandomize = false;
            let previouscapture = "";
            for (let i = 0; i < arrays[0].length; i++){
                let currentcapture = arrays[0][i].type.match(pattern);
                console.log("current", arrays[0][i], arrays[0][i].type, currentcapture);
                if (currentcapture){
                    currentcapture = currentcapture[0];
                    if (currentcapture == previouscapture) tryrandomize = true;
                }
                previouscapture = currentcapture || "";
            }
        }
        return arrays[0];
    }
}
function randomizeNoSeries(predicate,pattern) { return new RandomizeNoSeries(predicate,pattern); }



PennController.ResetPrefix(null); // Initiates PennController
PennController.ResetPrefix(null);
PennController.DebugOff()
noTopMargin = ()=>newFunction( ()=> $(".PennController-PennController").css("margin-top", "-4em") ).call()



//var showProgressBar = false;

PennController.PreloadZip("https://www.ling.upenn.edu/~liaini/Imagefiles/Images.zip")

NITEMS = 80
ITEMSPERCHUNK = 4

indicesToChunks = [...new Array(NITEMS)].map( (v,i)=>i )
                    .sort( v=>Math.random()>=0.5 )
                    .map( v=>v%(NITEMS/ITEMSPERCHUNK) )
                    
// Start typing your code here

Sequence("Consent", "Welcome", "Start", "AlienIntro", "GroupingIntro", "Reminder1", "Grouping1", "Reminder2", "Grouping2", "Reminder3", "Grouping3", "Reminder4", "Grouping4", "LearningIntro1", "LearningIntro2",

chunks(anyOf( startsWith("Learning"), startsWith("Test") ),
      seq( randomizeNoSeries(startsWith("Learning"),/-[^-]+-/), randomizeNoSeries(startsWith("Test"),/-[^-]+-/)),
      /-\d+$/,
      randomize
      ),
      
"MemoryTestIntro1",    
"MemoryTest1",
"InterferenceIntro",
randomize("InterferenceCond4a"),
"MemoryTestIntro2",
"MemoryTest2",
"TestIntro",
randomize("SuffixSelection1"),
randomize("AlienSelection1"),
randomize("SuffixSelection2"),
randomize("AlienSelection2"),
randomize("SuffixSelection3"),
randomize("AlienSelection3"),
randomize("SuffixSelection4"),
randomize("AlienSelection4"),
randomize("SuffixSelection5"),
randomize("AlienSelection5"),
"question1",
"question2",
"question3",
"question4",
"question5",
"question6",
"question7",
"question8",
"send",
"End"
)

CheckPreloaded("SuffixSelection", "AlienSelection")
 
 

//Consent form
newTrial("Consent",
  noTopMargin(),

newHtml("consent", "ConsentForm.html")
    .checkboxWarning("Please check the box if you want to proceed.")
    .log()
    .print()
 ,
newVar("RT").global().set( v=> Date.now()),
 
newButton("Start Experiment")
    .css("font-size", "1em")
    .center()
    .print()
    .wait(
         getHtml("consent").test.complete()
         .failure(getHtml("consent").warn())
         )
    .log()
,
getVar("RT").set( v => Date.now() - v )
)
.log("ReadTime", getVar("RT"))
.log( "ID" , PennController.GetURLParameter("id") )
.setOption("hideProgressBar", true)





//Welcome page

newTrial("Welcome",
 noTopMargin(),
  newHtml("instructions","instructions.html")
    .radioWarning("Please select an option for gender.")
    .inputWarning("Please fill out the form in order to proceed.")
    .log()
    .print()
  ,  
newVar("RT").global().set( v=> Date.now()),

newButton("Start")
    .css("font-size", "1em")
    .center()
    .print()
    .wait(getHtml("instructions").test.complete()
         .failure(getHtml("instructions").warn()))
,

getVar("RT").set( v => Date.now() - v )
)
.log("FillTime", getVar("RT"))
.log( "ID" , PennController.GetURLParameter("id") )
.setOption("hideProgressBar", true)



//Start page    

newTrial("Start",
  noTopMargin(),
  
  newHtml("start.html")
    .log()
    .print()
  ,
  newVar("RT").global().set( v=> Date.now()),
  
  newButton("Next")
        .css("font-size", "1em")
        .center()
        .print()
        .wait(),
getVar("RT").set( v => Date.now() - v )
)
.log("ReadTime", getVar("RT"))
.log( "ID" , PennController.GetURLParameter("id") )
.setOption("hideProgressBar", true)



    
//Introduce the aliens
newTrial("AlienIntro",
noTopMargin(),
  newText("Nulus1", "Nulu wearing Outfit 1")
  .css("font-size", "1.5em")
  .log()
  ,
  newText("Nulus2", "Nulu wearing Outfit 2")
  .css("font-size", "1.5em")
  .log()
  ,
  newText("Gilis1", "Gili wearing Outfit 1")
  .css("font-size", "1.5em")
  .log()
  ,
  newText("Gilis2", "Gili wearing Outfit 2")
  .css("font-size", "1.5em")
  .log()
  ,
  newImage("A1_1", "A1_1.png")
    .size(200, 230)
    .log()
  ,
  newImage("A1_2", "A1_2.png")
  .size(200, 230)
  .log()
  ,
  newImage("B1_1", "B1_1.png")
    .size(200, 240)
    .log()
  ,
  newImage("B1_2", "B1_2.png")
    .size(200, 240)
    .log()
  ,
  newCanvas( "Introduction", "100vw", "80vh")
    .add( "23vw", "0vh", getText("Nulus1"), 4 )
    .add( "23vw", "40vh", getText("Gilis1"), 5 )
    .add( "65vw", "0vh", getText("Nulus2"), 6 )
    .add( "65vw", "40vh", getText("Gilis2"), 7 )
    .add( "23vw", "5vh", getImage("A1_1"), 0 )
    .add( "23vw", "45vh", getImage("B1_1"), 1 )
    .add( "65vw", "5vh", getImage("A1_2"), 2 )
    .add( "65vw", "45vh", getImage("B1_2"), 3 )
    .print()
    .log()
  ,
  newVar("RT").global().set( v=> Date.now())
  ,
  
  newButton("Next")
        .css("font-size", "1.5em")
        .center()
        .print()
        .log()
        .wait()
 ,
 getVar("RT").set( v => Date.now() - v )
 
 )
 
.log("LookTime", getVar("RT"))
.setOption("hideProgressBar", true) 
  
 

// Introducing the Grouping activity 
newTrial("GroupingIntro",
  noTopMargin(),

  newText("<p> On the next few screens you will see more examples of aliens! </p>")
  .css("font-size", "1.5em")
  .center()
  .print()
  .log()
  ,
  
  newText("<p> Click 'Next' to continue. </p>")
  .css("font-size", "1.5em")
  .center()
  .print()
  .log()
  ,
  
  newVar("RT").global().set( v=> Date.now())
  ,
  
  newButton("Next")
        .css("font-size", "1.5em")
        .center()
        .print()
        .log()
        .wait()
        ,
getVar("RT").set( v => Date.now() - v )

)
.log("ReadTime", getVar("RT"))
.setOption("hideProgressBar", true) 



//Find Nulus
newTrial("Reminder1",
noTopMargin(),
newText("<p> Here are some Nulus.</p>")
    .css("font-size", "1.5em")
    .center()
    .print()
    .log()
  ,
newImage("A_outfit1", "A1_1.png")
    .size(290, 350)
    .log()
    ,
newImage("A_outfit2", "A1_2.png")
  .size(290, 350)
  .log()
   
,

newCanvas("remind3", "100vw", "60vh")
.add("20vw", "2vh", getImage("A_outfit1"), 1)
.add("60vw", "2vh", getImage("A_outfit2"), 2) 
.print()
.log()
,  

newVar("RT").global().set( v=> Date.now())
  ,
  
newButton("Next")
    .css("font-size", "1.5em")
    .center()
    .log()
    .print()
    .wait(),
    
getVar("RT").set( v => Date.now() - v )
)
.log("RemindTime1", getVar("RT"))
.setOption("hideProgressBar", true) 





//Grouping activity
//Grouping 1
newTrial("Grouping1",
 noTopMargin(),
newImage("Alien1" , "A1_1.png")
    .size(140, 180)
,
newImage("Alien2" , "A1_2.png")
    .size(140, 180)
,
newImage("Alien3" , "A2_1.png" )
    .size(140, 180)
,
newImage("Alien4" , "A2_2.png")
    .size(140, 180)
,
newImage("Alien5" , "A3_1.png" )
    .size(140, 180)
,
newImage("Alien6" , "A3_2.png" )
  .size(140, 180)
,
newImage("Alien7" , "A4_1.png" )
    .size(140, 180)
,
newImage("Alien8" , "A4_2.png" )
    .size(140, 180)
,
newImage("Alien9" , "B1_1.png")
    .size(140, 180)
,
newImage("Alien10" , "B1_2.png" )
    .size(140, 180)
,
newImage("Alien11" , "B2_1.png" )
    .size(140, 180)
,
newImage("Alien12" , "B2_2.png" )
    .size(140, 180)
,
newImage("Alien13" , "B3_1.png" )
    .size(140, 180)
,
newImage("Alien14" , "B3_2.png" )
    .size(140, 180)
,
newImage("Alien15" , "B4_1.png" )
    .size(140, 180)
,
newImage("Alien16" , "B4_2.png" )
    .size(140, 180)
,
newButton("1", "1")
    // .cssContainer({width: 50, height: 20, border: "solid 1px black"})

,    
newButton("2", "2")
, 

newButton("3", "3")
    
,
newButton("4", "4")
   
,
newButton("5", "5")
    
,
newButton("6", "6")
    
,
newButton("7", "7")
   
,
newButton("8", "8")
    
,
newButton("9", "9")
    
,
newButton("10", "10")
    
,
newButton("11", "11")
    
,
newButton("12", "12")
    
,
newButton("13", "13")
    
,
newButton("14", "14")

,
newButton("15", "15")
    
,
newButton("16", "16")
    
,
newCanvas( 'myCanvas', "90vw", "68vh")
    .add( "0vw", "0vh", getImage("Alien1"), 0 )
    .add( "12vw", "0vh", getImage("Alien10"), 1 )
    .add( "24vw", "0vh", getImage("Alien2"), 2 )
    .add( "36vw", "0vh", getImage("Alien11"), 3 )
    .add( "48vw", "0vh", getImage("Alien3"), 4 )
    .add( "60vw", "0vh", getImage("Alien12"), 5 )
    .add( "72vw","0vh", getImage("Alien4"), 6 )
    .add( "84vw", "0vh", getImage("Alien5"), 7 )
    .add( "0vw", "35vh", getImage("Alien13"), 8 )
    .add( "12vw", "35vh", getImage("Alien14"), 9 )
    .add( "24vw", "35vh", getImage("Alien6"), 10 )
    .add( "36vw", "35vh", getImage("Alien15"), 11 )
    .add( "48vw", "35vh", getImage("Alien16"), 12 )
    .add( "60vw", "35vh", getImage("Alien7"), 13 )
    .add( "72vw","35vh", getImage("Alien8"), 14 )
    .add( "84vw", "35vh", getImage("Alien9"), 15 )
    .add( "4vw", "30vh", getButton("1"), 16 )
    .add( "16vw", "30vh", getButton("2"), 17 )
    .add( "28vw", "30vh", getButton("3"), 18 )
    .add( "40vw", "30vh", getButton("4"), 19 )
    .add( "52vw", "30vh", getButton("5"), 20 )
    .add( "64vw", "30vh", getButton("6"), 21 )
    .add( "76vw", "30vh", getButton("7"), 22 )
    .add( "88vw", "30vh", getButton("8"), 23)
    .add( "4vw", "65vh", getButton("9"), 24 )
    .add( "16vw", "65vh", getButton("10"), 25 )
    .add( "28vw", "65vh", getButton("11"), 26 )
    .add( "40vw", "65vh", getButton("12"), 27 )
    .add( "52vw", "65vh", getButton("13"), 28 )
    .add( "64vw", "65vh", getButton("14"), 29 )
    .add( "76vw", "65vh", getButton("15"), 30 )
    .add( "88vw", "65vh", getButton("16"), 31 )
    .print()
    .log()
  ,
 newText("<p> Please find all the images of Nulus and type their numbers in this box. Please separate numbers with commas. Press enter when you are done. </p>")
 .css("font-size", "1.2em")
 .center()
 .print()
 .log()
,
 newVar("categorization")
 .log()

,
 newTextInput("answer")
    .center()
    .once()
    .print()
    .wait()
    .setVar("categorization")
    .log()
,

 newText("Good work! Click 'Next' to continue.")
 .css("font-size", "1em")
 .center()
 .print()
 .log()
 
,

newVar("RT").global().set( v=> Date.now())
  ,
  

newButton("click", "Next")
        .css("font-size", "1em")
        .center()
        .log()
        .print()
        .wait()
,
getVar("RT").set( v => Date.now() - v )
)
.log("NuluNumber", getVar("categorization"))
.log("AnswerTime1", getVar("RT"))
.setOption("hideProgressBar", true) 




//Find Gilis
newTrial("Reminder2",
noTopMargin(),

newText("<p> Here are some Gilis.</p>")
    .css("font-size", "1.5em")
    .center()
    .print()
    .log()
  ,
newImage("B_outfit1", "B1_1.png")
    .size(290, 350)
    .log()
    ,
newImage("B_outfit2", "B1_2.png")
  .size(290, 350)
  .log()
   
,

newCanvas("remind3", "100vw", "60vh")
.add("20vw", "2vh", getImage("B_outfit1"), 1)
.add("60vw", "2vh", getImage("B_outfit2"), 2) 
.print()
.log()
,  

newVar("RT").global().set( v=> Date.now()),
  
newButton("Next")
    .css("font-size", "1.5em")
    .center()
    .log()
    .print()
    .wait()
,
    
getVar("RT").set( v => Date.now() - v )

)
.log("RemindTime2", getVar("RT"))
.setOption("hideProgressBar", true) 




//Grouping 2
newTrial("Grouping2",
noTopMargin(),
newImage("Alien1" , "A1_1.png")
    .size(140, 180)
,
newImage("Alien2" , "A1_2.png")
    .size(140, 180)
,
newImage("Alien3" , "A2_1.png" )
    .size(140, 180)
,
newImage("Alien4" , "A2_2.png")
    .size(140, 180)
,
newImage("Alien5" , "A3_1.png" )
    .size(140, 180)
,
newImage("Alien6" , "A3_2.png" )
  .size(140, 180)
,
newImage("Alien7" , "A4_1.png" )
    .size(140, 180)
,
newImage("Alien8" , "A4_2.png" )
    .size(140, 180)
,
newImage("Alien9" , "B1_1.png")
    .size(140, 180)
,
newImage("Alien10" , "B1_2.png" )
    .size(140, 180)
,
newImage("Alien11" , "B2_1.png" )
    .size(140, 180)
,
newImage("Alien12" , "B2_2.png" )
    .size(140, 180)
,
newImage("Alien13" , "B3_1.png" )
    .size(140, 180)
,
newImage("Alien14" , "B3_2.png" )
    .size(140, 180)
,
newImage("Alien15" , "B4_1.png" )
    .size(140, 180)
,
newImage("Alien16" , "B4_2.png" )
    .size(140, 180)
,
newButton("1", "1")
    // .cssContainer({width: 50, height: 20, border: "solid 1px black"})

,    
newButton("2", "2")
, 

newButton("3", "3")
    
,
newButton("4", "4")
   
,
newButton("5", "5")
    
,
newButton("6", "6")
    
,
newButton("7", "7")
   
,
newButton("8", "8")
    
,
newButton("9", "9")
    
,
newButton("10", "10")
    
,
newButton("11", "11")
    
,
newButton("12", "12")
    
,
newButton("13", "13")
    
,
newButton("14", "14")

,
newButton("15", "15")
    
,
newButton("16", "16")
    
,
newCanvas( 'myCanvas', "90vw", "68vh")
    .add( "0vw", "0vh", getImage("Alien1"), 0 )
    .add( "12vw", "0vh", getImage("Alien11"), 1 )
    .add( "24vw", "0vh", getImage("Alien2"), 2 )
    .add( "36vw", "0vh", getImage("Alien10"), 3 )
    .add( "48vw", "0vh", getImage("Alien12"), 4 )
    .add( "60vw", "0vh", getImage("Alien3"), 5 )
    .add( "72vw","0vh", getImage("Alien4"), 6 )
    .add( "84vw", "0vh", getImage("Alien13"), 7 )
    .add( "0vw", "35vh", getImage("Alien5"), 8 )
    .add( "12vw", "35vh", getImage("Alien14"), 9 )
    .add( "24vw", "35vh", getImage("Alien15"), 10 )
    .add( "36vw", "35vh", getImage("Alien6"), 11 )
    .add( "48vw", "35vh", getImage("Alien7"), 12 )
    .add( "60vw", "35vh", getImage("Alien16"), 13 )
    .add( "72vw","35vh", getImage("Alien8"), 14 )
    .add( "84vw", "35vh", getImage("Alien9"), 15 )
    .add( "4vw", "30vh", getButton("1"), 16 )
    .add( "16vw", "30vh", getButton("2"), 17 )
    .add( "28vw", "30vh", getButton("3"), 18 )
    .add( "40vw", "30vh", getButton("4"), 19 )
    .add( "52vw", "30vh", getButton("5"), 20 )
    .add( "64vw", "30vh", getButton("6"), 21 )
    .add( "76vw", "30vh", getButton("7"), 22 )
    .add( "88vw", "30vh", getButton("8"), 23)
    .add( "4vw", "65vh", getButton("9"), 24 )
    .add( "16vw", "65vh", getButton("10"), 25 )
    .add( "28vw", "65vh", getButton("11"), 26 )
    .add( "40vw", "65vh", getButton("12"), 27 )
    .add( "52vw", "65vh", getButton("13"), 28 )
    .add( "64vw", "65vh", getButton("14"), 29 )
    .add( "76vw", "65vh", getButton("15"), 30 )
    .add( "88vw", "65vh", getButton("16"), 31 )
    .print()
  ,
 newText("<p> Please find all the images of Gilis and type their numbers in this box. Please separate numbers with commas. Press enter when you are done.</p>")
 .css("font-size", "1.2em")
 .center()
 .print()
 .log()
,
 newVar("categorization")
 .log()

,
 newTextInput("answer")
    .center()
    .once()
    .print()
    .wait()
    .setVar("categorization")
    .log()
,

 newText("Good work! Click 'Next' to continue.")
 .css("font-size", "1em")
 .center()
 .print()
,
newVar("RT").global().set( v=> Date.now()),
  
 newButton("click", "Next")
        .css("font-size", "1em")
        .center()
        .log()
        .print()
        .wait()
,
getVar("RT").set( v => Date.now() - v )

)
.log("AnswerTime2", getVar("RT"))
.log("GiliNumber", getVar("categorization"))
.setOption("hideProgressBar", true) 




//Find Outfit1
newTrial("Reminder3",
  noTopMargin(),
  newText("<p> Here are a Nulu and a Gili wearing Outfit 1.</p>")
  .css("font-size", "1.5em")
  .center()
  .print()
  ,

newImage("A_outfit1", "A1_1.png")
    .size(290, 350)
    .log()
    ,
newImage("B_outfit1", "B1_1.png")
  .size(290, 350)
  .log()
   
,

newCanvas("remind3", "100vw", "60vh")
.add("20vw", "2vh", getImage("A_outfit1"), 1)
.add("60vw", "2vh", getImage("B_outfit1"), 2) 
.print()
.log()
, 

newVar("RT").global().set( v=> Date.now()),

newButton("Next")
        .css("font-size", "1.5em")
        .center()
        .log()
        .print()
        .wait(),
getVar("RT").set( v => Date.now() - v )

)
.log("RemindTime3", getVar("RT"))
.setOption("hideProgressBar", true) 





//Grouping 3
newTrial("Grouping3",
noTopMargin(),

newImage("Alien1" , "A1_1.png")
    .size(140, 180)
,
newImage("Alien2" , "A1_2.png")
    .size(140, 180)
,
newImage("Alien3" , "A2_1.png" )
    .size(140, 180)
,
newImage("Alien4" , "A2_2.png")
    .size(140, 180)
,
newImage("Alien5" , "A3_1.png" )
    .size(140, 180)
,
newImage("Alien6" , "A3_2.png" )
  .size(140, 180)
,
newImage("Alien7" , "A4_1.png" )
    .size(140, 180)
,
newImage("Alien8" , "A4_2.png" )
    .size(140, 180)
,
newImage("Alien9" , "B1_1.png")
    .size(140, 180)
,
newImage("Alien10" , "B1_2.png" )
    .size(140, 180)
,
newImage("Alien11" , "B2_1.png" )
    .size(140, 180)
,
newImage("Alien12" , "B2_2.png" )
    .size(140, 180)
,
newImage("Alien13" , "B3_1.png" )
    .size(140, 180)
,
newImage("Alien14" , "B3_2.png" )
    .size(140, 180)
,
newImage("Alien15" , "B4_1.png" )
    .size(140, 180)
,
newImage("Alien16" , "B4_2.png" )
    .size(140, 180)
,
newButton("1", "1")
    // .cssContainer({width: 50, height: 20, border: "solid 1px black"})

,    
newButton("2", "2")
, 

newButton("3", "3")
    
,
newButton("4", "4")
   
,
newButton("5", "5")
    
,
newButton("6", "6")
    
,
newButton("7", "7")
   
,
newButton("8", "8")
    
,
newButton("9", "9")
    
,
newButton("10", "10")
    
,
newButton("11", "11")
    
,
newButton("12", "12")
    
,
newButton("13", "13")
    
,
newButton("14", "14")

,
newButton("15", "15")
    
,
newButton("16", "16")
    
,
newCanvas( 'myCanvas', "90vw", "68vh")
    .add( "0vw", "0vh", getImage("Alien1"), 0 )
    .add( "12vw", "0vh", getImage("Alien10"), 1 )
    .add( "24vw", "0vh", getImage("Alien2"), 2 )
    .add( "36vw", "0vh", getImage("Alien11"), 3 )
    .add( "48vw", "0vh", getImage("Alien3"), 4 )
    .add( "60vw", "0vh", getImage("Alien12"), 5 )
    .add( "72vw","0vh", getImage("Alien4"), 6 )
    .add( "84vw", "0vh", getImage("Alien13"), 7 )
    .add( "0vw", "35vh", getImage("Alien5"), 8 )
    .add( "12vw", "35vh", getImage("Alien14"), 9 )
    .add( "24vw", "35vh", getImage("Alien6"), 10 )
    .add( "36vw", "35vh", getImage("Alien15"), 11 )
    .add( "48vw", "35vh", getImage("Alien7"), 12 )
    .add( "60vw", "35vh", getImage("Alien16"), 13 )
    .add( "72vw","35vh", getImage("Alien8"), 14 )
    .add( "84vw", "35vh", getImage("Alien9"), 15 )
    .add( "4vw", "30vh", getButton("1"), 16 )
    .add( "16vw", "30vh", getButton("2"), 17 )
    .add( "28vw", "30vh", getButton("3"), 18 )
    .add( "40vw", "30vh", getButton("4"), 19 )
    .add( "52vw", "30vh", getButton("5"), 20 )
    .add( "64vw", "30vh", getButton("6"), 21 )
    .add( "76vw", "30vh", getButton("7"), 22 )
    .add( "88vw", "30vh", getButton("8"), 23)
    .add( "4vw", "65vh", getButton("9"), 24 )
    .add( "16vw", "65vh", getButton("10"), 25 )
    .add( "28vw", "65vh", getButton("11"), 26 )
    .add( "40vw", "65vh", getButton("12"), 27 )
    .add( "52vw", "65vh", getButton("13"), 28 )
    .add( "64vw", "65vh", getButton("14"), 29 )
    .add( "76vw", "65vh", getButton("15"), 30 )
    .add( "88vw", "65vh", getButton("16"), 31 )
    .print()
  ,
 newText("<p> Please find all the images of aliens wearing Outfit 1 and type their numbers in this box. Please separate numbers with commas. Press enter when you are done. </p>")
 .css("font-size", "1.2em")
 .center()
 .print()
 .log()
,
 newVar("categorization")
 .log()

,
 newTextInput("answer")
    .center()
    .once()
    .print()
    .wait()
    .setVar("categorization")
    .log()
,

 newText("Good work! Click 'Next' to continue.")
 .css("font-size", "1em")
 .center()
 .print()
 .log()
,
newVar("RT").global().set( v=> Date.now()),

newButton("click", "Next")
        .css("font-size", "1em")
        .center()
        .log()
        .print()
        .wait()
,
getVar("RT").set( v => Date.now() - v )

)
.log('AnswerTime3', getVar("RT"))
.log("Outfit1Number", getVar("categorization"))
.setOption("hideProgressBar", true) 





//Find Outfit2
newTrial("Reminder4",
 noTopMargin(),
  newText("<p> Here are a Nulu and a Gili wearing Outfit 2.</p>")
  .css("font-size", "1.5em")
  .center()
  .print()
  .log()
  ,

newImage("A_outfit2", "A1_2.png")
    .size(290, 350)
    .log()
    ,
newImage("B_outfit2", "B1_2.png")
  .size(290, 350)
  .log()
   
,

newCanvas("remind3", "100vw", "60vh")
.add("20vw", "2vh", getImage("A_outfit2"), 1)
.add("60vw", "2vh", getImage("B_outfit2"), 2) 
.print()
.log()
, 

newVar("RT").global().set( v=> Date.now()),

newButton("Next")
        .css("font-size", "1.5em")
        .center()
        .log()
        .print()
        .wait()
        
,
getVar("RT").set( v => Date.now() - v )

)
.log("RemindTime4", getVar("RT"))
.setOption("hideProgressBar", true) 




//Grouping 4
newTrial("Grouping4",
noTopMargin(),
newImage("Alien1" , "A1_1.png")
    .size(140, 180)
,
newImage("Alien2" , "A1_2.png")
    .size(140, 180)
,
newImage("Alien3" , "A2_1.png" )
    .size(140, 180)
,
newImage("Alien4" , "A2_2.png")
    .size(140, 180)
,
newImage("Alien5" , "A3_1.png" )
    .size(140, 180)
,
newImage("Alien6" , "A3_2.png" )
  .size(140, 180)
,
newImage("Alien7" , "A4_1.png" )
    .size(140, 180)
,
newImage("Alien8" , "A4_2.png" )
    .size(140, 180)
,
newImage("Alien9" , "B1_1.png")
    .size(140, 180)
,
newImage("Alien10" , "B1_2.png" )
    .size(140, 180)
,
newImage("Alien11" , "B2_1.png" )
    .size(140, 180)
,
newImage("Alien12" , "B2_2.png" )
    .size(140, 180)
,
newImage("Alien13" , "B3_1.png" )
    .size(140, 180)
,
newImage("Alien14" , "B3_2.png" )
    .size(140, 180)
,
newImage("Alien15" , "B4_1.png" )
    .size(140, 180)
,
newImage("Alien16" , "B4_2.png" )
    .size(140, 180)
,
newButton("1", "1")
    // .cssContainer({width: 50, height: 20, border: "solid 1px black"})

,    
newButton("2", "2")
, 

newButton("3", "3")
    
,
newButton("4", "4")
   
,
newButton("5", "5")
    
,
newButton("6", "6")
    
,
newButton("7", "7")
   
,
newButton("8", "8")
    
,
newButton("9", "9")
    
,
newButton("10", "10")
    
,
newButton("11", "11")
    
,
newButton("12", "12")
    
,
newButton("13", "13")
    
,
newButton("14", "14")

,
newButton("15", "15")
    
,
newButton("16", "16")
    
,
newCanvas( 'myCanvas', "90vw", "68vh")
    .add( "0vw", "0vh", getImage("Alien1"), 0 )
    .add( "12vw", "0vh", getImage("Alien10"), 1 )
    .add( "24vw", "0vh", getImage("Alien2"), 2 )
    .add( "36vw", "0vh", getImage("Alien11"), 3 )
    .add( "48vw", "0vh", getImage("Alien3"), 4 )
    .add( "60vw", "0vh", getImage("Alien12"), 5 )
    .add( "72vw","0vh", getImage("Alien4"), 6 )
    .add( "84vw", "0vh", getImage("Alien13"), 7 )
    .add( "0vw", "35vh", getImage("Alien5"), 8 )
    .add( "12vw", "35vh", getImage("Alien14"), 9 )
    .add( "24vw", "35vh", getImage("Alien6"), 10 )
    .add( "36vw", "35vh", getImage("Alien15"), 11 )
    .add( "48vw", "35vh", getImage("Alien7"), 12 )
    .add( "60vw", "35vh", getImage("Alien16"), 13 )
    .add( "72vw","35vh", getImage("Alien8"), 14 )
    .add( "84vw", "35vh", getImage("Alien9"), 15 )
    .add( "4vw", "30vh", getButton("1"), 16 )
    .add( "16vw", "30vh", getButton("2"), 17 )
    .add( "28vw", "30vh", getButton("3"), 18 )
    .add( "40vw", "30vh", getButton("4"), 19 )
    .add( "52vw", "30vh", getButton("5"), 20 )
    .add( "64vw", "30vh", getButton("6"), 21 )
    .add( "76vw", "30vh", getButton("7"), 22 )
    .add( "88vw", "30vh", getButton("8"), 23)
    .add( "4vw", "65vh", getButton("9"), 24 )
    .add( "16vw", "65vh", getButton("10"), 25 )
    .add( "28vw", "65vh", getButton("11"), 26 )
    .add( "40vw", "65vh", getButton("12"), 27 )
    .add( "52vw", "65vh", getButton("13"), 28 )
    .add( "64vw", "65vh", getButton("14"), 29 )
    .add( "76vw", "65vh", getButton("15"), 30 )
    .add( "88vw", "65vh", getButton("16"), 31 )
    .print()
  ,
 newText("<p> Please find all the images of aliens wearing Outfit 2 and type their numbers in this box. Please separate numbers with commas. Press enter when you are done. </p>")
 .css("font-size", "1.2em")
 .center()
 .print()
 .log()
,
 newVar("categorization")
 .log()

,
 newTextInput("answer")
    .center()
    .once()
    .print()
    .wait()
    .setVar("categorization")
    .log()
,

 newText("Good work! Click 'Next' to continue.")
 .css("font-size", "1em")
 .center()
 .print()
 .log()
,
newVar("RT").global().set( v=> Date.now()),

newButton("click", "Next")
        .css("font-size", "1em")
        .center()
        .log()
        .print()
        .wait()
,
getVar("RT").set( v => Date.now() - v )

)
.log("AnswerTime4", getVar("RT"))
.log("Outfit2Number", getVar("categorization"))
.setOption("hideProgressBar", true) 




// Start the Learning phase
newTrial("LearningIntro1",
     noTopMargin(),
     newHtml("LearningIntro1.html")
        .log()
        .print()
      ,
newVar("RT").global().set( v=> Date.now()),

     newButton("click", "Next")
        .css("font-size", "1em")
        .center()
        .log()
        .print()
        .wait(),
getVar("RT").set( v => Date.now() - v )
       
)
.log("ReadTime", getVar("RT"))
.setOption("hideProgressBar", true) 



newTrial("LearningIntro2",
     noTopMargin(),
     newHtml("LearningIntro2.html")
         .log()
        .print()
      ,
    newVar("RT").global().set( v=> Date.now()),
    newButton("click", "Next")
        .css("font-size", "1em")
        .center()
        .log()
        .print()
        .wait(),
    getVar("RT").set( v => Date.now() - v )
       
)
.log("ReadTime", getVar("RT"))
.setOption("hideProgressBar", true) 




//learning trials
Template( "LearningPhase.csv" , row =>
newTrial("Learning-"+row.ItemImageFile+"-"+indicesToChunks[parseInt(row['Trial number'])+1],
    newTimer(250).start().wait()
    ,
    
    newVar("n_in_chunk", 0).global()
            .test.is(0).success( newVar("word1").global().set(row.Item) )
            .test.is(1).success( newVar("word2").global().set(row.Item) )
            .test.is(2).success( newVar("word3").global().set(row.Item) )
            .test.is(3).success( newVar("word4").global().set(row.Item) )
            .set( v=>(v+1)%4 )
    ,

    newImage("bubble", "bubble.png")
        .size(600, 200)
    ,
    
    newText("word", row.Item)
        .center()
        .css("font-size", "3em")
        .log()
    ,
    
    newImage("item", row.ItemImageFile)
        .size(220, 155)
        .log()
        
    ,
    
    newImage("Alien", row.AlienImageFile)
        .size(300, 300)
        .log()
    
    ,
  newCanvas( 'Learning', "90vw", "80vh")
    .add( "25vw", "0vh", getImage("bubble"), 0 )
    .add( "35vw", "32vh", getImage("Alien"), 1 )
    .add( "28vw", "7vh", getText("word"), 2 )
    .add( "45vw", "1vh", getImage("item"), 3 )
    .print()
    .log()
    ,
    
    newVar("RT").global().set( v => Date.now() ),
     
    newButton("click", "Next")
        //.css("right: 95vw","bottom: 20vh","font-size", "1.2em")
        .css("font-size", "1.2em")
        .center()
        .log()
        .print()
        .wait(),
        
     getVar("RT").set( v => Date.now() - v )
    )
    .log( "LearningTime", getVar("RT") )
    .log("ItemLearned", row.ItemImageFile)
    .log("AlienSpeaking", row.AlienImageFile)
    .log("WordTaught", row.Item)
    .log("TrialNumber", row['Trial number'])
    )
    
  
 

//testing trials
Template("LearningPhase.csv", row=>
newTrial("Test-"+row.ItemImageFile+"-"+indicesToChunks[parseInt(row['Trial number'])+1],

    newText("Please click on the correct word for the image")
      .css("font-size", "1.5em")
      .bold()
      .center()
      .print()
    ,
    
    newImage("itemfortest", row.ItemImageFile)
      .size(300, 225)
      .log()
     ,
    
    
    newImage("CorrectWord", row.CorrectImage)
      .size(150, 45)
      .center()
      .log()
    
    ,
    newImage("IncorrectWord", row.IncorrectImage)
      .size(150, 45)
        .center()
        .log()
        
    ,
    newText("good", "Correct!")
      .center()
      .css("font-size", "1.5em")
      .bold()
      .color("black")
      .log()
      
    ,
    
    newText("bad", "Incorrect. Please try again!")
      .center()
      .css("font-size", "1.5em")
      .bold()
      .color("red")
      .log()
    ,

    newCanvas( "Testing" , "100vw", "68vh")
        .add("40vw", "5vh", getImage("itemfortest"), 0)
        .add("30vw", "50vh", getImage("CorrectWord"), 1)
        .add("60vw", "50vh", getImage("IncorrectWord"), 2)
        .log()
        .print()
    ,
    
    defaultButton.center().css("font-size","1.5em")
    ,
   
    
    newSelector("choice")
        .add(getImage("CorrectWord"), getImage("IncorrectWord"))
        .shuffle()
        .print()
        .wait()
        .log()
    ,
    
    newButton("validation","Next")
    ,
    newVar("RT").global().set( v => Date.now() ),
    
    newButton("check","Check").callback(
        getText("bad").remove()
        ,
        getButton("check").remove()
        ,
        getSelector("choice")
            .test.selected( getImage("CorrectWord") )
            .success( 
                getText("good").print(),
                getButton("validation").print()
            )
            .failure( 
                getText("bad").print(),
                getButton("check").print()
            )
            .log()
        )
          .click()
    ,
    getButton("validation").wait().log(),
    
  getVar("RT").set( v => Date.now() - v )
    
)
  .log("SelectionTimeforTest", getVar("RT"))
  .log("TestedItem", row.ItemImageFile)
  .log("CorrectedChoice", row.CorrectImage)
  .log("IncorrectChoice", row.IncorrectImage)
  .log("TrialNumber", row['Trial number'])
)



//Introduce the memory test
newTrial("MemoryTestIntro1",
    noTopMargin(),

    newHtml("MemoryTestIntro.html")
    .log()
    .print()
,

newVar("RT").global().set( v=> Date.now()),

    newButton("click", "Next")
    .center()
    .css("font-size", "1em")
    .log()
    .print()
    .wait()
,
getVar("RT").set( v => Date.now() - v )
    
    )
.log("ReadTime", getVar("RT"))
.setOption("hideProgressBar", true) 




//Memory test1
PennController. Template("MemoryTest1.csv", row=>
newTrial("MemoryTest1",
    noTopMargin(),
    newText("question", row.TestQuestion1)
      .center()
      .css("font-size", "1.5em")
      .bold()
      .log()
    ,
    newImage("TestImage1", row.TestImage1)
      .size(300, 280)
      .log()
    ,
    
    newButton("yes", "YES")
      .css("font-size", "1.5em", "center at 40%")
      .log()
    ,
    newButton("no", "NO")
      .css("font-size", "1.5em", "center at 60%")
      .log()
    ,
    newCanvas("Test", "100vw", "70vh")
      .add( "35vw", "5vh", getText("question"), 1 )
      .add( "40vw", "15vh", getImage("TestImage1"), 0 )
      .add("35vw", "58vh", getButton("yes"), 2 )
      .add( "60vw", "58vh", getButton("no"), 3 )
      .print()
      .log()
    ,
    newVar("RT").global().set( v => Date.now() )
    ,

    newSelector("choose")
      .add(getButton("yes"), getButton("no"))
      //.shuffle()
      .print()
      .log()
      .wait(),
    getVar("RT").set( v => Date.now() - v )
    )
    .log("TestImage", row.TestImage1)
    .log("SelectionTime", getVar("RT"))
    .log("QuestionAsked", row.TestQuestion1)
    )
    



//Introduce the Interference phase
newTrial("InterferenceIntro",
    noTopMargin(),
    newHtml("InterferenceIntro.html")
    .log()
    .print()
,
newVar("RT").global().set( v=> Date.now()),

newButton("Next")
    .css("font-size", "1em")
    .center()
    .log()
    .print()
    .wait(),
getVar("RT").set( v => Date.now() - v )
    )
.log("ReadTime", getVar("RT"))
.setOption("hideProgressBar", true) 




// Interference phase 
PennController.Template("InterferenceCond4a.csv", row=>
newTrial("InterferenceCond4a",
    //noTopMargin(),

    newImage("bubble", "bubble.png")
        .size(600, 200)
        
    ,
    
    newText("word", row.Item)
        .center()
        .css("font-size", "3em")
        .log()
    ,
    
    newImage("item", row.ItemImageFile)
        .size(220, 155)
        .log()
        
    ,
    
    newImage("Alien", row.AlienImageFile)
        .size(300, 300)
        .log()
        
    ,
    newCanvas( 'Interference4a', "90vw", "80vh")
    .add( "25vw", "0vh", getImage("bubble"), 0 )
    .add( "35vw", "32vh", getImage("Alien"), 1 )
    .add( "28vw", "7vh", getText("word"), 2 )
    .add( "45vw", "1vh", getImage("item"), 3 )
    .print()
    .log()
    ,
    newVar("RT").global().set( v => Date.now() ),
    
    newButton("click", "Next")
        .css("font-size", "1em")
         .center()
        .print()
        .wait()
    ,
    
    getVar("RT").set( v => Date.now() - v )
    )
    
    .log("LearningTimeInterference", getVar("RT"))
    .log("WordTaught", row.Item)
    .log("AlienSpeaking", row.AlienImageFile)
    .log("ItemTaught", row.ItemImageFile)
    )
    



//Introduce the memory test
newTrial("MemoryTestIntro2",
 noTopMargin(),
    newHtml("MemoryTestIntro.html")
    .log()
    .print()
,
newVar("RT").global().set( v=> Date.now()),

    newButton("click", "Next")
    .center()
    .css("font-size", "1em")
    .log()
    .print()
    .wait(),
getVar("RT").set( v => Date.now() - v )
    
    )
.log("ReadTime", getVar("RT"))
.setOption("hideProgressBar", true) 




//Memory test2
PennController. Template("MemoryTest2.csv", row=>
newTrial("MemoryTest2",
    noTopMargin(),
    newText("question", row.TestQuestion2)
      .center()
      .css("font-size", "1.5em")
      .bold()
      .log()
    ,
    newImage("TestImage2", row.TestImage2)
      .size(300, 280)
      .log()
    ,
    
    newButton("yes", "YES")
      .css("font-size", "1.5em", "center at 40%")
      .log()
    ,
    newButton("no", "NO")
      .css("font-size", "1.5em", "center at 60%")
      .log()
    ,
    newCanvas("Test", "100vw", "70vh")
      .add( "35vw", "5vh", getText("question"), 1 )
      .add( "40vw", "15vh", getImage("TestImage2"), 0 )
      .add("35vw", "58vh", getButton("yes"), 2 )
      .add( "60vw", "58vh", getButton("no"), 3 )
      .print()
      .log()
    ,
    newVar("RT").global().set( v=> Date.now()),
    
    newSelector("choose")
      .add(getButton("yes"), getButton("no"))
      //.shuffle()
      .print()
      .wait()
      .log(),
      
  getVar("RT").set( v => Date.now() - v )
    )
    
    .log("SelectTime", getVar("RT"))
    .log("TestImage2", row.TestImage2)
    .log("QuestionAsked2", row.TestQuestion2)
 )
    


//Introduce the final test
newTrial("TestIntro",
    noTopMargin(),
    newHtml("TestIntro.html")
        .log()
        .print()
,
newVar("RT").global().set( v=> Date.now()),

newButton("Next")
    .css("font-size", "1em")
    .center()
    .log()
    .print()
    .wait()
,
getVar("RT").set( v => Date.now() - v )
    )
.log("ReadTime", getVar("RT"))
.setOption("hideProgressBar", true) 





//Testing phase
//Suffix selection S1
PennController.Template("Test_NonFlipped_S1.csv", row=>
newTrial("SuffixSelection1",
    
newImage("AlienTest" , row.AlienImageFile)
    .size(300, 380)
    .log()
,
newImage("Singular" ,  row.ItemHintImage )
    .size(200, 185)
    .log()
,
newImage("Plural" , row.ItemTestImage )
    .size(300, 200)
    .log()
,
newText("Singularword" , row.SingularWord)
    .css("font-size", "2.5em")
    .log()
,
newText("Qmark" , row.Question )
    .css("font-size", "2.5em")
    .log()
,
newImage("Item1" , row.Item1Image )
    .size(170, 50)
    .log()
,
newImage("Item2" , row.Item2Image )
    .size(170, 50)
    .log()
,
newCanvas( 'myCanvas', "100vw", "70vh")
    .add( "20vw", "8vh", getImage("Singular"), 1 )
    .add( "40vw", "0vh", getImage("AlienTest"), 0 )
    .add( "60vw", "8vh", getImage("Plural"), 2 )
    .add( "24vw",  "40vh", getText("Singularword"), 3 )
    .add( "70vw", "40vh", getText("Qmark"), 4 )
    .add( "30vw", "60vh", getImage("Item1"), 5 )
    .add( "55vw", "60vh", getImage("Item2"), 6 )
    .print()
    .log()
,

newText("Click on the word that you think this alien might say.")
  .center()
 .css("font-size", "1.5em")
 .print()
 .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("Item1"), getImage("Item2"))
      .shuffle()
      .log()
      .print()
      .wait(),
      
getVar("RT").set( v => Date.now() - v )
 )
 .log( "SelectionTime" , getVar("RT") )
 .log("HintedSingularForm", row.ItemHintImage )
 .log("PluralFormUnknown", row.ItemTestImage)
 .log("Choice1", row.Item1Image)
 .log("Choice2", row.Item2Image)
 .log("SelectionQuestion", row.Question)
 .log("AlienStimulus", row.AlienImageFile)
 )
 
 
 
 
 
 


// Alien Selection A1

PennController.Template("Test_NonFlipped_A1.csv", row=>
newTrial("AlienSelection1",
newImage("speech", "bubble.png")
    .size(400, 130)
    .log()
,

newImage("AlienA" , row.AlienImageFileA)
    .size(300, 390)
    .log()
    //.css( "border" , "solid 1px black" )
,
newImage("AlienB" ,  row.AlienImageFileB )
    .size(300, 395)
    .log()
    //.css( "border" , "solid 1px black" )
,
newText("word" , row.Item)
    .css("font-size", "2.5em")
    .log()
    
,
newImage("refereceimage", row.WordImage)
   .size(80, 90)
   .log()

,
newCanvas( 'myCanvas', "100vw", "75vh")
    .add( "35vw", "0vh", getImage("speech"), 2 )
    .add( "20vw", "10vh", getImage("AlienA"), 0 )
    .add( "65vw", "10vh", getImage("AlienB" ), 1 )
    .add( "38vw", "4vh", getText("word"), 3 )
    .add( "53vw", "2vh", getImage("refereceimage"), 4 )
    .print()
    .log()
,
newText("Click on the alien that might have said the word.")
  .center()
  .css("font-size", "1.5em")
  .print()
  .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("AlienA"), getImage("AlienB"))
      .shuffle()
      .log()
      .print()
      .wait()
      ,
      
getVar("RT").set( v => Date.now() - v )
)

.log( "SelectionTime" , getVar("RT") )
 .log("ChooseAlien1", row.AlienImageFileA )
 .log("ChooseAlien2", row.AlienImageFileB)
 .log("WordForSelect", row.Item)
)




    

//Suffix selection S2
PennController.Template("Test_NonFlipped_S2.csv", row=>
newTrial("SuffixSelection2",
    
newImage("AlienTest" , row.AlienImageFile)
    .size(300, 380)
    .log()
,
newImage("Singular" ,  row.ItemHintImage )
    .size(200, 185)
    .log()
,
newImage("Plural" , row.ItemTestImage )
    .size(300, 200)
    .log()
,
newText("Singularword" , row.SingularWord)
    .css("font-size", "2.5em")
    .log()
,
newText("Qmark" , row.Question )
    .css("font-size", "2.5em")
    .log()
,
newImage("Item1" , row.Item1Image )
    .size(170, 50)
    .log()
,
newImage("Item2" , row.Item2Image )
    .size(170, 50)
    .log()
,
newCanvas( 'myCanvas', "100vw", "70vh")
    .add( "20vw", "8vh", getImage("Singular"), 1 )
    .add( "40vw", "0vh", getImage("AlienTest"), 0 )
    .add( "60vw", "8vh", getImage("Plural"), 2 )
    .add( "24vw",  "40vh", getText("Singularword"), 3 )
    .add( "70vw", "40vh", getText("Qmark"), 4 )
    .add( "30vw", "60vh", getImage("Item1"), 5 )
    .add( "55vw", "60vh", getImage("Item2"), 6 )
    .print()
    .log()
,

newText("Click on the word that you think this alien might say.")
  .center()
 .css("font-size", "1.5em")
 .print()
 .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("Item1"), getImage("Item2"))
      .shuffle()
      .log()
      .print()
      .wait(),
      
getVar("RT").set( v => Date.now() - v )
 )
 .log( "SelectionTime" , getVar("RT") )
 .log("HintedSingularForm", row.ItemHintImage )
 .log("PluralFormUnknown", row.ItemTestImage)
 .log("Choice1", row.Item1Image)
 .log("Choice2", row.Item2Image)
 .log("SelectionQuestion", row.Question)
 .log("AlienStimulus", row.AlienImageFile)
 )






// Alien Selection A2

PennController.Template("Test_NonFlipped_A2.csv", row=>
newTrial("AlienSelection2",
newImage("speech", "bubble.png")
    .size(400, 130)
    .log()
,

newImage("AlienA" , row.AlienImageFileA)
    .size(300, 390)
    .log()
    //.css( "border" , "solid 1px black" )
,
newImage("AlienB" ,  row.AlienImageFileB )
    .size(300, 395)
    .log()
    //.css( "border" , "solid 1px black" )
,
newText("word" , row.Item)
    .css("font-size", "2.5em")
    .log()
    
,
newImage("refereceimage", row.WordImage)
   .size(80, 90)
   .log()

,
newCanvas( 'myCanvas', "100vw", "75vh")
    .add( "35vw", "0vh", getImage("speech"), 2 )
    .add( "20vw", "10vh", getImage("AlienA"), 0 )
    .add( "65vw", "10vh", getImage("AlienB" ), 1 )
    .add( "38vw", "4vh", getText("word"), 3 )
    .add( "53vw", "2vh", getImage("refereceimage"), 4 )
    .print()
    .log()
,
newText("Click on the alien that might have said the word.")
  .center()
  .css("font-size", "1.5em")
  .print()
  .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("AlienA"), getImage("AlienB"))
      .shuffle()
      .log()
      .print()
      .wait()
      ,
      
getVar("RT").set( v => Date.now() - v )
)

.log( "SelectionTime" , getVar("RT") )
 .log("ChooseAlien1", row.AlienImageFileA )
 .log("ChooseAlien2", row.AlienImageFileB)
 .log("WordForSelect", row.Item)
)







//Suffix selection S3
PennController.Template("Test_NonFlipped_S3.csv", row=>
newTrial("SuffixSelection3",
    
newImage("AlienTest" , row.AlienImageFile)
    .size(300, 380)
    .log()
,
newImage("Singular" ,  row.ItemHintImage )
    .size(200, 185)
    .log()
,
newImage("Plural" , row.ItemTestImage )
    .size(300, 200)
    .log()
,
newText("Singularword" , row.SingularWord)
    .css("font-size", "2.5em")
    .log()
,
newText("Qmark" , row.Question )
    .css("font-size", "2.5em")
    .log()
,
newImage("Item1" , row.Item1Image )
    .size(170, 50)
    .log()
,
newImage("Item2" , row.Item2Image )
    .size(170, 50)
    .log()
,
newCanvas( 'myCanvas', "100vw", "70vh")
    .add( "20vw", "8vh", getImage("Singular"), 1 )
    .add( "40vw", "0vh", getImage("AlienTest"), 0 )
    .add( "60vw", "8vh", getImage("Plural"), 2 )
    .add( "24vw",  "40vh", getText("Singularword"), 3 )
    .add( "70vw", "40vh", getText("Qmark"), 4 )
    .add( "30vw", "60vh", getImage("Item1"), 5 )
    .add( "55vw", "60vh", getImage("Item2"), 6 )
    .print()
    .log()
,

newText("Click on the word that you think this alien might say.")
  .center()
 .css("font-size", "1.5em")
 .print()
 .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("Item1"), getImage("Item2"))
      .shuffle()
      .log()
      .print()
      .wait(),
      
getVar("RT").set( v => Date.now() - v )
 )
 .log( "SelectionTime" , getVar("RT") )
 .log("HintedSingularForm", row.ItemHintImage )
 .log("PluralFormUnknown", row.ItemTestImage)
 .log("Choice1", row.Item1Image)
 .log("Choice2", row.Item2Image)
 .log("SelectionQuestion", row.Question)
 .log("AlienStimulus", row.AlienImageFile)
 )






// Alien Selection A3

PennController.Template("Test_NonFlipped_A3.csv", row=>
newTrial("AlienSelection3",
newImage("speech", "bubble.png")
    .size(400, 130)
    .log()
,

newImage("AlienA" , row.AlienImageFileA)
    .size(300, 390)
    .log()
    //.css( "border" , "solid 1px black" )
,
newImage("AlienB" ,  row.AlienImageFileB )
    .size(300, 395)
    .log()
    //.css( "border" , "solid 1px black" )
,
newText("word" , row.Item)
    .css("font-size", "2.5em")
    .log()
    
,
newImage("refereceimage", row.WordImage)
   .size(80, 90)
   .log()

,
newCanvas( 'myCanvas', "100vw", "75vh")
    .add( "35vw", "0vh", getImage("speech"), 2 )
    .add( "20vw", "10vh", getImage("AlienA"), 0 )
    .add( "65vw", "10vh", getImage("AlienB" ), 1 )
    .add( "38vw", "4vh", getText("word"), 3 )
    .add( "53vw", "2vh", getImage("refereceimage"), 4 )
    .print()
    .log()
,
newText("Click on the alien that might have said the word.")
  .center()
  .css("font-size", "1.5em")
  .print()
  .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("AlienA"), getImage("AlienB"))
      .shuffle()
      .log()
      .print()
      .wait()
      ,
      
getVar("RT").set( v => Date.now() - v )
)

.log( "SelectionTime" , getVar("RT") )
 .log("ChooseAlien1", row.AlienImageFileA )
 .log("ChooseAlien2", row.AlienImageFileB)
 .log("WordForSelect", row.Item)
)










//Suffix selection S4
PennController.Template("Test_NonFlipped_S4.csv", row=>
newTrial("SuffixSelection4",
    
newImage("AlienTest" , row.AlienImageFile)
    .size(300, 380)
    .log()
,
newImage("Singular" ,  row.ItemHintImage )
    .size(200, 185)
    .log()
,
newImage("Plural" , row.ItemTestImage )
    .size(300, 200)
    .log()
,
newText("Singularword" , row.SingularWord)
    .css("font-size", "2.5em")
    .log()
,
newText("Qmark" , row.Question )
    .css("font-size", "2.5em")
    .log()
,
newImage("Item1" , row.Item1Image )
    .size(170, 50)
    .log()
,
newImage("Item2" , row.Item2Image )
    .size(170, 50)
    .log()
,
newCanvas( 'myCanvas', "100vw", "70vh")
    .add( "20vw", "8vh", getImage("Singular"), 1 )
    .add( "40vw", "0vh", getImage("AlienTest"), 0 )
    .add( "60vw", "8vh", getImage("Plural"), 2 )
    .add( "24vw",  "40vh", getText("Singularword"), 3 )
    .add( "70vw", "40vh", getText("Qmark"), 4 )
    .add( "30vw", "60vh", getImage("Item1"), 5 )
    .add( "55vw", "60vh", getImage("Item2"), 6 )
    .print()
    .log()
,

newText("Click on the word that you think this alien might say.")
  .center()
 .css("font-size", "1.5em")
 .print()
 .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("Item1"), getImage("Item2"))
      .shuffle()
      .log()
      .print()
      .wait(),
      
getVar("RT").set( v => Date.now() - v )
 )
 .log( "SelectionTime" , getVar("RT") )
 .log("HintedSingularForm", row.ItemHintImage )
 .log("PluralFormUnknown", row.ItemTestImage)
 .log("Choice1", row.Item1Image)
 .log("Choice2", row.Item2Image)
 .log("SelectionQuestion", row.Question)
 .log("AlienStimulus", row.AlienImageFile)
 )





// Alien Selection A4

PennController.Template("Test_NonFlipped_A4.csv", row=>
newTrial("AlienSelection4",
newImage("speech", "bubble.png")
    .size(400, 130)
    .log()
,

newImage("AlienA" , row.AlienImageFileA)
    .size(300, 390)
    .log()
    //.css( "border" , "solid 1px black" )
,
newImage("AlienB" ,  row.AlienImageFileB )
    .size(300, 395)
    .log()
    //.css( "border" , "solid 1px black" )
,
newText("word" , row.Item)
    .css("font-size", "2.5em")
    .log()
    
,
newImage("refereceimage", row.WordImage)
   .size(80, 90)
   .log()

,
newCanvas( 'myCanvas', "100vw", "75vh")
    .add( "35vw", "0vh", getImage("speech"), 2 )
    .add( "20vw", "10vh", getImage("AlienA"), 0 )
    .add( "65vw", "10vh", getImage("AlienB" ), 1 )
    .add( "38vw", "4vh", getText("word"), 3 )
    .add( "53vw", "2vh", getImage("refereceimage"), 4 )
    .print()
    .log()
,
newText("Click on the alien that might have said the word.")
  .center()
  .css("font-size", "1.5em")
  .print()
  .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("AlienA"), getImage("AlienB"))
      .shuffle()
      .log()
      .print()
      .wait()
      ,
      
getVar("RT").set( v => Date.now() - v )
)

.log( "SelectionTime" , getVar("RT") )
 .log("ChooseAlien1", row.AlienImageFileA )
 .log("ChooseAlien2", row.AlienImageFileB)
 .log("WordForSelect", row.Item)
)




//Suffix selection S5
PennController.Template("Test_NonFlipped_S5.csv", row=>
newTrial("SuffixSelection5",
    
newImage("AlienTest" , row.AlienImageFile)
    .size(300, 380)
    .log()
,
newImage("Singular" ,  row.ItemHintImage )
    .size(200, 185)
    .log()
,
newImage("Plural" , row.ItemTestImage )
    .size(300, 200)
    .log()
,
newText("Singularword" , row.SingularWord)
    .css("font-size", "2.5em")
    .log()
,
newText("Qmark" , row.Question )
    .css("font-size", "2.5em")
    .log()
,
newImage("Item1" , row.Item1Image )
    .size(170, 50)
    .log()
,
newImage("Item2" , row.Item2Image )
    .size(170, 50)
    .log()
,
newCanvas( 'myCanvas', "100vw", "70vh")
    .add( "20vw", "8vh", getImage("Singular"), 1 )
    .add( "40vw", "0vh", getImage("AlienTest"), 0 )
    .add( "60vw", "8vh", getImage("Plural"), 2 )
    .add( "24vw",  "40vh", getText("Singularword"), 3 )
    .add( "70vw", "40vh", getText("Qmark"), 4 )
    .add( "30vw", "60vh", getImage("Item1"), 5 )
    .add( "55vw", "60vh", getImage("Item2"), 6 )
    .print()
    .log()
,

newText("Click on the word that you think this alien might say.")
  .center()
 .css("font-size", "1.5em")
 .print()
 .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("Item1"), getImage("Item2"))
      .shuffle()
      .log()
      .print()
      .wait(),
      
getVar("RT").set( v => Date.now() - v )
 )
 .log( "SelectionTime" , getVar("RT") )
 .log("HintedSingularForm", row.ItemHintImage )
 .log("PluralFormUnknown", row.ItemTestImage)
 .log("Choice1", row.Item1Image)
 .log("Choice2", row.Item2Image)
 .log("SelectionQuestion", row.Question)
 .log("AlienStimulus", row.AlienImageFile)
 )


// Alien Selection A5

PennController.Template("Test_NonFlipped_A5.csv", row=>
newTrial("AlienSelection5",
newImage("speech", "bubble.png")
    .size(400, 130)
    .log()
,

newImage("AlienA" , row.AlienImageFileA)
    .size(300, 390)
    .log()
    //.css( "border" , "solid 1px black" )
,
newImage("AlienB" ,  row.AlienImageFileB )
    .size(300, 395)
    .log()
    //.css( "border" , "solid 1px black" )
,
newText("word" , row.Item)
    .css("font-size", "2.5em")
    .log()
    
,
newImage("refereceimage", row.WordImage)
   .size(80, 90)
   .log()

,
newCanvas( 'myCanvas', "100vw", "75vh")
    .add( "35vw", "0vh", getImage("speech"), 2 )
    .add( "20vw", "10vh", getImage("AlienA"), 0 )
    .add( "65vw", "10vh", getImage("AlienB" ), 1 )
    .add( "38vw", "4vh", getText("word"), 3 )
    .add( "53vw", "2vh", getImage("refereceimage"), 4 )
    .print()
    .log()
,
newText("Click on the alien that might have said the word.")
  .center()
  .css("font-size", "1.5em")
  .print()
  .log()
,

newVar("RT").global().set( v => Date.now() ),

newSelector("choice")
      .add(getImage("AlienA"), getImage("AlienB"))
      .shuffle()
      .log()
      .print()
      .wait()
      ,
      
getVar("RT").set( v => Date.now() - v )
)

.log( "SelectionTime" , getVar("RT") )
 .log("ChooseAlien1", row.AlienImageFileA )
 .log("ChooseAlien2", row.AlienImageFileB)
 .log("WordForSelect", row.Item)
)









//Questionaire1
newTrial("question1",
noTopMargin(),
 newHtml("Q1","Q1.html")
      .radioWarning("Please select an option for this question.")
      .print()
      .log()
 ,
newVar("RT").global().set( v => Date.now() )
,

newButton("click", "Next")
      .css("font-size", "1em", "right")
      .center()
      .print()
      .wait(getHtml("Q1").test.complete()
      .failure(getHtml("Q1").warn()))
      .log(),
      
getVar("RT").set( v => Date.now() - v )
    )
.log( "ID" , PennController.GetURLParameter("id") ) 
.log("AnswerTimeforQs", getVar("RT"))





//Questionaire2
newTrial("question2",
noTopMargin(),
 newHtml("Q2","Q2.html")
      .inputWarning("Please type your answer for this question.")
      .print()
      .log()
 ,
newVar("RT").global().set( v => Date.now() )
,

newButton("click", "Next")
      .css("font-size", "1em", "right")
      .center()
      .print()
      .wait(getHtml("Q2").test.complete()
      .failure(getHtml("Q2").warn()))
      .log(),
      
getVar("RT").set( v => Date.now() - v )
    
    )
    
.log( "ID" , PennController.GetURLParameter("id") ) 
.log("AnswerTimeforQs", getVar("RT"))




//Questionaire3
newTrial("question3",
noTopMargin(),
 newHtml("Q3","Q3.html")
      .radioWarning("Please select an option for this question.")
      .print()
      .log()
 ,
newVar("RT").global().set( v => Date.now() )
,

newButton("click", "Next")
      .css("font-size", "1em", "right")
      .center()
      .print()
      .wait(getHtml("Q3").test.complete()
      .failure(getHtml("Q3").warn()))
      .log(),
      
getVar("RT").set( v => Date.now() - v )
    
    )
    
.log( "ID" , PennController.GetURLParameter("id") ) 
.log("AnswerTimeforQs", getVar("RT"))
//.setOption("hideProgressBar", true) 


//Questionaire4
newTrial("question4",
noTopMargin(),
 newHtml("Q4","Q4.html")
      .radioWarning("Please select an option for this question.")
      .print()
      .log()
 ,
newVar("RT").global().set( v => Date.now() )
,

newButton("click", "Next")
      .css("font-size", "1em", "right")
      .center()
      .print()
      .wait(getHtml("Q4").test.complete()
      .failure(getHtml("Q4").warn()))
      .log(),
      
getVar("RT").set( v => Date.now() - v )
    
    )
    
.log( "ID" , PennController.GetURLParameter("id") ) 
.log("AnswerTimeforQs", getVar("RT"))
//.setOption("hideProgressBar", true) 


//Questionaire5
newTrial("question5",
noTopMargin(),
 newHtml("Q5","Q5.html")
      .radioWarning("Please select an option for this question.")
      .print()
      .log()
 ,
newVar("RT").global().set( v => Date.now() )
,

newButton("click", "Next")
      .css("font-size", "1em", "right")
      .center()
      .print()
      .wait(getHtml("Q5").test.complete()
      .failure(getHtml("Q5").warn()))
      .log(),
      
getVar("RT").set( v => Date.now() - v )
    
    )
    
.log( "ID" , PennController.GetURLParameter("id") ) 
.log("AnswerTimeforQs", getVar("RT"))
//.setOption("hideProgressBar", true) 


//Questionaire6
newTrial("question6",
noTopMargin(),
 newHtml("Q6","Q6.html")
      .radioWarning("Please select an option for this question.")
      .print()
      .log()
 ,
newVar("RT").global().set( v => Date.now() )
,

newButton("click", "Next")
      .css("font-size", "1em", "right")
      .center()
      .print()
      .wait(getHtml("Q6").test.complete()
      .failure(getHtml("Q6").warn()))
      .log(),
      
getVar("RT").set( v => Date.now() - v )
    
    )
    
.log( "ID" , PennController.GetURLParameter("id") ) 
.log("AnswerTimeforQs", getVar("RT"))
//.setOption("hideProgressBar", true) 


//Questionaire7
newTrial("question7",
noTopMargin(),
 newHtml("Q7","Q7.html")
      .inputWarning("Please type your answer for this question.")
      .print()
      .log()
 ,
newVar("RT").global().set( v => Date.now() )
,

newButton("click", "Next")
      .css("font-size", "1em", "right")
      .center()
      .print()
      .wait(getHtml("Q7").test.complete()
      .failure(getHtml("Q7").warn()))
      .log(),
      
getVar("RT").set( v => Date.now() - v )
    
    )
    
.log( "ID" , PennController.GetURLParameter("id") ) 
.log("AnswerTimeforQs", getVar("RT"))
//.setOption("hideProgressBar", true) 


//Questionaire8
newTrial("question8",
noTopMargin(),
 newHtml("Q8","Q8.html")
      .inputWarning("Please type your answer for this question.")
      .print()
      .log()
 ,
newVar("RT").global().set( v => Date.now() )
,

newButton("click", "Next")
      .css("font-size", "1em", "right")
      .center()
      .print()
      .wait(getHtml("Q8").test.complete()
      .failure(getHtml("Q8").warn()))
      .log(),
      
getVar("RT").set( v => Date.now() - v )
    
    )
    
.log( "ID" , PennController.GetURLParameter("id") ) 
.log("AnswerTimeforQs", getVar("RT"))
//.setOption("hideProgressBar", true) 



//This isnecessary to send the results before showing the final screen
PennController.SendResults ("send")




//End of Trial
newTrial("End", 
    noTopMargin(),
    
    newHtml("the end", "end.html")
    .log()
    .print(),
    

    newTimer(1)
    .wait(),
    )
    
 .setOption("countsForProgressBar", false)
 



 


