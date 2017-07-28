// * Version: 0.1
// * 
// * Date: 18.02.2013
// *  
// * Author: Kris McGlinn
// * 
// * Last Modified: 18/08/13
// * 
// * Copyright: 	Knowledge and Data Engineering Group, 
// * 				Department of Computer Science,
// * 				Faculty of Engineering and Systems Science,
// * 				Trinity College
// * 				Dublin 2
// * 				Ireland  
// * 

//These methods are a short time fix and need to be integrated with webGL tool for creation of paths in ontology!!!
function checkPathTo(start, path, end)
{
//    console.log("checkPathTo: " + start + " : " + path + " : " + end);
//    console.log(no_path_text);
//    if(path===no_path_text) alert("Yes");
//    alert(start + path + end);
    //NEW PATH R01
//NEW PATH R01
    if(current_building===0||current_building===1)
    {
    
    if((start==="R01")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR1P3P2P1";
        
    }
    else if((start==="R01")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR1P4P2P1";
        
    }
    else if((start==="R01")&&(path==="P3")&&(end==="P5")){

        return "PathStartR1P3P5";
        
    }    
    else if((start==="R01")&&(path==="P4")&&(end==="P5")){

        return "PathStartR1P4P5";
        
    }
    else if((start==="R01")&&(path==="P3")&&(end==="P6")){

        return "PathStartR1P3P6";
        
    }
    else if((start==="R01")&&(path==="P4")&&(end==="P6")){

        return "PathStartR1P4P6";
        
    }
    else if((start==="R01")&&(path==="P3")&&(end==="R36")){

        return "PathStartR1P3R36";
        
    }
    else if((start==="R01")&&(path==="P4")&&(end==="R36")){

        return "PathStartR1P4R36";
        
    }
    
    else if((start==="R01")&&(path===no_path_text)&&(end==="R36")){

        return "PathStartR1";
        
    }
    else if((start==="R01")&&(path===no_path_text)&&(end==="R07")){

        return "PathStartR1";
        
    }
    else if((start==="R01")&&(path===no_path_text)&&(end==="R01")){

        return "PathStartR1";
        
    }
    else if((start==="R01")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R1";
        
    }
    else if((start==="R01")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R1";
        
    }
    
    else if((start==="R01")&&(path===no_path_text)&&(end==="R25")){

        return "PathStartR1";
        
    }
    else if((start==="R01")&&(path===no_path_text)&&(end==="R26")){

        return "PathStartR1";
        
    }  
    else if((start==="R01")&&(path===no_path_text)&&(end==="R31")){

        return "PathStartR1";
        
    }
    else if((start==="R01")&&(path===no_path_text)&&(end==="R15")){

        return "PathStartR1";
        
    }
    else if((start==="R01")&&(path==="P4")&&(end==="R15")){

        return "PathStartR1P4R15";
        
    }
    
    //NEW PATH R02
    if((start==="R02")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR2P3P2P1";
        
    }
    else if((start==="R02")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR2P4P2P1";
        
    }
    else if((start==="R02")&&(path==="P3")&&(end==="P5")){

        return "PathStartR2P3P5";
        
    }    
    else if((start==="R02")&&(path==="P4")&&(end==="P5")){

        return "PathStartR2P4P5";
        
    }
    else if((start==="R02")&&(path==="P3")&&(end==="P6")){

        return "PathStartR2P3P6";
        
    }
    else if((start==="R02")&&(path==="P4")&&(end==="P6")){

        return "PathStartR2P4P6";
        
    }
    else if((start==="R02")&&(path==="P3")&&(end==="R36")){

        return "PathStartR2P3R36";
        
    }
    else if((start==="R02")&&(path==="P4")&&(end==="R36")){

        return "PathStartR2P4R36";
        
    }
    
    else if((start==="R02")&&(path===no_path_text)&&(end==="R36")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path===no_path_text)&&(end==="R07")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path===no_path_text)&&(end==="R02")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R2";
        
    }
    else if((start==="R02")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R2";
        
    }
    
    else if((start==="R02")&&(path===no_path_text)&&(end==="R25")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path===no_path_text)&&(end==="R26")){

        return "PathStartR2";
        
    }  
    else if((start==="R02")&&(path===no_path_text)&&(end==="R31")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path===no_path_text)&&(end==="R15")){

        return "PathStartR2";
        
    }
    else if((start==="R02")&&(path==="P4")&&(end==="R15")){

        return "PathStartR2P4R15";
        
    }
  //NEW PATH R03
    if((start==="R03")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR3P3P2P1";
        
    }
    else if((start==="R03")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR3P4P2P1";
        
    }
    else if((start==="R03")&&(path==="P3")&&(end==="P5")){

        return "PathStartR3P3P5";
        
    }    
    else if((start==="R03")&&(path==="P4")&&(end==="P5")){

        return "PathStartR3P4P5";
        
    }
    else if((start==="R03")&&(path==="P3")&&(end==="P6")){

        return "PathStartR3P3P6";
        
    }
    else if((start==="R03")&&(path==="P4")&&(end==="P6")){

        return "PathStartR3P4P6";
        
    }
    else if((start==="R03")&&(path==="P3")&&(end==="R36")){

        return "PathStartR3P3R36";
        
    }
    else if((start==="R03")&&(path==="P4")&&(end==="R36")){

        return "PathStartR3P4R36";
        
    }
    
    else if((start==="R03")&&(path===no_path_text)&&(end==="R36")){

        return "PathStartR3";
        
    }
    else if((start==="R03")&&(path===no_path_text)&&(end==="R07")){

        return "PathStartR3";
        
    }
    else if((start==="R03")&&(path===no_path_text)&&(end==="R03")){

        return "PathStartR3";
        
    }
    else if((start==="R03")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R3";
        
    }
    else if((start==="R03")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R3";
        
    }
    
    else if((start==="R03")&&(path===no_path_text)&&(end==="R25")){

        return "PathStartR3";
        
    }
    else if((start==="R03")&&(path===no_path_text)&&(end==="R26")){

        return "PathStartR3";
        
    }  
    else if((start==="R03")&&(path===no_path_text)&&(end==="R31")){

        return "PathStartR3";
        
    }
    else if((start==="R03")&&(path===no_path_text)&&(end==="R15")){

        return "PathStartR3";
        
    }
    else if((start==="R03")&&(path==="P4")&&(end==="R15")){

        return "PathStartR3P4R15";
        
    }
    //NEW PATH R04
    if((start==="R04")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR4P3P2P1";
        
    }
    else if((start==="R04")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR4P4P2P1";
        
    }
    else if((start==="R04")&&(path==="P3")&&(end==="P5")){

        return "PathStartR4P3P5";
        
    }    
    else if((start==="R04")&&(path==="P4")&&(end==="P5")){

        return "PathStartR4P4P5";
        
    }
    else if((start==="R04")&&(path==="P3")&&(end==="P6")){

        return "PathStartR4P3P6";
        
    }
    else if((start==="R04")&&(path==="P4")&&(end==="P6")){

        return "PathStartR4P4P6";
        
    }
    else if((start==="R04")&&(path==="P3")&&(end==="R36")){

        return "PathStartR4P3R36";
        
    }
    else if((start==="R04")&&(path==="P4")&&(end==="R36")){

        return "PathStartR4P4R36";
        
    }
    
    else if((start==="R04")&&(path===no_path_text)&&(end==="R36")){

        return "PathStartR4";
        
    }
    else if((start==="R04")&&(path===no_path_text)&&(end==="R07")){

        return "PathStartR4";
        
    }
    else if((start==="R04")&&(path===no_path_text)&&(end==="R04")){

        return "PathStartR4";
        
    }
    else if((start==="R04")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R4";
        
    }
    else if((start==="R04")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R4";
        
    }
    
    else if((start==="R04")&&(path===no_path_text)&&(end==="R25")){

        return "PathStartR4";
        
    }
    else if((start==="R04")&&(path===no_path_text)&&(end==="R26")){

        return "PathStartR4";
        
    }  
    else if((start==="R04")&&(path===no_path_text)&&(end==="R31")){

        return "PathStartR4";
        
    }
    else if((start==="R04")&&(path===no_path_text)&&(end==="R15")){

        return "PathStartR4";
        
    }
    else if((start==="R04")&&(path==="P4")&&(end==="R15")){

        return "PathStartR4P4R15";
        
    }
    //NEW PATH R05
    if((start==="R05")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR5P3P2P1";
        
    }
    else if((start==="R05")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR5P4P2P1";
        
    }
    else if((start==="R05")&&(path==="P3")&&(end==="P5")){

        return "PathStartR5P3P5";
        
    }    
    else if((start==="R05")&&(path==="P4")&&(end==="P5")){

        return "PathStartR5P4P5";
        
    }
    else if((start==="R05")&&(path==="P3")&&(end==="P6")){

        return "PathStartR5P3P6";
        
    }
    else if((start==="R05")&&(path==="P4")&&(end==="P6")){

        return "PathStartR5P4P6";
        
    }
    else if((start==="R05")&&(path==="P3")&&(end==="R36")){

        return "PathStartR5P3R36";
        
    }
    else if((start==="R05")&&(path==="P4")&&(end==="R36")){

        return "PathStartR5P4R36";
        
    }
    
    else if((start==="R05")&&(path===no_path_text)&&(end==="R36")){

        return "PathStartR5";
        
    }
    else if((start==="R05")&&(path===no_path_text)&&(end==="R07")){

        return "PathStartR5";
        
    }
    else if((start==="R05")&&(path===no_path_text)&&(end==="R05")){

        return "PathStartR5";
        
    }
    else if((start==="R05")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R5";
        
    }
    else if((start==="R05")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R5";
        
    }
    
    else if((start==="R05")&&(path===no_path_text)&&(end==="R25")){

        return "PathStartR5";
        
    }
    else if((start==="R05")&&(path===no_path_text)&&(end==="R26")){

        return "PathStartR5";
        
    }  
    else if((start==="R05")&&(path===no_path_text)&&(end==="R31")){

        return "PathStartR5";
        
    }
    else if((start==="R05")&&(path===no_path_text)&&(end==="R15")){

        return "PathStartR5";
        
    }
    else if((start==="R05")&&(path==="P4")&&(end==="R15")){

        return "PathStartR5P4R15";
        
    }
   
   //NEW PATH R06

    if((start==="R06")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR6P3P2P1";
        
    }
    else if((start==="R06")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR6P4P2P1";
        
    }
    else if((start==="R06")&&(path==="P3")&&(end==="P5")){

        return "PathStartR6P3P5";
        
    }    
    else if((start==="R06")&&(path==="P4")&&(end==="P5")){

        return "PathStartR6P4P5";
        
    }
    else if((start==="R06")&&(path==="P3")&&(end==="P6")){

        return "PathStartR6P3P6";
        
    }
    else if((start==="R06")&&(path==="P4")&&(end==="P6")){

        return "PathStartR6P4P6";
        
    }
    else if((start==="R06")&&(path==="P3")&&(end==="R36")){

        return "PathStartR6P3R36";
        
    }
    else if((start==="R06")&&(path==="P4")&&(end==="R36")){

        return "PathStartR6P4R36";
        
    }
    
    else if((start==="R06")&&(path===no_path_text)&&(end==="R36")){

        return "PathStartR6";
        
    }
    else if((start==="R06")&&(path===no_path_text)&&(end==="R07")){

        return "PathStartR6";
        
    }
    else if((start==="R06")&&(path===no_path_text)&&(end==="R05")){

        return "PathStartR6";
        
    }
     
    else if((start==="R06")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R6";
        
    }
    else if((start==="R06")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R6";
        
    }
    
    else if((start==="R06")&&(path===no_path_text)&&(end==="R25")){

        return "PathStartR6";
        
    }
    else if((start==="R06")&&(path===no_path_text)&&(end==="R26")){

        return "PathStartR6";
        
    }  
    else if((start==="R06")&&(path===no_path_text)&&(end==="R31")){

        return "PathStartR6";
        
    }
    else if((start==="R06")&&(path===no_path_text)&&(end==="R15")){

        return "PathStartR6";
        
    }
    else if((start==="R06")&&(path==="P4")&&(end==="R15")){

        return "PathStartR6P4R15";
        
    }
