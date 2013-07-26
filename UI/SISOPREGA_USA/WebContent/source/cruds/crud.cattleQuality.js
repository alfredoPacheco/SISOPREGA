/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: 
 * - [DATE] By Alan del Rio: Initial Version. 
 * - [DATE] By Alfredo Pacheco: Integrate with web services. 
 * - 02/03/2013 By Diego Torres: Add rancher user handlers.
 * - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind(
  {
    name : "crud.cattleQuality",
    kind : "crud",
    published : {
	entityName : "cattleQuality",
	createKindName : "catalogs.cattleQuality.form",
    }
  });
var crudCattleQuality = new crud.cattleQuality();