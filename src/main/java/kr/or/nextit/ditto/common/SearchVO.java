package kr.or.nextit.ditto.common;

import lombok.Data;

@Data
public class SearchVO {
	private String searchType;
	private String searchWord;
	private int firstRecordIndex;
	private int lastRecordIndex;
	private int pageNumListSize;
	private String memberAdmin;
}