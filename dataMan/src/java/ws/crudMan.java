/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import crud.CRUD;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import javax.annotation.Resource;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.UserTransaction;
import javax.xml.bind.JAXBException;
import jaxb.crud.RequestCrud;
import jaxb.crud.ResponseCrud;
import utils.ObjMapper;

/**
 *
 * @author sarai
 */
@WebService(serviceName = "crudMan")
public class crudMan {
    @PersistenceContext
    private EntityManager em;
    @Resource
    private UserTransaction utx;     


    /**
     * Web service operation
     */
    //@TransactionAttribute(TransactionAttributeType.REQUIRED)    
    @WebMethod(operationName = "Create")
    public ResponseCrud operation(@WebParam(name = "request_create") final RequestCrud.RequestCreate parameter) throws ClassNotFoundException, InstantiationException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        CRUD crud= new CRUD(em,utx);
        List<RequestCrud.RequestCreate> a=new ArrayList<RequestCrud.RequestCreate>();
        a.add(parameter);
        crud.Create(ObjMapper.INSTANCE.mapReqCreateToObject(a,em,null));
        return crud.getResponse();
    }
    /**
     * Web service operation
     */
    @WebMethod(operationName = "Read")
    public ResponseCrud.ResponseRead testRead(@WebParam(name = "request_read") final RequestCrud.RequestRead parameter) throws ClassNotFoundException, IllegalArgumentException, IllegalAccessException, NoSuchFieldException, JAXBException {
        CRUD crud= new CRUD(em,utx);
        LinkedList<RequestCrud.RequestRead> ll=new LinkedList<RequestCrud.RequestRead>();
        ll.add(parameter);
        LinkedList<CRUD.Triplet<RequestCrud.RequestRead,LinkedList<Object>,Integer>> triplet;
        triplet = crud.Read(ll);
        ResponseCrud.ResponseRead a=ObjMapper.INSTANCE.mapObjtoResRead(triplet.get(0).getA().getEntity(),               
                                                                       triplet.get(0).getC(), 
                                                                       triplet.get(0).getB());        
        return a;
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "Update")
    public ResponseCrud Update(@WebParam(name = "request_update") final RequestCrud.RequestUpdate parameter) throws ClassNotFoundException, InstantiationException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        CRUD crud= new CRUD(em,utx);
        List<RequestCrud.RequestUpdate> a=new ArrayList<RequestCrud.RequestUpdate>();
        a.add(parameter);        
        crud.Update(crud.getUpdateObj(a));
        return crud.getResponse();
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "Delete")
    public ResponseCrud Delete(@WebParam(name = "parameter") final RequestCrud.RequestDelete parameter) throws ClassNotFoundException {
        CRUD crud= new CRUD(em,utx);
        List<RequestCrud.RequestDelete> a=new ArrayList<RequestCrud.RequestDelete>();
        a.add(parameter);        
        crud.Delete(crud.getDeleteObj(a));
        return crud.getResponse();
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "crudws")
    public ResponseCrud crudws(@WebParam(name = "parameter") final RequestCrud parameter) throws ClassNotFoundException, InstantiationException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        CRUD crud= new CRUD(em,utx,parameter);
        crud.executeCRUD();
        return crud.getResponse() ;
    }
}