//    if((start==="R06")){
//
//        return "PathMeeting";
//        
//    }
//    else if((end==="R06")){
//
//        return "PathMeeting";
//        
//    }
    //NEW PATH R09
    if((start==="R09")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR9P3P2P1";
        
    }
    else if((start==="R09")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR9P4P2P1";
        
    }
    else if((start==="R09")&&(path==="P3")&&(end==="P5")){

        return "PathStartR9P3P5";
        
    }    
    else if((start==="R09")&&(path==="P4")&&(end==="P5")){

        return "PathStartR9P4P5";
        
    }
    else if((start==="R09")&&(path==="P3")&&(end==="P6")){

        return "PathStartR9P3P6";
        
    }
    else if((start==="R09")&&(path==="P4")&&(end==="P6")){

        return "PathStartR9P4P6";
        
    }
    else if((start==="R09")&&(path==="P3")&&(end==="R36")){

        return "PathStartR9P3R36";
        
    }
    else if((start==="R09")&&(path==="P4")&&(end==="R36")){

        return "PathStartR9P4R36";
        
    }
    
    else if((start==="R09")&&(path===no_path_text)&&(end==="R07")){

        return "PathStartR9";
        
    }
    else if((start==="R09")&&(path===no_path_text)&&(end==="R09")){

        return "PathStartR9";
        
    }
    else if((start==="R09")&&(path===no_path_text)&&(end==="R09")){

        return "PathStartR9";
        
    }
    else if((start==="R09")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R9";
        
    }
    else if((start==="R09")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R9";
        
    }
    
    else if((start==="R09")&&(path===no_path_text)&&(end==="R25")){

        return "PathStartR9";
        
    }
    else if((start==="R09")&&(path===no_path_text)&&(end==="R26")){

        return "PathStartR9";
        
    }  
    else if((start==="R09")&&(path===no_path_text)&&(end==="R31")){

        return "PathStartR9";
        
    }
    else if((start==="R09")&&(path===no_path_text)&&(end==="R15")){

        return "PathStartR9";
        
    }
    else if((start==="R09")&&(path==="P4")&&(end==="R15")){

        return "PathStartR9P4R15";
        
    }
    //NEW PATH R19
    if((start==="R19")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR19P3P2P1";
        
    }
    else if((start==="R19")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR19P4P2P1";
        
    }
    else if((start==="R19")&&(path==="P3")&&(end==="P5")){

        return "PathStartR19P3P5";
        
    }    
    else if((start==="R19")&&(path==="P4")&&(end==="P5")){

        return "PathStartR19P4P5";
        
    }
    else if((start==="R19")&&(path==="P3")&&(end==="P6")){

        return "PathStartR19P3P6";
        
    }
    else if((start==="R19")&&(path==="P4")&&(end==="P6")){

        return "PathStartR19P4P6";
        
    }
    else if((start==="R19")&&(path==="P3")&&(end==="R36")){

        return "PathStartR19P3R36";
        
    }
    else if((start==="R19")&&(path==="P4")&&(end==="R36")){

        return "PathStartR19P4R36";
        
    }
    
    else if((start==="R19")&&(path===no_path_text)&&(end==="R36")){

        return "PathStartR19";
        
    }
    else if((start==="R19")&&(path===no_path_text)&&(end==="R07")){

        return "PathStartR19";
        
    }
    else if((start==="R19")&&(path===no_path_text)&&(end==="R19")){

        return "PathStartR19";
        
    }
    else if((start==="R19")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R19";
        
    }
    else if((start==="R19")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R19";
        
    }
    
    else if((start==="R19")&&(path===no_path_text)&&(end==="R25")){

        return "PathStartR19";
        
    }
    else if((start==="R19")&&(path===no_path_text)&&(end==="R26")){

        return "PathStartR19";
        
    }  
    else if((start==="R19")&&(path===no_path_text)&&(end==="R31")){

        return "PathStartR19";
        
    }
    else if((start==="R19")&&(path===no_path_text)&&(end==="R15")){

        return "PathStartR19";
        
    }
    else if((start==="R19")&&(path==="P4")&&(end==="R15")){

        return "PathStartR19P4R15";
        
    }
    

