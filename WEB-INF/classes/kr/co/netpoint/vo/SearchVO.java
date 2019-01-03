package kr.co.netpoint.vo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SearchVO {
	static final Logger logger = LoggerFactory.getLogger(SearchVO.class);
	private String searchType;
	private String searchValue;
	private String searchState;
	private String projectState;

	public String getSearchType() {
		return this.searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getSearchValue() {
		return this.searchValue;
	}

	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}

	public String getSearchState() {
		return this.searchState;
	}

	public void setSearchState(String searchState) {
		this.searchState = searchState;
	}

	public String getProjectState() {
		return this.projectState;
	}

	public void setProjectState(String projectState) {
		this.projectState = projectState;
	}
}
