/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.xml.bind.JAXBException;
import jaxb.crud.RequestCrud;
import jaxb.crud.ResponseCrud;

/**
 *
 * @author sarai
 */
public enum ObjMapper {
    INSTANCE;
    private static final String MODELS_PACK="models.";
    public LinkedList<Object> mapReqCreateToObject(List<RequestCrud.RequestCreate> requestCreate,EntityManager em, HashMap<String,Object> colIDs) 
            throws ClassNotFoundException, 
                   InstantiationException, NoSuchFieldException, 
                   IllegalArgumentException, IllegalAccessException {
        LinkedList<Object> colObj= new LinkedList<Object>();
        for(RequestCrud.RequestCreate rC : requestCreate){  
            Class cls = Class.forName(MODELS_PACK+rC.getEntity());
            Object modObj=cls.newInstance();
            colIDs.put(":ID"+colIDs.size(), em.getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(modObj));                            
            System.out.println("TOTAL:"+ rC.getTuple().getAtt().size());
            for(RequestCrud.RequestCreate.Tuple.Att att : rC.getTuple().getAtt()){
                Field fld = cls.getDeclaredField(att.getName());
                System.out.println("NAME:"+att.getName()+" VAL:"+att.getValue()+" TYPE:"+fld.getType().toString());                 
                fld.setAccessible(true);
                try{
                if(att.getValue().startsWith(":ID")){
                    fld.set(modObj, colIDs.get(att.getValue()));
                }else{                    
                    if(fld.getType()==Integer.class){
                       fld.set(modObj, new Integer(att.getValue()));
                    }else{
                        fld.set(modObj, att.getValue());                        
                    }
                }
                }catch(IllegalArgumentException e){
                    System.out.println(e.getMessage());
                }

            }
            colObj.add(modObj);
        }
        return colObj;
    }
    public Object mapReqUpdateToObject(RequestCrud.RequestUpdate rU) 
            throws ClassNotFoundException, 
                   InstantiationException, NoSuchFieldException, 
                   IllegalArgumentException, IllegalAccessException {
        System.out.println(rU.getEntity());
        Class cls = Class.forName("models."+rU.getEntity());
        Object modObj=cls.newInstance();
        System.out.println("TOTAL:"+ rU.getTuple().getAtt().size());
        for(RequestCrud.RequestUpdate.Tuple.Att att : rU.getTuple().getAtt()){
            Field fld = cls.getDeclaredField(att.getName());
            System.out.println("NAME:"+att.getName()+" VAL:"+att.getValue()+" TYPE:"+fld.getType().toString());                 
            fld.setAccessible(true); 
            try{
               fld.set(modObj, att.getValue());                        
            }catch(IllegalArgumentException e){
                System.out.println(e.getMessage());
            }

        }
        return modObj;
    }            
    public ResponseCrud.ResponseRead mapObjtoResRead(String sEntity, int tupleNum,LinkedList<Object> modObjects) 
            throws ClassNotFoundException, IllegalArgumentException, IllegalAccessException, NoSuchFieldException, JAXBException{
       ResponseCrud.ResponseRead responseRead = new ResponseCrud.ResponseRead();
       LinkedList<ResponseCrud.ResponseRead.Tuple> tuples = new LinkedList<ResponseCrud.ResponseRead.Tuple>();                       
       responseRead.setEntity(sEntity);            
       for(Object obj:modObjects){            
            ResponseCrud.ResponseRead.Tuple tuple = new ResponseCrud.ResponseRead.Tuple();                       
            ArrayList<ResponseCrud.ResponseRead.Tuple.Att> colAtt= new ArrayList<ResponseCrud.ResponseRead.Tuple.Att>();
            Class cls = Class.forName(MODELS_PACK+sEntity);
            Field[] colFld = cls.getDeclaredFields();
            //em.unwrap(em.getClass()).getDescriptor(cls).getFields();         
            for(Field fld: colFld){
                fld.setAccessible(true);   
                String sFldName=fld.getName();
                ResponseCrud.ResponseRead.Tuple.Att att = new ResponseCrud.ResponseRead.Tuple.Att();
                if(!sFldName.startsWith("_")
                        && !sFldName.equalsIgnoreCase("serialVersionUID")){                                    
                    att.setName(sFldName);                    
                    System.out.println(fld.getType()+"**"+sFldName+"****"+String.valueOf(fld.get(obj)));
                    att.setValue(String.valueOf(fld.get(obj)));                                        
                    colAtt.add(att);
                    tuple.setAtt(colAtt);                    
                }                                        
                }
                tuples.add(tuple);            
       }
       responseRead.setTuplenum(new Integer(tupleNum));
       responseRead.setTuple(tuples);       
       return responseRead;
    }
    public Object properCastModAtt(String sCls, String sAttName, Object sAttValue) throws ClassNotFoundException, NoSuchFieldException{
        Class cls = Class.forName(MODELS_PACK+sCls);
        Field fld = cls.getDeclaredField(sAttName);
        System.out.println("7777"+fld.getType().getCanonicalName());
        cls = Class.forName(fld.getType().getCanonicalName());        
        try{
            Constructor c= cls.getConstructor(new Class[]{String.class});
            System.out.println(c.newInstance(sAttValue));
            return c.newInstance(sAttValue);
            
        }catch(Exception e){
            System.out.println("WWWWWWWWw"+e.getMessage());
            return null;
        }
    }
}
