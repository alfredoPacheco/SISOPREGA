package com.tramex.sisoprega.identityManager;

import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class JDBCRealmUserCreator {
  private static final String driver = "org.postgresql.Driver";
  private static final String jdbcUrl = "jdbc:postgresql://localhost/sisoprega";
  private static final String userSql = "INSERT INTO sys_sisoprega_user values(?, ?)";
  private static final String groupSql = "INSERT INTO sys_sisoprega_role values(?, ?)";

  private static final char[] HEXADECIMAL = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

  private static String hashPassword(String password) throws Exception {
    MessageDigest md = MessageDigest.getInstance("MD5");
    md.reset();

    byte[] bytes = md.digest(password.getBytes());
    StringBuilder sb = new StringBuilder(2 * bytes.length);
    for (int i = 0; i < bytes.length; i++) {
      int low = (int) (bytes[i] & 0x0f);
      int high = (int) ((bytes[i] & 0xf0) >> 4);
      sb.append(HEXADECIMAL[high]);
      sb.append(HEXADECIMAL[low]);
    }
    return sb.toString();
  }

  /**
   * @param args
   */
  public static void main(String[] args) throws Exception {
    String dbUser = null;
    String dbPassword = null;
    String user = null;
    String password = null;
    String group = null;

    if (args.length != 5) {
      System.err.println("Usage java CreateJDBCRealmUser <dbUser> <dbPassord> <user> <password> <group>");
      System.exit(2);
    } else {
      dbUser = args[0];
      dbPassword = args[1];
      user = args[2];
      password = args[3];
      group = args[4];
    }

    Class.forName(driver);
    String hPassword = hashPassword(password);
    Connection conn = DriverManager.getConnection(jdbcUrl, dbUser, dbPassword);
    PreparedStatement userStmt = conn.prepareStatement(userSql);
    userStmt.setString(1, user);
    userStmt.setString(2, hPassword);
    userStmt.executeUpdate();
    userStmt.close();

    PreparedStatement groupStmt = conn.prepareStatement(groupSql);
    groupStmt.setString(1, user);
    groupStmt.setString(2, group);
    groupStmt.executeUpdate();
    groupStmt.close();

    conn.close();
  }

}
