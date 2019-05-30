//package tcd;
//
//
//import java.io.BufferedWriter;
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.OutputStreamWriter;
//
//import java.nio.charset.Charset;
//import java.text.NumberFormat;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//import org.apache.jena.datatypes.RDFDatatype;
//import org.apache.jena.datatypes.TypeMapper;
//import org.apache.jena.rdf.model.Literal;
//import org.apache.jena.rdf.model.Model;
//import org.apache.jena.rdf.model.ModelFactory;
//import org.apache.jena.rdf.model.Property;
//import org.apache.jena.rdf.model.RDFNode;
//import org.apache.jena.rdf.model.Resource;
//import org.apache.jena.rdf.model.Statement;
//import org.apache.jena.rdf.model.StmtIterator;
//import org.apache.jena.util.FileManager;
//import org.apache.jena.vocabulary.RDF;
//import static tcd.Coordinates.convertDe;
//
///*
// * Copyright 2017 Kris McGlinn, Adapt Centre, Trinity College University, Dublin, Ireland 
// * This code builds upon code developed by Pieter Pauwels for deleting geoemtry from IFC models, 
// * called SimpleBIM - https://github.com/pipauwel/IFCtoSimpleBIM/blob/master/src/main/java/be/ugent/Cleaner.java
// * 
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License atf
// * 
// *     http://www.apache.org/licenses/LICENSE-2.0
// * 
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// */
//
//public class IFC_Geolocation {	
//	
//    String inputfile = "AC20-FZK-Haus.ttl";
////                inputfile = "smallhouse.ttl";
//    String outputfile = "";
//    
////    private static final String ns_ifcowl = "http://www.buildingsmart-tech.org/ifcOWL/IFC2X3_TC1#";
//    private static final String ns_ifcowl = "http://www.buildingsmart-tech.org/ifcOWL/IFC4_ADD1#";
//    
//    String geometry_store = "{\"geometry\":{\"paths\":[";
//    String geometry_wkt_store = "MULTILINESTRING (";
//
//    private static Model model;
//    
//    private static NDSFutility ndsf;
//    
//    private static Rotation rot;
//      
//    
//    double metric_adjustment = 1;
//    
//    private static Property ifcSiteProperty;
//    private static Resource ifcSiteResource;
//    private static List latitude = new ArrayList();
//    private static double latitude_decimal;
//    private static List longitude = new ArrayList();
//    private static double longitude_decimal;
//    private static List trueNorth = new ArrayList();
////    private static final List ifcSite_localPlacement = new ArrayList();
////    private static double[] global_entity_coordinate;
//    
//    private static Property ifcEntityProperty;
//  
//
////    private final String ns_ifcres = "http://linkedbuildingdata.net/ifc/resources20170627_105709/";
//    private final String ns_list = "https://w3id.org/list#";
//    private final String ns_geo = "http://www.opengis.net/ont/geosparql#";
//    private final String ns_express = "https://w3id.org/express#";
//    
////    private static String Entity_Array[] = {"IfcBeam", "IfcBeamStandardCase", "IfcChimney", "IfcColumn", "IfcCovering", "IfcCurtainWall", "IfcDoor", "IfcDoorStandardCase", 
////    "IfcPlate", "IfcPlateStandardCase", "IfcRailing", "IfcRamp", "IfcRoof", "IfcSlab", "IfcStair", "IfcWall", "IfcWallStandardCase", "IfcWindow", "IfcWindowStandardCase"};
//    //This is list is incomplete
//    private static final String Entity_Array[] = {"IfcWallStandardCase"};
//    //This is list is incomplete
//
//    public IFC_Geolocation() {	
//    }
//
//    /**
//     * @param arg0: filename + extension (inputfile)
//     * @param arg1: filename + extension (outputfile)
//     * @throws IOException 
//     */
//    public static void main(String[] args) throws IOException {		
//        
//        System.out.println("Working Directory = " +
//        System.getProperty("user.dir"));
//        
//        IFC_Geolocation c = new IFC_Geolocation();
//        ndsf = new NDSFutility();
//        rot = new Rotation();
//        
////        double[] d = new double[]{3,0,0};
////        rot.setAngle(90);
////        System.out.print(Arrays.toString(rot.rotateAroundZ(d)));
//        
//        c.checkArguments(args);
//   
//        System.out.println("Loading File"); 
//        model = c.loadFile();  
//        
//                    
//        System.out.println("Extracting True North"); 
//        trueNorth = c.returnTrueNorth(model);
////        System.out.println("Value of True North: " + trueNorth);
//        NumberFormat nf = NumberFormat.getInstance();
//        nf.setMaximumFractionDigits(Integer.MAX_VALUE);
//        System.out.println("Value of True North: {" +nf.format(trueNorth.get(0)) + ", " + trueNorth.get(1) + "]");
//
//        System.out.println("Adding WKT Site Geolocation as WKT to Model"); 
//        ifcSiteProperty = model.createProperty( ns_ifcowl + "IfcSite" ); 
//        ifcSiteResource = c.returnLongLat(model); 
//        model = c.addWKTGeolocationToModel(model, ifcSiteResource);
//////        c.writeModel(model);
//        System.out.println("WKT Geolocation succesfully added to Model");
//                
//      
//        
//        addAllEntities(c, model, Entity_Array);
//        
//        c.writeModel(model);
//        
//        
//
//    }
//
//    //This method creates a directory
//    public static void addAllEntities(IFC_Geolocation c, Model original, String[] s)
//    {
//        Model m = original;
//        for (String item : s) {
//            System.out.println("EXTRACTING ENTITY " + item + "'s GEOLOCATION AS WKT");
//            ifcEntityProperty = model.createProperty(ns_ifcowl + item);
//            c.returnEntityLocalPlacement(m, ifcEntityProperty.asResource());
//            //            System.out.println("global_entity_coordinate VALUE = " + global_entity_coordinate[0]);
//            
//        }
//
//    }
//    
//    //Author Kris McGlinn - This method returns the longitude and latitude by making use of traverseList()
//    private Model returnEntityLocalPlacement(Model original, Resource r)
//    { 
//                
//        Model m = original;//ModelFactory.createDefaultModel().add(original);              
//        StmtIterator iter = m.listStatements( null, RDF.type, r );
//        
//        int count = 0;
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt = iter.nextStatement();
//            List ifcEntity_localPlacement;// = new ArrayList(); //A list of the local placements of each story
//            List ifcEntity_relativePlacement;// = new ArrayList();
//            
//            ifcEntity_localPlacement = returnLocalPlacementOfEntity(m, stmt.getSubject());
////            System.out.println("LOCAL PLACEMENT OF ENTITY: " + stmt.getSubject() + " is "+ ifcEntity_localPlacement);
//            
//            ifcEntity_relativePlacement = returnRelativePlacement(m, stmt.getSubject());
////            System.out.println("PRINTING LIST OF ALL RELATIVE PLACEMENTS: " + ifcEntity_relativePlacement);
//            ifcEntity_relativePlacement.add(ifcEntity_localPlacement);
//            System.out.println("PRINTING LIST OF ALL PLACEMENTS OF ENTITY: " + stmt.getSubject() + " = "+ ifcEntity_relativePlacement);
//            IFC_Entity_Geometry ifc = returnCartesianLocation(ifcEntity_relativePlacement, true);           
//            
//            addWKTGeolocationToEntity(m, stmt.getSubject(), ifc, false);  //Attach a geolocation to an entity
//            
//            returnEntityGeometry(m, stmt.getSubject(), ifc);
//            count++;
//            
//        }       
//        System.out.println(geometry_store);
//        System.out.println(geometry_wkt_store);
////            System.out.println("BEFORE!!!" + global_entity_coordinate[1] + ", " + global_entity_coordinate[0]); 
////            double[] coordinate = ndsf.xy2ll(global_entity_coordinate[1], global_entity_coordinate[0], 0.000000001, 0.00000001, 1, 0, 0, 0, 0);
////            System.out.println("TRANFORMING POINTS!!!" + coordinate[0] + ", " + coordinate[1]);
//        System.out.println("Number of resource found = " + count + " for resource: " + r.toString());
//        return m;
//    }
//    
//            
//    //Author Kris McGlinn - This function takes the Model and a resources, and adds it to that resourse in the model
//    //For wkt literal, a seperate class WktLiteral java is required, to add the literal datatype to the Model
//    private Model addWKTGeolocationToModel(Model original, Resource r)
//    {
//        original.setNsPrefix("geo", ns_geo);
//        Model m = original;//ModelFactory.createDefaultModel().add(original);
//        
//        String wktLiteralID = "urn:geom:pt:";
//        Property geo_hasGeometry = m.createProperty( ns_geo + "hasGeometry" );      
//        Property unique_guid = m.createProperty( ns_ifcowl + "globalId_IfcRoot" );
//        Property unique_guid_string = m.createProperty( ns_express + "hasString" );
//        
//        StmtIterator iter = m.listStatements(r, unique_guid , (RDFNode) null ); 
//        
//        
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt = iter.nextStatement(); 
//            iter = m.listStatements(stmt.getResource(), unique_guid_string , (RDFNode) null );             
//            
//            while ( iter.hasNext() ) 
//            {
//
//                wktLiteralID = wktLiteralID + iter.nextStatement().getLiteral().toString();
////                System.out.println(wktLiteralID);
//
//            }
//            
//        }
//        
//        Resource rr = m.createResource(wktLiteralID);
//        
//        m.getResource(r.toString()).addProperty(geo_hasGeometry, rr);
//           
////        iter = m.listStatements(r, geo_hasGeometry , (RDFNode) null );
//        
//        
//        Property geo_asWKT = m.createProperty( ns_geo + "asWKT" );
//        
//        System.out.println(latitude);
//
//        latitude = longLatNegativeConvert(latitude);
////        latitude.set(latitude.size()-1, (latitude.get(latitude.size()-1)+"."));
////        String s1 = StringUtils.join(Lists.reverse(latitude), "");
////        latitude_decimal = Double.parseDouble(s1);
////        
//        longitude = longLatNegativeConvert(longitude);
//        double s1 = convertDe(latitude.get(3) + " " +  latitude.get(2) + " " + latitude.get(1) + "." + latitude.get(0));
//        double s2 = convertDe(longitude.get(3) + " " +  longitude.get(2) + " " + longitude.get(1) + "." + longitude.get(0));
////        longitude.set(longitude.size()-1, (longitude.get(longitude.size()-1)+"."));
////        String s2 = StringUtils.join(Lists.reverse(longitude), "");
//        latitude_decimal = s1;
//        longitude_decimal = s2;
//        //Have to swith long and lat for WKT
//        String wkt_point = "POINT ("+s2+" "+s1+")";
////        Resource r_wktpoint = m.createResource(wkt_point);
////        System.out.println(wkt_point);
//        //String datatype = ns_geo + "wktLiteral";
//        
//        RDFDatatype rtype = WktLiteral.wktLiteralType; 
//        TypeMapper.getInstance().registerDatatype(rtype);     
//        Literal l = m.createTypedLiteral(wkt_point, rtype);
//        m.getResource(wktLiteralID).addProperty(geo_asWKT, l);
////        
//        iter = m.listStatements(m.getResource(wktLiteralID), geo_asWKT , (RDFNode) null ); 
//        
//        
//        while ( iter.hasNext() ) 
//        {
//            
//            Statement stmt = iter.nextStatement();
//            System.out.println("WKT GEOLOCATION OF IFCSITE: " + stmt);
//            
//        }   
//
//        
//        return m;
//    }
//    
//    //Author Kris McGlinn - This function takes the Model and a resources, and adds it to that resourse in the model
//    //For wkt literal, a seperate class WktLiteral java is required, to add the literal datatype to the Model
//    private Model addWKTGeolocationToEntity(Model original, Resource r, IFC_Entity_Geometry ifc, boolean addToFile)
//    {
//        original.setNsPrefix("geo", ns_geo);
//        Model m = original;//ModelFactory.createDefaultModel().add(original);
//        
//        String wktLiteralID = "urn:geom:pt:";
//        Property geo_hasGeometry = m.createProperty( ns_geo + "hasGeometry" );      
//        Property unique_guid = m.createProperty( ns_ifcowl + "globalId_IfcRoot" );
//        Property unique_guid_string = m.createProperty( ns_express + "hasString" );
//        
//        StmtIterator iter = m.listStatements(r, unique_guid , (RDFNode) null ); 
////        System.out.println("PRINTING VALUE FOR RESOURCE: " + r);
//        
//        double[] coordinate = ifc.getLocation();
//
//               
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt = iter.nextStatement(); 
//            iter = m.listStatements(stmt.getResource(), unique_guid_string , (RDFNode) null );             
//            
//            while ( iter.hasNext() ) 
//            {
//
//                wktLiteralID = wktLiteralID + iter.nextStatement().getLiteral().toString();
////                System.out.println("Entity WKT Literal ID: " + wktLiteralID);
//
//            }
//            
//        }
//        
//        Resource rr = m.createResource(wktLiteralID);
//        
//        m.getResource(r.toString()).addProperty(geo_hasGeometry, rr);
//           
//
//        Property geo_asWKT = m.createProperty( ns_geo + "asWKT" );
//
//        double[] d2_coordinate = ndsf.xy2ll(longitude_decimal, latitude_decimal, 1, coordinate[1], coordinate[0], 0, 0, 0, 0);
//
//        //Have to swith long and lat for WKT
//        if (Double.isNaN(d2_coordinate[1])) {
////            System.out.println("Longitude was NaN");
//            d2_coordinate[1] = longitude_decimal;
//        }
//        if (Double.isNaN(d2_coordinate[0])) {
////            System.out.println("Latitude was NaN");
//            d2_coordinate[0] = latitude_decimal;
//        }
//        
//        String wkt_point = "POINT ("+d2_coordinate[1]+" "+d2_coordinate[0]+")";
//        
////        global_entity_coordinate = d2_coordinate;
//        
//        if(addToFile)
//        {
//            RDFDatatype rtype = WktLiteral.wktLiteralType; 
//            TypeMapper.getInstance().registerDatatype(rtype);     
//            Literal l = m.createTypedLiteral(wkt_point, rtype);
//            m.getResource(wktLiteralID).addProperty(geo_asWKT, l);  
//        }
//        
//        return m;
//    }
//    
//    //Author Kris McGlinn - This function takes the Model and a resources, and adds it to that resourse in the model
//    //For wkt literal, a seperate class WktLiteral java is required, to add the literal datatype to the Model
//    private Model addWKTPolylineGeolocationToEntity(Model original, Resource r, List l, IFC_Entity_Geometry ifc)
//    {
//        original.setNsPrefix("geo", ns_geo);
//        Model m = original;//ModelFactory.createDefaultModel().add(original);
//        
//        String wktLiteralID = "urn:geom:pt:";
//        Property geo_hasGeometry = m.createProperty( ns_geo + "hasGeometry" );      
//        Property unique_guid = m.createProperty( ns_ifcowl + "globalId_IfcRoot" );
//        Property unique_guid_string = m.createProperty( ns_express + "hasString" );
//        
//        StmtIterator iter = m.listStatements(r, unique_guid , (RDFNode) null ); 
//        
////        double[] coordinate = ifc.getLocation();
//        double[] direction = ifc.getDirection();
////        System.out.println("PRINTING DIRECTION OF ENTITY: " + direction[0] + ", " + direction[1] + ", " + direction[2]);
//        
//               
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt = iter.nextStatement(); 
//            iter = m.listStatements(stmt.getResource(), unique_guid_string , (RDFNode) null );             
//            
//            while ( iter.hasNext() ) 
//            {
//
//                wktLiteralID = wktLiteralID + iter.nextStatement().getLiteral().toString();
////                System.out.println("Entity WKT Literal ID: " + wktLiteralID);
//
//            }
//            
//        }
//        
//        Resource rr = m.createResource(wktLiteralID);
//        
//        m.getResource(r.toString()).addProperty(geo_hasGeometry, rr);
//        
//        Property geo_asWKT = m.createProperty( ns_geo + "asWKT" );
//    
//        int mult = 1;
//        String wkt_point = "LINESTRING (";
//        String multistring = "(";;
//        List coord;// = new ArrayList();
//        coord = (List) l.get(0);
//        double[] coordinate = new double[3];
//        coordinate[0] = (double)coord.get(0)/metric_adjustment;
//        coordinate[1] = (double)coord.get(1)/metric_adjustment;
//        coordinate[2] = 0.0;
////        System.out.println("BLAHHHH"+Arrays.toString(coordinate));
//        List coord_list = ifc.getLocation_matrix();
//        List dir_list = ifc.getDirection_matrix();
//
//        for (int i = 0; i < coord_list.size(); i++) {
//            if(dir_list.get(i)!=null){
////                double[] c = (double[]) coord_list.get(i);
//                double[] d = (double[]) dir_list.get(i);
////                System.out.println(Arrays.toString(c));
////                System.out.println(Arrays.toString(d)); 
//                coordinate = rotate_coordinate(coordinate, direction);
//            }
//
//                
//        }
//        
//        
//
//        
//           
//
//        double[] location = ifc.getLocation();
//        geometry_store = geometry_store + "[[" + location[0] + ", " + location[1] +"], " +"[" + (location[0] + coordinate[0]) + ", " + (location[1] + coordinate[1]) +"]] ,";
//
//   
//        double[] d2_coordinate = ndsf.xy2ll(longitude_decimal, latitude_decimal, 1, location[0], location[1], 0, 0, 0, 0);
//
//        //Have to swith long and lat for WKT
//        if (Double.isNaN(d2_coordinate[1])) {
////            System.out.println("Longitude was NaN");
//            d2_coordinate[1] = longitude_decimal;
//        }
//        if (Double.isNaN(d2_coordinate[0])) {
////            System.out.println("Latitude was NaN");
//            d2_coordinate[0] = latitude_decimal;
//        }
//        wkt_point = wkt_point + d2_coordinate[1]+" "+d2_coordinate[0];
//        multistring = multistring + d2_coordinate[1]*mult+" "+d2_coordinate[0]*mult;
//        
//
//        d2_coordinate = ndsf.xy2ll(longitude_decimal, latitude_decimal, 1, (location[0] + coordinate[0]), (location[1] + coordinate[1]), 0, 0, 0, 0);
//  
//
//        //Have to swith long and lat for WKT
//        if (Double.isNaN(d2_coordinate[1])) {
//
//            d2_coordinate[1] = longitude_decimal;
//        }
//        if (Double.isNaN(d2_coordinate[0])) {
//
//            d2_coordinate[0] = latitude_decimal;
//        }
//        wkt_point = wkt_point + ", " + d2_coordinate[1]+" "+d2_coordinate[0]*mult;
//        multistring = multistring + ", " +  d2_coordinate[1]*mult+" "+d2_coordinate[0]*mult;
//        multistring = multistring + ") ";
//        wkt_point = wkt_point + ") ";
//        
//        geometry_wkt_store = geometry_wkt_store + multistring + ", ";
//
//        
//        RDFDatatype rtype = WktLiteral.wktLiteralType; 
//        TypeMapper.getInstance().registerDatatype(rtype);     
//        Literal lit = m.createTypedLiteral(wkt_point, rtype);
//        m.getResource(wktLiteralID).addProperty(geo_asWKT, lit);
////        
//        iter = m.listStatements(m.getResource(wktLiteralID), geo_asWKT , (RDFNode) null ); 
//        
//        
//        while ( iter.hasNext() ) 
//        {
//            
//            Statement stmt = iter.nextStatement();
//            System.out.println("WKT GEOLOCATIONS OF ENTITY: " + r + " = " + stmt);
//            
//            
//        }   
//
//        
//        return m;
//    }
//    
//    private double[] rotate_coordinate_old(double[] coord, double[] direction)
//    {
//        double[] coordinate = coord;
////        coordinate[0] = (double)coord.get(0)/metric_adjustment;
////        coordinate[1] = (double)coord.get(1)/metric_adjustment;
////        coordinate[2] = 0.0;
//        
//        
//        if(direction[0] == -1)
//        {
//            System.out.println("ROTATION DIRECTION " + direction[0] + ", " + direction[1] + ", " + direction[2]);
//            System.out.println("ROTATING 90 " + Arrays.toString(coordinate));
//            coordinate = rot.rotate(90, coordinate);
//            System.out.println("AFTER ROTATION " + Arrays.toString(coordinate));
//        }
//        else if(direction[0] == 1)
//        {
////            System.out.println("ROTATION DIRECTION " + direction[0] + ", " + direction[1] + ", " + direction[2]);
////            System.out.println("ROTATING 90 " + Arrays.toString(coordinate));
////            coordinate = rot.rotate(90, coordinate);
////            System.out.println("AFTER ROTATION " + Arrays.toString(coordinate));
//        }
//        else if(direction[1] == 1)
//        {
//            System.out.println("ROTATION DIRECTION " + direction[0] + ", " + direction[1] + ", " + direction[2]);
//
////            System.out.println("ROTATION DIRECTION " + direction[0] + ", " + direction[1] + ", " + direction[2]);
//            System.out.println("ROTATING 0 " + Arrays.toString(coordinate));
////            coordinate = rot.rotate(90, coordinate);
////            System.out.println("AFTER ROTATION " + Arrays.toString(coordinate));
//        }
//        else if(direction[1] == -1)
//        {
//            System.out.println("ROTATION DIRECTION " + direction[0] + ", " + direction[1] + ", " + direction[2]);
//            System.out.println("ROTATING 180 " + Arrays.toString(coordinate));
//            coordinate = rot.rotate(180, coordinate);
//            System.out.println("AFTER ROTATION " + Arrays.toString(coordinate));
//        }
//        else 
//        {
//            System.out.println("NO ROTATION DIRECTION" + direction[0] + ", " + direction[1] + ", " + direction[2]);
//            System.out.println("ROTATING 270" + direction[0] + ", " + direction[1] + ", " + direction[2]);
//            System.out.println("ROTATING 270 " + Arrays.toString(coordinate));
//            coordinate = rot.rotate(270, coordinate);
//            System.out.println("AFTER ROTATION " + Arrays.toString(coordinate));
//        }
//        
//        return coordinate;
//    }
//    
//    
//    private double[] rotate_coordinate(double[] coord, double[] direction)
//    {
//        double[] coordinate = coord;
//        System.out.println("ROTATION COORDINATE " + coordinate[0] + ", " + coordinate[1] + ", " + coordinate[2]);
//        System.out.println("USING DIRECTION " + direction[0] + ", " + direction[1] + ", " + direction[2]);
//        if(direction[0] == -1)
//        {
//            
////            System.out.println("ROTATING 270 " + Arrays.toString(coordinate));
////            coordinate = rot.rotate(270, coordinate);
//        }
//        else if(direction[0] == 1)
//        {
////            System.out.println("ROTATING 90 " + Arrays.toString(coordinate));
//            coordinate = rot.rotate(90, coordinate);
//        }
//        else if(direction[1] == 1)
//        {
//
////            System.out.println("ROTATING 0 " + Arrays.toString(coordinate));
//            coordinate = rot.rotate(0, coordinate);
//        }
//        else if(direction[1] == -1)
//        {
//
////            System.out.println("ROTATING 180 " + Arrays.toString(coordinate));
//            coordinate = rot.rotate(180, coordinate);
//            
//        }
//        else 
//        {
//            System.out.println("NO ROTATION DIRECTION GIVEN, FALLING BACK TO DEFAULT");
////            System.out.println("ROTATING 270 " + Arrays.toString(coordinate));
//            coordinate = rot.rotate(90, coordinate);
////            System.out.println("AFTER ROTATION " + Arrays.toString(coordinate));
//        }
//        System.out.println("AFTER ROTATION " + Arrays.toString(coordinate));
//        return coordinate;
//    }
//    
//    
//    //Author Kris McGlinn - This method changes the sign of the longitude or latitude values in a List
//    private List longLatNegativeConvert(List l)
//    {
//        //
//        String s = (String)l.get(l.size()-1);
//        int x = Integer.parseInt(s);
//        if(x<0)
//        {
//            
//            for(int i = 0; i <l.size()-1; i++)
//            {
//                s = (String)l.get(i);
//                l.set(i, s.substring(1));
//                
//            }
//
//        }
//        
//        return l;
//    }
//    
//    //Author Kris McGlinn - This method traverses the RDF express list and recursively adds values to a Java list
//    private Statement traverseList(Model original, Statement stmt, boolean lat)
//    {
//        
//        Model m = ModelFactory.createDefaultModel().add(original);
//        Property listHasContents = m.createProperty( ns_list + "hasContents" );
//        Property listHasNext = m.createProperty( ns_list + "hasNext" );
//        boolean moreInList = false;
//        String s[];
//
//                  
//        StmtIterator iter = m.listStatements( stmt.getObject().asResource(), null, (RDFNode) null );
//        
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt1 = iter.nextStatement();
//
//            if(stmt1.getPredicate().equals(listHasContents))
//            {
//                StmtIterator iter2 = m.listStatements( stmt1.getObject().asResource(), null, (RDFNode) null );
//                while ( iter2.hasNext() ) 
//                    {
//                        Statement stmt2 = iter2.nextStatement();
//
//                        if(stmt2.getObject().isLiteral())
//                        {
//                            if(lat)
//                            {
////                                System.out.println("Lat value "+count+" is: " + stmt2.getObject());
//                                s = stmt2.getObject().toString().split("\\^\\^http");                               
//                                latitude.add(s[0]);
//                                
//                            }
//                            else {
////                                System.out.println("Long value "+count+" is: " + stmt2.getObject());
//                                s = stmt2.getObject().toString().split("\\^\\^http");
//                                longitude.add(s[0]);
//
//                            }
//                        }
//
//                        
//                    }
//            }
//            else if(stmt1.getPredicate().equals(listHasNext))
//            {
////                System.out.println("Adding 1 to count: " + (count+1));
//                //count++;
//                moreInList = true;
//                traverseList(original, stmt1, lat);
////                System.out.println("Has next item in list");
//            }
//
//        }
//        
//        if(!moreInList)
//        {
////            System.out.println("List is at end");
//            stmt = null;
//            return stmt;
//        }
//        
//        return stmt;
//    }
//    
//    //Author Kris McGlinn - This method returns a direction (which is defined by a list of coordianates in a placement list)
//    private List returnDirection(Model original, Resource r){
//        
//        Model m = ModelFactory.createDefaultModel().add(original);
//        List direction = new ArrayList();
//        
//        Property directionRatios_IfcDirection = m.createProperty( ns_ifcowl + "directionRatios_IfcDirection" );
//        
//        StmtIterator iter = m.listStatements( r, directionRatios_IfcDirection, (RDFNode) null );
//        
//        while ( iter.hasNext() ) {
//            Statement stmt = iter.nextStatement();
//            direction = traversePlacementList(m, stmt.getResource(), direction);
//        }
//
//        return direction;
//    }
//    
//    //Author Kris McGlinn - This method returns True North (makes use of returnDirection)
//    private List returnTrueNorth(Model original){
//        
//        Model m = ModelFactory.createDefaultModel().add(original);
//        List trueNorth = new ArrayList();
//                
//        Property ref_trueNorth = m.createProperty( ns_ifcowl + "trueNorth_IfcGeometricRepresentationContext" );
// 
//        StmtIterator iter = m.listStatements( null, ref_trueNorth, (RDFNode) null );
//
//        while ( iter.hasNext() ) {
//            Statement stmt = iter.nextStatement();
//            trueNorth = returnDirection(m, stmt.getResource());
//        }
//
//        return trueNorth;
//    }
//    
//    //Author Kris McGlinn - This method returns the longitude and latitude by making use of traverseList()
//    private Resource returnLongLat(Model original){
//        
//        Model m = ModelFactory.createDefaultModel().add(original);
//        Resource r = null;
//                
//        Property refLatitude_IfcSite = m.createProperty( ns_ifcowl + "refLatitude_IfcSite" );
//        Property refLongitude_IfcSite = m.createProperty( ns_ifcowl + "refLongitude_IfcSite" );
//        
//        StmtIterator iter = m.listStatements( null, RDF.type, ifcSiteProperty );
//
//        while ( iter.hasNext() ) {
//            Statement stmt = iter.nextStatement();
////            System.out.println( stmt);
//            StmtIterator iter2 = m.listStatements( stmt.getSubject(), refLatitude_IfcSite, (RDFNode) null );
//            r = stmt.getSubject();
//            while ( iter2.hasNext() ) 
//            {
//                
//                stmt = iter2.nextStatement();    
////                System.out.println( stmt);
//                traverseList(m, stmt, true);
//                
//            }
//        }
//
//  
//        iter = m.listStatements( null, RDF.type, ifcSiteProperty );
//
//        while ( iter.hasNext() ) {
//            Statement stmt = iter.nextStatement();
//
//            StmtIterator iter2 = m.listStatements( stmt.getSubject(), refLongitude_IfcSite, (RDFNode) null );
//            while ( iter2.hasNext() ) 
//            {
//                
//                stmt = iter2.nextStatement();    
//
//                traverseList(m, stmt, false);
//                
//            }
//        }
//
//        return r;
//    }
//    //Author Kris McGlinn - This method returns the cartesian coordinate of the entity in relation to the origin
//    private IFC_Entity_Geometry returnCartesianLocation(List l, boolean threeD)
//    {  
////        System.out.println("CALCULATING GEOLOCATION FOR ENTITY");
//        int count = 0;
//        List coordinate;// = new ArrayList();
//        List direction;
//
//        double[] store_coordinate = new double[]{0.0, 0.0, 0.0};
//        double[] store_direction = new double[]{0.0, 0.0, 0.0};
//        IFC_Entity_Geometry ifc = new IFC_Entity_Geometry();
//        
//        while(l.size()>count+1){
//             
//
//            coordinate = (List)((List) l.get((l.size()-1)-count)).get(0);           
//            direction = (List)((List) l.get((l.size()-1)-count)).get(1);
//            double[] c = new double[]{(Double)coordinate.get(0), (Double)coordinate.get(1), (Double)coordinate.get(2)};
//            ifc.addLocation_matrix(c);
//            
//            
//            store_coordinate[0] =  (Double)coordinate.get(0) + store_coordinate[0];
//            store_coordinate[1] =  (Double)coordinate.get(1) + store_coordinate[1];            
//            if(threeD)
//            {
//                store_coordinate[2] =  (Double)coordinate.get(2) + store_coordinate[2];     
//            }
//
//            
//            if(direction.size()>0)
//            {
//                
//                store_direction[0] =  (Double)direction.get(0);// + store_direction[0];
//                store_direction[1] =  (Double)direction.get(1);// + store_direction[1];
//                store_direction[2] =  (Double)direction.get(2);// + store_direction[2];
//                double[] d = new double[3];
//                d = store_direction; 
//                ifc.addDirection_matrix(d);
//                
//            }
//            if(direction.isEmpty())
//            {
//                System.out.println("SETTING DIRECTION TO {0,0,0}");
//                ifc.addDirection_matrix(new double[] {0,0,0});
//            }
//
//
//            count++;
//            
//        }
//        if(metric_adjustment!=1){
//            store_coordinate[0] =  store_coordinate[0]/metric_adjustment;
//            store_coordinate[1] =  store_coordinate[1]/metric_adjustment;
//            if(threeD)
//            {
//                store_coordinate[2] =  store_coordinate[2]/metric_adjustment;  
//            }
//        }
//        ifc.setLocation(store_coordinate);
//        ifc.setDirection(store_direction);
//
////        System.out.println("CALCULATED LOCAL PLACEMENT FOR ENTITY = " + Arrays.toString(store_coordinate));
////        System.out.println("CALCULATED LOCAL DIRECTION FOR ENTITY = " + Arrays.toString(store_direction));
//        return ifc;
//    }
//    
//    //Author Kris McGlinn - This method returns the longitude and latitude by making use of traverseList()
//    private Model returnEntityGeometry(Model original, Resource r, IFC_Entity_Geometry ifc)
//    { 
//                
//        Model m = original;//ModelFactory.createDefaultModel().add(original);              
////        StmtIterator iter = m.listStatements( null, RDF.type, r );
//        
//        int count = 0;
////        while ( iter.hasNext() ) 
////        {
////            Statement stmt = iter.nextStatement();
//            List ifcEntity_representatinList; //A list of the representations of the entity  
//            List ifcEntity_geometry_check = null; //A list of the geometry of a representation
//            List ifcEntity_geometry = null; //A list of the geometry of a representation
//            
//            ifcEntity_representatinList = returnRepresentationsOfEntity(m, r);
////            System.out.println("LIST OF REPRESENTATION OF ENTITY: " + stmt.getSubject() + " is "+ ifcEntity_representatinList);
//            int i = 0;
//            while(i<ifcEntity_representatinList.size())
//            {
//                ifcEntity_geometry_check = returnGeometryOfRepresentation(m, (Resource)ifcEntity_representatinList.get(i));
//                if(!ifcEntity_geometry_check.isEmpty())
//                {
//                    ifcEntity_geometry = ifcEntity_geometry_check;
//                }
//                i++;
//            }
//            if(!ifcEntity_geometry.isEmpty())
//                {
//                    System.out.println("NO POLYLINE FOUND FOR ENTITY");
//                }
//            else System.out.println("PRINTING LIST OF POLYLINE POINTS: " + ifcEntity_geometry.toString());
////            double[] d = returnCartesianLocation(ifcEntity_geometry, false); 
//
//            if(ifcEntity_geometry!=null&&ifcEntity_geometry.size()>0)
//            {
//                addWKTPolylineGeolocationToEntity(m, r, ifcEntity_geometry, ifc);
//            }
//            count++;
////            
////        }       
//        
////        System.out.println("Number of resource found = " + count + " for resource: " + r.toString());
//        return m;
//    }
//    
//    
//    
//        //Author Kris McGlinn - This method returns the localplacement of an entity by making use of traverseList()
//    private List returnRepresentationsOfEntity(Model original, Resource r)
//    {
//        
////        System.out.println("RETURING GEOMETRY FOR ENTITY: " + r);
//        Model m = ModelFactory.createDefaultModel().add(original);   
//        List geometry_List = new ArrayList();
//        
//        Property objectPlacement_IfcProduct = m.createProperty( ns_ifcowl + "representation_IfcProduct" );    
//        Property representations_IfcProductRepresentation = m.createProperty( ns_ifcowl + "representations_IfcProductRepresentation" ); 
//        
//        StmtIterator iter = m.listStatements( r, objectPlacement_IfcProduct, (RDFNode) null );
//        
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt = iter.nextStatement();
////            System.out.println("PRINTING STATEMENT " + stmt);
//            StmtIterator iter2 = m.listStatements( stmt.getResource(), representations_IfcProductRepresentation, (RDFNode) null );
//            while ( iter2.hasNext() ) 
//            {
//                Statement stmt1 = iter2.nextStatement();
////                System.out.println("PRINTING SUBJECT " + stmt2.getResource());
//                geometry_List = returnEntityRepresentationList(m, stmt1.getResource(), geometry_List);
//
//            }
////            geometry_List = returnEntityRepresentationList(m, stmt.getResource());
//        }
//        
//
//
//        
//        return geometry_List;
//    }
//    
//    //Author Kris McGlinn - This method returns the localplacement of an entity by making use of traverseList()
//    private List returnLocalPlacementOfEntity(Model original, Resource r)
//    {
//        
////        System.out.println("RETURING LOCAL PLACEMENT FOR ENTITY: " + r.toString());
//        Model m = ModelFactory.createDefaultModel().add(original);   
//        List coordinate_List = new ArrayList();
//        
//        Property objectPlacement_IfcProduct = m.createProperty( ns_ifcowl + "objectPlacement_IfcProduct" );       
//        StmtIterator iter = m.listStatements( r, objectPlacement_IfcProduct, (RDFNode) null );
//        
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt = iter.nextStatement();
//            coordinate_List = returnLocalPlacement(m, stmt.getResource());
//        }
//        return coordinate_List;
//    }
//    
//    //Author Kris McGlinn - This method returns the representations of an entity by making use of traverseList()
//    private List returnEntityRepresentationList(Model original, Resource r, List l){
//        
////        System.out.println("RESOURCE " + r);
//        List representation_List = l;
//        Model m = ModelFactory.createDefaultModel().add(original);
//        Property listHasContents = m.createProperty( ns_list + "hasContents" );
//        Property listHasNext = m.createProperty( ns_list + "hasNext" );
//        boolean moreInList = false;
////        String s[];
//      
//        StmtIterator iter = m.listStatements( r, null, (RDFNode) null );
////        System.out.println("T: " + r);
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt1 = iter.nextStatement();
////            System.out.println("Test: " + stmt1);
//            if(stmt1.getPredicate().equals(listHasContents))
//            {
////                System.out.println("ADDING RESOURCE TO LIST " + stmt1.getObject());
//                representation_List.add(stmt1.getObject());
////                            System.out.println("Here + "+s[0]);
//
//            }
//            else if(stmt1.getPredicate().equals(listHasNext))
//            {
////                System.out.println("Adding 1 to count: " + (count+1));
////                System.out.println("THERE IS ANOTHER ITEM IN THE LIST: " + stmt1.getResource());
//                moreInList = true;
//                representation_List = returnEntityRepresentationList(m, stmt1.getResource(), representation_List);
//                
//            }
//
//        }
////        
//        if(!moreInList)
//        {
////            System.out.println("List is at end");
//            r = null;
//            return representation_List;
//        }
////        System.out.println(coordinate_List.toString());
//        return representation_List;
//    }
//    
//    //Author Kris McGlinn - This method returns the localplacement of an entity by making use of traverseList()
//    private List returnLocalPlacement(Model original, Resource r){
//        
////        System.out.println("RETURNING LOCAL PLACEMENT FOR RESOURCE: " + r.toString());
//        Model m = ModelFactory.createDefaultModel().add(original);   
//        List coordinate_List = new ArrayList();
//        List direction_List = new ArrayList();
//        List coordinate_direction_List = new ArrayList();
//        
////        Property objectPlacement_IfcProduct = m.createProperty( ns_ifcowl + "objectPlacement_IfcProduct" );
//        Property relativePlacement_IfcLocalPlacement = m.createProperty( ns_ifcowl + "relativePlacement_IfcLocalPlacement" );
//        Property refDirection_IfcAxis2Placement3D = m.createProperty( ns_ifcowl + "refDirection_IfcAxis2Placement3D" );
//        Property location_IfcPlacement = m.createProperty( ns_ifcowl + "location_IfcPlacement" );
//        Property directionRatios_IfcDirection = m.createProperty( ns_ifcowl + "directionRatios_IfcDirection" );
//        
//        Property coordinates_IfcCartesianPoint = m.createProperty( ns_ifcowl + "coordinates_IfcCartesianPoint" );
//        
//
//        StmtIterator iter2 = m.listStatements( r, relativePlacement_IfcLocalPlacement, (RDFNode) null );   
//
//        while ( iter2.hasNext() ) 
//        { 
//            Statement stmt2 = iter2.nextStatement();
//            StmtIterator iter3 = m.listStatements( stmt2.getResource(), location_IfcPlacement, (RDFNode) null );   
////                System.out.println(stmt2.getResource());
//            while ( iter3.hasNext() ) 
//            { 
//                Statement stmt3 = iter3.nextStatement();
//                StmtIterator iter4 = m.listStatements( stmt3.getResource(), coordinates_IfcCartesianPoint, (RDFNode) null );   
////                    System.out.println(stmt3.getResource());
//                while ( iter4.hasNext() ) 
//                { 
//                    Statement stmt4 = iter4.nextStatement();
////                        System.out.println(stmt4.getResource());
//                    coordinate_List = traversePlacementList(m, stmt4.getResource(), coordinate_List);
//                }
//            }
//        }
//        coordinate_direction_List.add(coordinate_List);
//        iter2 = m.listStatements( r, relativePlacement_IfcLocalPlacement, (RDFNode) null );   
//
//        while ( iter2.hasNext() ) 
//        { 
//            Statement stmt2 = iter2.nextStatement();
//            StmtIterator iter3 = m.listStatements( stmt2.getResource(), refDirection_IfcAxis2Placement3D, (RDFNode) null );   
////                System.out.println(stmt2.getResource());
//            while ( iter3.hasNext() ) 
//            { 
//                Statement stmt3 = iter3.nextStatement();
//                StmtIterator iter4 = m.listStatements( stmt3.getResource(), directionRatios_IfcDirection, (RDFNode) null );   
////                    System.out.println(stmt3.getResource());
//                while ( iter4.hasNext() ) 
//                { 
//                    Statement stmt4 = iter4.nextStatement();
////                        System.out.println(stmt4.getResource());
//                    direction_List = traversePlacementList(m, stmt4.getResource(), direction_List);
//                }
//            }
//        }
//        coordinate_direction_List.add(direction_List);
////        System.out.println(coordinate_direction_List);
//        return coordinate_direction_List;
//    }
//    
//    //Author Kris McGlinn - This method recursively extracts the values of the list
//    private List traverseRelativePlacements(Model original, Statement s, Property p, List l){
//        
//        Statement stmt = null;
//        Model m = ModelFactory.createDefaultModel().add(original);  
//        StmtIterator iter = m.listStatements( s.getResource(), p, (RDFNode) null );  
//        List coordinates_List;  
//
////        System.out.println(s.getResource());
//        while ( iter.hasNext() ) 
//        {
//            stmt = iter.nextStatement();
//            //Passing the same reference to list object
//            traverseRelativePlacements(m, stmt, p, l);
//            coordinates_List = new ArrayList(); 
//            coordinates_List = returnLocalPlacement(m, stmt.getResource());
////            System.out.println("LOCAL PLACEMENT OF RESOURCE: " +stmt.getResource() + " = " + coordinates_List.toString());
//            l.add(coordinates_List);
////            System.out.println("PRINTING ALL LIST OF LISTS: " + l.toString());
//            
//        }
//        
//        return l;
//    }
//    
//    //Author Kris McGlinn - This method returns the longitude and latitude by making use of traverseList()
//    private List returnRelativePlacement(Model original, Resource r){
//        
////        System.out.println("RETURNING RELATIVE PLACEMENT");
//        List coordinates_List = new ArrayList();
//        List relative_Coordinates_List = new ArrayList(); 
//        Model m = ModelFactory.createDefaultModel().add(original);          
//        Property objectPlacement_IfcProduct = m.createProperty( ns_ifcowl + "objectPlacement_IfcProduct" );
//        Property placementRelTo_IfcLocalPlacement = m.createProperty( ns_ifcowl + "placementRelTo_IfcLocalPlacement" );
//        
//        StmtIterator iter = m.listStatements( r, objectPlacement_IfcProduct, (RDFNode) null );
//
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt = iter.nextStatement();
////            System.out.println(stmt.getResource());
//            //We pass a reference here as coordinates list. So keep an eye on it ;)
//            relative_Coordinates_List = traverseRelativePlacements(m, stmt, placementRelTo_IfcLocalPlacement, coordinates_List);
////            System.out.println("PRINTING LIST OF ALL RELATIVE PLACEMENTS: " + relative_Coordinates_List.toString());
//        }
//
//        return relative_Coordinates_List;
//    } 
//    
//       //Author Kris McGlinn - This method returns the longitude and latitude by making use of traverseList()
//    private List returnGeometryOfRepresentation(Model original, Resource r){
//        
////        System.out.println("RETURNING GEOMETRY OF REPRESENTATIONS FOR RESOURCE: " + r);
//        List geometry_List = new ArrayList(); //This will contain a 2D list of polylines, each containing a list of coordinates (may only ever be one polyline)
//        
//        Model m = ModelFactory.createDefaultModel().add(original);          
//        Property items_IfcRepresentation = m.createProperty( ns_ifcowl + "items_IfcRepresentation" );
//        Property points_IfcPolyline = m.createProperty( ns_ifcowl + "points_IfcPolyline" ); //FOR POLYLINE GEOMETRY
//        
//        
//        StmtIterator iter = m.listStatements( r, items_IfcRepresentation, (RDFNode) null );
//
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt = iter.nextStatement();
//            StmtIterator iter2 = m.listStatements( stmt.getResource(), points_IfcPolyline, (RDFNode) null );
//            
//            while ( iter2.hasNext() ) 
//            {
//                Statement stmt2 = iter2.nextStatement();
//                System.out.println(stmt2);
//                //We pass a reference here as coordinates list. So keep an eye on it ;)
//                geometry_List = traversePolylineCoordinateList(m, stmt2.getResource(), geometry_List);
//                System.out.println("PRINTING LIST OF ALL COORDINATES IN EACH LIST OF POLYLINES: " + geometry_List.toString());
//            }
//        }
////        System.out.println("PRINTING LIST OF ALL COORDINATES IN EACH LIST OF POLYLINES: " + geometry_List.toString());
//        return geometry_List;
//    } 
//
//    //Author Kris McGlinn - This method returns a list of IfcCartesianPoints, each of which contains a list of coordinates.
//    private List traversePolylineCoordinateList(Model original, Resource r, List coordinates_List)
//    {
//        
//        List coordinate_List = new ArrayList(); //This holds a 2D/3D coordinate, derived from an IfcCartesianPoint_List in the traverseCoordinateList() method
//
//        Model m = ModelFactory.createDefaultModel().add(original);
//        Property listHasContents = m.createProperty( ns_list + "hasContents" );
//        Property listHasNext = m.createProperty( ns_list + "hasNext" );
//        boolean moreInList = false;
////        int count = 0;
//        
//        StmtIterator iter = m.listStatements( r, null, (RDFNode) null );
//        
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt1 = iter.nextStatement();
//            
//            if(stmt1.getPredicate().equals(listHasContents))
//            {
////                System.out.println(stmt1);
//                Property coordinates_IfcCartesianPoint = m.createProperty( ns_ifcowl + "coordinates_IfcCartesianPoint" );
//                StmtIterator iter1 = m.listStatements( stmt1.getResource(), coordinates_IfcCartesianPoint, (RDFNode) null );
//        
//                while ( iter1.hasNext() ) 
//                {
//                    Statement stmt2 = iter1.nextStatement();
//                    coordinates_List.add(traverseCoordinateList( m, stmt2.getObject().asResource(), coordinate_List));
//                }
//            }
//            else if(stmt1.getPredicate().equals(listHasNext))
//            {
////                System.out.println("Adding 1 to count: " + (count+1));
////                count++;
//                moreInList = true;
//                traversePolylineCoordinateList(m, stmt1.getResource(), coordinates_List);
////                System.out.println("Has next item in list");
//            }
//
//        }
////        
//        if(!moreInList)
//        {
////            System.out.println("List is at end");
//            r = null;
//            return coordinates_List;
//        }
//        
////        System.out.println("NUMBER OF COORDINATES IN POLYLINE " + coordinates_List.toString());
//        
//        return coordinates_List;
//    }
//        //Author Kris McGlinn - This method traverses the RDF express list and recursively adds values to a Java list
//    private List traverseCoordinateList(Model original, Resource r, List coordinate_List)
//    {
////        List polyline_List = new ArrayList();
//        Model m = ModelFactory.createDefaultModel().add(original);
//        
//        
//        Property listHasContents = m.createProperty( ns_list + "hasContents" );
//        Property listHasNext = m.createProperty( ns_list + "hasNext" );
//        boolean moreInList = false;
//        String s[];
//
//        StmtIterator iter = m.listStatements( r, null, (RDFNode) null );
//
//        while ( iter.hasNext() ) 
//        { 
//            Statement stmt2 = iter.nextStatement();
//
//            if(stmt2.getPredicate().equals(listHasContents))
//            {
//                StmtIterator iter2 = m.listStatements( stmt2.getObject().asResource(), null, (RDFNode) null );
//
//                while ( iter2.hasNext() ) 
//                    {
//
//                        Statement stmt3 = iter2.nextStatement();
//
//                        if(stmt3.getObject().isLiteral())
//                        {    
//                            s = stmt3.getObject().toString().split("\\^\\^http");                               
//                            coordinate_List.add(Double.parseDouble(s[0]));
////                            System.out.println("COORDINATE "+s[0]);
//                        }
//
//
//                    }
//            }
//            else if(stmt2.getPredicate().equals(listHasNext))
//            {
////                System.out.println("Adding 1 to count: " + (count+1));
//                //count++;
//                moreInList = true;
//                traverseCoordinateList(original, stmt2.getResource(), coordinate_List);
////                System.out.println("Has next item in list");
//            }
//        }
//
//
////        
//        if(!moreInList)
//        {
////            System.out.println("List is at end");
//            r = null;
//            return coordinate_List;
//        }
////        System.out.println(coordinate_List.toString());
//        return coordinate_List;
//    }
//    
//    //Author Kris McGlinn - This method traverses the RDF express list and recursively adds values to a Java list
//    private List traversePlacementList(Model original, Resource r, List coordinate_List)
//    {
////        List coordinate_List = new ArrayList();
//        Model m = ModelFactory.createDefaultModel().add(original);
//        Property listHasContents = m.createProperty( ns_list + "hasContents" );
//        Property listHasNext = m.createProperty( ns_list + "hasNext" );
//        boolean moreInList = false;
//        String s[];
//      
//        StmtIterator iter = m.listStatements( r, null, (RDFNode) null );
//        
//        while ( iter.hasNext() ) 
//        {
//            Statement stmt1 = iter.nextStatement();
//            
//            if(stmt1.getPredicate().equals(listHasContents))
//            {
//                StmtIterator iter2 = m.listStatements( stmt1.getObject().asResource(), null, (RDFNode) null );
//                while ( iter2.hasNext() ) 
//                    {
//                        
//                        Statement stmt2 = iter2.nextStatement();
//
//                        
//                        if(stmt2.getObject().isLiteral())
//                        {    
//                            s = stmt2.getObject().toString().split("\\^\\^http");                               
//                            coordinate_List.add(Double.parseDouble(s[0]));
////                            System.out.println("Here + "+Double.parseDouble(s[0]));
//                        }
//
//                        
//                    }
//            }
//            else if(stmt1.getPredicate().equals(listHasNext))
//            {
////                System.out.println("Adding 1 to count: " + (count+1));
//                //count++;
//                moreInList = true;
//                coordinate_List = traversePlacementList(original, stmt1.getResource(), coordinate_List);
////                System.out.println("Has next item in list");
//            }
//
//        }
////        
//        if(!moreInList)
//        {
////            System.out.println("List is at end");
//            r = null;
//            return coordinate_List;
//        }
////        System.out.println(coordinate_List.toString());
//        return coordinate_List;
//    }
//    
//
//
//    
//    //Original author Pieter Pauwels - This method writes the model to a turtle file (additional code K. McGlinn to output to an output directory
//    private Model writeModel(Model m){
//        try 
//        {
//            String s1 = outputfile;
//
//            javaCreateDirectory();
//
//            OutputStreamWriter char_output = new OutputStreamWriter(
//                            new FileOutputStream("output\\"+s1), Charset.forName(
//                                            "UTF-8").newEncoder());
//            long size = m.size();
//            BufferedWriter out = new BufferedWriter(char_output);
//            m.write(out, "TTL");
//            System.out.println("Successfully generated " + "TTL"
//                            + " file at " + outputfile + " : triple count = " + size);
//        } catch (IOException e) {
//                System.out.println("Unable to generate " + "TTL"
//                                + " file at " + outputfile);
//                e.printStackTrace();
//        } return m;
//    }
//        
//    //Original author Pieter Pauwels - This method loads the turtle input file. 
//    private Model loadFile(){
//        Model m = null;
//        try {
//            m = FileManager.get().loadModel(inputfile, "TTL");
//            //infmodel = ModelFactory.createRDFSModel(m);
//            long size = m.size();
//            System.out.println("Opened " + "TTL"
//                            + " file at " + inputfile + " : triple count = " + size);
//        } catch (org.apache.jena.riot.RiotException e) {
//            System.out.println("Unable to parse " + "TTL" + " file at "
//                            + inputfile);
//            System.out.println("Unable to generate " + "TTL" + " file at "
//                            + outputfile);
//            System.out.println("RiotException " + e);
//        }	
//        return m;
//    }
//   
//
//    //This method creates a directory
//    public static void javaCreateDirectory()
//    {
//
//        File dir = new File("output");
//
//        // attempt to create the directory here
//        boolean successful = dir.mkdir();
//        if (successful)
//        {
//          // creating the directory succeeded
//          System.out.println("directory was created successfully");
//        }
//        else
//        {
//          // creating the directory failed
////              System.out.println("failed trying to create the directory");
//        }
//
//    }
//    
//      private void checkArguments(String[] a)
//    {
//        
//        if(a.length == 0)
//        {
//            String s[] = inputfile.split("\\.");
//            outputfile = s[0] + "_geoloc."+s[1];        
//        }
//        else
//        {           
//            inputfile = a[0];  
//        }
//        if(a.length == 1)
//        {
//            inputfile = a[0]; 
//            String s[] = inputfile.split("\\.");
//            outputfile = s[0] + "_geoloc."+s[1];      
//        }
//        if(a.length == 2)
//        {
//            inputfile = a[0]; 
//            outputfile = a[1]; ;
//        }
//        
//    }
//    
//}
//
