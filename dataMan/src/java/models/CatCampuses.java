/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package models;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import proxies.Proxy;

/**
 *
 * @author sarai
 */
@Entity
@Table(name = "cat_campuses")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatCampuses.findAll", query = "SELECT c FROM CatCampuses c"),
    @NamedQuery(name = "CatCampuses.findByCampusId", query = "SELECT c FROM CatCampuses c WHERE c.campusId = :campusId"),
    @NamedQuery(name = "CatCampuses.findByCampusDesc", query = "SELECT c FROM CatCampuses c WHERE c.campusDesc = :campusDesc")})
public class CatCampuses extends Proxy implements Serializable  {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "campus_id")
    private Integer campusId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "campus_desc")
    private String campusDesc;

    public CatCampuses() {
    }

    public CatCampuses(Integer campusId) {
        this.campusId = campusId;
    }

    public CatCampuses(Integer campusId, String campusDesc) {
        this.campusId = campusId;
        this.campusDesc = campusDesc;
    }

    public Integer getCampusId() {
        return campusId;
    }

    public void setCampusId(Integer campusId) {
        this.campusId = campusId;
    }

    public String getCampusDesc() {
        return campusDesc;
    }

    public void setCampusDesc(String campusDesc) {
        this.campusDesc = campusDesc;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (campusId != null ? campusId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatCampuses)) {
            return false;
        }
        CatCampuses other = (CatCampuses) object;
        if ((this.campusId == null && other.campusId != null) || (this.campusId != null && !this.campusId.equals(other.campusId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.CatCampuses[ campusId=" + campusId + "campusDesc ="+campusDesc +" ]";
    }
    
}
