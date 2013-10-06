package com.tramex.sisoprega.proxy.bean;

import java.util.Date;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.dto.Inventory;
import com.tramex.sisoprega.dto.Shipment;
import com.tramex.sisoprega.dto.ShipmentDetail;
import com.tramex.sisoprega.dto.ShipmentRelease;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.request.ReadRequest;
import com.tramex.sisoprega.gateway.response.BaseResponse;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseInventory;

/**
 * Session Bean implementation class ShipmentBean
 */
@Stateless
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class ShipmentBean extends BaseInventory implements Cruddable {

  @Override
  public ReadResponse Create(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {

      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Shipment entity = (Shipment) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      for (ShipmentDetail detail : entity.getShipmentDetail()) {
        Inventory inventory = getInventoryRecordById(detail.getInventoryId());

        long headsProgrammed = detail.getHeads();
        if (inventory != null) {
          // Update inventory record

          inventory.setAvailableToProgramShip(inventory.getAvailableToProgramShip() - headsProgrammed);
          inventory.setProgrammedToShip(inventory.getProgrammedToShip() + headsProgrammed);
          inventory.setAvailableToShip(inventory.getAvailableToShip() + headsProgrammed);

          dataModel.updateDataModel(inventory);
        } else {
          // TODO throw exception because the inventory was not found.
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating inventory record: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      response
          .setError(new GatewayError("DB01", "Fue imposible actualizar el inventario con los datos proporcionados.", "Create"));
    }

    // Create shipment
    response = super.Create(request);
    return response;
  }

  @Override
  public ReadResponse Update(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Shipment entity = (Shipment) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      for (ShipmentRelease release : entity.getShipmentRelease()) {

        if (release.getShipmentReleaseId() == 0) {

          Set<ShipmentDetail> shipmentDetail = release.getShipment().getShipmentDetail();

          if (shipmentDetail.size() > 0) {
            for (ShipmentDetail detail : shipmentDetail) {
              Inventory inventory = getInventoryRecordById(detail.getInventoryId());

              long headsShipped = detail.getHeads();

              if (inventory != null) {
                // Update inventory record

                inventory.setAvailableToShip(inventory.getAvailableToShip() - headsShipped);
                inventory.setShipped(inventory.getShipped() + headsShipped);
                long headsLeft = inventory.getHeads() - headsShipped;                
                inventory.setWeight(inventory.getWeight()/inventory.getHeads()*headsLeft);
                inventory.setFeed(inventory.getFeed()/inventory.getHeads()*headsLeft);
                inventory.setHeads(headsLeft);
                
                if (inventory.getHeads() <= 0) {
                  inventory.setCycleCompleted(new Date());
                }
                dataModel.updateDataModel(inventory);

              } else {
                // TODO throw exception because the inventory was not found.
              }
            }
          }
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating inventory record: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      response
          .setError(new GatewayError("DB01", "Fue imposible actualizar el inventario con los datos proporcionados.", "Create"));
    }

    // Create shipment
    response = super.Update(request);
    return response;
  }

  @Override
  public BaseResponse Delete(ReadRequest request) {
    log.entering(this.getClass().getCanonicalName(), "ReadResponse Delete(ReadRequest)");

    ReadResponse response = new ReadResponse();
    try {
      String id = request.getFilter().getFieldValue("id");
      String queryName = request.getFilter().getEntity().toUpperCase();

      if (id == null) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new GatewayError("VAL04", "Se ha omitido el id en la entidad [" + request.getFilter().getEntity()
            + "] al intentar eliminar sus datos.", "Delete"));
      } else {

        // Read single record and remove
        String idName = "Id";
        queryName += "_BY_ID";

        Class<?> type = Class.forName(DTO_PACKAGE + request.getFilter().getEntity());
        // Remove record from database

        Shipment shipment = (Shipment) dataModel.readSingleDataModel(queryName, idName, Long.parseLong(id), type);

        if (shipment.getShipmentRelease().size() > 0) { //Already shipped
          for (ShipmentDetail detail : shipment.getShipmentDetail()) {
            Inventory inventory = getInventoryRecordById(detail.getInventoryId());
            if (inventory != null) {
              long headsAffected = detail.getHeads();
              //inventory.setAvailableToShip(inventory.getAvailableToShip() + headsAffected);
              inventory.setShipped(inventory.getShipped() - headsAffected);
              long headsLeft = inventory.getHeads() + headsAffected;
              inventory.setWeight(inventory.getWeight()/inventory.getHeads()*headsLeft);
              inventory.setFeed(inventory.getFeed()/inventory.getHeads()*headsLeft);
              inventory.setHeads(headsLeft);
              
              inventory.setAvailableToProgramShip(inventory.getAvailableToProgramShip() + headsAffected);
              inventory.setProgrammedToShip(inventory.getProgrammedToShip() - headsAffected);
              //inventory.setAvailableToShip(inventory.getAvailableToShip() - headsAffected);
              
              if (inventory.getHeads() > 0) {
                inventory.setCycleCompleted(null);
              }
              dataModel.updateDataModel(inventory);
            } else {
              // TODO throw exception because the inventory was not found.
            }
          }
        } else {
          for (ShipmentDetail detail : shipment.getShipmentDetail()) {
            Inventory inventory = getInventoryRecordById(detail.getInventoryId());
            if (inventory != null) {
              long headsAffected = detail.getHeads();
              // Update inventory record
              inventory.setAvailableToProgramShip(inventory.getAvailableToProgramShip() + headsAffected);
              inventory.setProgrammedToShip(inventory.getProgrammedToShip() - headsAffected);
              inventory.setAvailableToShip(inventory.getAvailableToShip() - headsAffected);
              dataModel.updateDataModel(inventory);
            } else {
              // TODO throw exception because the inventory was not found.
            }
          }
        }
        dataModel.deleteDataModel(dataModel.readSingleDataModel(queryName, idName, Long.parseLong(id), type), getLoggedUser());
        response.setError(new GatewayError("0", "SUCCESS", "Delete"));
      }
    } catch (Exception e) {
      this.log.severe("Exception found while deleting [" + request + "]");
      this.log.throwing(this.getClass().getCanonicalName(), "ReadResponse Delete(ReadRequest)", e);

      response.setError(new GatewayError("DB02", "Error al borrar datos.", "entity: [" + request.getFilter().getEntity() + "]"));
    }

    log.exiting(this.getClass().getCanonicalName(), "ReadResponse Delete(ReadRequest)");
    return response;
  }

}
