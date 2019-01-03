package kr.co.netpoint.vo;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PagingVO {
	static final Logger logger = LoggerFactory.getLogger(PagingVO.class);
	Map<String, Integer> mapPaging = new HashMap();
	private int pageRow = 0;
	private int pageSize = 0;
	private int pageNo = 0;
	private int totCountPage = 0;
	private int pageLastIndex = 0;
	private int pageIndex = 0;
	private int prePageIndex = 0;
	private int nextPageIndex = 0;
	private int pageStartNo = 0;
	private int pageEndNo = 0;
	private int sRNum = 0;
	private int eRNum = 0;
	private String keyValue;
	private String searchValue;
	private SearchVO searchVO;

	public int getPageRow() {
		return this.pageRow;
	}

	public void setPageRow(int pageRow) {
		this.pageRow = pageRow;
	}

	public int getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNo() {
		return this.pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getTotCountPage() {
		return this.totCountPage;
	}

	public void setTotCountPage(int totCountPage) {
		this.totCountPage = totCountPage;
	}

	public int getPageLastIndex() {
		return this.pageLastIndex;
	}

	public void setPageLastIndex(int pageLastIndex) {
		this.pageLastIndex = pageLastIndex;
	}

	public int getPageIndex() {
		return this.pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPrePageIndex() {
		return this.prePageIndex;
	}

	public void setPrePageIndex(int prePageIndex) {
		this.prePageIndex = prePageIndex;
	}

	public int getNextPageIndex() {
		return this.nextPageIndex;
	}

	public void setNextPageIndex(int nextPageIndex) {
		this.nextPageIndex = nextPageIndex;
	}

	public int getPageStartNo() {
		return this.pageStartNo;
	}

	public void setPageStartNo(int pageStartNo) {
		this.pageStartNo = pageStartNo;
	}

	public int getPageEndNo() {
		return this.pageEndNo;
	}

	public void setPageEndNo(int pageEndNo) {
		this.pageEndNo = pageEndNo;
	}

	public int getsRNum() {
		return this.sRNum;
	}

	public void setsRNum(int sRNum) {
		this.sRNum = sRNum;
	}

	public int geteRNum() {
		return this.eRNum;
	}

	public void seteRNum(int eRNum) {
		this.eRNum = eRNum;
	}

	public void setPagingVO() {
		this.pageRow = (this.pageRow != 0 ? this.pageRow : 10);
		this.pageSize = (this.pageSize != 0 ? this.pageSize : 5);
		if (0 == this.totCountPage) {
			this.pageNo = 0;
			this.sRNum = 0;
			this.eRNum = 0;
		} else {
			this.pageIndex = (this.pageNo / this.pageSize);
			if (this.pageNo % this.pageSize == 0) {
				this.pageIndex -= 1;
			}
			this.pageLastIndex = (this.totCountPage / this.pageRow);
			if (this.totCountPage % this.pageRow == 0) {
				this.pageLastIndex -= 1;
			}
			if (this.pageIndex > 0) {
				this.prePageIndex = (this.pageIndex - 1);
			}
			if (this.pageLastIndex > this.pageIndex) {
				this.nextPageIndex = (this.pageIndex + 1);
			}
			this.pageStartNo = (this.pageIndex * this.pageSize + 1);
			this.pageEndNo = (this.pageStartNo + this.pageSize - 1);

			this.sRNum = ((this.pageNo - 1) * this.pageRow + 1);
			this.eRNum = (this.sRNum + this.pageRow - 1);
		}
	}

	public String getKeyValue() {
		return this.keyValue;
	}

	public void setKeyValue(String keyValue) {
		this.keyValue = keyValue;
	}

	public String getSearchValue() {
		return this.searchValue;
	}

	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}

	public SearchVO getSearchVO() {
		return this.searchVO;
	}

	public void setSearchVO(SearchVO searchVO) {
		this.searchVO = searchVO;
	}
}
