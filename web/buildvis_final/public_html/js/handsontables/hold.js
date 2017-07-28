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
function checkPathTo(start, path, end){

    //NEW PATH R03
    if((start==="R03")&&(path==="P3-P2")&&(end==="P1")){

        return "PathStartR2P3P2P1";
        
    }
    else if((start==="R03")&&(path==="P4-P2")&&(end==="P1")){

        return "PathStartR2P4P2P1";
        
    }
    else if((start==="R03")&&(path==="P3")&&(end==="P5")){

        return "PathStartR2P3P5";
        
    }    
    else if((start==="R03")&&(path==="P4")&&(end==="P5")){

        return "PathStartR2P4P5";
        
    }
    else if((start==="R03")&&(path==="P3")&&(end==="P6")){

        return "PathStartR2P3P6";
        
    }
    else if((start==="R03")&&(path==="P4")&&(end==="P6")){

        return "PathStartR2P4P6";
        
    }
    else if((start==="R03")&&(path==="P3")&&(end==="R36")){

        return "PathStartR2P3R36";
        
    }
    else if((start==="R03")&&(path==="P4")&&(end==="R36")){

        return "PathStartR2P4R36";
        
    }
    
    else if((start==="R03")&&(path==="No Path")&&(end==="R36")){

        return "PathStartR2";
        
    }
    else if((start==="R03")&&(path==="No Path")&&(end==="R07")){

        return "PathStartR2";
        
    }
    else if((start==="R03")&&(path==="No Path")&&(end==="R03")){

        return "PathStartR2";
        
    }
    else if((start==="R03")&&(path==="P3")&&(end==="R13")){

        return "PathStartR13P3R2";
        
    }
    else if((start==="R03")&&(path==="P4")&&(end==="R13")){

        return "PathStartR13P4R2";
        
    }
}
function checkPathFrom(start, path, end){

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
    
    else if((start==="R36")&&(path==="No Path")&&(end==="R03")){

        return "PathStartR2";
        
    }
    else if((start==="R07")&&(path==="No Path")&&(end==="R03")){

        return "PathStartR7";
        
    }
    else if((start==="R03")&&(path==="No Path")&&(end==="R03")){

        return "PathStartR2";
        
    }
    else if((start==="R13")&&(path==="P3")&&(end==="R03")){

        return "PathStartR13P3R2";
        
    }
    else if((start==="R13")&&(path==="P4")&&(end==="R03")){

        return "PathStartR13P4R2";
        
    }
}

