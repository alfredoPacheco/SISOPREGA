/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package proxies;

import java.lang.reflect.Field;
import utils.ObjMapper;

/**
 *
 * @author sarai
 */
public abstract class Proxy<T> {
    private T _updateMe=null;
    public boolean runBSCreate(){
        return true;
    }
    public boolean runBSRead(){
        
        return true;
    }
    //Con generics implicar que sea del tipo de la misma clase
    public void setUpdatedObject(T obj){
        
        this._updateMe=obj;
    } 
    public Object getUpdatedObject(){        
        return this._updateMe;
    }     
    public boolean runBSUpdate(){
        
        return true;
    }        
    public boolean runBSDelete(){
        
        return true;
    }
    public boolean setID(String objID) throws ClassNotFoundException, IllegalArgumentException, IllegalAccessException, NoSuchFieldException{
        Class cls= Class.forName(this.getClass().getName());
        Field[] fields = cls.getDeclaredFields();
        System.out.println("ASCALON");
        for(Field fld:fields){
            fld.setAccessible(true);
            System.out.println("llllllllllllllll");
            if(fld.getAnnotation(javax.persistence.Id.class)!=null){
                System.out.println("NOMBRRRRREEE:"+fld.getName());
                ObjMapper.INSTANCE.properCastModAtt(this.getClass().getSimpleName(), fld.getName(), objID);
                fld.set(this._updateMe, new Integer(objID));
            }
        }
        return true;
    }
}
