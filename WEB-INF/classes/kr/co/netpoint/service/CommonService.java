package kr.co.netpoint.service;

import java.util.List;
import kr.co.netpoint.vo.project.PnAdminVO;
import kr.co.netpoint.vo.project.SlCodeVO;

public abstract interface CommonService {
	
	public abstract SlCodeVO selectCode(SlCodeVO paramSlCodeVO);
	public abstract List<SlCodeVO> listCode(SlCodeVO paramSlCodeVO);
	public abstract List<Object> listDateYYYYMM(String paramString1, String paramString2);
	public abstract PnAdminVO selectPnAdmin(PnAdminVO paramPnAdminVO);
}