//   
//    else if((start==="C01")&&(path===no_path_text)&&(end==="S01")){
//
//        return "PathStartS02";
//        
//    }
//    
//    else if((start==="S02")&&(path===no_path_text)&&(end==="S05")){
//
//        return "PathStartS02";
//        
//    }
//    
//    else if((start==="S02")&&(path===no_path_text)&&(end==="S06")){
//
//        return "PathStartS02";
//        
//    }  
//    
//    else if((start==="S02")&&(path===no_path_text)&&(end==="S07")){
//
//        return "PathStartS02";
//        
//    }  
//        else if((start==="S02")&&(path===no_path_text)&&(end==="P3")){
//
//        return "PathStartS02";
//        
//    }
//    
//    else if((start==="S02")&&(path===no_path_text)&&(end==="TM1")){
//
//        return "PathStartS02";
//        
//    }  
//    
//    else if((start==="S02")&&(path===no_path_text)&&(end==="TF1")){
//
//        return "PathStartS02";
//        
//    }  
    
    /*MEDIATIC*/
    
    if((start==="S02")&&(path==="P2")&&(end==="P1")){

        return "PathStartS02P2P1";
        
    }
   
    else if((start==="S02")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartS02";
        
    }
    
    else if((start==="S02")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartS02";
        
    }
    
    else if((start==="S02")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartS02";
        
    }  
    
    else if((start==="S02")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartS02";
        
    }  
        else if((start==="S02")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartS02";
        
    }
    
    else if((start==="S02")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartS02";
        
    }  
    
    else if((start==="S02")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartS02";
        
    }  

    if((start==="S03")&&(path==="P2")&&(end==="P1")){

        return "PathStartS03P2P1";
        
    }
   
    else if((start==="S03")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartS03";
        
    }
    
    else if((start==="S03")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartS03";
        
    }
    
    else if((start==="S03")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartS03";
        
    }  
    
    else if((start==="S02")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartS03";
        
    }  
        else if((start==="S03")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartS03";
        
    }
    
    else if((start==="S03")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartS03";
        
    }  
    
    else if((start==="S03")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartS03";
        
    }  
    
    if((start==="S04")&&(path==="P2")&&(end==="P1")){

        return "PathStartS04P2P1";
        
    }
   
    else if((start==="S04")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartS04";
        
    }
    
    else if((start==="S04")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartS04";
        
    }
    
    else if((start==="S04")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartS04";
        
    }  
    
    else if((start==="S04")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartS04";
        
    }  
    
    else if((start==="S04")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartS04";
        
    }
    
    else if((start==="S04")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartS04";
        
    }  
    
    else if((start==="S04")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartS04";
        
    }  


   if((start==="S08")&&(path==="P2")&&(end==="P1")){

        return "PathStartS08P2P1";
        
    }
   
    else if((start==="S08")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartS08";
        
    }
    
    else if((start==="S08")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartS08";
        
    }
    
    else if((start==="S08")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartS08";
        
    }  
    
    else if((start==="S08")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartS08";
        
    }  
    
    else if((start==="S08")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartS08";
        
    }
    
    else if((start==="S08")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartS08";
        
    }  
    
    else if((start==="S08")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartS08";
        
    }  
    
    
    if((start==="S10")&&(path==="P2")&&(end==="P1")){

        return "PathStartS10P2P1";
        
    }
   
    else if((start==="S10")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartS10";
        
    }
    
    else if((start==="S10")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartS10";
        
    }
    
    else if((start==="S10")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartS10";
        
    }  
    
    else if((start==="S10")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartS10";
        
    }  
    else if((start==="S10")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartS10";
        
    }
    
    else if((start==="S10")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartS10";
        
    }  
    
    else if((start==="S10")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartS11";
        
    }  
    
    if((start==="S11")&&(path==="P2")&&(end==="P1")){

        return "PathStartS11P2P1";
        
    }
   
    else if((start==="S11")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartS11";
        
    }
    
    else if((start==="S11")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartS11";
        
    }
    
    else if((start==="S11")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartS11";
        
    }  
    
    else if((start==="S11")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartS11";
        
    }  
    
    else if((start==="S11")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartS11";
        
    }
    
    else if((start==="S11")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartS11";
        
    }  
    
    else if((start==="S11")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartS11";
        
    }  


    if((start==="S12")&&(path==="P2")&&(end==="P1")){

        return "PathStartS12P2P1";
        
    }
   
    else if((start==="S12")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartS12";
        
    }
    
    else if((start==="S12")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartS12";
        
    }
    
    else if((start==="S12")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartS12";
        
    }  
    
    else if((start==="S12")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartS12";
        
    }  
    
    else if((start==="S12")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartS12";
        
    }
    
    else if((start==="S12")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartS12";
        
    }  
    
    else if((start==="S12")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartS12";
        
    }  
    
