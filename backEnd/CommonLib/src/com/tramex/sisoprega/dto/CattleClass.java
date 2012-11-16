package com.tramex.sisoprega.dto;

public class CattleClass {
    private long catclassId;
    private String catclassName;

    /**
     * @return the catclassId
     */
    public long getCatclassId() {
	return catclassId;
    }

    /**
     * @param catclassId
     *            the catclassId to set
     */
    public void setCatclassId(long catclassId) {
	this.catclassId = catclassId;
    }

    /**
     * @return the catclassName
     */
    public String getCatclassName() {
	return catclassName;
    }

    /**
     * @param catclassName
     *            the catclassName to set
     */
    public void setCatclassName(String catclassName) {
	this.catclassName = catclassName;
    }

    @Override
    public String toString() {
	return "catclassId:" + catclassId + ";catclassName:" + catclassName
		+ ";";
    }
}
