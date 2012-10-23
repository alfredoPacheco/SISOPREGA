/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package crud;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.NotSupportedException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
import javax.xml.bind.JAXBException;
import jaxb.crud.RequestCrud;
import jaxb.crud.ResponseCrud;
import org.apache.log4j.Logger;
import proxies.Proxy;
import utils.ObjMapper;
/**
 *
 * @author sarai
 */
public class CRUD {
        //private static Logger log = Logger.getLogger(CRUD.class);    
        private EntityManager em;
        private UserTransaction utx; 
        
        private final RequestCrud requestCrud;
        private ResponseCrud responseCrud;
        
        private LinkedList <Object> colRequestCreate;
        private LinkedList<Triplet<RequestCrud.RequestRead,LinkedList<Object>,Integer>> colRequestRead;
        private LinkedList <Object> colRequestUpdate;
        private LinkedList <Object> colRequestDelete;
        
        private StringBuilder sMsg=new StringBuilder();
        private StringBuilder sCode=new StringBuilder();      
        
        private HashMap<String,Object> colIDs= new HashMap<String,Object>();
        private static final String MODELS_PACK="models.";

        public CRUD(EntityManager em,UserTransaction utx) {
            this.em=em;
            this.utx=utx;
            this.requestCrud=null;
            this.responseCrud=new ResponseCrud();            
        }
	public CRUD(EntityManager em,UserTransaction utx,RequestCrud requestCrud){
            this.em=em;
            this.utx=utx;            
            this.requestCrud=requestCrud;
            this.responseCrud=new ResponseCrud();                        
	}
        public boolean executeCRUD() throws ClassNotFoundException, InstantiationException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException{            
            this.requestToObject();
            try{
                if(this.runBS()){
                    this.runCRUD();
                    this.ObjectToResponse();
                }
            }catch(Exception e){
                
            }
            return true;
        }
        public ResponseCrud getResponse(){
            if (this.sCode.toString().equals("")){
                this.responseCrud.setCode("000");                               
            }else{
                this.responseCrud.setCode(this.sCode.toString());  
            }
            if(this.sMsg.toString().equals("")){
                this.responseCrud.setMessage("SUCESS");
            }else{
                this.responseCrud.setMessage(this.sMsg.toString());
            }
            return this.responseCrud;
        }
        private boolean  requestToObject() throws ClassNotFoundException, InstantiationException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException{
            this.colRequestCreate=ObjMapper.INSTANCE.mapReqCreateToObject(this.requestCrud.getRequestCreate(),this.em,this.colIDs);
            this.colRequestRead=this.Read(this.requestCrud.getRequestRead());
            //System.out.println(this.colRequestCreate.size());
            this.colRequestUpdate=this.getUpdateObj(this.requestCrud.getRequestUpdate());
            this.colRequestDelete=this.getDeleteObj(this.requestCrud.getRequestDelete());            
            return true;
        }
        private boolean ObjectToResponse(){
            return true;
        }
        private boolean attachCreate(LinkedList <Object> colRequestCreate){
            return true;
        }
        private boolean attachRead(){
            return true;
            
        }
        private boolean runBS(){
            return true;
        } 
        private boolean runCreateBS(){
            return true;
        }
        private boolean runReadBS(){
            return true;
        }
        private boolean runUpdateBS(){
            return true;
        }
        private boolean runDeleteBS(){
            return true;
        }        
	public boolean Create(List<Object> modObjects){
            try{
                LinkedList<ResponseCrud.ResponseCreate> responseCreate = new LinkedList<ResponseCrud.ResponseCreate>(); 
                this.startTransaction();
                for(Object modObj : modObjects){                    
                    em.persist(modObj);
                    em.flush();
                    ResponseCrud.ResponseCreate rC = new ResponseCrud.ResponseCreate();
                    rC.setEntity(modObj.getClass().getSimpleName());                    
                    rC.setId(new Integer(em.getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(modObj).toString()));
                    //colIDs.put(":ID"+colIDs.size(), em.getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(modObj));
                    responseCreate.add(rC);                    
                }
                this.commitTansaction();
                this.responseCrud.setResponseCreate(responseCreate);
		return true;
            }catch(Exception e){
                this.sCode.append("XXX");
                this.sMsg.append("ERROR ON CREATION ").append(e.getMessage());                
                return false;
            }
	}

