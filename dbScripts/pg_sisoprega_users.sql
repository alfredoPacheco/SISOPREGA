/*
 * The database script is executed in postgres command line:
 * psql -d postgres -f /path/to/pg_sisoprega_users.sql
 *
 * This script is intended to create the users for sisoprega.
 * 
 * Revision History:
 * 
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/18/2012  Diego Torres                  Initial Version.
 * ====================================================================================
 * 
 * Author: Diego Torres
 *  
 */
alter user postgres with password 'postgres';

create user sisoprega with password 'sisoprega';
grant all privileges on database sisoprega to sisoprega;