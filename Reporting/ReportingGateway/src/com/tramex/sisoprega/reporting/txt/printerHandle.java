package com.tramex.sisoprega.reporting.txt;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tramex.sisoprega.reporting.BaseReportServlet;

@WebServlet("/ManejadorImpresion")
@ServletSecurity(@HttpConstraint(rolesAllowed = { "mx_usr" }))
public class printerHandle extends BaseReportServlet {
	private Logger log = Logger.getLogger(Pesage.class.getCanonicalName());
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public printerHandle() {
		super();
	}

	@Override
	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.log.entering(this.getClass().getCanonicalName(), "processRequest");

		String sqlString = "";
		PreparedStatement ps = null;
		ResultSet rs = null;
		String id = request.getParameter("id");
		String destinationName = request.getParameter("destination_name");
		
		
		
		if (id == null) {
			this.log.fine("id: [" + request.getParameter("id")
					+ "] Action: Retrieve record ");
			sqlString = "select id, report_name from sys_print_queue where destination_name = ? limit 1";
			try {
				ps = conn.prepareStatement(sqlString);
				ps.setString(1, destinationName);
				rs = ps.executeQuery();
				if (!rs.next()) {
					throw new ServletException(
							"ERROR");
				} else {

					PrintWriter out = response.getWriter();
					
					out.println(rs.getString("report_name"));
					out.println(String.valueOf(rs.getLong("id")));
					out.close();
				}
			} catch (SQLException e) {
				log.severe("SQLException while reading printer queue");
				log.throwing(this.getClass().getCanonicalName(),
						"processReques", e);
				throw new ServletException(e);
			} finally {
				try {
					if (ps != null)
						ps.close();
				} catch (Exception e) {
					log.info("Unable to release some resources.");
				}

			}

		} else {
			this.log.fine("id: [" + request.getParameter("id")
					+ "] Action: Delete record");
			sqlString = " delete from sys_print_queue where id = ?";

			try {
				ps = conn.prepareStatement(sqlString);
				ps.setLong(1, Long.parseLong(request.getParameter("id")));
				ps.executeUpdate();
				PrintWriter out = response.getWriter();
				out.println("ok");
				out.close();		
			} catch (SQLException e) {
				log.severe("SQLException while deleting printer queue");
				log.throwing(this.getClass().getCanonicalName(),
						"processReques", e);
				throw new ServletException(e);
			} finally {
				try {
					if (ps != null)
						ps.close();
				} catch (Exception e) {
					log.info("Unable to release some resources.");
				}

			}
		}

	}
}