/*MEDIATIC*/
    if((start==="R01")&&(path==="P2")&&(end==="P1")){

        return "PathStartR01P2P1";
        
    }
   
    else if((start==="R01")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR1";
        
    }
    
    else if((start==="R01")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR1";
        
    }
    
    else if((start==="R01")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR1";
        
    }  
    
    else if((start==="R01")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR1";
        
    }  
        else if((start==="R01")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR1";
        
    }
    
    else if((start==="R01")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR1";
        
    }  
    
    else if((start==="R01")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR1";
        
    }  
    if((start==="R02")&&(path==="P2")&&(end==="P1")){

        return "PathStartR02P2P1";
        
    }
   
    else if((start==="R02")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR2";
        
    }
    
    else if((start==="R02")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR2";
        
    }
    
    else if((start==="R02")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR2";
        
    }  
    
    else if((start==="R02")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR2";
        
    }  
        else if((start==="R02")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR2";
        
    }
    
    else if((start==="R02")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR2";
        
    }  
    
    else if((start==="R02")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR2";
        
    }  

    if((start==="R03")&&(path==="P2")&&(end==="P1")){

        return "PathStartR03P2P1";
        
    }
   
    else if((start==="R03")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR3";
        
    }
    
    else if((start==="R03")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR3";
        
    }
    
    else if((start==="R03")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR3";
        
    }  
    
    else if((start==="R02")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR3";
        
    }  
        else if((start==="R03")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR3";
        
    }
    
    else if((start==="R03")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR3";
        
    }  
    
    else if((start==="R03")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR3";
        
    }  
    
    if((start==="R04")&&(path==="P2")&&(end==="P1")){

        return "PathStartR04P2P1";
        
    }
   
    else if((start==="R04")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR4";
        
    }
    
    else if((start==="R04")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR4";
        
    }
    
    else if((start==="R04")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR4";
        
    }  
    
    else if((start==="R04")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR4";
        
    }  
    
    else if((start==="R04")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR4";
        
    }
    
    else if((start==="R04")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR4";
        
    }  
    
    else if((start==="R04")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR4";
        
    }  

    if((start==="R05")&&(path==="P2")&&(end==="P1")){

        return "PathStartR05P2P1";
        
    }
   
    else if((start==="R05")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR5";
        
    }
    
    else if((start==="R05")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR5";
        
    }
    
    else if((start==="R05")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR5";
        
    }  
    
    else if((start==="R05")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR5";
        
    }  
    
    else if((start==="R05")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR5";
        
    }
    
    else if((start==="R05")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR5";
        
    }  
    
    else if((start==="R05")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR5";
        
    }  

    if((start==="R06")&&(path==="P2")&&(end==="P1")){

        return "PathStartR06P2P1";
        
    }
   
    else if((start==="R06")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR6";
        
    }
    
    else if((start==="R06")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR6";
        
    }
    
    else if((start==="R06")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR6";
        
    }  
    
    else if((start==="R06")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR6";
        
    }  
    
    else if((start==="R06")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR6";
        
    }
    
    else if((start==="R06")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR6";
        
    }  
    
    else if((start==="R06")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR6";
        
    }  

    if((start==="R07")&&(path==="P2")&&(end==="P1")){

        return "PathStartR07P2P1";
        
    }
   
    else if((start==="R07")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR7";
        
    }
    
    else if((start==="R07")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR7";
        
    }
    
    else if((start==="R07")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR7";
        
    }  
    
    else if((start==="R07")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR7";
        
    }  
    
    else if((start==="R07")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR7";
        
    }
    
    else if((start==="R07")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR7";
        
    }  
    
    else if((start==="R07")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR7";
        
    }  


   if((start==="R08")&&(path==="P2")&&(end==="P1")){

        return "PathStartR08P2P1";
        
    }
   
    else if((start==="R08")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR8";
        
    }
    
    else if((start==="R08")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR8";
        
    }
    
    else if((start==="R08")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR8";
        
    }  
    
    else if((start==="R08")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR8";
        
    }  
    
    else if((start==="R08")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR8";
        
    }
    
    else if((start==="R08")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR8";
        
    }  
    
    else if((start==="R08")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR8";
        
    }  
    
    
    if((start==="R09")&&(path==="P2")&&(end==="P1")){

        return "PathStartR09P2P1";
        
    }
   
    else if((start==="R09")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR9";
        
    }
    
    else if((start==="R09")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR9";
        
    }
    
    else if((start==="R09")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR9";
        
    }  
    
    else if((start==="R09")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR9";
        
    }  
    
    else if((start==="R09")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR9";
        
    }
    
    else if((start==="R09")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR9";
        
    }  
    
    else if((start==="R09")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR9";
        
    }  

    
    if((start==="R10")&&(path==="P2")&&(end==="P1")){

        return "PathStartR10P2P1";
        
    }
   
    else if((start==="R10")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR10";
        
    }
    
    else if((start==="R10")&&(path===no_path_text)&&(end==="R05")){

        return "PathStartR10";
        
    }
    
    else if((start==="R10")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR10";
        
    }  
    
    else if((start==="R10")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR10";
        
    }  
    else if((start==="R10")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR10";
        
    }
    
    else if((start==="R10")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR10";
        
    }  
    
    else if((start==="R10")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR10";
        
    }  
    
    
    
    if((start==="R11")&&(path==="P2")&&(end==="P1")){

        return "PathStartR11P2P1";
        
    }
   
    else if((start==="R11")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR11";
        
    }
    
    else if((start==="R11")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR11";
        
    }
    
    else if((start==="R11")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR11";
        
    }  
    
    else if((start==="R11")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR11";
        
    }  
    
    else if((start==="R11")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR11";
        
    }
    
    else if((start==="R11")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR11";
        
    }  
    
    else if((start==="R11")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR11";
        
    }  
    
        if((start==="R12")&&(path==="P2")&&(end==="P1")){

        return "PathStartR12P2P1";
        
    }
   
    else if((start==="R12")&&(path===no_path_text)&&(end==="S01")){

        return "PathStartR12";
        
    }
    
    else if((start==="R12")&&(path===no_path_text)&&(end==="S05")){

        return "PathStartR12";
        
    }
    
    else if((start==="R12")&&(path===no_path_text)&&(end==="S06")){

        return "PathStartR12";
        
    }  
    
    else if((start==="R12")&&(path===no_path_text)&&(end==="S07")){

        return "PathStartR12";
        
    }  
    
    else if((start==="R12")&&(path===no_path_text)&&(end==="P3")){

        return "PathStartR12";
        
    }
    
    else if((start==="R12")&&(path===no_path_text)&&(end==="TM1")){

        return "PathStartR12";
        
    }  
    
    else if((start==="R12")&&(path===no_path_text)&&(end==="TF1")){

        return "PathStartR12";
        
    }  

    }
    
    if(current_building===2)
    {
        /*BLUENET*/

        if((start==="M01"))
        {

            return "PathStartM01";

        }
        if((start==="M02"))
        {

            return "PathStartM02";

        }
        if((start==="M03"))
        {

            return "PathStartM03";

        }
        if((start==="M04"))
        {

            return "PathStartM04";

        }
        if((start==="M05"))
        {

            return "PathStartM05";

        }
        if((start==="M06"))
        {

            return "PathStartM06";

        } 
        if((start==="M07"))
        {

            return "PathStartM07";

        }
        if((start==="M08"))
        {

            return "PathStartM08";

        }
        if((start==="M09"))
        {

            return "PathStartM09";

        }
        if((start==="R01"))
        {

            return "PathStartR01";

        }
        if((start==="R02"))
        {

            return "PathStartR02";

        }
        if((start==="R03"))
        {

            return "PathStartR03";

        }
        if((start==="R04"))
        {

            return "PathStartR04";

        }
        if((start==="R05"))
        {

            return "PathStartR05";

        }
        if((start==="R06"))
        {

            return "PathStartR06";

        } 
        if((start==="R07"))
        {

            return "PathStartR07";

        }
        if((start==="R08"))
        {

            return "PathStartR08";

        }
        if((start==="R09"))
        {

            return "PathStartR09";

        }
        else
        {
            
            return "PathStartP1";

        }
    }

}








