        public LinkedList<Triplet<RequestCrud.RequestRead,LinkedList<Object>,Integer>> Read(List<RequestCrud.RequestRead> requestRead) 
                throws ClassNotFoundException, NoSuchFieldException{

            LinkedList<Triplet<RequestCrud.RequestRead,LinkedList<Object>,Integer>> colResults=new LinkedList<Triplet<RequestCrud.RequestRead,LinkedList<Object>,Integer>>();
            for(RequestCrud.RequestRead rR:requestRead){
                StringBuilder sQuery= new StringBuilder("SELECT ");
                if (rR.getTupleatt().getAtt().getName().isEmpty()){
                    sQuery.append("o ");
                }else{
                    sQuery.append(this.formatSelectAtt(rR.getTupleatt().getAtt()));
                }
                sQuery.append(" FROM ").append(rR.getEntity()).append(" o ");
                if(!rR.getFilters().getAtt().isEmpty()){
                    sQuery.append(" WHERE ").append(this.formatWhereFilter(rR.getFilters().getAtt()));
                }                
                //log.debug(sQuery);
                Query oQuery=em.createQuery(sQuery.toString());
                if(!rR.getFilters().getAtt().isEmpty()){
                    for(RequestCrud.RequestRead.Filters.Att att:rR.getFilters().getAtt()){
                        //log.debug(att.getName()+"$$$$"+att.getValue());
                        oQuery.setParameter(att.getName(), 
                                   ObjMapper.INSTANCE.properCastModAtt(rR.getEntity(), att.getName(), att.getValue()));
                    }                
                }                
                if(em==null){
                    //log.debug("CHANGOS");    
                }
                 List colObj= oQuery
                            .setFirstResult(rR.getReadstart().intValue())   
                            .setMaxResults(rR.getReadend().intValue())
                            .getResultList();
                 
                 //log.debug(colObj.get(0));
                 colResults.add(new Triplet(rR,new LinkedList<Object>(colObj),readCount(rR)));
                
            }
            return colResults;
        }
        