function checkPathFrom(start, path, end){

//    console.log("checkPathFrom: " + start + " : " + path + " : " + end);
       //NEW PATH R01
    if(current_building===0||current_building===1)
    {
        if((start==="P1")&&(path==="P2-P3")&&(end==="R01")){

            return "PathStartP1P2P3R1";

        }
        else if((start==="P1")&&(path==="P2-P4")&&(end==="R01")){

            return "PathStartP1P2P4R1";

        }
        else if((start==="P5")&&(path==="P3")&&(end==="R01")){

            return "PathStartP5P3R1";

        }
        else if((start==="P5")&&(path==="P4")&&(end==="R01")){

            return "PathStartP5P4R1";

        }
        else if((start==="P6")&&(path==="P3")&&(end==="R01")){

            return "PathStartP6P3R1";

        }
        else if((start==="P6")&&(path==="P4")&&(end==="R01")){

            return "PathStartP6P4R1";

        }
        else if((start==="R36")&&(path==="P3")&&(end==="R01")){

            return "PathStartR36P3R1";

        }
        else if((start==="R36")&&(path==="P4")&&(end==="R01")){

            return "PathStartR36P4R1";

        }

        else if((start==="R36")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartR1";

        }
        else if((start==="R07")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartR7";

        }
        else if((start==="R01")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartR1";

        }
        else if((start==="R13")&&(path==="P3")&&(end==="R01")){

            return "PathStartR13P3R1";

        }
        else if((start==="R13")&&(path==="P4")&&(end==="R01")){

            return "PathStartR13P4R1";

        }
        else if((start==="R25")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartR25";

        }
        else if((start==="R26")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartR26";

        } 
         else if((start==="R31")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartR31";

        } 
        else if((start==="R15")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartR15";

        }
        else if((start==="R15")&&(path==="P4")&&(end==="R01")){

            return "PathStartR15P4R1";

        } 

        //NEW PATH R02
        if((start==="P1")&&(path==="P2-P3")&&(end==="R02")){

            return "PathStartP1P2P3R2";

        }
        else if((start==="P1")&&(path==="P2-P4")&&(end==="R02")){

            return "PathStartP1P2P4R2";

        }
        else if((start==="P5")&&(path==="P3")&&(end==="R02")){

            return "PathStartP5P3R2";

        }
        else if((start==="P5")&&(path==="P4")&&(end==="R02")){

            return "PathStartP5P4R2";

        }
        else if((start==="P6")&&(path==="P3")&&(end==="R02")){

            return "PathStartP6P3R2";

        }
        else if((start==="P6")&&(path==="P4")&&(end==="R02")){

            return "PathStartP6P4R2";

        }
        else if((start==="R36")&&(path==="P3")&&(end==="R02")){

            return "PathStartR36P3R2";

        }
        else if((start==="R36")&&(path==="P4")&&(end==="R02")){

            return "PathStartR36P4R2";

        }

        else if((start==="R36")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartR2";

        }
        else if((start==="R07")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartR7";

        }
        else if((start==="R02")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartR2";

        }
        else if((start==="R13")&&(path==="P3")&&(end==="R02")){

            return "PathStartR13P3R2";

        }
        else if((start==="R13")&&(path==="P4")&&(end==="R02")){

            return "PathStartR13P4R2";

        }
        else if((start==="R25")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartR25";

        }
        else if((start==="R26")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartR26";

        } 
         else if((start==="R31")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartR31";

        } 
        else if((start==="R15")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartR15";

        }
        else if((start==="R15")&&(path==="P4")&&(end==="R02")){

            return "PathStartR15P4R2";

        } 
            //NEW PATH R03
        if((start==="P1")&&(path==="P2-P3")&&(end==="R03")){

            return "PathStartP1P2P3R2";

        }
        else if((start==="P1")&&(path==="P2-P4")&&(end==="R03")){

            return "PathStartP1P2P4R2";

        }
        else if((start==="P5")&&(path==="P3")&&(end==="R03")){

            return "PathStartP5P3R2";

        }
        else if((start==="P5")&&(path==="P4")&&(end==="R03")){

            return "PathStartP5P4R2";

        }
        else if((start==="P6")&&(path==="P3")&&(end==="R03")){

            return "PathStartP6P3R2";

        }
        else if((start==="P6")&&(path==="P4")&&(end==="R03")){

            return "PathStartP6P4R2";

        }
        else if((start==="R36")&&(path==="P3")&&(end==="R03")){

            return "PathStartR36P3R2";

        }
        else if((start==="R36")&&(path==="P4")&&(end==="R03")){

            return "PathStartR36P4R2";

        }

        else if((start==="R36")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartR2";

        }
        else if((start==="R07")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartR7";

        }
        else if((start==="R03")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartR2";

        }
        else if((start==="R13")&&(path==="P3")&&(end==="R03")){

            return "PathStartR13P3R2";

        }
        else if((start==="R13")&&(path==="P4")&&(end==="R03")){

            return "PathStartR13P4R2";

        }
        else if((start==="R25")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartR25";

        }
        else if((start==="R26")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartR26";

        } 
         else if((start==="R31")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartR31";

        } 
        else if((start==="R15")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartR15";

        }
        else if((start==="R15")&&(path==="P4")&&(end==="R03")){

            return "PathStartR15P4R2";

        } 
            //NEW PATH R04
        if((start==="P1")&&(path==="P2-P3")&&(end==="R04")){

            return "PathStartP1P2P3R2";

        }
        else if((start==="P1")&&(path==="P2-P4")&&(end==="R04")){

            return "PathStartP1P2P4R2";

        }
        else if((start==="P5")&&(path==="P3")&&(end==="R04")){

            return "PathStartP5P3R2";

        }
        else if((start==="P5")&&(path==="P4")&&(end==="R04")){

            return "PathStartP5P4R2";

        }
        else if((start==="P6")&&(path==="P3")&&(end==="R04")){

            return "PathStartP6P3R2";

        }
        else if((start==="P6")&&(path==="P4")&&(end==="R04")){

            return "PathStartP6P4R2";

        }
        else if((start==="R36")&&(path==="P3")&&(end==="R04")){

            return "PathStartR36P3R2";

        }
        else if((start==="R36")&&(path==="P4")&&(end==="R04")){

            return "PathStartR36P4R2";

        }

        else if((start==="R36")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartR2";

        }
        else if((start==="R07")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartR7";

        }
        else if((start==="R04")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartR2";

        }
        else if((start==="R13")&&(path==="P3")&&(end==="R04")){

            return "PathStartR13P3R2";

        }
        else if((start==="R13")&&(path==="P4")&&(end==="R04")){

            return "PathStartR13P4R2";

        }
        else if((start==="R25")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartR25";

        }
        else if((start==="R26")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartR26";

        } 
         else if((start==="R31")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartR31";

        } 
        else if((start==="R15")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartR15";

        }
        else if((start==="R15")&&(path==="P4")&&(end==="R04")){

            return "PathStartR15P4R2";

        } 
            //NEW PATH R05
        if((start==="P1")&&(path==="P2-P3")&&(end==="R05")){

            return "PathStartP1P2P3R2";

        }
        else if((start==="P1")&&(path==="P2-P4")&&(end==="R05")){

            return "PathStartP1P2P4R2";

        }
        else if((start==="P5")&&(path==="P3")&&(end==="R05")){

            return "PathStartP5P3R2";

        }
        else if((start==="P5")&&(path==="P4")&&(end==="R05")){

            return "PathStartP5P4R2";

        }
        else if((start==="P6")&&(path==="P3")&&(end==="R05")){

            return "PathStartP6P3R2";

        }
        else if((start==="P6")&&(path==="P4")&&(end==="R05")){

            return "PathStartP6P4R2";

        }
        else if((start==="R36")&&(path==="P3")&&(end==="R05")){

            return "PathStartR36P3R2";

        }
        else if((start==="R36")&&(path==="P4")&&(end==="R05")){

            return "PathStartR36P4R2";

        }

        else if((start==="R36")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartR2";

        }
        else if((start==="R07")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartR7";

        }
        else if((start==="R05")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartR2";

        }
        else if((start==="R13")&&(path==="P3")&&(end==="R05")){

            return "PathStartR13P3R2";

        }
        else if((start==="R13")&&(path==="P4")&&(end==="R05")){

            return "PathStartR13P4R2";

        }
        else if((start==="R25")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartR25";

        }
        else if((start==="R26")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartR26";

        } 
         else if((start==="R31")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartR31";

        } 
        else if((start==="R15")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartR15";

        }
        else if((start==="R15")&&(path==="P4")&&(end==="R05")){

            return "PathStartR15P4R2";

        } 
    //        //NEW PATH R06
    //    if((start==="P1")&&(path==="P2-P3")&&(end==="R06")){
    //
    //        return "PathStartP1P2P3R2";
    //        
    //    }
    //    else if((start==="P1")&&(path==="P2-P4")&&(end==="R06")){
    //
    //        return "PathStartP1P2P4R2";
    //        
    //    }
    //    else if((start==="P5")&&(path==="P3")&&(end==="R06")){
    //
    //        return "PathStartP5P3R2";
    //        
    //    }
    //    else if((start==="P5")&&(path==="P4")&&(end==="R06")){
    //
    //        return "PathStartP5P4R2";
    //        
    //    }
    //    else if((start==="P6")&&(path==="P3")&&(end==="R06")){
    //
    //        return "PathStartP6P3R2";
    //        
    //    }
    //    else if((start==="P6")&&(path==="P4")&&(end==="R06")){
    //
    //        return "PathStartP6P4R2";
    //        
    //    }
    //    else if((start==="R36")&&(path==="P3")&&(end==="R06")){
    //
    //        return "PathStartR36P3R2";
    //        
    //    }
    //    else if((start==="R36")&&(path==="P4")&&(end==="R06")){
    //
    //        return "PathStartR36P4R2";
    //        
    //    }
    //    
    //    else if((start==="R36")&&(path===no_path_text)&&(end==="R06")){
    //
    //        return "PathStartR2";
    //        
    //    }
    //    else if((start==="R07")&&(path===no_path_text)&&(end==="R06")){
    //
    //        return "PathStartR7";
    //        
    //    }
    //    else if((start==="R06")&&(path===no_path_text)&&(end==="R06")){
    //
    //        return "PathStartR2";
    //        
    //    }
    //    else if((start==="R13")&&(path==="P3")&&(end==="R06")){
    //
    //        return "PathStartR13P3R2";
    //        
    //    }
    //    else if((start==="R13")&&(path==="P4")&&(end==="R06")){
    //
    //        return "PathStartR13P4R2";
    //        
    //    }
    //    else if((start==="R25")&&(path===no_path_text)&&(end==="R06")){
    //
    //        return "PathStartR25";
    //        
    //    }
    //    else if((start==="R26")&&(path===no_path_text)&&(end==="R06")){
    //
    //        return "PathStartR26";
    //        
    //    } 
    //     else if((start==="R31")&&(path===no_path_text)&&(end==="R06")){
    //
    //        return "PathStartR31";
    //        
    //    } 
    //    else if((start==="R15")&&(path===no_path_text)&&(end==="R06")){
    //
    //        return "PathStartR15";
    //        
    //    }
    //    else if((start==="R15")&&(path==="P4")&&(end==="R06")){
    //
    //        return "PathStartR15P4R2";
    //        
    //    } 
        //NEW PATH R08
        if((start==="P1")&&(path==="P2-P3")&&(end==="R08")){

            return "PathStartP1P2P3R2";

        }
        else if((start==="P1")&&(path==="P2-P4")&&(end==="R08")){

            return "PathStartP1P2P4R2";

        }
        else if((start==="P5")&&(path==="P3")&&(end==="R08")){

            return "PathStartP5P3R2";

        }
        else if((start==="P5")&&(path==="P4")&&(end==="R08")){

            return "PathStartP5P4R2";

        }
        else if((start==="P6")&&(path==="P3")&&(end==="R08")){

            return "PathStartP6P3R2";

        }
        else if((start==="P6")&&(path==="P4")&&(end==="R08")){

            return "PathStartP6P4R2";

        }
        else if((start==="R36")&&(path==="P3")&&(end==="R08")){

            return "PathStartR36P3R2";

        }
        else if((start==="R36")&&(path==="P4")&&(end==="R08")){

            return "PathStartR36P4R2";

        }

        else if((start==="R36")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartR2";

        }
        else if((start==="R07")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartR7";

        }
        else if((start==="R08")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartR2";

        }
        else if((start==="R13")&&(path==="P3")&&(end==="R08")){

            return "PathStartR13P3R2";

        }
        else if((start==="R13")&&(path==="P4")&&(end==="R08")){

            return "PathStartR13P4R2";

        }
        else if((start==="R25")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartR25";

        }
        else if((start==="R26")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartR26";

        } 
         else if((start==="R31")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartR31";

        } 
        else if((start==="R15")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartR15";

        }
        else if((start==="R15")&&(path==="P4")&&(end==="R08")){

            return "PathStartR15P4R2";

        } 
         //NEW PATH R08
        if((start==="P1")&&(path==="P2-P3")&&(end==="R09")){

            return "PathStartP1P2P3R2";

        }
        else if((start==="P1")&&(path==="P2-P4")&&(end==="R09")){

            return "PathStartP1P2P4R2";

        }
        else if((start==="P5")&&(path==="P3")&&(end==="R09")){

            return "PathStartP5P3R2";

        }
        else if((start==="P5")&&(path==="P4")&&(end==="R09")){

            return "PathStartP5P4R2";

        }
        else if((start==="P6")&&(path==="P3")&&(end==="R09")){

            return "PathStartP6P3R2";

        }
        else if((start==="P6")&&(path==="P4")&&(end==="R09")){

            return "PathStartP6P4R2";

        }
        else if((start==="R36")&&(path==="P3")&&(end==="R09")){

            return "PathStartR36P3R2";

        }
        else if((start==="R36")&&(path==="P4")&&(end==="R09")){

            return "PathStartR36P4R2";

        }

        else if((start==="R36")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartR2";

        }
        else if((start==="R07")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartR7";

        }
        else if((start==="R09")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartR2";

        }
        else if((start==="R13")&&(path==="P3")&&(end==="R09")){

            return "PathStartR13P3R2";

        }
        else if((start==="R13")&&(path==="P4")&&(end==="R09")){

            return "PathStartR13P4R2";

        }
        else if((start==="R25")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartR25";

        }
        else if((start==="R26")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartR26";

        } 
         else if((start==="R31")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartR31";

        } 
        else if((start==="R15")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartR15";

        }
        else if((start==="R15")&&(path==="P4")&&(end==="R09")){

            return "PathStartR15P4R2";

        } 

         //NEW PATH R19
        if((start==="P1")&&(path==="P2-P3")&&(end==="R19")){

            return "PathStartP1P2P3R2";

        }
        else if((start==="P1")&&(path==="P2-P4")&&(end==="R19")){

            return "PathStartP1P2P4R2";

        }
        else if((start==="P5")&&(path==="P3")&&(end==="R19")){

            return "PathStartP5P3R2";

        }
        else if((start==="P5")&&(path==="P4")&&(end==="R19")){

            return "PathStartP5P4R2";

        }
        else if((start==="P6")&&(path==="P3")&&(end==="R19")){

            return "PathStartP6P3R2";

        }
        else if((start==="P6")&&(path==="P4")&&(end==="R19")){

            return "PathStartP6P4R2";

        }
        else if((start==="R36")&&(path==="P3")&&(end==="R19")){

            return "PathStartR36P3R2";

        }
        else if((start==="R36")&&(path==="P4")&&(end==="R19")){

            return "PathStartR36P4R2";

        }

        else if((start==="R36")&&(path===no_path_text)&&(end==="R19")){

            return "PathStartR2";

        }
        else if((start==="R07")&&(path===no_path_text)&&(end==="R19")){

            return "PathStartR7";

        }
        else if((start==="R19")&&(path===no_path_text)&&(end==="R19")){

            return "PathStartR2";

        }
        else if((start==="R13")&&(path==="P3")&&(end==="R19")){

            return "PathStartR13P3R2";

        }
        else if((start==="R13")&&(path==="P4")&&(end==="R19")){

            return "PathStartR13P4R2";

        }
        else if((start==="R25")&&(path===no_path_text)&&(end==="R19")){

            return "PathStartR25";

        }
        else if((start==="R26")&&(path===no_path_text)&&(end==="R19")){

            return "PathStartR26";

        } 
         else if((start==="R31")&&(path===no_path_text)&&(end==="R19")){

            return "PathStartR31";

        } 
        else if((start==="R15")&&(path===no_path_text)&&(end==="R19")){

            return "PathStartR15";

        }
        else if((start==="R15")&&(path==="P4")&&(end==="R19")){

            return "PathStartR15P4R2";

        } 


        //MEDIATIC

        if((start==="P1")&&(path==="P2")&&(end==="S02")){

            return "PathStartP1P2S02";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="S02")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="S02")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="S02")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="S02")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="S02")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="S02")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="S02")){

            return "PathStartTF1";

        } 


        if((start==="P1")&&(path==="P2")&&(end==="S03")){

            return "PathStartP1P2S03";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="S03")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="S03")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="S03")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="S03")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="S03")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="S03")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="S03")){

            return "PathStartTF1";

        } 


        if((start==="P1")&&(path==="P2")&&(end==="S04")){

            return "PathStartP1P2S04";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="S04")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="S04")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="S04")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="S04")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="S04")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="S04")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="S04")){

            return "PathStartTF1";

        } 

        if((start==="P1")&&(path==="P2")&&(end==="S08")){

            return "PathStartP1P2S08";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="S08")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="S08")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="S08")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="S08")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="S08")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="S08")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="S08")){

            return "PathStartTF1";

        } 

            if((start==="P1")&&(path==="P2")&&(end==="S09")){

            return "PathStartP1P2S09";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="S09")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="S09")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="S09")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="S09")){

            return "PathStartS07";

        }  
        else if((start==="P3")&&(path===no_path_text)&&(end==="S09")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="S09")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="S09")){

            return "PathStartTF1";

        } 

            if((start==="P1")&&(path==="P2")&&(end==="S10")){

            return "PathStartP1P2S10";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="S10")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="S10")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="S10")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="S10")){

            return "PathStartS07";

        }  

            else if((start==="P3")&&(path===no_path_text)&&(end==="S10")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="S10")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="S10")){

            return "PathStartTF1";

        } 

        if((start==="P1")&&(path==="P2")&&(end==="S11")){

            return "PathStartP1P2S11";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="S11")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="S11")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="S11")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="S11")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="S11")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="S11")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="S11")){

            return "PathStartTF1";

        } 

        if((start==="P1")&&(path==="P2")&&(end==="S12")){

            return "PathStartP1P2S11";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="S12")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="S12")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="S12")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="S12")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="S12")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="S12")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="S12")){

            return "PathStartTF1";

        } 


        if((start==="P1")&&(path==="P2")&&(end==="R01")){

            return "PathStartP1P2R02";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R01")){

            return "PathStartTF1";

        } 


        if((start==="P1")&&(path==="P2")&&(end==="R02")){

            return "PathStartP1P2R02";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R02")){

            return "PathStartTF1";

        } 


        if((start==="P1")&&(path==="P2")&&(end==="R03")){

            return "PathStartP1P2R03";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R03")){

            return "PathStartTF1";

        } 


        if((start==="P1")&&(path==="P2")&&(end==="R04")){

            return "PathStartP1P2R04";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R04")){

            return "PathStartTF1";

        } 
            if((start==="P1")&&(path==="P2")&&(end==="R05")){

            return "PathStartP1P2R05";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R05")){

            return "PathStartTF1";

        } 

        if((start==="P1")&&(path==="P2")&&(end==="R06")){

            return "PathStartP1P2R06";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R06")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R06")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R06")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R06")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R06")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R06")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R06")){

            return "PathStartTF1";

        } 

        if((start==="P1")&&(path==="P2")&&(end==="R07")){

            return "PathStartP1P2R07";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R07")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R07")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R07")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R07")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R07")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R07")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R07")){

            return "PathStartTF1";

        } 


        if((start==="P1")&&(path==="P2")&&(end==="R08")){

            return "PathStartP1P2R08";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R08")){

            return "PathStartTF1";

        } 

            if((start==="P1")&&(path==="P2")&&(end==="R09")){

            return "PathStartP1P2R09";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartS07";

        }  
        else if((start==="P3")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R09")){

            return "PathStartTF1";

        } 

        if((start==="P1")&&(path==="P2")&&(end==="R10")){

            return "PathStartP1P2R10";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R10")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R10")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R10")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R10")){

            return "PathStartS07";

        }  

            else if((start==="P3")&&(path===no_path_text)&&(end==="R10")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R10")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R10")){

            return "PathStartTF1";

        } 


        if((start==="P1")&&(path==="P2")&&(end==="R11")){

            return "PathStartP1P2R11";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R11")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R11")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R11")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R11")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R11")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R11")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R11")){

            return "PathStartTF1";

        } 

        if((start==="P1")&&(path==="P2")&&(end==="R12")){

            return "PathStartP1P2R12";

        }

        else if((start==="S01")&&(path===no_path_text)&&(end==="R12")){

            return "PathStartS01";

        }

        else if((start==="S05")&&(path===no_path_text)&&(end==="R12")){

            return "PathStartS05";

        }

        else if((start==="S06")&&(path===no_path_text)&&(end==="R12")){

            return "PathStartS06";

        }  

        else if((start==="S07")&&(path===no_path_text)&&(end==="R12")){

            return "PathStartS07";

        }  

        else if((start==="P3")&&(path===no_path_text)&&(end==="R12")){

            return "PathStartP3";

        }

        else if((start==="TM1")&&(path===no_path_text)&&(end==="R12")){

            return "PathStartTM1";

        }  

        else if((start==="TF1")&&(path===no_path_text)&&(end==="R12")){

            return "PathStartTF1";

        } 
    
    }
    
    if(current_building===2)
    {
        /*BLUENET*/

        if((start==="M01"))
        {

            return "PathStartM01";

        }
        if((start==="M02"))
        {

            return "PathStartM02";

        }
        if((start==="M03"))
        {

            return "PathStartM03";

        }
        if((start==="M04"))
        {

            return "PathStartM04";

        }
        if((start==="M05"))
        {

            return "PathStartM05";

        }
        if((start==="M06"))
        {

            return "PathStartM06";

        } 
        if((start==="M07"))
        {

            return "PathStartM07";

        }
        if((start==="M08"))
        {

            return "PathStartM08";

        }
        if((start==="M09"))
        {

            return "PathStartM09";

        }
        if((start==="R01"))
        {

            return "PathStartR01";

        }
        if((start==="R02"))
        {

            return "PathStartR02";

        }
        if((start==="R03"))
        {

            return "PathStartR03";

        }
        if((start==="R04"))
        {

            return "PathStartR04";

        }
        if((start==="R05"))
        {

            return "PathStartR05";

        }
        if((start==="R06"))
        {

            return "PathStartR06";

        } 
        if((start==="R07"))
        {

            return "PathStartR07";

        }
        if((start==="R08"))
        {

            return "PathStartR08";

        }
        if((start==="R09"))
        {

            return "PathStartR09";

        }
        else
        {
            
            return "PathStartP1";

        }
    }
}