       public boolean ReadAttach(LinkedList<Triplet<RequestCrud.RequestRead,LinkedList<Object>,Integer>> colModObj){
           try{
                List<ResponseCrud.ResponseRead> colRC=new LinkedList<ResponseCrud.ResponseRead>();
                for(Triplet<RequestCrud.RequestRead,LinkedList<Object>,Integer> triplet:colModObj){
                    colRC.add(ObjMapper.INSTANCE.mapObjtoResRead(triplet.getA().getEntity(),
                                                       triplet.getC(), 
                                                       triplet.getB()));

                }
                this.responseCrud.setResponseRead(colRC);
                return true;
           }catch(Exception e){
                return false;
           }
       }
       public LinkedList<Object> getUpdateObj(List<RequestCrud.RequestUpdate> requestUpdate) throws ClassNotFoundException, InstantiationException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException{
            LinkedList<Object> modObjects=new LinkedList<Object>();           
            for(RequestCrud.RequestUpdate rU:requestUpdate){
                Object updObj=ObjMapper.INSTANCE.mapReqUpdateToObject(rU);
                Object oldObj = em.find(Class.forName(MODELS_PACK+rU.getEntity()), rU.getId());
                Proxy proxy=(Proxy)oldObj;       
                //em.getEntityManagerFactory().getMetamodel().entity(null).
                proxy.setUpdatedObject(updObj);                
                proxy.setID(em.getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(oldObj).toString());
                modObjects.add(oldObj);
            }
            return modObjects;            
        }
        public LinkedList<Object> getDeleteObj(List<RequestCrud.RequestDelete> requestDelete) 
            throws ClassNotFoundException{
            LinkedList<Object> modObjects=new LinkedList<Object>();           
            for(RequestCrud.RequestDelete rD:requestDelete){            
                Object objUpd = em.find(Class.forName(MODELS_PACK+rD.getEntity()), rD.getId());
                modObjects.add(objUpd);
            }
            return modObjects;            
        }
	public int readCount(RequestCrud.RequestRead rR){
                StringBuilder sQueryCnt= new StringBuilder("SELECT COUNT(o) FROM ");
                sQueryCnt.append(rR.getEntity()).append(" o ");
                if(!rR.getFilters().getAtt().isEmpty()){
                    sQueryCnt.append(" WHERE ").append(this.formatWhereFilter(rR.getFilters().getAtt()));                    
                }
                Query oQuery=em.createQuery(sQueryCnt.toString());                
                if(!rR.getFilters().getAtt().isEmpty()){
                    for(RequestCrud.RequestRead.Filters.Att att:rR.getFilters().getAtt()){
                        oQuery.setParameter(att.getName(), att.getValue());
                    }                
                }
                return Integer.valueOf(String.valueOf(oQuery.getSingleResult()));
        }	
	public boolean Update(LinkedList<Object> requestUpdate){
            try{
                this.startTransaction();
                for(Object rU:requestUpdate){
                    System.out.println("UPDATING");
                    Proxy proxy= (Proxy)rU;
                    System.out.println(proxy.getUpdatedObject());
                    em.merge(proxy.getUpdatedObject());
                }
                this.commitTansaction();
            }catch(Exception e){
                this.sCode.append("XXX");
                this.sMsg.append("ERROR UPDATING ").append(e.getMessage());
                return false;
            }
            return true;
	}	
	public boolean Delete(LinkedList<Object> requestDelete){
            try{
                this.startTransaction();
                for(Object rD:requestDelete){                    
                    em.remove(em.merge(rD));
                }
                this.commitTansaction();
                return true;
            }catch(Exception e){
                this.sCode.append("XXX");
                this.sMsg.append("ERROR DELETING ").append(e.getMessage());
                //log.debug(this.sMsg);
                return false;
            }
	}	
	public boolean CustomOp(LinkedList<RequestCrud.RequestCustomop> requestCustomOp){
            return false;
	}
        @TransactionAttribute(TransactionAttributeType.REQUIRED)
        private void startTransaction() throws NotSupportedException, SystemException{
            this.utx.begin();
        }
        private void commitTansaction() 
                throws RollbackException, HeuristicMixedException, HeuristicRollbackException, 
                SecurityException, IllegalStateException, SystemException{
            this.utx.commit();
        }
        private String formatSelectAtt(RequestCrud.RequestRead.Tupleatt.Att colAtt){
            StringBuilder formattetSelect=new StringBuilder();
            for(String att : colAtt.getName()){
                //log.debug(att);
                formattetSelect.append("o.").append(att).append(", ");
            }
            //log.debug(formattetSelect+">>"+formattetSelect.length()+">>");
            formattetSelect.delete(formattetSelect.length()-2,formattetSelect.length());
            return formattetSelect.toString();
        }
        private String formatWhereFilter(List<RequestCrud.RequestRead.Filters.Att> colAtt){
            StringBuilder formattetSelect=new StringBuilder();
            for(RequestCrud.RequestRead.Filters.Att att:colAtt){
                formattetSelect.append("o.").append(att.getName()).append("=:").append(att.getName()).append(" AND ");
            }
            formattetSelect.delete(formattetSelect.length()-5,formattetSelect.length());
            return formattetSelect.toString();
        }

    private boolean runCRUD() {
        boolean bOk=true;
        if(bOk && this.requestCrud.getRequestCreate().size()>0 ){bOk=this.Create(this.colRequestCreate);}            
        if(bOk && this.requestCrud.getRequestRead().size()>0){bOk=this.ReadAttach(this.colRequestRead);} 
        if(bOk && this.requestCrud.getRequestUpdate().size()>0){bOk=this.Update(this.colRequestUpdate);}
        if(bOk && this.requestCrud.getRequestDelete().size()>0){bOk=this.Delete(this.colRequestDelete);}
        return bOk;
    }
    public static class Triplet<T, U, V>
    {
       private final T  a;
       private final U  b;
       private final V  c;

       Triplet(T a, U b, V c){
        this.a = a;
        this.b = b;
        this.c = c;
       }

       public T getA(){ return a;}
       public U getB(){ return b;}
       public V getC(){ return c;}
    }

}